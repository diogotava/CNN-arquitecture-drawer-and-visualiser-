class Layer {
    constructor(layer, copy = false) {
        if (copy) {
            this.selected = layer.selected;
            this.id = layer.id;
            this.lateralSpaceBetweenLayers = layer.lateralSpaceBetweenLayers;
            this.spaceBetweenLayers = layer.spaceBetweenLayers;
            this.centerPosition = layer.centerPosition;
            this.name = layer.name;
            this.shape = layer.shape;
            this.prevLayers = layer.prevLayers;
            this.nextLayers = layer.nextLayers;
            this.activation = layer.activation;
            this.type = layer.type;
            this.inputShape = layer.inputShape;
            this.outputShape = layer.outputShape;
            this.previousYPosition = layer.previousYPosition;
            this.activation = layer.activation;
            this.batchNormalization = layer.batchNormalization;
            this.shouldBeDrawn = layer.shouldBeDrawn;
            this.shouldBeBlock = layer.shouldBeBlock;
        } else {
            this.selected = false;
            this.id = layer.id
            this.lateralSpaceBetweenLayers = 10;
            this.spaceBetweenLayers = 5;
            this.centerPosition = [0, 0, 0];
            this.name = layer.name;
            this.shape = layer.shape;
            this.prevLayers = layer.previous_layers;
            this.nextLayers = layer.next_layers;
            this.activation = null;
            this.type = layer.type;
            this.inputShape = layer.input_shape;
            this.outputShape = layer.output_shape;
            this.previousYPosition = 0;
            this.activation = layer.activation;
            this.batchNormalization = layer.batch_normalization;
            this.shouldBeDrawn = true;
            this.shouldBeBlock = false;
        }
    }

    setXPositionOfLayer(xPosition) {
        this.centerPosition[0] = xPosition + (this.shape[0] / 2) + this.spaceBetweenLayers;
    }

    setXPositionOfBeginBlockLayer(xPosition) {
        this.shape = [dynamicValues.blockSize, dynamicValues.blockSize, dynamicValues.blockSize];
        this.centerPosition[0] = xPosition + (this.shape[0] / 2) + this.spaceBetweenLayers;
    }

    setXPositionInternalBlockLayer(xPosition) {
        this.shape = [dynamicValues.blockSize, dynamicValues.blockSize, dynamicValues.blockSize];
        this.centerPosition[0] = xPosition - dynamicValues.blockSize / 2;
    }


    setYPosition(yPosition) {
        this.centerPosition[2] = yPosition;
    }

    getYPosition() {
        return this.centerPosition[2];
    }

    copy() {
        return new Layer(this, true);
    }
}