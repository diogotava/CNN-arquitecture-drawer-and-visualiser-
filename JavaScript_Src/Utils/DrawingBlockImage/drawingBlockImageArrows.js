

function drawArrowBlockImage(halfShape, height) {
    mBlockImage.translate(halfShape + (height / 2) - dynamicValues.arrowHeight / 2, 0, 0);

    mBlockImage.push();
    mBlockImage.angleMode(DEGREES);
    mBlockImage.rotateZ(90);
    mBlockImage.fill(dynamicValues.colors.Arrow);
    mBlockImage.cylinder(dynamicValues.arrowWidth, height - dynamicValues.arrowHeight);
    mBlockImage.pop(mPageApply = false);

    mBlockImage.translate((height / 2), 0, 0);

    mBlockImage.rotateZ(-90);
    mBlockImage.fill(dynamicValues.colors.Arrow);
    mBlockImage.cone(dynamicValues.arrowPointRadius, dynamicValues.arrowHeight);
}

function drawFirstPartOfArrowMultipleBlockImage(layer, xPosition) {
    mBlockImage.translate((layer.getShape()[0] / 2) + (xPosition / 4), 0, 0);

    mBlockImage.push();
    mBlockImage.angleMode(DEGREES);
    mBlockImage.rotateZ(90);
    mBlockImage.fill(dynamicValues.colors.Arrow);
    mBlockImage.cylinder(dynamicValues.arrowWidth, xPosition / 2);
    mBlockImage.pop(mPageApply = false);
}

function drawArrowMultiplePreviousLayersOfNextLayerBlockImage(layer, nextLayer, xPosition, yPosition) {
    drawFirstPartOfArrowMultipleBlockImage(layer, xPosition);

    mBlockImage.translate((xPosition / 4), 0, yPosition / 2);

    mBlockImage.push();
    mBlockImage.rotateZ(90);
    mBlockImage.rotateX(90);
    mBlockImage.fill(dynamicValues.colors.Arrow);
    mBlockImage.cylinder(dynamicValues.arrowWidth, yPosition);
    mBlockImage.pop(mPageApply = false);

    mBlockImage.translate((dynamicValues.spaceBetweenLayers / 4) - (dynamicValues.arrowHeight / 2), 0, yPosition / 2);

    mBlockImage.push();
    mBlockImage.rotateZ(90);
    mBlockImage.fill(dynamicValues.colors.Arrow);
    mBlockImage.cylinder(dynamicValues.arrowWidth, dynamicValues.spaceBetweenLayers / 2 - dynamicValues.arrowHeight);
    mBlockImage.pop(mPageApply = false);
    mBlockImage.translate((dynamicValues.spaceBetweenLayers / 4), 0, 0);
    mBlockImage.rotateZ(-90);
    mBlockImage.fill(dynamicValues.colors.Arrow);
    mBlockImage.cone(dynamicValues.arrowPointRadius, dynamicValues.arrowHeight);
}

function drawArrowMultipleNextLayersBlockImage(layer, xPosition, layersToUse) {
    drawFirstPartOfArrowMultipleBlockImage(layer, xPosition);

    for (let nextLayerIndex of layer.nextLayers) {
        mBlockImage.push();
        let nextLayer = layersToUse[nextLayerIndex];

        let nextLayerYPosition = (nextLayer.centerPosition[2]) - (layer.centerPosition[2]);
        let nextLayerXPosition = (nextLayer.centerPosition[0] - nextLayer.getShape()[0] / 2) - (layer.centerPosition[0] + layer.getShape()[0] / 2);

        mBlockImage.translate((nextLayerXPosition / 4), 0, nextLayerYPosition / 2);

        mBlockImage.push();
        mBlockImage.rotateZ(90);
        mBlockImage.rotateX(90);
        mBlockImage.fill(dynamicValues.colors.Arrow);
        mBlockImage.cylinder(dynamicValues.arrowWidth, nextLayerYPosition);
        mBlockImage.pop(mPageApply = false);

        mBlockImage.translate((nextLayerXPosition / 4) - dynamicValues.arrowHeight / 2 + 0.1, 0, nextLayerYPosition / 2);

        mBlockImage.push();
        mBlockImage.rotateZ(90);
        mBlockImage.fill(dynamicValues.colors.Arrow);
        if (nextLayerXPosition > dynamicValues.spaceBetweenLayers)
            mBlockImage.cylinder(dynamicValues.arrowWidth, nextLayerXPosition - dynamicValues.spaceBetweenLayers / 2 - dynamicValues.arrowHeight / 2);
        else
            mBlockImage.cylinder(dynamicValues.arrowWidth, nextLayerXPosition / 2 - dynamicValues.arrowHeight);
        mBlockImage.pop(mPageApply = false);
        if (nextLayerXPosition <= dynamicValues.spaceBetweenLayers) {
            mBlockImage.translate((nextLayerXPosition / 4) - 0.1, 0, 0);
            mBlockImage.rotateZ(-90);
            mBlockImage.fill(dynamicValues.colors.Arrow);
            mBlockImage.cone(dynamicValues.arrowPointRadius, dynamicValues.arrowHeight);
        }
        mBlockImage.pop(mPageApply = false);
    }
}

function drawArrowForArrowBlockImage(layer, array) {
    mBlockImage.noStroke();
    mBlockImage.smooth();

    drawArrowRecursiveLayerBlockImage(layer);

    if (layer.nextLayers.length === 1) {
        let nextLayer = array[layer.nextLayers[0]];
        if (nextLayer.prevLayers.length <= 1) {
            mBlockImage.push();
            let height = (nextLayer.centerPosition[0] - nextLayer.getShape()[0] / 2) - (layer.centerPosition[0] + layer.getShape()[0] / 2);
            let halfShape = layer.getShape()[0] / 2;
            drawArrowBlockImage(halfShape, height);
            mBlockImage.pop(mPageApply = false);
        } else if (nextLayer.prevLayers.length > 1) {
            mBlockImage.push();
            let positionX = (nextLayer.centerPosition[0] - nextLayer.getShape()[0] / 2) - (layer.centerPosition[0] + layer.getShape()[0] / 2) +
                ((nextLayer.centerPosition[0] - dynamicValues.spaceBetweenLayers - nextLayer.getShape()[0] / 2) -
                    (layer.centerPosition[0] + layer.getShape()[0] / 2));
            let positionY = (nextLayer.centerPosition[2]) - (layer.centerPosition[2]);

            drawArrowMultiplePreviousLayersOfNextLayerBlockImage(layer, nextLayer, positionX, positionY);
            mBlockImage.pop(mPageApply = false);
        }
    } else if (layer.nextLayers.length > 1) {
        mBlockImage.push();
        mBlockImage.smooth();
        let positionX = (array[layer.nextLayers[0]].centerPosition[0] - array[layer.nextLayers[0]].getShape()[0] / 2) - (layer.centerPosition[0] + layer.getShape()[0] / 2);
        drawArrowMultipleNextLayersBlockImage(layer, positionX, array);
        mBlockImage.pop(mPageApply = false);
    }
}

function drawArrowRecursiveLayerBlockImage(layer) {
    if (!recursiveLayerTypes.includes(layer.type)) {
        return;
    }
    let color = [...dynamicValues.colors[layer.type]];

    mBlockImage.push();

    mBlockImage.translate((layer.getShape()[0] / 2 + (dynamicValues.spaceBetweenLayers - 0.5) / 4), 0, 1);
    mBlockImage.push();
    mBlockImage.angleMode(DEGREES);
    mBlockImage.rotateZ(90);
    mBlockImage.fill(color);
    mBlockImage.cylinder(dynamicValues.arrowWidth, (dynamicValues.spaceBetweenLayers - 0.5) / 2);
    mBlockImage.pop(mPageApply = false);

    mBlockImage.translate((dynamicValues.spaceBetweenLayers - 0.5) / 4, 0, (layer.getShape()[2] / 2 + 1) / 2);

    mBlockImage.push();
    mBlockImage.rotateZ(90);
    mBlockImage.rotateX(90);
    mBlockImage.fill(color);
    mBlockImage.cylinder(dynamicValues.arrowWidth, layer.getShape()[2] / 2 + 1);
    mBlockImage.pop(mPageApply = false);

    mBlockImage.translate(-((dynamicValues.spaceBetweenLayers - 0.5) + layer.getShape()[0]) / 2, 0, (layer.getShape()[2] / 2 + 1) / 2);

    mBlockImage.push();
    mBlockImage.rotateZ(90);
    mBlockImage.fill(color);
    mBlockImage.cylinder(dynamicValues.arrowWidth, (dynamicValues.spaceBetweenLayers - 0.5) + layer.getShape()[0]);
    mBlockImage.pop(mPageApply = false);

    mBlockImage.translate(-((dynamicValues.spaceBetweenLayers - 0.5) + layer.getShape()[0]) / 2, 0, -(layer.getShape()[2] / 2 + 1) / 2);

    mBlockImage.push();
    mBlockImage.rotateZ(90);
    mBlockImage.rotateX(90);
    mBlockImage.fill(color);
    mBlockImage.cylinder(dynamicValues.arrowWidth, layer.getShape()[2] / 2 + 1);
    mBlockImage.pop(mPageApply = false);

    mBlockImage.translate((dynamicValues.spaceBetweenLayers - 0.5) / 4 - 0.5, 0, -(layer.getShape()[2] / 2 + 1) / 2);

    mBlockImage.push();
    mBlockImage.angleMode(DEGREES);
    mBlockImage.rotateZ(90);
    mBlockImage.fill(color);
    mBlockImage.cylinder(dynamicValues.arrowWidth, (dynamicValues.spaceBetweenLayers - 0.5) / 2 - 0.7);
    mBlockImage.pop(mPageApply = false);

    mBlockImage.translate(((dynamicValues.spaceBetweenLayers + 0.5) / 4) - dynamicValues.arrowHeight / 2 + 0.25, 0, 0);

    mBlockImage.rotateZ(-90);
    mBlockImage.fill(color);
    mBlockImage.cone(dynamicValues.arrowPointRadius, dynamicValues.arrowHeight);
    mBlockImage.pop(mPageApply = false);
}