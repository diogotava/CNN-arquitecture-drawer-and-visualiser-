var selectedLayerID = -1;
var bPressed = false;
var block = [];


function keyPressed() {
    if (keyIsDown(67)) { // C
        var id = getLayerId();
        if (id != -1) {
            if (selectedLayerID != -1)
                layers[selectedLayerID].selected = false;
            layers[id].selected = true;
            selectedLayerID = id;
        } else {
            if (selectedLayerID != -1)
                layers[selectedLayerID].selected = false;
            selectedLayerID = -1;
        }
        selectedText();
    } else if (keyIsDown(66)) {
        var id = getLayerId();
        if (id != -1) {
            if (bPressed) {
                let b = beginLayerAlreadyInBlock(block[0]);
                alert('End of block selected!');
                if (b != -1) {
                    b[1] = id;
                } else {
                    block[1] = id;
                    values.blocks.push(block);
                }
                bPressed = false;
                block = [];
            } else {
                block[0] = id;
                alert('Begin of block selected!');
                bPressed = true;
            }
        }
    }
}

function beginLayerAlreadyInBlock(beginLayer) {
    for (let block of values.blocks) {
        if (block[0] == beginLayer)
            return block;
    }
    return -1;
}

function selectedText() {
    var nothing_selected_h2 = select('#nothing_selected_h2');
    var selected_h2 = select('#selected_h2');
    var type_p = select('#type');
    var input_shape = select('#input_shape');
    var output_shape = select('#output_shape');
    var activation = select('#activation');

    if (selectedLayerID == -1) {
        nothing_selected_h2.elt.hidden = false;
        selected_h2.elt.hidden = true;
        type_p.elt.hidden = true;
        input_shape.elt.hidden = true;
        output_shape.elt.hidden = true;
        activation.elt.hidden = true;
    } else {
        var selected_layer = layers[selectedLayerID];
        nothing_selected_h2.elt.hidden = true;

        selected_h2.elt.hidden = false;
        type_p.elt.hidden = false;
        input_shape.elt.hidden = false;
        output_shape.elt.hidden = false;
        activation.elt.hidden = false;
        // TODO: remove id
        selected_h2.html("Selected layer: " + selected_layer.id.toString() + " " + selected_layer.name);
        type_p.html("<b>Type:</b> " + selected_layer.type);
        let index = 0;
        let input_text = "";
        for (let in_shape of selected_layer.input_shape[0]) {
            if (index == 0) {
                input_text += in_shape;
            } else {
                input_text += ' X ' + in_shape;
            }
            index += 1;
        }
        index = 0;
        let output_text = "";
        for (let out_shape of selected_layer.output_shape[0]) {
            if (index == 0) {
                output_text += out_shape;
            } else {
                output_text += ' X ' + out_shape;
            }
            index += 1;
        }

        input_shape.html("<b>Input shape:</b> " + input_text);

        output_shape.html("<b>Output shape:</b> " + output_text);
        if (selected_layer.activation != null) {
            activation.html("<b>Activation:</b> " + selected_layer.activation);
        } else {
            activation.html("<b>Activation:</b> none");
        }
    }
}