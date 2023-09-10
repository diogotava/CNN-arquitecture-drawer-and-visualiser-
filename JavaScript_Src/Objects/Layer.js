class Layer {
    constructor(layer, copy = false) {
        this.id = layer.id;
        this.name = layer.name;
        this.type = layer.type;
        this.invertedShape = layer.invertedShape;
        this.activation = layer.activation;
        this.lastNegativeYPosition = 0;
        this.lastPositiveYPosition = 0;
        this.model_inside_model = layer.model_inside_model;
        this.model_name = layer.model_name;

        if (copy) {
            this.selected = layer.selected;
            this.centerPosition = layer.centerPosition;
            this.shape = [...layer.shape];
            this.prevLayers = layer.prevLayers;
            this.nextLayers = layer.nextLayers;
            this.activation = layer.activation;
            this.inputShape = layer.inputShape;
            this.outputShape = layer.outputShape;
            this.previousYPosition = layer.previousYPosition;
            this.batchNormalization = layer.batchNormalization;
            this.layers = layer.layers;

        } else {
            this.selected = false;
            this.centerPosition = [0, 0, 0];
            if (layer.type === "Dense" && layer.shape[0] === dynamicValues.minLength && layer.shape[1] === dynamicValues.minWidth)
                this.shape = [layer.shape[0], layer.shape[2], layer.shape[1]];
            else {
                this.shape = [...layer.shape];
            }
            this.prevLayers = layer.previous_layers;
            this.nextLayers = layer.next_layers;
            this.inputShape = layer.input_shape;
            this.outputShape = layer.output_shape;
            this.previousYPosition = 0;
            this.batchNormalization = layer.batch_normalization;
            this.layers = layer.layers;
            this.shouldBeDrawn = true;
            this.shouldBeBlock = false;
            this.isInsideBlock = false;
        }
    }

    setXPosition(xPosition) {
        this.centerPosition[0] = xPosition + (this.getShape()[0] / 2) + dynamicValues.spaceBetweenLayers;
    }

    setXPositionOfBeginBlockLayer(xPosition) {
        this.shape = [dynamicValues.blockSize, dynamicValues.blockSize, dynamicValues.blockSize];
        this.centerPosition[0] = xPosition + (this.getShape()[0] / 2) + dynamicValues.spaceBetweenLayers;
    }

    setXPositionInternalBlockLayer(xPosition) {
        this.shape = [dynamicValues.blockSize, dynamicValues.blockSize, dynamicValues.blockSize];
        this.centerPosition[0] = xPosition;
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
                layerShape = [...this.shape];
                if (layerShape[0] >= dynamicValues.minLength * 2)
                    layerShape[0] = layerShape[0] / Math.log(layerShape[0])
                if (layerShape[1] >= dynamicValues.minWidth * 2)
                    layerShape[1] = layerShape[1] / Math.log(layerShape[1])
                if (layerShape[2] >= dynamicValues.minWidth * 2)
                    layerShape[2] = layerShape[2] / Math.log(layerShape[2])
                break;
            case "Real":
                layerShape = [...this.shape];
                break;
            case "Linear":
                layerShape[0] = dynamicValues.minLength;
                layerShape[1] = dynamicValues.minWidth;
                layerShape[2] = dynamicValues.minWidth;
                break;
            default:
                break;
        }

        if (layerShape.length === 0) {
            layerShape[0] = dynamicValues.minLength;
            layerShape[1] = dynamicValues.minWidth;
            layerShape[2] = dynamicValues.minWidth;
        }

        layerShape[0] = Math.min(Math.max(layerShape[0], dynamicValues.minLength), dynamicValues.maxLength);
        layerShape[1] = Math.min(Math.max(layerShape[1], dynamicValues.minWidth), dynamicValues.maxWidth);
        layerShape[2] = Math.min(Math.max(layerShape[2], dynamicValues.minWidth), dynamicValues.maxWidth);

        return layerShape;
    }
}