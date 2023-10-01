function drawLayerBlockImage(layer, array) {
    if (layer.shouldBeDrawn || layer.shouldBeBlock) {
        let centerPosition = [...layer.centerPosition]

        let shape = layer.getShape();

        mBlockImage.push();
        mBlockImage.translate(centerPosition[0], centerPosition[1], centerPosition[2]);

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
                    mBlockImage.push();
                    mBlockImage.translate(translationLength, 0, 0);
                    mBlockImage.noFill();
                    blockColor = getBlockColor(layer.id);
                    mBlockImage.smooth();
                    mBlockImage.strokeWeight(dynamicValues.strokeWeight);
                    mBlockImage.stroke(blockColor[0], blockColor[1], blockColor[2])
                    mBlockImage.box(length, width, width);
                    mBlockImage.pop();
                } else {
                    id = endBlockLayer !== undefined ? layer.id + dynamicValues.initialBlockId + 1 : -1;
                    color = getBlockColor(layer.id);
                }
            }
            mBlockImage.fill(color[0], color[1], color[2]);
            mBlockImage.box(shape[0], shape[1], shape[2]);
            drawArrowForArrowBlockImage(layer, array);
        }
        mBlockImage.pop();
    }
}