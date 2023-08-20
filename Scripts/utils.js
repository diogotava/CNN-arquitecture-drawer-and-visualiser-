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
    let layerInfo = document.getElementById("layerInfo");
    let selectedH2 = select('#selected_h2');
    let typeP = select('#type');
    let inputShape = select('#input_shape');
    let outputShape = select('#output_shape');
    let activation = select('#activation');
    let batchNormalization = select('#batchNormalization');

    nothingSelectedH2.elt.hidden = false;
    layerInfo.style.display = 'none';
    selectedH2.elt.hidden = true;
    typeP.elt.hidden = true;
    inputShape.elt.hidden = true;
    outputShape.elt.hidden = true;
    activation.elt.hidden = true;
    batchNormalization.elt.hidden = true;

    let layer_id_for_position = -1
    if (isTheEndOfBlock(dynamicValues.selectedLayerID)) {
        let selectedLayer = layers[dynamicValues.selectedLayerID];
        nothingSelectedH2.elt.hidden = true;

        selectedH2.elt.hidden = false;
        typeP.elt.hidden = false;
        // TODO: remove id
        let blockName = dynamicValues.blocks[dynamicValues.blocks.findIndex(block => block.endLayer === selectedLayer.id)].getName();
        blockName = blockName === "" ? "(Block without name.)" : blockName;
        selectedH2.html("Selected block: " + selectedLayer.id.toString() + " " + blockName);
        typeP.html("<b>Type:</b> Block");

        layerInfo.style.display = 'block';
        layer_id_for_position = selectedLayer.id - 1

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

        layerInfo.style.display = 'block';
        layer_id_for_position = selectedLayer.id;

    }
    if (layer_id_for_position !== -1)
        dynamicValues.paragraphsWorldCoord = convertScreenTo3D(layer_id_for_position);
}

function updateShownLayerInformation() {
    let screenCoordinates = convert3DToScreen(dynamicValues.paragraphsWorldCoords);
    let layerInfo = document.getElementById("layerInfo");
    layerInfo.style.left = screenCoordinates.x.toString() + 'px';

    let distanceFromTop;
    if (screenCoordinates.y - 7 - layerInfo.offsetHeight < 0) {
        distanceFromTop = screenCoordinates.y + 7 + layerInfo.offsetHeight / 2;
        layerInfo.className = 'bubble-top';
    } else {
        distanceFromTop = screenCoordinates.y - 7 - layerInfo.offsetHeight / 2;
        layerInfo.className = 'bubble-bottom';
    }
    layerInfo.style.top = distanceFromTop.toString() + 'px';
}
function projectionMatrix() {
    // Create a perspective projection matrix
    const fov = PI / 3;  // Field of view in radians
    const aspect = width / height;  // Aspect ratio
    const near = 10;  // Near clipping plane
    const far = 10000;  // Far clipping plane

    const projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, fov, aspect, near, far);
    // Invert the y-coordinate in the projection matrix because webgl has y upwards and screen has y downwards
    projectionMatrix[5] *= -1;// Modify the value at index 5 (which corresponds to element [1][1] in the matrix)
    return projectionMatrix;
}

function viewMatrix() {
    const cameraPosition = [dynamicValues.camX, dynamicValues.camY, dynamicValues.camZ];
    const target = [dynamicValues.lookX, dynamicValues.lookY, dynamicValues.lookZ];
    const up = [0, 1, 0];

    // Create a view matrix
    const viewMatrix = mat4.create();
    mat4.lookAt(viewMatrix, cameraPosition, target, up);
    return viewMatrix;
}

function convertScreenTo3D(layer_id_for_position) {
    let worldCoords = [0, 0, 0];
    if (layer_id_for_position >= 0)
        worldCoords = layers[layer_id_for_position].centerPosition;
    return { x: worldCoords[0], y: worldCoords[1], z: worldCoords[2] };
}

function convert3DToScreen(worldCoordinates) {
    // Use the view and projection matrices to project 3D coordinates to NDC
    const worldToClipMatrix = mat4.create();
    mat4.multiply(worldToClipMatrix, projectionMatrix(), viewMatrix());
    // mat4.multiply(worldToClipMatrix, worldToClipMatrix, modelMatrix);

    const clipPoint = vec4.create();
    vec4.transformMat4(clipPoint, [worldCoordinates.x, worldCoordinates.y, worldCoordinates.z, 1], worldToClipMatrix);

    // Convert clip space coordinates to NDC
    const ndcX = clipPoint[0] / clipPoint[3];
    const ndcY = clipPoint[1] / clipPoint[3];

    // Convert NDC to screen coordinates
    const screenX = (ndcX + 1) * width / 2;
    const screenY = (1 - ndcY) * height / 2;

    return { x: screenX, y: screenY };
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
    let models_beginning_layer = [];
    for (let index = 0; index < layers.length; index++) {
        if (layers[index].model_inside_model && !layers[index].prevLayers.some((elem) => layers[elem].model_inside_model && layers[elem].model_name === layers[index].model_name)) {
            models_beginning_layer.push(layers[index]);
        }
    }
    if (models_beginning_layer.length === 0)
        return;
    for (layer of models_beginning_layer) {
        layer.shouldBeBlock = true;
        for (let i = layer.id + 1; i < layers.length; i++) {
            if (layers[i].model_name !== layer.model_name || i === layers.length - 1) {
                let block = new Block(layer.id, layers[i].id);
                block.setName(layer.model_name);

                if (!dynamicValues.blocks.some(obj => obj.isEqual(block))) {
                    dynamicValues.blocks.push(block);
                }
                break;
            } else {
                layers[i].shouldBeDrawn = false;
                layers[i].isInsideBlock = true;
            }
        }
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
                dynamicValues.blocks = [];

                dynamicValues.selectedLayerID = -1;

                selectedText()

                for (let jsonLayer of data) {
                    let layer = new Layer(jsonLayer)

                    layers.push(layer)
                }
                layers_backup = layers.map(obj => obj.copy());

                model_inside_model(layers);

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
        saveFrames('myCanvas', 'png', 1, 1, () => {
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
        if (!colors.hasOwnProperty(layer.type) && !(layer.isInsideBlock || layer.shouldBeBlock))
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
    let hex = c.toString(16);
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
        for (color of data.colors) {
            dynamicValues.colors[Object.keys(color)[0]] = color[Object.keys(color)[0]];
        }
        dynamicValues.arrowWidth = data.arrowWidth;
        dynamicValues.arrowHeight = data.arrowHeight;
        dynamicValues.arrowPointRadius = data.arrowPointRadius;
        dynamicValues.sensitivityX = data.sensitivityX;
        dynamicValues.sensitivityY = data.sensitivityY;
        dynamicValues.sensitivityZ = data.sensitivityZ;
        dynamicValues.minX = data.minX;
        dynamicValues.minZY = data.minZY;
        dynamicValues.maxX = data.maxX;
        dynamicValues.maxZY = data.maxZY;
        dynamicValues.defaultSpaceBetweenLayers = data.defaultSpaceBetweenLayers;
        dynamicValues.defaultLateralSpaceBetweenLayers = data.defaultLateralSpaceBetweenLayers;
        dynamicValues.blockSize = data.blockSize;

        updateShownValues();
        dynamicValues.blocks = []
        layers = layers_backup.map(obj => obj.copy());
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