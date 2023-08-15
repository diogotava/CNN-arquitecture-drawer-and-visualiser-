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
    let pixels = mPage.get(mouseX, mouseY);

    return (pixels[0] << 16 | pixels[1] << 8 | pixels[2]) - 1;
}

function selectBlock() {
    let layerId = getLayerId();
    if (layerId !== -1) {
        if (dynamicValues.bPressed) {
            if (isLayerPossibleToBeInBlock(layerId, block[0], false)) {
                block = new Block(block[0], layerId);

                if (!dynamicValues.blocks.some(obj => obj.isEqual(block))) {
                    let blockPopup = document.getElementById("blockPopup");
                    blockPopup.style.display = 'block';
                } else {
                    alert("ERROR: It's not possible to select this layer as end of block!")
                }
            } else {
                alert("ERROR: It's not possible to select this layer as end of block!");
                block = [];
            }
            dynamicValues.bPressed = false;
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
            layers[dynamicValues.blocks[indexOfBlock].initialLayer].shouldBeBlock = false;
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
        let blockName = dynamicValues.blocks[dynamicValues.blocks.findIndex(block => block.endLayer === selectedLayer.id)].getName();
        blockName = blockName === "" ? "(Block without name.)" : blockName;
        selectedH2.html("Selected block: " + selectedLayer.id.toString() + " " + blockName);
        typeP.html("<b>Type:</b> Block");

        paragraphs.style.display = 'block';
        paragraphs.style.left = mouseX.toString() + 'px';
        let height = 0;
        if (mouseY - 7 - paragraphs.offsetHeight < 0) {
            height = paragraphs.offsetHeight / 2
        } else {
            height = mouseY - 7 - paragraphs.offsetHeight / 2;
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
        if (mouseY - 7 - paragraphs.offsetHeight < 0) {
            height = mouseY + 7 + paragraphs.offsetHeight / 2;
            paragraphs.className = 'bubble-top';
        } else {
            height = mouseY - 7 - paragraphs.offsetHeight / 2;
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

function settingsBehaviour() {
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

function model_inside_model(layers) {
    let layer;
    for (let index = 0; index < layers.length; index++) {
        if (layers[index].model_inside_model && !layers[index].prevLayers.some((elem) => layers[elem].model_inside_model)) {
            layer = layers[index];
            break;
        }
    }
    if (layer == null)
        return;
    layer.shouldBeBlock = true;
    for (let i = layer.id; i < layers.length; i++) {
        if (!layers[i].model_inside_model) {
            let block = new Block(layer.id, layers[i - 1].id);
            block.setName(layer.model_name);

            if (!dynamicValues.blocks.some(obj => obj.isEqual(block))) {
                dynamicValues.blocks.push(block);
            }
            return;
        } else
            layers[i].shouldBeDrawn = false;
    }
}
function buttonsBehaviour() {
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

                model_inside_model(layers);

                layers_backup = layers.map(obj => obj.copy());
                layersChanged = true;
                loader.style.display = 'none';
            })
            .catch(error => {
                loader.style.display = 'none';
                alert("Was not possible to load the model selected!")
                console.error(error);
            });
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
    const saveBlockButton = document.getElementById('saveBlock');
    const cancelBlockButton = document.getElementById('cancelBlock');
    const blockPopup = document.getElementById('blockPopup');
    saveBlockButton.addEventListener('click', () => {
        block.setName(document.getElementById('blockName').value);
        let color = document.getElementById('blockColor').value;
        block.setColor([parseInt(color.substring(1, 3), 16), parseInt(color.substring(3, 5), 16), parseInt(color.substring(5, 7), 16)]);
        dynamicValues.blocks.push(block);
        layersChanged = true;
        block = [];
        blockPopup.style.display = 'none';
    });
    cancelBlockButton.addEventListener('click', () => {
        block = [];
        blockPopup.style.display = 'none';
    });

    const settingsButton = document.getElementById('settingsButton');
    const settingsPopup = document.getElementById('settingsPopup');

    settingsButton.addEventListener('click', () => {
        settingsPopup.style.display = 'block';
    });

    const exportImageButton = document.getElementById('exportImage');

    exportImageButton.addEventListener('click', () => {
        saveFrames('myCanvas', 'png', 1, 1, data => {
            let jsonData = getLayerColors();
            const dataURL = drawingContext.canvas.toDataURL('image/png');

            const formData = new FormData();
            formData.append('image', dataURL);
            formData.append('json', JSON.stringify(jsonData))

            fetch("http://127.0.0.1:5000/process_image", {
                method: "POST",
                body: formData
            }).then(response => response.json())  // parse response as JSON
                .then(data => {
                    // handle the JSON response here
                    const downloadLink = document.createElement('a');
                    downloadLink.href = 'data:image/png;base64,' + data.image;
                    downloadLink.download = 'network.png';
                    downloadLink.textContent = 'Network image';

                    downloadLink.click();
                })
                .catch(error => {
                    loader.style.display = 'none';
                    alert("Was not possible to generate the image!")
                    console.error(error);
                });
        });
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

function getLayerColors() {
    let colors = {};
    for (layer of layers)
        if (!colors.hasOwnProperty(layer.type))
            if (dynamicValues.colors[layer.type])
                colors[layer.type] = dynamicValues.colors[layer.type];
            else
                colors[layer.type] = dynamicValues.colors["Default"];
    for (block of dynamicValues.blocks) {
        if (!color.hasOwnProperty(block.name))
            colors[block.name] = block.color;
    }

    return colors;
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

function parseSettingsJson(data) {
    try {
        dynamicValues.camX = !isNaN(data.camX) ? data.camX : 0;
        dynamicValues.camY = !isNaN(data.camY) ? data.camY : 0;
        dynamicValues.camZ = !isNaN(data.camZ) ? data.camZ : 0;
        dynamicValues.lookX = !isNaN(data.lookX) ? data.lookX : 0;
        dynamicValues.lookY = !isNaN(data.lookY) ? data.lookY : 0;
        dynamicValues.lookZ = !isNaN(data.lookZ) ? data.lookZ : 0;
        dynamicValues.colors.Conv1D = data.colors.Conv1D;
        dynamicValues.colors.Conv2D = data.colors.Conv2D;
        dynamicValues.colors.Conv3D = data.colors.Conv3D;
        dynamicValues.colors.Dense = data.colors.Dense;
        dynamicValues.colors.Flatten = data.colors.Flatten;
        dynamicValues.colors.Dropout = data.colors.Dropout;
        dynamicValues.colors.InputLayer = data.colors.InputLayer;
        dynamicValues.colors.Concatenate = data.colors.Concatenate;
        dynamicValues.colors.Add = data.colors.Add;
        dynamicValues.colors.LSTM = data.colors.LSTM;
        dynamicValues.colors.GRU = data.colors.GRU;
        dynamicValues.colors.SimpleRNN = data.colors.SimpleRNN;
        dynamicValues.colors.TimeDistributed = data.colors.TimeDistributed;
        dynamicValues.colors.Bidirectional = data.colors.Bidirectional;
        dynamicValues.colors.ConvLSTM1D = data.colors.ConvLSTM1D;
        dynamicValues.colors.ConvLSTM2D = data.colors.ConvLSTM2D;
        dynamicValues.colors.ConvLSTM3D = data.colors.ConvLSTM3D;
        dynamicValues.colors.BaseRNN = data.colors.BaseRNN;
        dynamicValues.colors.MaxPooling1D = data.colors.MaxPooling1D;
        dynamicValues.colors.MaxPooling2D = data.colors.MaxPooling2D;
        dynamicValues.colors.MaxPooling3D = data.colors.MaxPooling3D;
        dynamicValues.colors.AveragePooling1D = data.colors.AveragePooling1D;
        dynamicValues.colors.AveragePooling2D = data.colors.AveragePooling2D;
        dynamicValues.colors.AveragePooling3D = data.colors.AveragePooling3D;
        dynamicValues.colors.GlobalMaxPooling1D = data.colors.GlobalMaxPooling1D;
        dynamicValues.colors.GlobalMaxPooling2D = data.colors.GlobalMaxPooling2D;
        dynamicValues.colors.GlobalMaxPooling3D = data.colors.GlobalMaxPooling3D;
        dynamicValues.colors.GlobalAveragePooling1D = data.colors.GlobalAveragePooling1D;
        dynamicValues.colors.GlobalAveragePooling2D = data.colors.GlobalAveragePooling2D;
        dynamicValues.colors.GlobalAveragePooling3D = data.colors.GlobalAveragePooling3D;
        dynamicValues.colors.Reshape = data.colors.Reshape;
        dynamicValues.colors.Default = data.colors.Default;
        dynamicValues.colors.Block = data.colors.Block;
        dynamicValues.colors.Selected = data.colors.Selected;
        dynamicValues.arrowWidth = data.arrowWidth;
        dynamicValues.arrowHeight = data.arrowHeight;
        dynamicValues.arrowPointRadius = data.arrowPointRadius;
        dynamicValues.sensitivityX = data.sensitivityX;
        dynamicValues.sensitivityY = data.sensitivityY;
        dynamicValues.sensitivityZ = data.sensitivityZ;
        dynamicValues.defaultSpaceBetweenLayers = data.defaultSpaceBetweenLayers;
        dynamicValues.defaultLateralSpaceBetweenLayers = data.defaultLateralSpaceBetweenLayers;
        dynamicValues.blockSize = data.blockSize;

        updateShownValues();
        for (let i = 0; i < data.blocks.length; i++) {
            let blockData = data.blocks[i];
            let initialLayer = layers.find(item => item.name === blockData.initialLayerName);
            let endLayer = layers.find(item => item.name === blockData.endLayerName);
            if (initialLayer === undefined || endLayer === undefined) {
                continue;
            }
            let blockName = blockData.name;
            let blockColor = blockData.color;

            if (!isLayerPossibleToBeInBlock(initialLayer.id) || !isLayerPossibleToBeInBlock(endLayer.id, initialLayer.id, false)) {
                continue;
            }

            let block = new Block(initialLayer.id, endLayer.id);
            block.setName(blockName);
            block.setColor(blockColor);

            if (!dynamicValues.blocks.some(obj => obj.isEqual(block))) {
                dynamicValues.blocks.push(block);
            }

            layersChanged = true;
        }

    } catch (e) {
        alert("ERROR! Settings File does not have the correct format.")
    }
}