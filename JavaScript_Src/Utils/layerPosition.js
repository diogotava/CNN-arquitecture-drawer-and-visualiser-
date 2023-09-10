let indexX = 0;
let indexY = 2;

function isTheBeginningOfBlock(layerId) {
    return dynamicValues.blocks.some((block) => block.initialLayer === layerId);
}

function isTheEndOfBlock(layerId) {
    return dynamicValues.blocks.some((block) => block.endLayer === layerId);
}

function getBlockColor(layerId) {
    if (isTheBeginningOfBlock(layerId))
        return dynamicValues.blocks[dynamicValues.blocks.findIndex(block => block.initialLayer === layerId)].getColor();
    else
        return undefined;
}

function getEndBlockLayer(layers, layerId) {
    if (isTheBeginningOfBlock(layerId))
        return layers[dynamicValues.blocks[dynamicValues.blocks.findIndex(block => block.initialLayer === layerId)].endLayer]
    else
        return undefined;
}

function getBeginningBlockLayer(layers, layerId) {
    if (isTheEndOfBlock(layerId))
        return layers[dynamicValues.blocks[dynamicValues.blocks.findIndex(block => block.endLayer === layerId)].initialLayer]
    else
        return undefined;
}

function getmaxLengthPositionOfPrevLayers(prevLayers, layers) {
    let maxLength = 0;
    let layer;
    for (let prevLayer of prevLayers) {
        layer = layers[prevLayer];
        let xPosition = layer.centerPosition[indexX] + layer.getShape()[indexX] / 2;
        if (xPosition > maxLength)
            maxLength = xPosition;
    }
    return maxLength;
}

function getMaxWidth(layer, layers) {
    let layersSeen = []
    let next_layers = [...layer.nextLayers];
    let maxWidth = layer.getShape()[indexY];

    while (next_layers.length !== 0) {
        let nextLayerIndex = next_layers.shift();
        layersSeen.push(nextLayerIndex);
        let nextLayer = layers[nextLayerIndex];

        if (nextLayer.prevLayers.length === 1 && nextLayer.nextLayers.length > 1) {
            let width = 0;
            for (let n_layer of nextLayer.nextLayers) {
                width += getMaxWidth(layers[n_layer], layers) + dynamicValues.lateralSpaceBetweenLayers;
            }
            if (nextLayer.getShape()[indexY] > maxWidth) {
                maxWidth = nextLayer.getShape()[indexY];
            }
            if (width > maxWidth) {
                maxWidth = width;
            }
        } else if (nextLayer.prevLayers.length > 1) {
            if (next_layers.length > 0 && nextLayer.nextLayers.some(elem => next_layers.includes(elem)) && nextLayer.nextLayers.some(elem => !layersSeen.includes(elem))) {
                layersSeen.pop();
                if (!layersSeen.includes(layer.id) && !next_layers.includes(layer.id))
                    next_layers.push(layer.id);
            } else
                return maxWidth;
        } else if (nextLayer.getShape()[indexY] > maxWidth) {
            maxWidth = nextLayer.getShape()[indexY];
        }
        for (let n_layer of nextLayer.nextLayers) {
            if (!layersSeen.includes(n_layer) && !next_layers.includes(n_layer))
                next_layers.push(n_layer);
        }
    }

    return maxWidth;
}

function getPositionEndLayerBlock(layer, layers, xPosition = null) {
    let isBeginningBlock = isTheBeginningOfBlock(layer.id);
    let beginningLayer = getBeginningBlockLayer(layers, layer.id);
    if (isBeginningBlock) {
        layer.prevLayers = [beginningLayer.id];
        return
    }

    layer.setXPositionInternalBlockLayer(xPosition);
    for (const nextLayerIndex of layer.nextLayers) {
        let nextLayer = layers[nextLayerIndex];
        nextLayer.previousYPosition = {
            id: layer.id,
            yPosition: layer.centerPosition[indexY]
        };
    }

}

function getPositionLayersInsideBlock(layer, layers, endBlockLayer, xPosition = null, yPosition = null) {
    layer.shouldBeDrawn = false;

    if (layer.id === endBlockLayer.id)
        getPositionEndLayerBlock(layer, layers, xPosition);
    else {
        layer.setXPositionInternalBlockLayer(xPosition);

        for (const nextLayerIndex of layer.nextLayers) {
            let nextLayer = layers[nextLayerIndex];
            nextLayer.previousYPosition = {
                id: layer.id,
                yPosition: layer.centerPosition[indexY]
            };

            getPositionLayersInsideBlock(nextLayer, layers, endBlockLayer, xPosition, yPosition);

        }
    }
}

function getYPosition(layer, layers) {
    let yPosition = 0;

    if (layer.prevLayers.length === 1) {
        let previousLayer = layers[layer.prevLayers[indexX]];
        yPosition = previousLayer.getYPosition();
        if (previousLayer.nextLayers.length > 1) {
            let halfOfNextLayersOfPreviousLayer = previousLayer.nextLayers.length / 2;
            let index = previousLayer.nextLayers.indexOf(layer.id);
            let maxWidth = getMaxWidth(layer, layers);

            if (index + 1 <= halfOfNextLayersOfPreviousLayer) {
                let halfPreviousLayerShape = previousLayer.lastNegativeYPosition === 0 ? Math.max(previousLayer.getShape()[indexY] / 2, dynamicValues.lateralSpaceBetweenLayers / 2) : dynamicValues.lateralSpaceBetweenLayers;
                yPosition = yPosition - (previousLayer.lastNegativeYPosition + halfPreviousLayerShape + maxWidth / 2);

                previousLayer.lastNegativeYPosition = -(yPosition - maxWidth / 2);
            } else {
                let halfPreviousLayerShape = previousLayer.lastPositiveYPosition === 0 ? Math.max(previousLayer.getShape()[indexY] / 2, dynamicValues.lateralSpaceBetweenLayers / 2) : dynamicValues.lateralSpaceBetweenLayers;
                yPosition = yPosition + previousLayer.lastPositiveYPosition + halfPreviousLayerShape + maxWidth / 2;

                previousLayer.lastPositiveYPosition = yPosition + maxWidth / 2;
            }
        }
    } else if (layer.prevLayers.length > 1) {
        yPosition = layer.previousYPosition.yPosition;

    }

    if (layer.id === 0) {
        layer.previousYPosition = { id: layer.id, yPosition: yPosition };
    }
    if (layer.nextLayers.length > 1) {
        let prevYPos;
        if (yPosition === layer.previousYPosition.yPosition) {
            prevYPos = layer.previousYPosition;
        } else {
            prevYPos = {
                id: layer.id,
                yPosition: yPosition
            };
        }
        for (let next_layer of layer.nextLayers) {
            layers[next_layer].previousYPosition = prevYPos;
        }
    } else if (layer.nextLayers.length === 1 && layer.prevLayers.length <= 1) {
        layers[layer.nextLayers[indexX]].previousYPosition = layer.previousYPosition;
    } else if (layer.nextLayers.length === 1 && layer.prevLayers.length > 1) {
        layers[layer.nextLayers[indexX]].previousYPosition = layers[layer.previousYPosition.id].previousYPosition;
    }

    return yPosition;
}

function getXPosition(layer, layers) {
    let xPosition = 0;

    if (layer.prevLayers.length === 1) {
        xPosition = layers[layer.prevLayers[indexX]].centerPosition[indexX] + layers[layer.prevLayers[indexX]].getShape()[indexX] / 2;
    } else if (layer.prevLayers.length > 1) {
        xPosition = getmaxLengthPositionOfPrevLayers(layer.prevLayers, layers);
    } else if (layer.model_inside_model && layer.id > 0) {
        xPosition = layers[layer.id - 1].centerPosition[indexX] + layers[layer.id - 1].getShape()[indexX] / 2;
    }

    return xPosition;
}

function getLayersPosition(layers) {
    for (let layer of layers) {
        getLayerPosition(layer, layers)
    }
}

function getLayerPosition(layer, layers) {
    let isBeginningBlock = isTheBeginningOfBlock(layer.id);
    let endBlockLayer = getEndBlockLayer(layers, layer.id);
    let isInsideBlock = layer.isLayerInsideBlock();

    let xPosition = getXPosition(layer, layers);
    let yPosition = getYPosition(layer, layers);
    if (isInsideBlock)
        return;

    layer.shouldBeDrawn = true;
    if (isBeginningBlock) {
        layer.shouldBeBlock = true;
        layer.setXPositionOfBeginBlockLayer(xPosition)
        for (let nextLayerId of layer.nextLayers) {
            let nextLayer = layers[nextLayerId];
            getPositionLayersInsideBlock(nextLayer, layers, endBlockLayer, layer.centerPosition[indexX], yPosition);
        }
        if (!isTheBeginningOfBlock(endBlockLayer.id))
            layer.nextLayers = endBlockLayer.nextLayers;
        else
            layer.nextLayers = [endBlockLayer.id];
    } else
        layer.setXPosition(xPosition);

    layer.setYPosition(yPosition);
}