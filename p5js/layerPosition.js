let indexX = 0;
let indexY = 2;
let indexZ = 1;

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

function getMaxXPositionOfPrevLayers(prevLayers, layers) {
    let maxX = 0;
    let layer;
    for (let prevLayer of prevLayers) {
        layer = layers[prevLayer];
        let xPosition = layer.centerPosition[indexX] + layer.shape[indexX] / 2;
        if (xPosition > maxX)
            maxX = xPosition;
    }
    return maxX;
}

function getMaxWidth(layer, layers) {
    let layersSeen = []
    let nextLayers = [...layer.nextLayers];
    let maxWidth = layer.shape[indexY];

    while (nextLayers.length !== 0) {
        let nextLayerIndex = nextLayers.shift();
        layersSeen.push(nextLayerIndex);
        let nextLayer = layers[nextLayerIndex];

        if (nextLayer.prevLayers.length === 1 && nextLayer.nextLayers.length > 1){
            let width = 0;
            for (let n_layer of nextLayer.nextLayers) {
                width += getMaxWidth(layers[n_layer], layers) + layers[n_layer].lateralSpaceBetweenLayers;
            }
            if (nextLayer.shape[indexY] > maxWidth) {
                maxWidth = nextLayer.shape[indexY];
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
        } else if (nextLayer.shape[indexY] > maxWidth) {
            maxWidth = nextLayer.shape[indexY];
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
        // getLayersPosition(layer, layers, xPosition, yPosition);
    } else
        for (const nextLayerIndex of layer.nextLayers) {
            let nextLayer = layers[nextLayerIndex];
            nextLayer.previousYPosition = {id: layer.id,
                                             yPosition: layer.centerPosition[indexY]};
            dynamicValues.layersAlreadyComputedPosition.push(layer.id);
            layer.setXPositionInternalBlockLayer(xPosition);
            // getLayersPosition(nextLayer, layers, xPosition, yPosition, spaceBetweenLayers);
        }
}

function getPositionLayersInsideBlock(layer, layers, endBlockLayer, xPosition = null, yPosition = null) {
    layer.shouldBeDrawn = false;

    for (const nextLayerIndex of layer.nextLayers) {
        let nextLayer = layers[nextLayerIndex];
        nextLayer.previousYPosition = {id: layer.id,
                                        yPosition: layer.centerPosition[indexY]};
        if (layer.id === endBlockLayer.id) {
            getPositionEndLayerBlock(layer, layers, xPosition, yPosition);
        } else {
            dynamicValues.layersAlreadyComputedPosition.push(layer.id);
            layer.setXPositionInternalBlockLayer(xPosition);
            getPositionLayersInsideBlock(nextLayer, layers, endBlockLayer, xPosition, yPosition);
        }
    }
}

function getYPosition(layer, layers){
    let yPosition = 0;

    if( layer.prevLayers.length === 1 ){
        let previousLayer = layers[layer.prevLayers[indexX]];
        yPosition = previousLayer.getYPosition();
        if(previousLayer.nextLayers.length > 1) {
            let halfOfNextLayersOfPreviousLayer = previousLayer.nextLayers.length /2;
            let index = previousLayer.nextLayers.indexOf(layer.id);
            let maxWidth = getMaxWidth(layer, layers);

            if (index + 1 <= halfOfNextLayersOfPreviousLayer) {
                let halfPreviousLayerShape = previousLayer.lastNegativeYPosition === 0 ? Math.max(previousLayer.shape[indexY]/2, dynamicValues.defaultLateralSpaceBetweenLayers/2) : layer.lateralSpaceBetweenLayers;
                yPosition = yPosition - (previousLayer.lastNegativeYPosition + halfPreviousLayerShape + maxWidth/2);

                previousLayer.lastNegativeYPosition = -(yPosition - maxWidth/2);
            } else {
                let halfPreviousLayerShape = previousLayer.lastPositiveYPosition === 0 ?  Math.max(previousLayer.shape[indexY]/2, dynamicValues.defaultLateralSpaceBetweenLayers/2) : layer.lateralSpaceBetweenLayers;
                yPosition = yPosition + previousLayer.lastPositiveYPosition + halfPreviousLayerShape + maxWidth/2;

                previousLayer.lastPositiveYPosition = yPosition + maxWidth/2;
            }
        }
    } else if(layer.prevLayers.length > 1){
        yPosition = layer.previousYPosition.yPosition;

    }

    if(layer.id === 0){
        layer.previousYPosition = {id: layer.id, yPosition: yPosition};
    }
    if(layer.nextLayers.length > 1) {
        let prevYPos = {};
        if(yPosition === layer.previousYPosition.yPosition){
            prevYPos = layer.previousYPosition;
        } else {
            prevYPos = {id: layer.id,
                        yPosition: yPosition};
        }
        for (let next_layer of layer.nextLayers) {
            layers[next_layer].previousYPosition = prevYPos;
        }
    } else if(layer.nextLayers.length === 1 && layer.prevLayers.length <= 1){
        layers[layer.nextLayers[indexX]].previousYPosition = layer.previousYPosition;
    } else if(layer.nextLayers.length === 1 && layer.prevLayers.length > 1){
        layers[layer.nextLayers[indexX]].previousYPosition = layers[layer.previousYPosition.id].previousYPosition;
    }

    return yPosition;
}

function getXPosition(layer, layers){
    let xPosition = 0;

    if( layer.prevLayers.length === 1 ){
        xPosition = layers[layer.prevLayers[indexX]].centerPosition[indexX] + layers[layer.prevLayers[indexX]].shape[indexX]/2;
    } else if(layer.prevLayers.length > 1){
        xPosition = getMaxXPositionOfPrevLayers(layer.prevLayers, layers);
    }

    return xPosition;
}

function getLayersPosition(layers) {
    for(let layer of layers){
        getLayerPosition(layer, layers)
    }
}

function getLayerPosition(layer, layers){
    let isBeginningBlock = isTheBeginningOfBlock(layer.id);
    let endBlockLayer = getEndBlockLayer(layers, layer.id);
    let isInsideBlock = layer.isLayerInsideBlock();

    let xPosition = getXPosition(layer, layers);
    let yPosition = getYPosition(layer, layers);
    if(isInsideBlock)
        return;

    layer.shouldBeDrawn = true;
    if (isBeginningBlock) {
        layer.shouldBeBlock = true;
        layer.setXPositionOfBeginBlockLayer(xPosition)
        for(let nextLayerId of layer.nextLayers) {
            let nextLayer = layers[nextLayerId];
            getPositionLayersInsideBlock(nextLayer, layers, endBlockLayer, layer.centerPosition[indexX] + layer.shape[indexX] / 2, yPosition);
        }
        if(!isTheBeginningOfBlock(endBlockLayer.id))
            layer.nextLayers = endBlockLayer.nextLayers;
        else
            layer.nextLayers = [endBlockLayer.id];
    } else
        layer.setXPosition(xPosition);

    layer.setYPosition(yPosition);
}