function drawLayer(layer, i, array) {
    let afterBlockDifference = 0;

    if (layer.shouldBeDrawn)
        drawNormalLayer(layer, array, afterBlockDifference);
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