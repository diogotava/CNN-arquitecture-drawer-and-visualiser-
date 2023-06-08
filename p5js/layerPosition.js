function getMaxWidth(layer, layers) {
    let layersSeen = []
    let nextLayers = [...layer.nextLayers];
    let maxWidth = layer.shape[1];

    while (nextLayers.length !== 0) {
        let nextLayerIndex = nextLayers.shift();
        layersSeen.push(nextLayerIndex);
        let nextLayer = layers[nextLayerIndex];

        if (nextLayer.prevLayers.length === 1 && nextLayer.nextLayers.length > 1){
            let width = 0;
            for (let n_layer of nextLayer.nextLayers) {
                width += getMaxWidth(layers[n_layer], layers) + layers[n_layer].lateralSpaceBetweenLayers;
            }
            if (nextLayer.shape[1] > maxWidth) {
                maxWidth = nextLayer.shape[1];
            }
            if (width > maxWidth) {
                maxWidth = width;
            }
        } else if (nextLayer.prevLayers.length > 1) {
            if (nextLayers.length > 0 && nextLayer.nextLayers.some(elem => nextLayers.includes(elem)) && nextLayer.nextLayers.some(elem => !layersSeen.includes(elem))) {
                layersSeen.pop();
                if (!layersSeen.includes(layer.id) && !nextLayers.includes(layer.id))
                    nextLayers.push(layer.id);
            } else
                return maxWidth;
        } else if (nextLayer.shape[1] > maxWidth) {
            maxWidth = nextLayer.shape[1];
        }
        for (let n_layer of nextLayer.nextLayers) {
            if (!layersSeen.includes(n_layer) && !nextLayers.includes(n_layer))
                nextLayers.push(n_layer);
        }
    }

    return maxWidth;
}

function getPositionEndLayerBlock(layer, layers, xPosition = null, yPosition = null) {
    let isBeginningBlock = isTheBeginningOfBlock(layer.id);
    let beginningLayer = getBeginningBlockLayer(layers, layer.id);
    let spaceBetweenLayers = (layer.nextLayers.length > 1) ? 10 : 5;
    if (isBeginningBlock) {
        layer.prevLayers = [beginningLayer.id];
        getLayersPosition(layer, layers, xPosition, yPosition);
    } else
        for (const nextLayerIndex of layer.nextLayers) {
            let nextLayer = layers[nextLayerIndex];
            nextLayer.previousYPosition = layer.centerPosition[2];
            dynamicValues.layersAlreadyComputedPosition.push(layer.id);
            layer.setXPositionInternalBlockLayer(xPosition);
            getLayersPosition(nextLayer, layers, xPosition, yPosition, spaceBetweenLayers);
        }
}

function getPositionLayersInsideBlock(layer, layers, endBlockLayer, xPosition = null, yPosition = null) {
    layer.shouldBeDrawn = false;

    for (const nextLayerIndex of layer.nextLayers) {
        let nextLayer = layers[nextLayerIndex];
        nextLayer.previousYPosition = layer.centerPosition[2];
        if (layer.id === endBlockLayer.id) {
            getPositionEndLayerBlock(layer, layers, xPosition, yPosition);
        } else {
            dynamicValues.layersAlreadyComputedPosition.push(layer.id);
            layer.setXPositionInternalBlockLayer(xPosition);
            getPositionLayersInsideBlock(nextLayer, layers, endBlockLayer, xPosition, yPosition);
        }
    }
}

function getMaxXPositionOfPrevLayers(prevLayers, layers) {
    let maxX = 0;
    let layer;
    for (let prevLayer of prevLayers) {
        layer = layers[prevLayer];
        let xPosition = layer.centerPosition[0] + layer.shape[0] / 2;
        if (xPosition > maxX)
            maxX = xPosition;
    }
    return maxX;
}

function getLayersPosition(layer, layers, xPosition = null, yPosition = null, spaceBetweenLayers = null) {
    let isBeginningBlock = isTheBeginningOfBlock(layer.id);
    let endBlockLayer = getEndBlockLayer(layers, layer.id);
    let indexY = 2;
    let indexX = 0;
    layer.shouldBeDrawn = true;
    dynamicValues.layersAlreadyComputedPosition.sort();

    if (layer.prevLayers.length >= 1) {
        for (let prevLayerIndex of layer.prevLayers) {
            if (dynamicValues.layersAlreadyComputedPosition.length === 0) {
                let prevLayer = layers[prevLayerIndex];
                if (prevLayer.nextLayers.length === 0) {
                    // Se for um input layer implicito que não tenha next layers colocar o primeiro layer
                    prevLayer.nextLayers = [layer.id];
                }
                getLayersPosition(prevLayer, layers, xPosition, yPosition, spaceBetweenLayers);
                return;
            }
            if (!dynamicValues.layersAlreadyComputedPosition.includes(prevLayerIndex))
                return;
        }
        if (layer.prevLayers.length > 1)
            xPosition = getMaxXPositionOfPrevLayers(layer.prevLayers, layers);
    }

    if (!dynamicValues.layersAlreadyComputedPosition.includes(layer.id))
        dynamicValues.layersAlreadyComputedPosition.push(layer.id);
    else
        return;

    if (yPosition !== null) {
        if (layer.prevLayers.length > 1) {
            yPosition = layer.previouYPosition;
        }
        layer.setYPosition(yPosition);
    }

    if (xPosition !== null) {
        if (layer.prevLayers.length > 1) {
            layer.spaceBetweenLayers = 10;
        } else {
            if (spaceBetweenLayers !== null)
                layer.spaceBetweenLayers = spaceBetweenLayers;
        }
        if (isBeginningBlock) {
            layer.shouldBeBlock = true;
            layer.setXPositionOfBeginBlockLayer(xPosition)
        } else
            layer.setXPositionOfLayer(xPosition);
    }


    if (layer.nextLayers.length > 1) {
        let n = layer.nextLayers.length / 2;
        let prevNegYPosition = 0;
        let prevPosYPosition = 0;

        for (const [index, nextLayerIndex] of layer.nextLayers.entries()) {
            let nextLayer = layers[nextLayerIndex];
            nextLayer.previouYPosition = layer.getYPosition();
            if (endBlockLayer !== undefined) {
                xPosition = layer.centerPosition[indexX] + layer.shape[indexX] / 2;
                getPositionLayersInsideBlock(nextLayer, layers, endBlockLayer, xPosition, yPosition);
            } else {
                let maxWidth = getMaxWidth(nextLayer, layers);
                let yPos;
                if (index + 1 <= n) {
                    if (yPosition !== null) {
                        yPos = yPosition - (prevNegYPosition + maxWidth/2 + layer.lateralSpaceBetweenLayers);
                    } else {
                        yPos = -(prevNegYPosition + maxWidth/2 + layer.lateralSpaceBetweenLayers);
                    }
                    prevNegYPosition = -(yPos - maxWidth/2);
                } else {
                    if (yPosition !== null) {
                        yPos = yPosition + prevPosYPosition + maxWidth/2 + layer.lateralSpaceBetweenLayers;
                    } else {
                        yPos = prevPosYPosition + maxWidth/2 + layer.lateralSpaceBetweenLayers;
                    }
                    prevPosYPosition = yPos + maxWidth/2;
                }

                if (!dynamicValues.layersAlreadyComputedPosition.includes(nextLayerIndex)) {
                    // dynamicValues.layersAlreadyComputedPosition.push(nextLayerIndex);
                    xPosition = layer.centerPosition[indexX] + layer.shape[indexX] / 2;
                    getLayersPosition(nextLayer, layers, xPosition, yPos, 10);
                }

            }
        }
    } else if (layer.nextLayers.length === 1) {
        let nextLayerIndex = layer.nextLayers[0];
        let nextLayer = layers[nextLayerIndex];
        nextLayer.previouYPosition = layer.previouYPosition;
        if (endBlockLayer !== undefined) {
            xPosition = layer.centerPosition[indexX] + layer.shape[indexX] / 2;
            getPositionLayersInsideBlock(nextLayer, layers, endBlockLayer, xPosition, yPosition);
        } else {
            if (!dynamicValues.layersAlreadyComputedPosition.includes(nextLayerIndex)) {
                // dynamicValues.layersAlreadyComputedPosition.push(nextLayerIndex);
                xPosition = layer.centerPosition[indexX] + layer.shape[indexX] / 2;
                getLayersPosition(nextLayer, layers, xPosition, yPosition);
            }
        }
    }

    if (isBeginningBlock && !isTheBeginningOfBlock(endBlockLayer.id))
        layer.nextLayers = endBlockLayer.nextLayers;
    else if (isBeginningBlock)
        layer.nextLayers = [endBlockLayer.id];
}

function isTheBeginningOfBlock(layerId) {
    return dynamicValues.blocks.some((block) => block[0] === layerId);
}

function isTheEndOfBlock(layerId) {
    return dynamicValues.blocks.some((block) => block[1] === layerId);
}

function getEndBlockLayer(layers, layerId) {
    if (isTheBeginningOfBlock(layerId))
        return layers[dynamicValues.blocks[dynamicValues.blocks.findIndex(block => block[0] === layerId)][1]]
    else
        return undefined;
}

function getBeginningBlockLayer(layers, layerId) {
    if (isTheEndOfBlock(layerId))
        return layers[dynamicValues.blocks[dynamicValues.blocks.findIndex(block => block[1] === layerId)][0]]
    else
        return undefined;
}
