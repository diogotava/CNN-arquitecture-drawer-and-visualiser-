class Layer {
    constructor(layer, copy = false) {
        this.id = layer.id;
        this.name = layer.name;
        this.type = layer.type;
        this.invertedShape = layer.invertedShape;
        this.activation = layer.activation;
        this.lastNegativeYPosition = 0;
        this.lastPositiveYPosition = 0;
        if (copy) {
            this.selected = layer.selected;
            this.centerPosition = layer.centerPosition;
            this.shape = layer.shape;
            this.prevLayers = layer.prevLayers;
            this.nextLayers = layer.nextLayers;
            this.activation = layer.activation;
            this.inputShape = layer.inputShape;
            this.outputShape = layer.outputShape;
            this.previousYPosition = layer.previousYPosition;
            this.batchNormalization = layer.batchNormalization;
            this.shouldBeDrawn = layer.shouldBeDrawn;
            this.shouldBeBlock = layer.shouldBeBlock;

        } else {
            this.selected = false;
            this.centerPosition = [0, 0, 0];
            if (layer.type === "Dense" && layer.shape[0] === dynamicValues.minX && layer.shape[1] === dynamicValues.minZY)
                this.shape = [layer.shape[0], layer.shape[2], layer.shape[1]];
            else
                this.shape = layer.shape;

            this.prevLayers = layer.previous_layers;
            this.nextLayers = layer.next_layers;
            this.activation = null;
            this.inputShape = layer.input_shape;
            this.outputShape = layer.output_shape;
            this.previousYPosition = 0;
            this.batchNormalization = layer.batch_normalization;
            this.shouldBeDrawn = true;
            this.shouldBeBlock = false;
            this.isInsideBlock = false;
        }
    }

    setXPosition(xPosition) {
        this.centerPosition[0] = xPosition + (this.getShape()[0] / 2) + dynamicValues.defaultSpaceBetweenLayers;
    }

    setXPositionOfBeginBlockLayer(xPosition) {
        this.shape = [dynamicValues.blockSize, dynamicValues.blockSize, dynamicValues.blockSize];
        this.centerPosition[0] = xPosition + (this.getShape()[0] / 2) + dynamicValues.defaultSpaceBetweenLayers;
    }

    setXPositionInternalBlockLayer(xPosition) {
        this.shape = [dynamicValues.blockSize, dynamicValues.blockSize, dynamicValues.blockSize];
        this.centerPosition[0] = xPosition - dynamicValues.blockSize / 2;
        this.isInsideBlock = true;
    }

    isLayerInsideBlock() {
        return this.isInsideBlock;
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

    getShape() {
        const typeOfDimension = document.getElementById('dimensionType');

        let layerShape = [];

        switch (typeOfDimension.value) {
            case "Exponential":
                layerShape = this.shape;
                break;
            case "Real":
                // layerShape = this.outputShape;
                let indexX = 0
                let indexY = 1
                let indexZ = 2

                if (this.invertedShape) {
                    indexX = 2
                    indexY = 0
                    indexZ = 1
                }
                layerShape[0] = this.outputShape[0][indexX];
                layerShape[1] = this.outputShape[0][indexY];
                layerShape[2] = this.outputShape[0][indexZ];
                break;
            case "Linear":
                layerShape[0] = dynamicValues.minX;
                layerShape[1] = dynamicValues.minZY;
                layerShape[2] = dynamicValues.minZY;
                break;
            default:
                break;
        }

        if (layerShape.length === 0) {
            layerShape[0] = dynamicValues.minX;
            layerShape[1] = dynamicValues.minZY;
            layerShape[2] = dynamicValues.minZY;
        }

        return layerShape;
    }
}