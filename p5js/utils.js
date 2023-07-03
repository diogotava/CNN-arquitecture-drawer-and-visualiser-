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

function buttonsBehaviour(){
    const uploadForm = document.getElementById('upload-form');
    const uploadSettingsFileButton = document.getElementById('buttonUploadSettingsFile');

    uploadForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const loader = document.getElementById("loader");
        loader.style.display = 'block';

        const fileInput = document.getElementById("model-file");
        const file = fileInput.files[0];

        const formData = new FormData();
        formData.append("model-file", file);

        fetch("http://127.0.0.1:5000/process", {
            method: "POST",
            body: formData
        }).then(response => response.json())  // parse response as JSON
            .then(data => {
                // handle the JSON response here
                layers = [];
                for (let jsonLayer of data) {
                    let layer = new Layer(jsonLayer)
                    layers.push(layer)
                }
                layers_backup = layers.map(obj => obj.copy());
                layersChanged = true;
                loader.style.display = 'none';
            })
            .catch(error => {
                loader.style.display = 'none';
                alert("Was not possible to load the model selected!")
                console.error(error);
            });
        // resetDynamicValues();
    });

    uploadSettingsFileButton.addEventListener('click', (event) => {
        event.preventDefault();
        const fileSettings = document.getElementById("settings-file");
        const file = fileSettings.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', (loadEvent) => {
            const fileContent = loadEvent.target.result;
            const jsonData = JSON.parse(fileContent);

            // Do something with the JSON data
            parseSettingsJson(jsonData);
        });

        reader.readAsText(file);

    });

    const settingsButton = document.getElementById('settingsButton');
    const settingsPopup = document.getElementById('settingsPopup');

    settingsButton.addEventListener('click', () => {
        settingsPopup.style.display = 'block';
    });

    const exportImageButton = document.getElementById('exportImage');

    exportImageButton.addEventListener('click', () => {
        saveCanvas('myCanvas', 'png');
    })

    const fileInput = document.getElementById('model-file');
    const fileNameLabel = document.getElementById('modelFileLabel');

    fileInput.addEventListener('change', () => {
        const fileName = fileInput.files[0].name;
        fileNameLabel.innerHTML = `<b>${fileName}</b>`;
    });

    const settingsFile = document.getElementById('settings-file');
    const settingsFileLabel = document.getElementById('settingsFileLabel');

    settingsFile.addEventListener('change', () => {
        const fileName = settingsFile.files[0].name;
        settingsFileLabel.innerHTML = `<b>${fileName}</b>`;
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

function parseSettingsJson(data){
    try{

    }catch (e){
        alert("ERROR! Settings File does not have the correct format.")
    }
}