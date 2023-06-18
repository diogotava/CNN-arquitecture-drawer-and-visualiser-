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
        let xPosition = layer.centerPosition[0] + layer.shape[0] / 2;
        if (xPosition > maxX)
            maxX = xPosition;
    }
    return maxX;
}

function getMaxWidth(layer, layers) {
    let layersSeen = []
    let nextLayers = [...layer.nextLayers];
    let maxWidth = layer.shape[2];

    while (nextLayers.length !== 0) {
        let nextLayerIndex = nextLayers.shift();
        layersSeen.push(nextLayerIndex);
        let nextLayer = layers[nextLayerIndex];

        if (nextLayer.prevLayers.length === 1 && nextLayer.nextLayers.length > 1){
            let width = 0;
            for (let n_layer of nextLayer.nextLayers) {
                width += getMaxWidth(layers[n_layer], layers) + layers[n_layer].lateralSpaceBetweenLayers;
            }
            if (nextLayer.shape[2] > maxWidth) {
                maxWidth = nextLayer.shape[2];
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
        } else if (nextLayer.shape[2] > maxWidth) {
            maxWidth = nextLayer.shape[2];
        }
        for (let n_layer of nextLayer.nextLayers) {
            if (!layersSeen.includes(n_layer) && !nextLayers.includes(n_layer))
                nextLayers.push(n_layer);
        }
    }

    return maxWidth;
}

function getYPosition(layer, layers){
    let yPosition = 0;

    if( layer.prevLayers.length === 1 ){
        let previousLayer = layers[layer.prevLayers[0]];
        yPosition = previousLayer.getYPosition();
        if(previousLayer.nextLayers.length > 1) {
            let halfOfNextLayersOfPreviousLayer = previousLayer.nextLayers.length /2;
            let index = previousLayer.nextLayers.indexOf(layer.id);
            let maxWidth = getMaxWidth(layer, layers);

            if (index + 1 <= halfOfNextLayersOfPreviousLayer) {
                yPosition = yPosition - (previousLayer.lastNegativeYPosition + maxWidth/2 + layer.lateralSpaceBetweenLayers);

                previousLayer.lastNegativeYPosition = -(yPosition - maxWidth/2);
            } else {
                yPosition = yPosition + previousLayer.lastPositiveYPosition + maxWidth/2 + layer.lateralSpaceBetweenLayers;

                previousLayer.lastPositiveYPosition = yPosition + maxWidth/2;
            }
        }
    } else if(layer.prevLayers.length > 1){
        yPosition = layer.previousYPosition.yPosition;

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
    } else if(layer.nextLayers.length === 1 && layer.prevLayers.length === 1){
        layers[layer.nextLayers[0]].previousYPosition = layer.previousYPosition;
    } else if(layer.nextLayers.length === 1 && layer.prevLayers.length > 1){
        layers[layer.nextLayers[0]].previousYPosition = layers[layer.previousYPosition.id].previousYPosition;
    }

    return yPosition;
}

function getXPosition(layer, layers){
    let xPosition = 0;

    if( layer.prevLayers.length === 1 ){
        xPosition = layers[layer.prevLayers[0]].centerPosition[0] + layers[layer.prevLayers[0]].shape[0]/2;
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
    let xPosition = getXPosition(layer, layers);
    layer.setXPosition(xPosition);

    let yPosition = getYPosition(layer, layers);
    layer.setYPosition(yPosition);
}