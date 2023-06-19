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

function getBlock() {
    let layerId = getLayerId();
    if (layerId !== -1) {
        let isEndBlock = isTheEndOfBlock(layerId);
        if (dynamicValues.bPressed) {
            if (isLayerPossibleToBeInBlock(layerId, block[0], false)) {
                if (layerId < block[0]) {
                    block[1] = block[0];
                    block[0] = layerId;
                } else
                    block[1] = layerId;

                if (!dynamicValues.blocks.includes(block))
                    dynamicValues.blocks.push(block);
                if(confirm("End of block selected!\nDo you want to name the block?")) {
                    let nameOfBlock = prompt("Please enter the block name!", "");
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
            let indexOfBlock = dynamicValues.blocks.findIndex(block => block[1] === layerId);
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
        getBlock();
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
    let selectedH2 = select('#selected_h2');
    let typeP = select('#type');
    let inputShape = select('#input_shape');
    let outputShape = select('#output_shape');
    let activation = select('#activation');
    let batchNormalization = select('#batchNormalization');

    nothingSelectedH2.elt.hidden = false;
    selectedH2.elt.hidden = true;
    typeP.elt.hidden = true;
    inputShape.elt.hidden = true;
    outputShape.elt.hidden = true;
    activation.elt.hidden = true;
    batchNormalization.elt.hidden = true;

    if (dynamicValues.selectedLayerID !== -1) {
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

function resetData(){
    layers = layers_backup.map(obj => obj.copy());
    resetDynamicValues();
    layersChanged = true;
}