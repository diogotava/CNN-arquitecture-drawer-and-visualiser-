let block = [];

function isLayerPossibleToBeInBlock(layerId, otherLayerId = -1, beginningLayer = true) {
    if (layerId === -1)
        return false;
    let layer = layers[layerId];
    if (beginningLayer) {
        return true;
    } else {
        let otherLayer = layers[otherLayerId];
        let allPrevLayers = getAllPreviousLayers(layer, layers)
        let allNextLayers = getAllNextLayers(otherLayer, layers)
        return (otherLayer.previousYPosition === layer.centerPosition[2] || layer.centerPosition[2] === otherLayer.centerPosition[2]) && allPrevLayers.includes(otherLayerId) && allNextLayers.includes(layerId);
    }
}

function selectLayer() {
    let id = getLayerId();
    if (id !== -1) {
        if (dynamicValues.selectedLayerID !== -1)
            layers[dynamicValues.selectedLayerID].selected = false;
        layers[id].selected = true;
        dynamicValues.selectedLayerID = id;
    } else {
        if (dynamicValues.selectedLayerID !== -1)
            layers[dynamicValues.selectedLayerID].selected = false;
        dynamicValues.selectedLayerID = -1;
    }
    selectedText();
}

function getLayerId() {
    let gl = mPage.elt.getContext('webgl');
    let pixels = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
    gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    let index = 4 * ((gl.drawingBufferHeight - mouseY) * gl.drawingBufferWidth + mouseX);

    return (pixels[index] << 16 | pixels[index + 1] << 8 | pixels[index + 2]) - 1;
}

function selectBlock() {
    let layerId = getLayerId();
    if (layerId !== -1) {
        let isEndBlock = isTheEndOfBlock(layerId);
        if (dynamicValues.bPressed) {
            if (isLayerPossibleToBeInBlock(layerId, block[0], false)) {
                block = new Block(block[0], layerId);
                // if (layerId < block[0]) {
                //     block[1] = block[0];
                //     block[0] = layerId;
                // } else
                //     block[1] = layerId;

                if (!dynamicValues.blocks.some(obj => obj.isEqual(block))) {
                    if (confirm("End of block selected!\nDo you want to name the block?")) {
                        let nameOfBlock = prompt("Please enter the block name!", "");
                        block.setName(nameOfBlock);
                    }
                    dynamicValues.blocks.push(block);
                } else {
                    alert("ERROR: It's not possible to select this layer as end of block!")
                }
                layersChanged = true;
            } else {
                alert("ERROR: It's not possible to select this layer as end of block!");
            }
            dynamicValues.bPressed = false;
            block = [];
        } else {
            if (isLayerPossibleToBeInBlock(layerId)) {
                block[0] = layerId;
                alert('Begin of block selected!');
                dynamicValues.bPressed = true;
            } else {
                alert("ERROR: It's not possible to select this layer as end of block!");
            }
        }
    } else {
        if (dynamicValues.bPressed) {
            alert("Block rested!");
            dynamicValues.bPressed = false;
            block = [];
        }
    }
}

function removeBlock() {
    let layerId = getLayerId();
    if (layerId !== -1) {
        let isEndBlock = isTheEndOfBlock(layerId);
        if (isEndBlock) {
            let indexOfBlock = dynamicValues.blocks.findIndex(block => block.endLayer === layerId);
            dynamicValues.blocks.splice(indexOfBlock, 1);
            alert("Block removed!");
            layersChanged = true;
        } else {
            alert("ERROR: Layer selected is not a block!")
        }
    }
}

function keyPressed() {
    if (keyIsDown(67)) { // C
        selectLayer();
    } else if (keyIsDown(66)) {
        selectBlock();
    } else if (keyIsDown(82)) {
        removeBlock();
    }
}

function mousePressed() {
    if (mouseButton === CENTER) {
        selectLayer();
    }
}

function selectedText() {
    let nothingSelectedH2 = select('#nothing_selected_h2');
    let paragraphs = document.getElementById("paragraphs");
    let selectedH2 = select('#selected_h2');
    let typeP = select('#type');
    let inputShape = select('#input_shape');
    let outputShape = select('#output_shape');
    let activation = select('#activation');
    let batchNormalization = select('#batchNormalization');

    nothingSelectedH2.elt.hidden = false;
    paragraphs.style.display = 'none';
    selectedH2.elt.hidden = true;
    typeP.elt.hidden = true;
    inputShape.elt.hidden = true;
    outputShape.elt.hidden = true;
    activation.elt.hidden = true;
    batchNormalization.elt.hidden = true;

    if (isTheEndOfBlock(dynamicValues.selectedLayerID) || isTheBeginningOfBlock(dynamicValues.selectedLayerID)) {
        let selectedLayer = layers[dynamicValues.selectedLayerID];
        nothingSelectedH2.elt.hidden = true;

        paragraphs.style.display = 'block';
        paragraphs.style.top = mouseY;
        paragraphs.style.left = mouseX;

        selectedH2.elt.hidden = false;
        typeP.elt.hidden = false;
        // TODO: remove id
        let blockName = dynamicValues.blocks[dynamicValues.blocks.findIndex(block => block.endLayer === selectedLayer.id)].name;
        blockName = blockName === "" ? "(Block without name.)" : blockName;
        selectedH2.html("Selected block: " + selectedLayer.id.toString() + " " + blockName);
        typeP.html("<b>Type:</b> Block");

        paragraphs.style.display = 'block';
        paragraphs.style.left = mouseX.toString() + 'px';
        let height = 0;
        if( mouseY - 7 - paragraphs.offsetHeight < 0 ){
            height = paragraphs.offsetHeight/2
        } else {
            height =  mouseY - 7 - paragraphs.offsetHeight/2;
        }
        paragraphs.style.top = (height).toString() + 'px';

    } else if (dynamicValues.selectedLayerID !== -1) {
        let selectedLayer = layers[dynamicValues.selectedLayerID];
        nothingSelectedH2.elt.hidden = true;

        selectedH2.elt.hidden = false;
        typeP.elt.hidden = false;
        inputShape.elt.hidden = false;
        outputShape.elt.hidden = false;
        // TODO: remove id
        selectedH2.html("Selected layer: " + selectedLayer.id.toString() + " " + selectedLayer.name);
        typeP.html("<b>Type:</b> " + selectedLayer.type);
        let index = 0;
        let inputText = "";
        for (let inShape of selectedLayer.inputShape[0]) {
            if (index === 0) {
                inputText += inShape;
            } else {
                inputText += ' X ' + inShape;
            }
            index += 1;
        }
        index = 0;
        let outputText = "";
        for (let outShape of selectedLayer.outputShape[0]) {
            if (index === 0) {
                outputText += outShape;
            } else {
                outputText += ' X ' + outShape;
            }
            index += 1;
        }

        inputShape.html("<b>Input shape:</b> " + inputText);

        outputShape.html("<b>Output shape:</b> " + outputText);
        if (selectedLayer.activation != null) {
            activation.elt.hidden = false;
            activation.html("<b>Activation:</b> " + selectedLayer.activation);
        }

        if (selectedLayer.batchNormalization != null) {
            batchNormalization.elt.hidden = false;
            batchNormalization.html("<b>Batch normalization filters:</b> " + selectedLayer.batchNormalization);
        }

        paragraphs.style.display = 'block';
        paragraphs.style.left = mouseX.toString() + 'px';

        let height = 0;
        if( mouseY - 7 - paragraphs.offsetHeight < 0 ){
            height = mouseY + 7 + paragraphs.offsetHeight/2;
            paragraphs.className = 'bubble-top';
        } else {
            height =  mouseY - 7 - paragraphs.offsetHeight/2;
            paragraphs.className = 'bubble-bottom';
        }
        paragraphs.style.top = height.toString() + 'px';
    }
}

function getAllPreviousLayers(layer, array) {
    let layers = [...layer.prevLayers];
    let layersReturn = [];

    while (layers.length !== 0) {
        let prevLayer = array[layers[0]];
        if (!layersReturn.includes(prevLayer.id))
            layersReturn.push(prevLayer.id);
        layers.splice(0, 1);
        if (prevLayer.prevLayers.length !== 0) {
            for (let l of prevLayer.prevLayers)
                if (!layers.includes(l))
                    layers.push(l);
        }
    }

    return layersReturn;
}

function getAllNextLayers(layer, array) {
    let layers = [...layer.nextLayers];
    let layersReturn = [];

    while (layers.length !== 0) {
        let nextLayer = array[layers[0]];
        if (!layersReturn.includes(nextLayer.id))
            layersReturn.push(nextLayer.id);
        layers.splice(0, 1);
        if (nextLayer.nextLayers.length !== 0) {
            for (let l of nextLayer.nextLayers)
                if (!layers.includes(l))
                    layers.push(l);
        }
    }

    return layersReturn;
}

function settingsBehaviour(){
    const saveSettingsButton = document.getElementById('saveSettings');
    const settingsCloseButton = document.getElementById('settingsCloseButton');
    const settingsPopup = document.getElementById('settingsPopup');

    settingsCloseButton.addEventListener('click', () => {
        settingsPopup.style.display = 'none';
    });

    saveSettingsButton.addEventListener('click', (event) => {
        event.preventDefault();
        updateValues();
        layersChanged = true;
    });

    const settingsColorsButton = document.getElementById('settingsColorsButton');
    const settingsColorsPopup = document.getElementById('settingsColorsPopup');
    settingsColorsButton.addEventListener('click', () => {
        settingsColorsPopup.style.display = 'block';
    });
}

function settingsColorsBehaviour(){
    const settingsColorsCloseButton = document.getElementById('settingsColorsCloseButton');
    const settingsColorsSaveButton = document.getElementById('settingsColorsSaveButton');
    const settingsColorsPopup = document.getElementById('settingsColorsPopup');

    settingsColorsCloseButton.addEventListener('click', () => {
        settingsColorsPopup.style.display = 'none';
    });

    settingsColorsSaveButton.addEventListener('click', (event) => {
        event.preventDefault();
        updateColors();
    });

    const resetDenseButton = document.getElementById('resetDense');
    resetDenseButton.addEventListener('click', (event) => {
        event.preventDefault();
        resetDense();
    });

    const resetFlattenButton = document.getElementById('resetFlatten');
    resetFlattenButton.addEventListener('click', (event) => {
        event.preventDefault();
        resetFlatten();
    });

    const resetDropoutButton = document.getElementById('resetDropout');
    resetDropoutButton.addEventListener('click', (event) => {
        event.preventDefault();
        resetDropout();
    });

    const resetInputButton = document.getElementById('resetInput');
    resetInputButton.addEventListener('click', (event) => {
        event.preventDefault();
        resetInput();
    });

    const resetConcatenateButton = document.getElementById('resetConcatenate');
    resetConcatenateButton.addEventListener('click', (event) => {
        event.preventDefault();
        resetConcatenate();
    });

    const resetAddButton = document.getElementById('resetAdd');
    resetAddButton.addEventListener('click', (event) => {
        event.preventDefault();
        resetAdd();
    });

    const resetLSTMButton = document.getElementById('resetLSTM');
    resetLSTMButton.addEventListener('click', (event) => {
        event.preventDefault();
        resetLSTM();
    });

    const resetGRUButton = document.getElementById('resetGRU');
    resetGRUButton.addEventListener('click', (event) => {
        event.preventDefault();
        resetGRU();
    });

    const resetSimpleRNNButton = document.getElementById('resetSimpleRNN');
    resetSimpleRNNButton.addEventListener('click', (event) => {
        event.preventDefault();
        resetSimpleRNN();
    });

    const resetTimeDistributedButton = document.getElementById('resetTimeDistributed');
    resetTimeDistributedButton.addEventListener('click', (event) => {
        event.preventDefault();
        resetTimeDistributed();
    });

    const resetBidirectionalButton = document.getElementById('resetBidirectional');
    resetBidirectionalButton.addEventListener('click', (event) => {
        event.preventDefault();
        resetBidiretional();
    });

    const resetBaseRNNButton = document.getElementById('resetBaseRNN');
    resetBaseRNNButton.addEventListener('click', (event) => {
        event.preventDefault();
        resetBaseRNN();
    });

    const resetConvLSTM1DButton = document.getElementById('resetConvLSTM1D');
    resetConvLSTM1DButton.addEventListener('click', (event) => {
        event.preventDefault();
        resetConvLSTM1D();
    });

    const resetConvLSTM2DButton = document.getElementById('resetConvLSTM2D');
    resetConvLSTM2DButton.addEventListener('click', (event) => {
        event.preventDefault();
        resetConvLSTM2D();
    });

    const resetConvLSTM3DButton = document.getElementById('resetConvLSTM3D');
    resetConvLSTM3DButton.addEventListener('click', (event) => {
        event.preventDefault();
        resetConvLSTM3D();
    });

    const resetConv1DButton = document.getElementById('resetConv1D');
    resetConv1DButton.addEventListener('click', (event) => {
        event.preventDefault();
        resetConv1D();
    });

    const resetConv2DButton = document.getElementById('resetConv2D');
    resetConv2DButton.addEventListener('click', (event) => {
        event.preventDefault();
        resetConv2D();
    });

    const resetConv3DButton = document.getElementById('resetConv3D');
    resetConv3DButton.addEventListener('click', (event) => {
        event.preventDefault();
        resetConv3D();
    });

    const resetMaxPooling1DButton = document.getElementById('resetMaxPooling1D');
    resetMaxPooling1DButton.addEventListener('click', (event) => {
        event.preventDefault();
        resetMaxPooling1D();
    });

    const resetMaxPooling2DButton = document.getElementById('resetMaxPooling2D');
    resetMaxPooling2DButton.addEventListener('click', (event) => {
        event.preventDefault();
        resetMaxPooling2D();
    });

    const resetMaxPooling3DButton = document.getElementById('resetMaxPooling3D');
    resetMaxPooling3DButton.addEventListener('click', (event) => {
        event.preventDefault();
        resetMaxPooling3D();
    });

    const resetAveragePooling1DButton = document.getElementById('resetAveragePooling1D');
    resetAveragePooling1DButton.addEventListener('click', (event) => {
        event.preventDefault();
        resetAveragePooling1D();
    });

    const resetAveragePooling2DButton = document.getElementById('resetAveragePooling2D');
    resetAveragePooling2DButton.addEventListener('click', (event) => {
        event.preventDefault();
        resetAveragePooling2D();
    });

    const resetAveragePooling3DButton = document.getElementById('resetAveragePooling3D');
    resetAveragePooling3DButton.addEventListener('click', (event) => {
        event.preventDefault();
        resetAveragePooling3D();
    });

    const resetGlobalMaxPooling1DButton = document.getElementById('resetGlobalMaxPooling1D');
    resetGlobalMaxPooling1DButton.addEventListener('click', (event) => {
        event.preventDefault();
        resetGlobalMaxPooling1D();
    });

    const resetGlobalMaxPooling2DButton = document.getElementById('resetGlobalMaxPooling2D');
    resetGlobalMaxPooling2DButton.addEventListener('click', (event) => {
        event.preventDefault();
        resetGlobalMaxPooling2D();
    });

    const resetGlobalMaxPooling3DButton = document.getElementById('resetGlobalMaxPooling3D');
    resetGlobalMaxPooling3DButton.addEventListener('click', (event) => {
        event.preventDefault();
        resetGlobalMaxPooling3D();
    });

    const resetGlobalAveragePooling1DButton = document.getElementById('resetGlobalAveragePooling1D');
    resetGlobalAveragePooling1DButton.addEventListener('click', (event) => {
        event.preventDefault();
        resetGlobalAveragePooling1D();
    });

    const resetGlobalAveragePooling2DButton = document.getElementById('resetGlobalAveragePooling2D');
    resetGlobalAveragePooling2DButton.addEventListener('click', (event) => {
        event.preventDefault();
        resetGlobalAveragePooling2D();
    });

    const resetGlobalAveragePooling3DButton = document.getElementById('resetGlobalAveragePooling3D');
    resetGlobalAveragePooling3DButton.addEventListener('click', (event) => {
        event.preventDefault();
        resetGlobalAveragePooling3D();
    });

    const resetReshapeButton = document.getElementById('resetReshape');
    resetReshapeButton.addEventListener('click', (event) => {
        event.preventDefault();
        resetReshape();
    });

    const resetDefaultButton = document.getElementById('resetDefault');
    resetDefaultButton.addEventListener('click', (event) => {
        event.preventDefault();
        resetDefault();
    });

    const resetBlockButton = document.getElementById('resetBlock');
    resetBlockButton.addEventListener('click', (event) => {
        event.preventDefault();
        resetBlock();
    });

    const resetSelectedButton = document.getElementById('resetSelected');
    resetSelectedButton.addEventListener('click', (event) => {
        event.preventDefault();
        resetSelected();
    });
}

function allConvSameColor(){
    const allConvSameColor = document.getElementById('s1-15');
    const colorsConv = document.getElementById('colorsConv');
    const conv1DLabel = document.getElementById('Conv1DLabel');
    const conv2DColor = document.getElementById('ConvColor2');
    const conv3DColor = document.getElementById('ConvColor3');

    if(allConvSameColor.checked) {
        colorsConv.style.justifyContent='center';
        conv1DLabel.style.display = 'none';
        conv2DColor.style.display = 'none';
        conv3DColor.style.display = 'none';

    } else {
        colorsConv.style.justifyContent='space-between';
        conv1DLabel.style.display = 'inline-block';
        conv2DColor.style.display = 'inline-block';
        conv3DColor.style.display = 'inline-block';
    }
}

function allConvLSTMSameColor(){
    const allConvLSTMSameColor = document.getElementById('s1-14');
    const colorsConvLSTM = document.getElementById('colorsConvLSTM');
    const convLSTM1DLabel = document.getElementById('ConvLSTM1DLabel');
    const convLSTM2DColor = document.getElementById('ConvLSTMColor2');
    const convLSTM3DColor = document.getElementById('ConvLSTMColor3');

    if(allConvLSTMSameColor.checked) {
        colorsConvLSTM.style.justifyContent='center';
        convLSTM1DLabel.style.display = 'none';
        convLSTM2DColor.style.display = 'none';
        convLSTM3DColor.style.display = 'none';

    } else {
        colorsConvLSTM.style.justifyContent='space-between';
        convLSTM1DLabel.style.display = 'inline-block';
        convLSTM2DColor.style.display = 'inline-block';
        convLSTM3DColor.style.display = 'inline-block';
    }
}

function allMaxPoolingSameColor(){
    const allMaxPoolingSameColor = document.getElementById('s1-16');
    const colorsMaxPooling = document.getElementById('colorsMaxPooling');
    const maxPooling1DLabel = document.getElementById('MaxPooling1DLabel');
    const maxPooling2DColor = document.getElementById('MaxPoolingColor2');
    const maxPooling3DColor = document.getElementById('MaxPoolingColor3');

    if(allMaxPoolingSameColor.checked) {
        colorsMaxPooling.style.justifyContent='center';
        maxPooling1DLabel.style.display = 'none';
        maxPooling2DColor.style.display = 'none';
        maxPooling3DColor.style.display = 'none';

    } else {
        colorsMaxPooling.style.justifyContent='space-between';
        maxPooling1DLabel.style.display = 'inline-block';
        maxPooling2DColor.style.display = 'inline-block';
        maxPooling3DColor.style.display = 'inline-block';
    }
}

function allAveragePoolingSameColor(){
    const allAveragePoolingSameColor = document.getElementById('s1-17');
    const colorsAveragePooling = document.getElementById('colorsAveragePooling');
    const averagePooling1DLabel = document.getElementById('AveragePooling1DLabel');
    const averagePooling2DColor = document.getElementById('AveragePoolingColor2');
    const averagePooling3DColor = document.getElementById('AveragePoolingColor3');

    if(allAveragePoolingSameColor.checked) {
        colorsAveragePooling.style.justifyContent='center';
        averagePooling1DLabel.style.display = 'none';
        averagePooling2DColor.style.display = 'none';
        averagePooling3DColor.style.display = 'none';

    } else {
        colorsAveragePooling.style.justifyContent='space-between';
        averagePooling1DLabel.style.display = 'inline-block';
        averagePooling2DColor.style.display = 'inline-block';
        averagePooling3DColor.style.display = 'inline-block';
    }
}

function allGlobalMaxPoolingSameColor(){
    const allGlobalMaxPoolingSameColor = document.getElementById('s1-18');
    const colorsGlobalMaxPooling = document.getElementById('colorsGlobalMaxPooling');
    const globalMaxPooling1DLabel = document.getElementById('GlobalMaxPooling1DLabel');
    const globalMaxPooling2DColor = document.getElementById('GlobalMaxPoolingColor2');
    const globalMaxPooling3DColor = document.getElementById('GlobalMaxPoolingColor3');

    if(allGlobalMaxPoolingSameColor.checked) {
        colorsGlobalMaxPooling.style.justifyContent='center';
        globalMaxPooling1DLabel.style.display = 'none';
        globalMaxPooling2DColor.style.display = 'none';
        globalMaxPooling3DColor.style.display = 'none';

    } else {
        colorsGlobalMaxPooling.style.justifyContent='space-between';
        globalMaxPooling1DLabel.style.display = 'inline-block';
        globalMaxPooling2DColor.style.display = 'inline-block';
        globalMaxPooling3DColor.style.display = 'inline-block';
    }
}

function allGlobalAveragePoolingSameColor(){
    const allGlobalAveragePoolingSameColor = document.getElementById('s1-19');
    const colorsGlobalAveragePooling = document.getElementById('colorsGlobalAveragePooling');
    const globalAveragePooling1DLabel = document.getElementById('GlobalAveragePooling1DLabel');
    const globalAveragePooling2DColor = document.getElementById('GlobalAveragePoolingColor2');
    const globalAveragePooling3DColor = document.getElementById('GlobalAveragePoolingColor3');

    if(allGlobalAveragePoolingSameColor.checked) {
        colorsGlobalAveragePooling.style.justifyContent='center';
        globalAveragePooling1DLabel.style.display = 'none';
        globalAveragePooling2DColor.style.display = 'none';
        globalAveragePooling3DColor.style.display = 'none';

    } else {
        colorsGlobalAveragePooling.style.justifyContent='space-between';
        globalAveragePooling1DLabel.style.display = 'inline-block';
        globalAveragePooling2DColor.style.display = 'inline-block';
        globalAveragePooling3DColor.style.display = 'inline-block';
    }
}

function buttonsBehaviour(){
    const settingsButton = document.getElementById('settingsButton');
    const settingsPopup = document.getElementById('settingsPopup');


    const fileInput = document.getElementById('model-file');
    const fileNameLabel = document.getElementById('modelFileLabel');

    settingsButton.addEventListener('click', () => {
        settingsPopup.style.display = 'block';
    });

    fileInput.addEventListener('change', () => {
        const fileName = fileInput.files[0].name;
        const labelText = fileNameLabel.textContent;
        fileNameLabel.innerHTML = `<b>${fileName}</b>`;
    });

    settingsBehaviour();
    settingsColorsBehaviour();
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function equalsCheck(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}