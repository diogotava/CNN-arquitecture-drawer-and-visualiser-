function drawLayer(layer, i, array) {
    if (layer.shouldBeDrawn)
        drawNormalLayer(layer, array);
}

function drawNormalLayer(layer, array) {
    let centerPosition = [...layer.centerPosition]

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

    if (dynamicValues.blocks.some((block) => block[0] === layer.id)) {
        let afterBlockDifference = layer.shape[0] / 2 + dynamicValues.defaultSpaceBetweenLayers + dynamicValues.minX / 2;
        mPush();
        mTranslate(afterBlockDifference, 0, 0);
        mTexture(0, 0, 0);
        mBox(0, dynamicValues.minX, dynamicValues.minZY, dynamicValues.minZY);
        mPop();
        drawArrowAfterBlock(layer, array, centerPosition, afterBlockDifference);
    } else
        drawArrowForArrow(layer, array);
    mPop();
}