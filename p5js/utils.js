let selectedLayerID = -1;
let bPressed = false;
let block = [];


function keyPressed() {
    let id;
    if (keyIsDown(67)) { // C
        id = getLayerId();
        if (id !== -1) {
            if (selectedLayerID !== -1)
                layers[selectedLayerID].selected = false;
            layers[id].selected = true;
            selectedLayerID = id;
        } else {
            if (selectedLayerID !== -1)
                layers[selectedLayerID].selected = false;
            selectedLayerID = -1;
        }
        selectedText();
    } else if (keyIsDown(66)) {
        id = getLayerId();
        if (id !== -1) {
            if (bPressed) {
                let allPrevLayers = getAllPreviousLayers(layers[id], layers)
                let allNextLayers = getAllNextLayers(layers[block[0]], layers)
                if (block[0] in allPrevLayers && id in allNextLayers || id < block[0]) {
                    block[1] = id;
                    dynamicValues.blocks.push(block);
                    alert('End of block selected!');
                    layersChanged = true;
                } else {
                    alert("ERROR: It's not possible to select this layer as end of block!");
                }
                bPressed = false;
                block = [];
            } else {
                block[0] = id;
                alert('Begin of block selected!');
                bPressed = true;
            }
        }
    }
}

function selectedText() {
    let nothingSelectedH2 = select('#nothing_selected_h2');
    let selectedH2 = select('#selected_h2');
    let typeP = select('#type');
    let inputShape = select('#input_shape');
    let outputShape = select('#output_shape');
    let activation = select('#activation');

    if (selectedLayerID === -1) {
        nothingSelectedH2.elt.hidden = false;
        selectedH2.elt.hidden = true;
        typeP.elt.hidden = true;
        inputShape.elt.hidden = true;
        outputShape.elt.hidden = true;
        activation.elt.hidden = true;
    } else {
        let selectedLayer = layers[selectedLayerID];
        nothingSelectedH2.elt.hidden = true;

        selectedH2.elt.hidden = false;
        typeP.elt.hidden = false;
        inputShape.elt.hidden = false;
        outputShape.elt.hidden = false;
        activation.elt.hidden = false;
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
            activation.html("<b>Activation:</b> " + selectedLayer.activation);
        } else {
            activation.html("<b>Activation:</b> none");
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


function getMaxWidth(layer, layers) {
    let maxLayers = {};

    let count = 0;

    for (let index in layer.nextLayers) {
        let nextLayerIndex = layer.nextLayers[index];
        let nextLayer = layers[nextLayerIndex];

        if (nextLayer.prevLayers.length > 1) {
            count += 1;
        } else {
            count += nextLayer.nextLayers.length;
        }
    }

    return Math.max(maxLayers[layer.name] || 0, count);
}

function getLateralPositionLayersEndBlock(layer, layers, endBlockLayer, layersAlreadyComputedLateralPosition = null, xPosition = null, yPosition = null) {
    layersAlreadyComputedLateralPosition.push(layer.name);
    if (layer.id === endBlockLayer.id) {
        getLateralPositionLayers(layer, layers, layersAlreadyComputedLateralPosition, xPosition, yPosition);
    }
    if (layer.nextLayers.length > 1) {
        for (const nextLayerIndex of layer.nextLayers) {
            let nextLayer = layers[nextLayerIndex];
            nextLayer.previousYPosition = layer.centerPosition[2];
            getLateralPositionLayersEndBlock(nextLayer, layers, endBlockLayer, layersAlreadyComputedLateralPosition, xPosition, yPosition);
        }
    } else if (layer.nextLayers.length === 1) {
        let nextLayerIndex = layer.nextLayers[0];
        let nextLayer = layers[nextLayerIndex];
        nextLayer.previousYPosition = layer.previousYPosition;

        getLateralPositionLayersEndBlock(nextLayer, layers, endBlockLayer, layersAlreadyComputedLateralPosition, xPosition, yPosition);
    }
}

// TODO: Fix position of blocks
function getLateralPositionLayers(layer, layers, layersAlreadyComputedLateralPosition = null, xPosition = null, yPosition = null, spaceBetweenLayers = null) {
    let endBlockLayer;
    let indexY = 2;
    let indexX = 0;

    if (dynamicValues.blocks.some((block) => block[0] === layer.id)) {
        endBlockLayer = layers[dynamicValues.blocks[dynamicValues.blocks.findIndex(list => list[0] === layer.id)][1]];
    }
    if (layersAlreadyComputedLateralPosition === null && layer.prevLayers.length >= 1) {
        for (let prevLayerIndex of layer.prevLayers) {
            getLateralPositionLayers(layers[prevLayerIndex], layers);
        }
    }

    if (yPosition !== null) {
        if (layer.prevLayers.length > 1) {
            yPosition = layer.previouYPosition;
        }
        layer.setYPosition(yPosition);
    }

    if (xPosition !== null) {
        if (spaceBetweenLayers !== null) {
            layer.spaceBetweenLayers = spaceBetweenLayers;
        }
        if (layer.prevLayers.length > 1) {
            layer.spaceBetweenLayers = 10;
        }
        layer.setXPosition(xPosition);
    }

    if (layersAlreadyComputedLateralPosition === null) {
        layersAlreadyComputedLateralPosition = [layer.name];
    }

    if (layer.nextLayers.length > 1) {
        let n = layer.nextLayers.length / 2;
        let negativeLayerIndex = 1;
        let positiveLayerIndex = 1;

        for (const [index, nextLayerIndex] of layer.nextLayers.entries()) {
            let nextLayer = layers[nextLayerIndex];
            nextLayer.previouYPosition = layer.getYPosition();
            if (endBlockLayer !== undefined) {
                getLateralPositionLayersEndBlock(nextLayer, layers, endBlockLayer, layersAlreadyComputedLateralPosition, xPosition, yPosition, 10);
            } else {
                let maxWidth = getMaxWidth(nextLayer, layers);
                let y_pos;
                if (index + 1 <= n) {
                    if (yPosition !== null) {
                        y_pos = yPosition - negativeLayerIndex * maxWidth * (layer.lateralSpaceBetweenLayers + layer.shape[indexY]);
                    } else {
                        y_pos = -negativeLayerIndex * maxWidth * (layer.lateralSpaceBetweenLayers + layer.shape[indexY]);
                    }
                    negativeLayerIndex += 1;
                } else {
                    if (yPosition !== null) {
                        y_pos = yPosition + positiveLayerIndex * maxWidth * (layer.lateralSpaceBetweenLayers + layer.shape[indexY]);
                    } else {
                        y_pos = positiveLayerIndex * maxWidth * (layer.lateralSpaceBetweenLayers + layer.shape[indexY]);
                    }
                    positiveLayerIndex += 1;
                }

                if (!layersAlreadyComputedLateralPosition.includes(nextLayer.name)) {
                    layersAlreadyComputedLateralPosition.push(nextLayer.name);
                    xPosition = layer.centerPosition[indexX] + layer.shape[indexX] / 2;
                    getLateralPositionLayers(nextLayer, layers, layersAlreadyComputedLateralPosition, xPosition, y_pos, 10);
                }
            }
        }
    } else if (layer.nextLayers.length === 1) {
        let nextLayerIndex = layer.nextLayers[0];
        let nextLayer = layers[nextLayerIndex];
        nextLayer.previouYPosition = layer.previouYPosition;
        if (endBlockLayer !== undefined) {
            getLateralPositionLayersEndBlock(nextLayer, layers, endBlockLayer, layersAlreadyComputedLateralPosition, xPosition, yPosition);
        } else {
            if (!layersAlreadyComputedLateralPosition.includes(nextLayer.name)) {
                layersAlreadyComputedLateralPosition.push(nextLayer.name);
                xPosition = layer.centerPosition[indexX] + layer.shape[indexX] / 2;
                getLateralPositionLayers(nextLayer, layers, layersAlreadyComputedLateralPosition, xPosition, yPosition);
            }
        }
    }
}