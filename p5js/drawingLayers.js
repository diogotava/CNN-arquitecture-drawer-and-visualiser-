function drawLayer(layer, i, array) {
    if (layer.shouldBeDrawn || layer.shouldBeBlock) {
        let centerPosition = [...layer.centerPosition]

        let shape = layer.getShape();

        mPush();
        mTranslate(centerPosition[0], centerPosition[1], centerPosition[2]);

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
                let endBlockLayer = getEndBlockLayer(array, layer.id);
                id = endBlockLayer !== undefined ? endBlockLayer.id + 1 : -1;
                color = dynamicValues.colors.Block;
            }
            mTexture(color[0], color[1], color[2]);
            mBox(id, shape[0], shape[1], shape[2]);
            drawArrowForArrow(layer, array);
        }
        mPop();
    }
}