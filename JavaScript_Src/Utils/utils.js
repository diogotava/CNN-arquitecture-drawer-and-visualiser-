let block = [];

function findCommonElement(array1, array2) {
    let resultArray = [];
    // Loop for array1
    for (let i = 0; i < array1.length; i++) {

        // Loop for array2
        for (let j = 0; j < array2.length; j++) {

            // Compare the element of each and
            // every element from both of the
            // arrays
            if (array1[i] === array2[j]) {

                // add if common element found
                resultArray.push(array1[i]);
            }
        }
    }

    return resultArray;
}

function isLayerPossibleToBeInBlock(layerId, otherLayerId = -1, beginningLayer = true) {
    if (layerId === -1) return false;

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
        if (dynamicValues.selectedLayerID !== -1 && dynamicValues.selectedLayerID < dynamicValues.initialBlockId)
            layers[dynamicValues.selectedLayerID].selected = false;
        if (id < dynamicValues.initialBlockId)
            layers[id].selected = true;
        dynamicValues.selectedLayerID = id;
    } else {
        if (dynamicValues.selectedLayerID !== -1 && dynamicValues.selectedLayerID < dynamicValues.initialBlockId)
            layers[dynamicValues.selectedLayerID].selected = false;
        dynamicValues.selectedLayerID = -1;
    }
    selectedText();
}

function selectBlock() {
    let layerId = getLayerId();

    if (layerId === -1) {
        if (dynamicValues.bPressed) {
            alert("Block rested!");
            dynamicValues.bPressed = false;
            block = [];
        }
        return
    }

    if (dynamicValues.bPressed) {
        if (layerId >= dynamicValues.initialBlockId && otherLayerId !== -1)
            layerId = getBlock(layerId).initialLayer;
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
        if (layerId >= dynamicValues.initialBlockId)
            layerId = getBlock(layerId).endLayer;
        if (isLayerPossibleToBeInBlock(layerId)) {
            block[0] = layerId;
            alert('Begin of block selected!');
            dynamicValues.bPressed = true;
        } else {
            alert("ERROR: It's not possible to select this layer as end of block!");
        }
    }

}

function removeBlock() {
    let layerId = getLayerId();

    if (layerId === -1) return

    let isEndBlock = isTheEndOfBlock(layerId);
    let isBeginBlock = isTheBeginningOfBlock(layerId);
    let indexOfBlock = -1;
    if (isEndBlock) {
        indexOfBlock = dynamicValues.blocks.findIndex(block => block.endLayer === layerId);

    } else if (isBeginBlock) {
        indexOfBlock = dynamicValues.blocks.findIndex(block => block.initialLayer === layerId);

    } else if (layerId >= dynamicValues.initialBlockId) {
        indexOfBlock = dynamicValues.blocks.findIndex(block => block.initialLayer === layerId - dynamicValues.initialBlockId);

    } else {
        alert("ERROR: Layer selected is not a block!");
        return;
    }

    layers[dynamicValues.blocks[indexOfBlock].initialLayer].shouldBeBlock = false;
    dynamicValues.blocks.splice(indexOfBlock, 1);
    alert("Block removed!");
    layersChanged = true;

}

function openBlock() {
    let layerId = getLayerId();

    if (layerId === -1) return

    let isEndBlock = isTheEndOfBlock(layerId);
    let isBeginBlock = isTheBeginningOfBlock(layerId);
    let indexOfBlock;
    if (isEndBlock && isBeginBlock) {
        alert("ERROR: Layer selected is in 2 blocks select the block pretended!")
        return
    }

    if (isEndBlock) {
        indexOfBlock = dynamicValues.blocks.findIndex(block => block.endLayer === layerId);

    } else if (isBeginBlock) {
        indexOfBlock = dynamicValues.blocks.findIndex(block => block.initialLayer === layerId);

    } else if (layerId >= dynamicValues.initialBlockId) {
        indexOfBlock = dynamicValues.blocks.findIndex(block => block.initialLayer === layerId - dynamicValues.initialBlockId);

    } else {
        alert("ERROR: Layer selected is not a block!")
    }

    dynamicValues.blocks[indexOfBlock].drawInterior = !dynamicValues.blocks[indexOfBlock].drawInterior;
    layersChanged = true;
}

function keyPressed() {
    if (document.getElementById('blockPopup').style.display === "block")
        return
    if (keyIsDown(67)) { // C
        selectLayer();
    } else if (keyIsDown(66)) { //b
        selectBlock();
    } else if (keyIsDown(82)) { //r
        removeBlock();
    } else if (keyIsDown(86)) { //v
        openBlock();
    }
}

function mousePressed() {
    if (mouseButton === CENTER) {
        selectLayer();
    }
}

function getShapeText(shape) {
    let index = 0;
    let shapeText = "";
    for (let inShape of shape) {
        if (index === 0) {
            shapeText += inShape;
        } else {
            shapeText += ' X ' + inShape;
        }
        index += 1;
    }
    return shapeText;
}

function selectedText() {
    let nothingSelectedH2 = select('#nothing_selected_h2');
    let layerInfo = document.getElementById("layerInfo");
    let selectedH2 = select('#selected_h2');
    let typeP = select('#type');
    let inputShape = select('#input_shape');
    let outputShape = select('#output_shape');
    let kernelSize = select('#kernel_size');
    let activation = select('#activation');
    let batchNormalization = select('#batchNormalization');

    nothingSelectedH2.elt.hidden = false;
    layerInfo.style.display = 'none';
    selectedH2.elt.hidden = true;
    typeP.elt.hidden = true;
    inputShape.elt.hidden = true;
    outputShape.elt.hidden = true;
    kernelSize.elt.hidden = true;
    activation.elt.hidden = true;
    batchNormalization.elt.hidden = true;

    let isSelectedLayerBlock = dynamicValues.selectedLayerID >= dynamicValues.initialBlockId;

    if (isSelectedLayerBlock) {
        let selectedLayer = layers[dynamicValues.selectedLayerID - dynamicValues.initialBlockId];

        let block = dynamicValues.blocks[dynamicValues.blocks.findIndex(block => block.initialLayer === selectedLayer.id)];
        let initialBlockLayer = layers[block.initialLayer];
        nothingSelectedH2.elt.hidden = true;

        selectedH2.elt.hidden = false;
        typeP.elt.hidden = false;
        // TODO: remove id
        let blockName = block.getName();
        blockName = blockName === "" ? "(Block without name.)" : blockName;
        selectedH2.html("Selected block: " + selectedLayer.id.toString() + " " + blockName);
        typeP.html("<b>Type:</b> Block");

        layerInfo.style.display = 'block';

        dynamicValues.paragraphsWorldCoords = isSelectedLayerBlock && block.drawInterior ? { x: block.centerX, y: 0, z: 0 } : convertScreenTo3D(initialBlockLayer.id);

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

        let inputText = getShapeText(selectedLayer.inputShape[0]);
        let outputText = getShapeText(selectedLayer.outputShape[0]);

        inputShape.html("<b>Input shape:</b> " + inputText);

        outputShape.html("<b>Output shape:</b> " + outputText);

        if (selectedLayer.kernel_size !== null) {
            kernelSize.elt.hidden = false;
            kernelSize.html("<b>Kernel size:</b> " + getShapeText(selectedLayer.kernel_size));
        }
        if (selectedLayer.activation !== null) {
            activation.elt.hidden = false;
            activation.html("<b>Activation:</b> " + selectedLayer.activation);
        }

        if (selectedLayer.batchNormalizationFilters != null) {
            batchNormalization.elt.hidden = false;
            batchNormalization.html("<b>Batch normalization filters:</b> " + selectedLayer.batchNormalizationFilters);
        }

        layerInfo.style.display = 'block';

        dynamicValues.paragraphsWorldCoords = convertScreenTo3D(selectedLayer.id);
    }
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

function convertScreenTo3D(layerIdForPosition) {
    let worldCoords = [0, 0, 0];
    if (layerIdForPosition >= 0)
        worldCoords = layers[layerIdForPosition].centerPosition;
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

function getLayerColors(layersToVerify = layers) {
    let colors = {};
    for (layer of layersToVerify)
        if (!colors.hasOwnProperty(layer.type) && !(layer.isInsideBlock || layer.shouldBeBlock))
            colors[layer.type] = dynamicValues.colors[layer.type] ? dynamicValues.colors[layer.type] : dynamicValues.colors["Default"];

    if (layersToVerify != layers)
        return colors;
    for (block of dynamicValues.blocks) {
        if (!color.hasOwnProperty(block.type))
            colors[block.type] = block.color;
    }

    return colors;
}

function getLayerInformations(layersToVerify = layers) {
    let layersInfo = [];
    let blocksAdded = [];
    for (layer of layersToVerify) {
        if (!(layer.isInsideBlock || layer.shouldBeBlock))
            layersInfo.push(JSON.parse(JSON.stringify(layer, (key, value) => {
                if (value === null)
                    return undefined;
                if (key === 'invertedShape' || key === 'lastNegativeYPosition' || key === 'lastPositiveYPosition' || key === 'model_inside_model' || key === 'selected' || key === 'centerPosition' || key === 'previousYPosition' || key === 'shouldBeDrawn' || key === 'shape' || key === 'shouldBeBlock')
                    return undefined;
                return value;
            })));
        else if (layer.isInsideBlock || layer.shouldBeBlock) {
            for (block of dynamicValues.blocks) {
                let blockObj = JSON.stringify(block, (key, value) => {
                    if (value === null)
                        return undefined;
                    if (key === 'drawInterior' || key === 'centerX')
                        return undefined;
                    return value;
                });
                if (block.initialLayer <= layer.id && block.endLayer >= layer.id && !layersInfo.some(e => JSON.stringify(e) === blockObj)) {
                    layersInfo.push(JSON.parse(blockObj));
                    blocksAdded.push(block.initialLayer)
                }
            }
        }
    }

    return layersInfo;
}

function getMaxXPosition(layersToVerify = layers) {
    if (layersToVerify.length == 0)
        return 0;
    let layer = layersToVerify[layersToVerify.length - 1];

    return layer.centerPosition[0] + layer.getShape()[0];
}

function getMinXPosition(layersToVerify = layers) {
    if (layersToVerify.length == 0)
        return 0;
    let layer = layersToVerify[0];

    return layer.centerPosition[0] - layer.getShape()[0];
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
        const newColors = { ...dynamicValues.colors, ...data.colors };
        const newValues = { ...dynamicValues, ...data };
        newValues.colors = { ...newColors };
        dynamicValues = { ...newValues };

        updateShownValues();
        dynamicValues.blocks = []
        layers = layers_backup.map(obj => obj.copy());

        for (let i = 0; i < newValues.blocks.length; i++) {
            let blockData = newValues.blocks[i];
            let initialLayer = layers.find(item => item.name === blockData.initialLayerName);
            let endLayer = layers.find(item => item.name === blockData.endLayerName);
            if (initialLayer === undefined || endLayer === undefined) {
                continue;
            }
            let blockName = blockData.name;
            let blockColor = blockData.color;
            let blockType = blockData.type;

            if (!isLayerPossibleToBeInBlock(initialLayer.id) || !isLayerPossibleToBeInBlock(endLayer.id, initialLayer.id, false)) {
                continue;
            }

            let block = new Block(initialLayer.id, endLayer.id);
            block.setName(blockName);
            block.setColor(blockColor);
            block.type = blockType;

            if (!dynamicValues.blocks.some(obj => obj.isEqual(block))) {
                dynamicValues.blocks.push(block);
            }

            layersChanged = true;
        }

    } catch (e) {
        alert("ERROR! Settings File does not have the correct format.")
    }
}