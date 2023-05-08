function draw_layer(layer, i, array) {
    let after_block_difference = 0;
    let begin_layers = [];
    let end_layers = [];
    let index = 0;
    for (let block of values.blocks) {
        var begin_layer = array[block[0]]
        begin_layers[index] = block[0];
        var end_layer = array[block[1]]
        end_layers[index] = block[1];
        if (layer.id == block[0]) {
            draw_beggining_block_layer(layer, array, end_layer);
            return;
        } else if (layer.id == block[1] || layer.id > block[0] && layer.id < block[1])
            return;
        else if (layer.id > block[1]) {
            let l = array[end_layers[begin_layers.indexOf(block[0])]];
            if (begin_layers.includes(block[0]) && l.id != end_layer.id) {
                after_block_difference += (end_layer.center_position[0] - l.center_position[0])
            } else
                after_block_difference += (end_layer.center_position[0] - begin_layer.center_position[0])
        }

        ++index;
    }

    darw_normal_layer(layer, array, after_block_difference);
}

function darw_normal_layer(layer, array, after_block_difference) {
    let center_position = [...layer.center_position]
    if (after_block_difference != 0) {
        center_position[0] -= after_block_difference;
    }
    mPush();
    mTranslate(center_position[0], center_position[1], center_position[2]);
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

    if (layer.shape == []) {
        layer.shape[0] = values.minX;
        layer.shape[1] = values.minZY;
        layer.shape[2] = values.minZY;
    }
    mBox(layer.id + 1, layer.shape[0], layer.shape[1], layer.shape[2]);

    if (after_block_difference != 0) {
        draw_arrow_after_block(layer, array, center_position, after_block_difference);
    } else
        draw_arrow(layer, array);
    mPop();
}

function draw_beggining_block_layer(layer, array, end_block_layer) {
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

    if (layer.shape == []) {
        layer.shape[0] = values.minX;
        layer.shape[1] = values.minZY;
        layer.shape[2] = values.minZY;
    }
    mBox(layer.id + 1, layer.shape[0], layer.shape[1], layer.shape[2]);

    let difference_between_layers = end_block_layer.center_position[0] - layer.center_position[0]
    draw_beggining_block_arrow(layer, array, difference_between_layers, end_block_layer.next_layers);
    mPop();
}