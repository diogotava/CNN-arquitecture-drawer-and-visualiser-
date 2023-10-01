function drawArrow(halfShape, height) {
    mTranslateWithoutMPage(halfShape + (height / 2) - dynamicValues.arrowHeight / 2, 0, 0);

    mPush(mPageApply = false);
    mAngleModeDegrees();
    mRotateZ(90);
    mTexture(0);
    mCylinder(dynamicValues.arrowWidth, height - dynamicValues.arrowHeight);
    mPop(mPageApply = false);

    mTranslateWithoutMPage((height / 2), 0, 0);

    mRotateZ(-90);
    mTexture(0);
    mCone(dynamicValues.arrowPointRadius, dynamicValues.arrowHeight);
}

function drawFirstPartOfArrowMultiple(layer, xPosition) {
    mTranslateWithoutMPage((layer.getShape()[0] / 2) + (xPosition / 4), 0, 0);

    mPush(mPageApply = false);
    mAngleModeDegrees();
    mRotateZ(90);
    mTexture(0);
    mCylinder(dynamicValues.arrowWidth, xPosition / 2);
    mPop(mPageApply = false);
}

function drawArrowMultiplePreviousLayersOfNextLayer(layer, nextLayer, xPosition, yPosition) {
    drawFirstPartOfArrowMultiple(layer, xPosition);

    mTranslateWithoutMPage((xPosition / 4), 0, yPosition / 2);

    mPush(mPageApply = false);
    mRotateZ(90);
    mRotateX(90);
    mTexture(0);
    mCylinder(dynamicValues.arrowWidth, yPosition);
    mPop(mPageApply = false);

    mTranslateWithoutMPage((dynamicValues.spaceBetweenLayers / 4) - (dynamicValues.arrowHeight / 2), 0, yPosition / 2);

    mPush(mPageApply = false);
    mRotateZ(90);
    mTexture(0);
    mCylinder(dynamicValues.arrowWidth, dynamicValues.spaceBetweenLayers / 2 - dynamicValues.arrowHeight);
    mPop(mPageApply = false);
    mTranslateWithoutMPage((dynamicValues.spaceBetweenLayers / 4), 0, 0);
    mRotateZ(-90);
    mTexture(0);
    mCone(dynamicValues.arrowPointRadius, dynamicValues.arrowHeight);
}

function drawArrowMultipleNextLayers(layer, xPosition) {
    drawFirstPartOfArrowMultiple(layer, xPosition);

    for (let nextLayerIndex of layer.nextLayers) {
        mPush(mPageApply = false);
        let nextLayer = layers[nextLayerIndex];

        let nextLayerYPosition = (nextLayer.centerPosition[2]) - (layer.centerPosition[2]);
        let nextLayerXPosition = (nextLayer.centerPosition[0] - nextLayer.getShape()[0] / 2) - (layer.centerPosition[0] + layer.getShape()[0] / 2);

        mTranslateWithoutMPage((nextLayerXPosition / 4), 0, nextLayerYPosition / 2);

        mPush(mPageApply = false);
        mRotateZ(90);
        mRotateX(90);
        mTexture(0);
        mCylinder(dynamicValues.arrowWidth, nextLayerYPosition);
        mPop(mPageApply = false);

        mTranslateWithoutMPage((nextLayerXPosition / 4) - dynamicValues.arrowHeight / 2 + 0.1, 0, nextLayerYPosition / 2);

        mPush(mPageApply = false);
        mRotateZ(90);
        mTexture(0);
        if (nextLayerXPosition > dynamicValues.spaceBetweenLayers)
            mCylinder(dynamicValues.arrowWidth, nextLayerXPosition - dynamicValues.spaceBetweenLayers / 2 - dynamicValues.arrowHeight / 2);
        else
            mCylinder(dynamicValues.arrowWidth, nextLayerXPosition / 2 - dynamicValues.arrowHeight);
        mPop(mPageApply = false);
        if (nextLayerXPosition <= dynamicValues.spaceBetweenLayers) {
            mTranslateWithoutMPage((nextLayerXPosition / 4) - 0.1, 0, 0);
            mRotateZ(-90);
            mTexture(0);
            mCone(dynamicValues.arrowPointRadius, dynamicValues.arrowHeight);
        }
        mPop(mPageApply = false);
    }
}

function drawArrowForArrow(layer, array) {
    noStroke();
    smooth();

    drawArrowRecursiveLayer(layer);

    if (layer.nextLayers.length === 1) {
        let nextLayer = array[layer.nextLayers[0]];
        if (nextLayer.prevLayers.length <= 1) {
            mPush(mPageApply = false);
            let height = (nextLayer.centerPosition[0] - nextLayer.getShape()[0] / 2) - (layer.centerPosition[0] + layer.getShape()[0] / 2);
            let halfShape = layer.getShape()[0] / 2;
            drawArrow(halfShape, height);
            mPop(mPageApply = false);
        } else if (nextLayer.prevLayers.length > 1) {
            mPush(mPageApply = false);
            let positionX = (nextLayer.centerPosition[0] - nextLayer.getShape()[0] / 2) - (layer.centerPosition[0] + layer.getShape()[0] / 2) +
                ((nextLayer.centerPosition[0] - dynamicValues.spaceBetweenLayers - nextLayer.getShape()[0] / 2) -
                    (layer.centerPosition[0] + layer.getShape()[0] / 2));
            let positionY = (nextLayer.centerPosition[2]) - (layer.centerPosition[2]);

            drawArrowMultiplePreviousLayersOfNextLayer(layer, nextLayer, positionX, positionY);
            mPop(mPageApply = false);
        }
    } else if (layer.nextLayers.length > 1) {
        mPush(mPageApply = false);
        smooth();
        let positionX = (array[layer.nextLayers[0]].centerPosition[0] - array[layer.nextLayers[0]].getShape()[0] / 2) - (layer.centerPosition[0] + layer.getShape()[0] / 2);
        drawArrowMultipleNextLayers(layer, positionX);
        mPop(mPageApply = false);
    }
}

function drawArrowRecursiveLayer(layer) {
    if (!recursiveLayerTypes.includes(layer.type)) {
        return;
    }
    let color = [...dynamicValues.colors[layer.type]];

    mPush(mPageApply = false);

    mTranslateWithoutMPage((layer.getShape()[0] / 2 + (dynamicValues.spaceBetweenLayers - 0.5) / 4), 0, 1);
    mPush(mPageApply = false);
    mAngleModeDegrees();
    mRotateZ(90);
    mTexture(color);
    mCylinder(dynamicValues.arrowWidth, (dynamicValues.spaceBetweenLayers - 0.5) / 2);
    mPop(mPageApply = false);

    mTranslateWithoutMPage((dynamicValues.spaceBetweenLayers - 0.5) / 4, 0, (layer.getShape()[2] / 2 + 1) / 2);

    mPush(mPageApply = false);
    mRotateZ(90);
    mRotateX(90);
    mTexture(color);
    mCylinder(dynamicValues.arrowWidth, layer.getShape()[2] / 2 + 1);
    mPop(mPageApply = false);

    mTranslateWithoutMPage(-((dynamicValues.spaceBetweenLayers - 0.5) + layer.getShape()[0]) / 2, 0, (layer.getShape()[2] / 2 + 1) / 2);

    mPush(mPageApply = false);
    mRotateZ(90);
    mTexture(color);
    mCylinder(dynamicValues.arrowWidth, (dynamicValues.spaceBetweenLayers - 0.5) + layer.getShape()[0]);
    mPop(mPageApply = false);

    mTranslateWithoutMPage(-((dynamicValues.spaceBetweenLayers - 0.5) + layer.getShape()[0]) / 2, 0, -(layer.getShape()[2] / 2 + 1) / 2);

    mPush(mPageApply = false);
    mRotateZ(90);
    mRotateX(90);
    mTexture(color);
    mCylinder(dynamicValues.arrowWidth, layer.getShape()[2] / 2 + 1);
    mPop(mPageApply = false);

    mTranslateWithoutMPage((dynamicValues.spaceBetweenLayers - 0.5) / 4 - 0.5, 0, -(layer.getShape()[2] / 2 + 1) / 2);

    mPush(mPageApply = false);
    mAngleModeDegrees();
    mRotateZ(90);
    mTexture(color);
    mCylinder(dynamicValues.arrowWidth, (dynamicValues.spaceBetweenLayers - 0.5) / 2 - 0.7);
    mPop(mPageApply = false);

    mTranslateWithoutMPage(((dynamicValues.spaceBetweenLayers + 0.5) / 4) - dynamicValues.arrowHeight / 2 + 0.25, 0, 0);

    mRotateZ(-90);
    mTexture(color);
    mCone(dynamicValues.arrowPointRadius, dynamicValues.arrowHeight);
    mPop(mPageApply = false);
}