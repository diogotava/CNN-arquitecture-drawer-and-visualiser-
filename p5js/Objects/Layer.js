class Layer {
    constructor(layer) {
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
    }

    setXPosition(xPosition) {
        this.centerPosition[0] = xPosition + (this.shape[0] / 2) + this.spaceBetweenLayers;
    }

    setYPosition(yPosition) {
        this.centerPosition[2] = yPosition;
    }

    getYPosition() {
        return this.centerPosition[2];
    }
}