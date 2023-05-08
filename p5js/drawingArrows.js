function draw_arrow(layer, array) {
    noStroke();
    if (layer.type == "LSTM" || layer.type == "GRU" || layer.type == "SimpleRNN" || layer.type == "TimaDistributed" || layer.type == "Bidirectional"
        || layer.type == "ConvLSTM1D" || layer.type == "ConvLSTM2D" || layer.type == "ConvLSTM3D" || layer.type == "BaseRNN") {
        color = [...values.colors[layer.type]];
        color[1] = 150
        push();

        translate((layer.shape[0] / 2 + (layer.space_between_layers - 0.5) / 4), 0, 0);
        push();
        angleMode(DEGREES);
        rotateZ(90);
        fill(color);
        cylinder(values.mArrowWidth, (layer.space_between_layers - 0.5) / 2);
        pop();

        translate((layer.space_between_layers - 0.5) / 4, 0, (layer.shape[2] / 2 + 2) / 2);

        push();
        rotateZ(90);
        rotateX(90);
        fill(color);
        cylinder(values.mArrowWidth, layer.shape[2] / 2 + 2);
        pop();

        translate(-((layer.space_between_layers - 0.5) + layer.shape[0]) / 2, 0, (layer.shape[2] / 2 + 2) / 2);

        push();
        rotateZ(90);
        fill(color);
        cylinder(values.mArrowWidth, (layer.space_between_layers - 0.5) + layer.shape[0]);
        pop();

        translate(-((layer.space_between_layers - 0.5) + layer.shape[0]) / 2, 0, -(layer.shape[2] / 2 + 2) / 2);

        push();
        rotateZ(90);
        rotateX(90);
        fill(color);
        cylinder(values.mArrowWidth, layer.shape[2] / 2 + 2);
        pop();

        translate((layer.space_between_layers - 0.5) / 4 - 0.25, 0, -(layer.shape[2] / 2 + 2) / 2);

        push();
        angleMode(DEGREES);
        rotateZ(90);
        fill(color);
        cylinder(values.mArrowWidth, (layer.space_between_layers - 0.5) / 2 - 0.5);
        pop();

        translate(((layer.space_between_layers + 0.5) / 4) - values.mArrowHeight / 2 - 0.1, 0, 0);

        rotateZ(-90);
        fill(color);
        cone(0.5, values.mArrowHeight);
        pop();
    }
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

            translate((positionX / 2) - values.mArrowHeight / 2 + 0.4, 0, 0);

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

            translate(next_layer.space_between_layers / 4, 0, positionY / 2);

            push();
            rotateZ(90);
            fill(0);
            cylinder(values.mArrowWidth, next_layer.space_between_layers / 2);
            pop();
            translate((next_layer.space_between_layers / 4) - values.mArrowHeight / 2 + 0.1, 0, 0);
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
}

function draw_beggining_block_arrow(layer, array, difference_between_layers, next_layers) {
    noStroke();
    if (layer.type == "LSTM" || layer.type == "GRU" || layer.type == "SimpleRNN" || layer.type == "TimaDistributed" || layer.type == "Bidirectional"
        || layer.type == "ConvLSTM1D" || layer.type == "ConvLSTM2D" || layer.type == "ConvLSTM3D" || layer.type == "BaseRNN") {
        color = [...values.colors[layer.type]];
        color[1] = 150
        push();

        translate((layer.shape[0] / 2 + (layer.space_between_layers - 0.5) / 4), 0, 0);
        push();
        angleMode(DEGREES);
        rotateZ(90);
        fill(color);
        cylinder(values.mArrowWidth, (layer.space_between_layers - 0.5) / 2);
        pop();

        translate((layer.space_between_layers - 0.5) / 4, 0, (layer.shape[2] / 2 + 2) / 2);

        push();
        rotateZ(90);
        rotateX(90);
        fill(color);
        cylinder(values.mArrowWidth, layer.shape[2] / 2 + 2);
        pop();

        translate(-((layer.space_between_layers - 0.5) + layer.shape[0]) / 2, 0, (layer.shape[2] / 2 + 2) / 2);

        push();
        rotateZ(90);
        fill(color);
        cylinder(values.mArrowWidth, (layer.space_between_layers - 0.5) + layer.shape[0]);
        pop();

        translate(-((layer.space_between_layers - 0.5) + layer.shape[0]) / 2, 0, -(layer.shape[2] / 2 + 2) / 2);

        push();
        rotateZ(90);
        rotateX(90);
        fill(color);
        cylinder(values.mArrowWidth, layer.shape[2] / 2 + 2);
        pop();

        translate((layer.space_between_layers - 0.5) / 4 - 0.25, 0, -(layer.shape[2] / 2 + 2) / 2);

        push();
        angleMode(DEGREES);
        rotateZ(90);
        fill(color);
        cylinder(values.mArrowWidth, (layer.space_between_layers - 0.5) / 2 - 0.5);
        pop();

        translate(((layer.space_between_layers + 0.5) / 4) - values.mArrowHeight / 2 - 0.1, 0, 0);

        rotateZ(-90);
        fill(color);
        cone(0.5, values.mArrowHeight);
        pop();
    }
    if (next_layers.length == 1) {
        let next_layer = array[next_layers[0]];
        if (next_layer.previous_layers.length <= 1) {
            push();
            let positionX = (next_layer.center_position[0] - difference_between_layers - next_layer.shape[0] / 2) - (layer.center_position[0] + layer.shape[0] / 2);

            translate((layer.shape[0] / 2) + (positionX / 2) - 0.5, 0, 0);

            push();
            angleMode(DEGREES);
            rotateZ(90);
            fill(0);
            cylinder(values.mArrowWidth, positionX);
            pop();

            translate((positionX / 2) - values.mArrowHeight / 2 + 0.4, 0, 0);

            rotateZ(-90);
            fill(0);
            cone(0.5, values.mArrowHeight);
            pop();
        } else if (next_layer.previous_layers.length > 1) {
            push();
            let positionX = (next_layer.center_position[0] - difference_between_layers - next_layer.shape[0] / 2) - (layer.center_position[0] + layer.shape[0] / 2) + ((next_layer.center_position[0] - difference_between_layers - next_layer.space_between_layers - next_layer.shape[0] / 2) - (layer.center_position[0] + layer.shape[0] / 2));
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

            translate(next_layer.space_between_layers / 4, 0, positionY / 2);

            push();
            rotateZ(90);
            fill(0);
            cylinder(values.mArrowWidth, next_layer.space_between_layers / 2);
            pop();
            translate((next_layer.space_between_layers / 4) - values.mArrowHeight / 2 + 0.1, 0, 0);
            rotateZ(-90);
            fill(0);
            cone(0.5, values.mArrowHeight);
            pop();
        }
    } else if (next_layers.length > 1) {
        push();
        let positionX = (array[next_layers[0]].center_position[0] - difference_between_layers - array[next_layers[0]].shape[0] / 2) - (layer.center_position[0] + layer.shape[0] / 2);

        translate((layer.shape[0] / 2) + (positionX / 4), 0, 0);

        push();
        angleMode(DEGREES);
        rotateZ(90);
        fill(0);
        cylinder(values.mArrowWidth, positionX / 2);
        pop();

        for (let n_layer of next_layers) {
            push();
            let next_layer = array[n_layer];

            let positionY = (next_layer.center_position[2]) - (layer.center_position[2]);
            let positionX = (next_layer.center_position[0] - difference_between_layers - next_layer.shape[0] / 2) - (layer.center_position[0] + layer.shape[0] / 2);

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
                cylinder(values.mArrowWidth, positionX / 2 - 1);
            else
                cylinder(values.mArrowWidth, positionX / 2);
            pop();

            translate((positionX / 4) - values.mArrowHeight / 2 + 0.5, 0, 0);
            rotateZ(-90);
            fill(0);
            cone(0.5, values.mArrowHeight);

            pop();
        }
        pop();
    }
}

function draw_arrow_after_block(layer, array, center_position, center_position_difference) {
    noStroke();
    if (layer.type == "LSTM" || layer.type == "GRU" || layer.type == "SimpleRNN" || layer.type == "TimaDistributed" || layer.type == "Bidirectional"
        || layer.type == "ConvLSTM1D" || layer.type == "ConvLSTM2D" || layer.type == "ConvLSTM3D" || layer.type == "BaseRNN") {
        color = [...values.colors[layer.type]];
        color[1] = 150
        push();

        translate((layer.shape[0] / 2 + (layer.space_between_layers - 0.5) / 4), 0, 0);
        push();
        angleMode(DEGREES);
        rotateZ(90);
        fill(color);
        cylinder(values.mArrowWidth, (layer.space_between_layers - 0.5) / 2);
        pop();

        translate((layer.space_between_layers - 0.5) / 4, 0, (layer.shape[2] / 2 + 2) / 2);

        push();
        rotateZ(90);
        rotateX(90);
        fill(color);
        cylinder(values.mArrowWidth, layer.shape[2] / 2 + 2);
        pop();

        translate(-((layer.space_between_layers - 0.5) + layer.shape[0]) / 2, 0, (layer.shape[2] / 2 + 2) / 2);

        push();
        rotateZ(90);
        fill(color);
        cylinder(values.mArrowWidth, (layer.space_between_layers - 0.5) + layer.shape[0]);
        pop();

        translate(-((layer.space_between_layers - 0.5) + layer.shape[0]) / 2, 0, -(layer.shape[2] / 2 + 2) / 2);

        push();
        rotateZ(90);
        rotateX(90);
        fill(color);
        cylinder(values.mArrowWidth, layer.shape[2] / 2 + 2);
        pop();

        translate((layer.space_between_layers - 0.5) / 4 - 0.25, 0, -(layer.shape[2] / 2 + 2) / 2);

        push();
        angleMode(DEGREES);
        rotateZ(90);
        fill(color);
        cylinder(values.mArrowWidth, (layer.space_between_layers - 0.5) / 2 - 0.5);
        pop();

        translate(((layer.space_between_layers + 0.5) / 4) - values.mArrowHeight / 2 - 0.1, 0, 0);

        rotateZ(-90);
        fill(color);
        cone(0.5, values.mArrowHeight);
        pop();
    }
    if (layer.next_layers.length == 1) {
        let next_layer = array[layer.next_layers[0]];
        if (next_layer.previous_layers.length <= 1) {
            push();
            let positionX = (next_layer.center_position[0] - center_position_difference - next_layer.shape[0] / 2) - (center_position[0] + layer.shape[0] / 2);

            translate((layer.shape[0] / 2) + (positionX / 2) - 0.5, 0, 0);

            push();
            angleMode(DEGREES);
            rotateZ(90);
            fill(0);
            cylinder(values.mArrowWidth, positionX);
            pop();

            translate((positionX / 2) - values.mArrowHeight / 2 + 0.4, 0, 0);

            rotateZ(-90);
            fill(0);
            cone(0.5, values.mArrowHeight);
            pop();
        } else if (next_layer.previous_layers.length > 1) {
            push();
            let positionX = (next_layer.center_position[0] - center_position_difference - next_layer.shape[0] / 2) - (center_position[0] + layer.shape[0] / 2) + ((next_layer.center_position[0] - center_position_difference - next_layer.space_between_layers - next_layer.shape[0] / 2) - (center_position[0] + layer.shape[0] / 2));
            let positionY = (next_layer.center_position[2]) - (center_position[2]);

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

            translate(next_layer.space_between_layers / 4, 0, positionY / 2);

            push();
            rotateZ(90);
            fill(0);
            cylinder(values.mArrowWidth, next_layer.space_between_layers / 2);
            pop();
            translate((next_layer.space_between_layers / 4) - values.mArrowHeight / 2 + 0.1, 0, 0);
            rotateZ(-90);
            fill(0);
            cone(0.5, values.mArrowHeight);
            pop();
        }
    } else if (layer.next_layers.length > 1) {
        push();
        let positionX = (array[layer.next_layers[0]].center_position[0] - center_position_difference - array[layer.next_layers[0]].shape[0] / 2) - (center_position[0] + layer.shape[0] / 2);

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

            let positionY = (next_layer.center_position[2]) - (center_position[2]);
            let positionX = (next_layer.center_position[0] - center_position_difference - next_layer.shape[0] / 2) - (center_position[0] + layer.shape[0] / 2);

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
}