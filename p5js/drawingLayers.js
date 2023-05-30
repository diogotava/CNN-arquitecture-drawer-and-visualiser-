function drawLayer(layer, i, array) {
    if (layer.shouldBeDrawn)
        drawNormalLayer(layer, array);
}

function drawNormalLayer(layer, array) {
    let centerPosition = [...layer.centerPosition]

    mPush();
    mTranslate(centerPosition[0], centerPosition[1], centerPosition[2]);

    if (layer.shape === []) {
        layer.shape[0] = dynamicValues.minX;
        layer.shape[1] = dynamicValues.minZY;
        layer.shape[2] = dynamicValues.minZY;
    }

    if (layer.shouldBeDrawn) {
        let id = layer.id + 1;
        let color;

        if (layer.selected)
            color = dynamicValues.colors.Selected;
        else {
            color = dynamicValues.colors[layer.type];
            if (color === undefined) {
                color = dynamicValues.colors.Default;
            }
        }
        if (layer.shouldBeBlock) {
            id = 0;
            color = 0;
        }
        mTexture(color[0], color[1], color[2]);
        mBox(id, layer.shape[0], layer.shape[1], layer.shape[2]);
        drawArrowForArrow(layer, array);
    }
    mPop();
}