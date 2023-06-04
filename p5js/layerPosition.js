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
            if(dynamicValues.layersAlreadyComputedPosition.length === 0){
                let prevLayer = layers[prevLayerIndex];
                if(prevLayer.nextLayers.length === 0){
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
            else
                layer.spaceBetweenLayers = 5;
        }
        if (isBeginningBlock) {
            layer.shouldBeBlock = true;
            layer.setXPositionOfBeginBlockLayer(xPosition)
        } else
            layer.setXPositionOfLayer(xPosition);
    }


    if (layer.nextLayers.length > 1) {
        let n = layer.nextLayers.length / 2;
        let negativeLayerIndex = 1;
        let positiveLayerIndex = 1;

        for (const [index, nextLayerIndex] of layer.nextLayers.entries()) {
            let nextLayer = layers[nextLayerIndex];
            nextLayer.previouYPosition = layer.getYPosition();
            if (endBlockLayer !== undefined) {
                xPosition = layer.centerPosition[indexX] + layer.shape[indexX] / 2;
                getPositionLayersInsideBlock(nextLayer, layers, endBlockLayer, xPosition, yPosition);
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

                if (!dynamicValues.layersAlreadyComputedPosition.includes(nextLayerIndex)) {
                    // dynamicValues.layersAlreadyComputedPosition.push(nextLayerIndex);
                    xPosition = layer.centerPosition[indexX] + layer.shape[indexX] / 2;
                    getLayersPosition(nextLayer, layers, xPosition, y_pos, 10);
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
