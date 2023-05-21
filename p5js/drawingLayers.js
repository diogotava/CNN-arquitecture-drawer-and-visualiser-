function drawLayer(layer, i, array) {
    let afterBlockDifference = 0;

    // for (let block of values.blocks) {
    //     var beginLayer = array[block[0]];
    //     var endLayer = array[block[1]];
    //     if (layer.id == block[0] && !values.blocks.some((a) => a[1] == layer.id)) {
    //         drawBeginningBlockLayer(layer, array, endLayer, afterBlockDifference);
    //         return;
    //     } else if (layer.id == block[1] && !values.blocks.some((a) => a[0] == layer.id)) {
    //         drawEndBlockLayer(layer, array, beginLayer, afterBlockDifference);
    //         return;
    //     } else if (values.blocks.some((a) => a[1] == layer.id) && values.blocks.some((a) => a[0] == layer.id)) {
    //         var endBlockLayer = array[values.blocks[values.blocks.findIndex(list => list[0] === layer.id)][1]];
    //         drawBeginAndEndBlockLayer(layer, array, beginLayer, endBlockLayer, afterBlockDifference);
    //         return;
    //     } else if (layerInsideBlock(layer, block))
    //         return;
    //     else if (layer.id > block[1]) {
    //         afterBlockDifference += (endLayer.centerPosition[0]) - (beginLayer.centerPosition[0] + beginLayer.shape[0] / 2 + values.defaultSpaceBetweenLayers + (endLayer.shape[0] / 2));
    //     }

    // }

    drawNormalLayer(layer, array, afterBlockDifference);
}

function layerInsideBlock(layer, block) {
    let allPrevLayers = getAllPreviousLayers(layers[block[1]], layers)
    let allNextLayers = getAllNextLayers(layers[block[0]], layers)
    return (allPrevLayers.includes(layer.id) && allNextLayers.includes(layer.id))
}

function drawNormalLayer(layer, array, afterBlockDifference) {
    let centerPosition = [...layer.centerPosition]
    if (afterBlockDifference !== 0) {
        centerPosition[0] -= afterBlockDifference;
    }
    mPush();
    mTranslate(centerPosition[0], centerPosition[1], centerPosition[2]);
    let color;

    if (layer.selected)
        color = dynamicValues.colors.Selected;
    else {
        color = dynamicValues.colors[layer.type];
        if (color === undefined) {
            color = dynamicValues.colors.Default;
        }
    }
    mTexture(color[0], color[1], color[2]);

    if (layer.shape === []) {
        layer.shape[0] = dynamicValues.minX;
        layer.shape[1] = dynamicValues.minZY;
        layer.shape[2] = dynamicValues.minZY;
    }
    mBox(layer.id + 1, layer.shape[0], layer.shape[1], layer.shape[2]);

    if (afterBlockDifference !== 0) {
        drawArrowAfterBlock(layer, array, centerPosition, afterBlockDifference);
    } else
        drawArrowForArrow(layer, array);
    mPop();
}

function drawBeginningBlockLayer(layer, array, endBlockLayer, afterBlockDifference) {
    mPush();
    mTranslate(layer.centerPosition[0], layer.centerPosition[1], layer.centerPosition[2]);
    let color;

    if (layer.selected)
        color = dynamicValues.colors.Selected;
    else {
        color = dynamicValues.colors[layer.type];
        if (color === undefined) {
            color = dynamicValues.colors.Default;
        }
    }
    mTexture(color[0], color[1], color[2]);

    if (layer.shape === []) {
        layer.shape[0] = dynamicValues.minX;
        layer.shape[1] = dynamicValues.minZY;
        layer.shape[2] = dynamicValues.minZY;
    }
    mBox(layer.id + 1, layer.shape[0], layer.shape[1], layer.shape[2]);

    let differenceBetweenLayers = afterBlockDifference + ((endBlockLayer.centerPosition[0]) - (layer.centerPosition[0] + layer.shape[0] / 2 + dynamicValues.defaultSpaceBetweenLayers + (endBlockLayer.shape[0] / 2)));
    drawBeginningBlockArrow(layer, array, differenceBetweenLayers, endBlockLayer.id);
    mPop();
}

function drawBlockLayer(layer, blockLayer, afterBlockDifference) {
    let differenceBetweenLayers = afterBlockDifference + ((layer.centerPosition[0]) - (blockLayer.centerPosition[0] + blockLayer.shape[0] / 2 + dynamicValues.defaultSpaceBetweenLayers + (layer.shape[0] / 2)));
    mTranslate(layer.centerPosition[0] - differenceBetweenLayers, layer.centerPosition[1], layer.centerPosition[2]);
    let color;

    if (layer.selected)
        color = dynamicValues.colors.Selected;
    else {
        color = dynamicValues.colors[layer.type];
        if (color === undefined) {
            color = dynamicValues.colors.Default;
        }
    }
    mTexture(color[0], color[1], color[2]);

    if (layer.shape === []) {
        layer.shape[0] = dynamicValues.minX;
        layer.shape[1] = dynamicValues.minZY;
        layer.shape[2] = dynamicValues.minZY;
    }
    mBox(layer.id + 1, layer.shape[0], layer.shape[1], layer.shape[2]);

    return differenceBetweenLayers;
}

function drawEndBlockLayer(layer, array, beginBlockLayer, afterBlockDifference) {
    mPush();
    let differenceBetweenLayers = drawBlockLayer(layer, beginBlockLayer, afterBlockDifference);

    drawEndBlockArrow(layer, array, differenceBetweenLayers, layer.nextLayers);
    mPop();
}

function drawBeginAndEndBlockLayer(layer, array, beginBlockLayer, endBlockLayer, afterBlockDifference) {
    mPush();
    let differenceBetweenLayers = drawBlockLayer(layer, beginBlockLayer, afterBlockDifference);

    drawBeginningBlockArrow(layer, array, differenceBetweenLayers, endBlockLayer.id);
    mPop();
}