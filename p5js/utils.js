var selectedLayer = -1;

function draw_layer(layer, index, array) {
    mPush();
    mTranslate(layer.center_position[0], layer.center_position[1], layer.center_position[2]);

    if (layer.selected)
        mTexture(0, 0, 255);
    else
        mTexture(layer.color[0], layer.color[1], layer.color[2]);

    mBox(layer.id + 1, layer.shape[0], layer.shape[1], layer.shape[2]);
    let mArrowWidth = 0.1;
    let mArrowHeight = 1;
    if (layer.next_layers.length == 1) {
        let next_layer = array[layer.next_layers[0]];
        if (next_layer.previous_layers.length <= 1) {
            push();
            let positionX = (next_layer.center_position[0] - next_layer.shape[0] / 2) - (layer.center_position[0] + layer.shape[0] / 2);
            translate((layer.shape[0] / 2) + (positionX / 2) - 0.5, 0, 0);
            push();
            angleMode(DEGREES);
            rotateZ(90);
            fill(0);
            cylinder(mArrowWidth, positionX);
            pop();
            translate((positionX / 2) - mArrowHeight / 2 + 0.5, 0, 0);
            rotateZ(-90);
            fill(0);
            cone(0.5, mArrowHeight);
            pop();
        } else if (next_layer.previous_layers.length > 1) {
            push();
            let positionX = (next_layer.center_position[0] - next_layer.shape[0] / 2) - (layer.center_position[0] + layer.shape[0] / 2);
            let positionY = (next_layer.center_position[2]) - (layer.center_position[2]);
            translate((layer.shape[0] / 2) + (positionX / 4), 0, 0);
            push();
            angleMode(DEGREES);
            rotateZ(90);
            fill(0);
            cylinder(mArrowWidth, positionX / 2);
            pop();
            translate((positionX / 4), 0, positionY / 2);
            push();
            rotateZ(90);
            rotateX(90);
            fill(0);
            cylinder(mArrowWidth, positionY);
            pop();
            translate((positionX / 4) - 0.5, 0, positionY / 2);
            push();
            rotateZ(90);
            fill(0);
            cylinder(mArrowWidth, positionX / 2 - 1);
            pop();
            translate((positionX / 4) - mArrowHeight / 2 + 0.5, 0, 0);
            rotateZ(-90);
            fill(0);
            cone(0.5, mArrowHeight);
            pop();
        }
    } else if (layer.next_layers.length > 1) {
        push();
        let positionX = (array[layer.next_layers[0]].center_position[0] - array[layer.next_layers[0]].shape[0] / 2) - (layer.center_position[0] + layer.shape[0] / 2);
        translate((layer.shape[0] / 2) + (positionX / 4), 0, 0);
        push();
        angleMode(DEGREES);
        rotateZ(90);
        fill(0);
        cylinder(mArrowWidth, positionX / 2);
        pop();
        for (let n_layer of layer.next_layers) {
            push();
            let next_layer = array[n_layer];

            let positionY = (next_layer.center_position[2]) - (layer.center_position[2]);
            let positionX = (next_layer.center_position[0] - next_layer.shape[0] / 2) - (layer.center_position[0] + layer.shape[0] / 2);
            translate((positionX / 4), 0, positionY / 2);
            push();
            rotateZ(90);
            rotateX(90);
            fill(0);
            cylinder(mArrowWidth, positionY);
            pop();
            translate((positionX / 4) - 0.5, 0, positionY / 2);
            push();
            rotateZ(90);
            fill(0);
            if (positionX > next_layer.space_between_layers)
                cylinder(mArrowWidth, positionX - next_layer.space_between_layers / 2);
            else
                cylinder(mArrowWidth, positionX / 2 - 1);
            pop();
            if (positionX <= next_layer.space_between_layers) {
                translate((positionX / 4) - mArrowHeight / 2 + 0.5, 0, 0);
                rotateZ(-90);
                fill(0);
                cone(0.5, mArrowHeight);
            }
            pop();
        }
        pop();
    }
    mPop();
}

function keyPressed() {
    if (keyIsDown(67)) { // C
        var id = getLayerId();
        console.log(id);
        if (id != -1) {
            if (selectedLayer != -1)
                layers[selectedLayer].selected = false;
            layers[id].selected = true;
            selectedLayer = id;
        } else {
            if (selectedLayer != -1)
                layers[selectedLayer].selected = false;
            selectedLayer = -1;
        }
    }
}