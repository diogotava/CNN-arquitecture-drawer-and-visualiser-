recursiveLayerTypes = ["LSTM", "GRU", "SimpleRNN", "TimeDistributed", "Bidirectional", "ConvLSTM1D", "ConvLSTM2D", "ConvLSTM3D", "BaseRNN"];

function drawArrow(halfShape, height) {
    translate(halfShape + (height / 2) - dynamicValues.arrowHeight / 2, 0, 0);

    push();
    angleMode(DEGREES);
    rotateZ(90);
    fill(0);
    cylinder(dynamicValues.arrowWidth, height - dynamicValues.arrowHeight);
    pop();

    translate((height / 2), 0, 0);

    rotateZ(-90);
    fill(0);
    cone(dynamicValues.arrowPointRadius, dynamicValues.arrowHeight);
}

function drawFirstPartOfArrowMultiple(layer, xPosition) {
    translate((layer.getShape()[0] / 2) + (xPosition / 4), 0, 0);

    push();
    angleMode(DEGREES);
    rotateZ(90);
    fill(0);
    cylinder(dynamicValues.arrowWidth, xPosition / 2);
    pop();
}

function drawArrowMultiplePreviousLayersOfNextLayer(layer, nextLayer, xPosition, yPosition) {
    drawFirstPartOfArrowMultiple(layer, xPosition);

    translate((xPosition / 4), 0, yPosition / 2);

    push();
    rotateZ(90);
    rotateX(90);
    fill(0);
    cylinder(dynamicValues.arrowWidth, yPosition);
    pop();

    translate((dynamicValues.defaultSpaceBetweenLayers / 4) - (dynamicValues.arrowHeight / 2), 0, yPosition / 2);

    push();
    rotateZ(90);
    fill(0);
    cylinder(dynamicValues.arrowWidth, dynamicValues.defaultSpaceBetweenLayers / 2 - dynamicValues.arrowHeight);
    pop();
    translate((dynamicValues.defaultSpaceBetweenLayers / 4), 0, 0);
    rotateZ(-90);
    fill(0);
    cone(dynamicValues.arrowPointRadius, dynamicValues.arrowHeight);
}

function drawArrowMultipleNextLayers(layer, xPosition) {
    drawFirstPartOfArrowMultiple(layer, xPosition);

    for (let nextLayerIndex of layer.nextLayers) {
        push();
        let nextLayer = layers[nextLayerIndex];

        let nextLayerYPosition = (nextLayer.centerPosition[2]) - (layer.centerPosition[2]);
        let nextLayerXPosition = (nextLayer.centerPosition[0] - nextLayer.getShape()[0] / 2) - (layer.centerPosition[0] + layer.getShape()[0] / 2);

        translate((nextLayerXPosition / 4), 0, nextLayerYPosition / 2);

        push();
        rotateZ(90);
        rotateX(90);
        fill(0);
        cylinder(dynamicValues.arrowWidth, nextLayerYPosition);
        pop();

        translate((nextLayerXPosition / 4) - dynamicValues.arrowHeight / 2 + 0.1, 0, nextLayerYPosition / 2);

        push();
        rotateZ(90);
        fill(0);
        if (nextLayerXPosition > dynamicValues.defaultSpaceBetweenLayers)
            cylinder(dynamicValues.arrowWidth, nextLayerXPosition - dynamicValues.defaultSpaceBetweenLayers / 2 - dynamicValues.arrowHeight / 2);
        else
            cylinder(dynamicValues.arrowWidth, nextLayerXPosition / 2 - dynamicValues.arrowHeight);
        pop();
        if (nextLayerXPosition <= dynamicValues.defaultSpaceBetweenLayers) {
            translate((nextLayerXPosition / 4) - 0.1, 0, 0);
            rotateZ(-90);
            fill(0);
            cone(dynamicValues.arrowPointRadius, dynamicValues.arrowHeight);
        }
        pop();
    }
    pop();
}

function drawArrowForArrow(layer, array) {
    noStroke();
    smooth();

    drawArrowRecursiveLayer(layer);

    if (layer.nextLayers.length === 1) {
        let nextLayer = array[layer.nextLayers[0]];
        if (nextLayer.prevLayers.length <= 1) {
            push();
            let height = (nextLayer.centerPosition[0] - nextLayer.getShape()[0] / 2) - (layer.centerPosition[0] + layer.getShape()[0] / 2);
            let halfShape = layer.getShape()[0] / 2;
            drawArrow(halfShape, height);
            pop();
        } else if (nextLayer.prevLayers.length > 1) {
            push();
            let positionX = (nextLayer.centerPosition[0] - nextLayer.getShape()[0] / 2) - (layer.centerPosition[0] + layer.getShape()[0] / 2) +
                ((nextLayer.centerPosition[0] - dynamicValues.defaultSpaceBetweenLayers - nextLayer.getShape()[0] / 2) -
                    (layer.centerPosition[0] + layer.getShape()[0] / 2));
            let positionY = (nextLayer.centerPosition[2]) - (layer.centerPosition[2]);

            drawArrowMultiplePreviousLayersOfNextLayer(layer, nextLayer, positionX, positionY);
            pop();
        }
    } else if (layer.nextLayers.length > 1) {
        push();
        smooth();
        let positionX = (array[layer.nextLayers[0]].centerPosition[0] - array[layer.nextLayers[0]].getShape()[0] / 2) - (layer.centerPosition[0] + layer.getShape()[0] / 2);
        drawArrowMultipleNextLayers(layer, positionX);

    }
}

function drawArrowRecursiveLayer(layer) {
    if (!recursiveLayerTypes.includes(layer.type)) {
        return;
    }
    let color = [...dynamicValues.colors[layer.type]];

    push();

    translate((layer.getShape()[0] / 2 + (dynamicValues.defaultSpaceBetweenLayers - 0.5) / 4), 0, 1);
    push();
    angleMode(DEGREES);
    rotateZ(90);
    fill(color);
    cylinder(dynamicValues.arrowWidth, (dynamicValues.defaultSpaceBetweenLayers - 0.5) / 2);
    pop();

    translate((dynamicValues.defaultSpaceBetweenLayers - 0.5) / 4, 0, (layer.getShape()[2] / 2 + 1) / 2);

    push();
    rotateZ(90);
    rotateX(90);
    fill(color);
    cylinder(dynamicValues.arrowWidth, layer.getShape()[2] / 2 + 1);
    pop();

    translate(-((dynamicValues.defaultSpaceBetweenLayers - 0.5) + layer.getShape()[0]) / 2, 0, (layer.getShape()[2] / 2 + 1) / 2);

    push();
    rotateZ(90);
    fill(color);
    cylinder(dynamicValues.arrowWidth, (dynamicValues.defaultSpaceBetweenLayers - 0.5) + layer.getShape()[0]);
    pop();

    translate(-((dynamicValues.defaultSpaceBetweenLayers - 0.5) + layer.getShape()[0]) / 2, 0, -(layer.getShape()[2] / 2 + 1) / 2);

    push();
    rotateZ(90);
    rotateX(90);
    fill(color);
    cylinder(dynamicValues.arrowWidth, layer.getShape()[2] / 2 + 1);
    pop();

    translate((dynamicValues.defaultSpaceBetweenLayers - 0.5) / 4 - 0.5, 0, -(layer.getShape()[2] / 2 + 1) / 2);

    push();
    angleMode(DEGREES);
    rotateZ(90);
    fill(color);
    cylinder(dynamicValues.arrowWidth, (dynamicValues.defaultSpaceBetweenLayers - 0.5) / 2 - 0.7);
    pop();

    translate(((dynamicValues.defaultSpaceBetweenLayers + 0.5) / 4) - dynamicValues.arrowHeight / 2 + 0.25, 0, 0);

    rotateZ(-90);
    fill(color);
    cone(dynamicValues.arrowPointRadius, dynamicValues.arrowHeight);
    pop();
}