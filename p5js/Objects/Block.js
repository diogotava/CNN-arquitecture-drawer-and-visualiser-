class Block {
    constructor(initialLayer, endLayer) {
        if(initialLayer < endLayer){
            this.initialLayer = initialLayer;
            this.endLayer = endLayer;
        }else{
            this.initialLayer = endLayer;
            this.endLayer = initialLayer;
        }

        this.name = "";
    }

    setName(name){
        this.name = name;
    }

    getName(){
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