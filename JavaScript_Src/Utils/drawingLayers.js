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
                let indexOfBlock = dynamicValues.blocks.findIndex(block => block.initialLayer === layer.id);
                let block = dynamicValues.blocks[indexOfBlock];
                if (block.drawInterior) {
                    let width = getMaxWidth(layer, layers, endBlockLayer.id) + 5;
                    let initialPositionBlock = (centerPosition[0] - (shape[0] / 2) - dynamicValues.spaceBetweenLayers / 2);
                    let endPositionBlock = (endBlockLayer.centerPosition[0] + (endBlockLayer.getShape()[0] / 2) + dynamicValues.spaceBetweenLayers / 2);

                    let length = endPositionBlock - initialPositionBlock;

                    let translationLength = (length / 2) - ((shape[0] / 2) + dynamicValues.spaceBetweenLayers / 2);
                    block.centerX = centerPosition[0] + translationLength;
                    mPush();
                    mTranslate(translationLength, 0, 0);
                    noFill();
                    blockColor = getBlockColor(layer.id);
                    mBlock(layer.id + dynamicValues.initialBlockId + 1, length, width, width, blockColor);
                    mPop();
                } else {
                    id = endBlockLayer !== undefined ? layer.id + dynamicValues.initialBlockId + 1 : -1;
                    color = getBlockColor(layer.id);
                }
            }
            mTexture(color[0], color[1], color[2]);
            mBox(id, shape[0], shape[1], shape[2]);
            drawArrowForArrow(layer, array);
        }
        mPop();
    }
}