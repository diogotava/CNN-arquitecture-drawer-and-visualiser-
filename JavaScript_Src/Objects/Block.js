class Block {
    constructor(initialLayer, endLayer) {
        if (initialLayer < endLayer) {
            this.initialLayer = initialLayer;
            this.endLayer = endLayer;
        } else {
            this.initialLayer = endLayer;
            this.endLayer = initialLayer;
        }

        this.name = "";
        this.type = "";
        this.color = dynamicValues.colors.Block;
        this.drawInterior = false;
        this.centerX = 0;
    }

    setColor(color) {
        if (color.length === 3)
            this.color = [...color];
    }

    getColor() {
        return this.color;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    isEqual(other) {
        // Compare attribute values
        return (
            this.initialLayer === other.initialLayer &&
            this.endLayer === other.endLayer
        );
    }
}