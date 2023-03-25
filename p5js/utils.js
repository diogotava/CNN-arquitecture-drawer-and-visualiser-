var selectedLayer = -1;

function draw_layer(layer, index, array) {
    mPush();
    mTranslate(layer.center_position[0], layer.center_position[1], layer.center_position[2]);
    var color = [];

    if (layer.selected)
        color = values.colors.Selected;
    else {
        color = values.colors[layer.type];
        if (color == undefined) {
            color = values.colors.Default;
        }
    }
    mTexture(color[0], color[1], color[2]);

    mBox(layer.id + 1, layer.shape[0], layer.shape[1], layer.shape[2]);

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
            cylinder(values.mArrowWidth, positionX);
            pop();
            translate((positionX / 2) - values.mArrowHeight / 2 + 0.5, 0, 0);
            rotateZ(-90);
            fill(0);
            cone(0.5, values.mArrowHeight);
            pop();
        } else if (next_layer.previous_layers.length > 1) {
            push();
            let positionX = (next_layer.center_position[0] - next_layer.shape[0] / 2) - (layer.center_position[0] + layer.shape[0] / 2) + ((next_layer.center_position[0] - next_layer.space_between_layers - next_layer.shape[0] / 2) - (layer.center_position[0] + layer.shape[0] / 2));
            let positionY = (next_layer.center_position[2]) - (layer.center_position[2]);
            translate((layer.shape[0] / 2) + (positionX / 4), 0, 0);
            push();
            angleMode(DEGREES);
            rotateZ(90);
            fill(0);
            cylinder(values.mArrowWidth, positionX / 2);
            pop();
            translate((positionX / 4), 0, positionY / 2);
            push();
            rotateZ(90);
            rotateX(90);
            fill(0);
            cylinder(values.mArrowWidth, positionY);
            pop();
            translate((positionX / 4) - 0.5, 0, positionY / 2);
            push();
            rotateZ(90);
            fill(0);
            cylinder(values.mArrowWidth, positionX / 2 - 1);
            pop();
            translate((positionX / 4) - values.mArrowHeight / 2 + 0.5, 0, 0);
            rotateZ(-90);
            fill(0);
            cone(0.5, values.mArrowHeight);
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
        cylinder(values.mArrowWidth, positionX / 2);
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
            cylinder(values.mArrowWidth, positionY);
            pop();
            translate((positionX / 4) - 0.5, 0, positionY / 2);
            push();
            rotateZ(90);
            fill(0);
            if (positionX > next_layer.space_between_layers)
                cylinder(values.mArrowWidth, positionX - next_layer.space_between_layers / 2);
            else
                cylinder(values.mArrowWidth, positionX / 2 - 1);
            pop();
            if (positionX <= next_layer.space_between_layers) {
                translate((positionX / 4) - values.mArrowHeight / 2 + 0.5, 0, 0);
                rotateZ(-90);
                fill(0);
                cone(0.5, values.mArrowHeight);
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
        selectedText();
    }
}

function selectedText() {
    var nothing_selected_h2 = select('#nothing_selected_h2');
    var selected_h2 = select('#selected_h2');
    var type_p = select('#type');
    var input_shape = select('#input_shape');
    var output_shape = select('#output_shape');

    if (selectedLayer == -1) {
        nothing_selected_h2.elt.hidden = false;
        selected_h2.elt.hidden = true;
        type_p.elt.hidden = true;
        input_shape.elt.hidden = true;
        output_shape.elt.hidden = true;
    } else {
        var selected_layer = layers[selectedLayer];
        nothing_selected_h2.elt.hidden = true;

        selected_h2.elt.hidden = false;
        type_p.elt.hidden = false;
        input_shape.elt.hidden = false;
        output_shape.elt.hidden = false;
        selected_h2.html("Selected layer: " + selected_layer.name);
        type_p.html("<b>Type:</b> " + selected_layer.type);
        input_shape.html("<b>Input shape:</b> " + selected_layer.input_shape[0][0] + ' X ' + selected_layer.input_shape[0][1] + ' X ' + selected_layer.input_shape[0][2]);
        output_shape.html("<b>Output shape:</b> " + selected_layer.output_shape[0][0] + ' X ' + selected_layer.output_shape[0][1] + ' X ' + selected_layer.output_shape[0][2]);
    }
}