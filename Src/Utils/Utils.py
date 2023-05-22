def get_layers(layer, layers, prev=False):
    layers_to_fill = []
    if prev:
        layers_of_layer = layer.previous_layers
    else:
        layers_of_layer = layer.next_layers

    for layer_of_layer in layers_of_layer:
        # gets the correspondent layer to the next_layer
        layer_to_fill = [e for e in layers if e.name == layer_of_layer.name]
        if len(layer_to_fill) > 1:
            print("ERROR!!")
        layers_to_fill.append(layer_to_fill[0].id)

    if prev:
        layer.previous_layers = layers_to_fill
    else:
        layer.next_layers = layers_to_fill
    return


def get_next_layers(layer, layers):
    get_layers(layer, layers)


def get_prev_layers(layer, layers):
    get_layers(layer, layers, True)


def get_max_width(layer, layers):
    max_layers = {}

    # Initialize a counter for the number of layers that the current layer connects to
    count = 0
    # Iterate over the layers that the current layer connects to
    for n_layer in layer.next_layers:
        next_layer = layers[n_layer]
        # Increment the counter for the number of layers that the current layer connects to
        if len(next_layer.previous_layers) > 1:
            count += 1
        else:
            count += len(next_layer.next_layers)

    return max(max_layers.get(layer.name, 0), count)


def compute_position(layer, x_position, y_position):
    if y_position is not None:
        if len(layer.previous_layers) > 1:
            y_position = layer.previous_y_position
        # altera o valor de yPosition do layer para o novo valor y_position
        layer.setYPosition(y_position)

    if x_position is not None:
        # altera o valor de XPosition do layer para o novo valor x_position
        layer.setXPosition(x_position)

    layer.computed_position = True


def align_previous_layers(layer, layers, layers_viewed=None):
    if layers_viewed is None:
        layers_viewed = []

    if layer.name not in layers_viewed:
        if len(layer.previous_layers) > 1:
            max_x = 0
            for p_Layer in layer.previous_layers:
                prev_layer = layers[p_Layer]
                if len(prev_layer.next_layers) == 1:
                    x = prev_layer.center_position[0] + prev_layer.shape[0] / 2
                    if x > max_x:
                        max_x = x
            if max_x < (layer.center_position[0] - layer.shape[0] / 2 - layer.space_between_layers):
                max_x = (layer.center_position[0] - layer.shape[0] / 2 - layer.space_between_layers)
            for p_Layer in layer.previous_layers:
                prev_layer = layers[p_Layer]
                next_previous_layers = layers[prev_layer.previous_layers[0]].next_layers
                if len(prev_layer.next_layers) == 1 and len(next_previous_layers) == 1:
                    x = prev_layer.center_position[0] + prev_layer.shape[0] / 2
                    if x != max_x:
                        new_x = max_x - prev_layer.shape[0] / 2
                        prev_layer.center_position[0] = new_x
                        if prev_layer.name in layers_viewed:
                            layers_viewed.remove(prev_layer.name)
                        if len(prev_layer.previous_layers) > 1:
                            align_previous_layers(prev_layer, layers, layers_viewed)

        layers_viewed.append(layer.name)
        for n_layer in layer.next_layers:
            next_layer = layers[n_layer]
            align_previous_layers(next_layer, layers, layers_viewed)


def get_lateral_position_layers(layer, layers, layers_lateral=None, x_position=None, y_position=None, space_between_layers=None):
    index_y = 2
    index_x = 0
    if layers_lateral is None and len(layer.previous_layers) >= 1:
        for index, p_layer in enumerate(layer.previous_layers):
            get_lateral_position_layers(layers[p_layer], layers)

    if y_position is not None:
        if len(layer.previous_layers) > 1:
            y_position = layer.previous_y_position
        # altera o valor de yPosition do layer para o novo valor y_position
        layer.setYPosition(y_position)

    if x_position is not None:
        if space_between_layers is not None:
            layer.space_between_layers = space_between_layers
        if len(layer.previous_layers) > 1:
            layer.space_between_layers = 10

        # altera o valor de XPosition do layer para o novo valor x_position
        layer.setXPosition(x_position)

    if layers_lateral is None:
        layers_lateral = [layer.name]

    # computes the position for the next layer
    if len(layer.next_layers) > 1:
        n = len(layer.next_layers) / 2
        negative_n = 1
        positive_n = 1
        for index, n_layer in enumerate(layer.next_layers):
            next_layer = layers[n_layer]
            next_layer.previous_y_position = layer.getYPosition()
            max_width = get_max_width(next_layer, layers)
            # compute the position of the next layer
            if index + 1 <= n:
                if y_position is not None:
                    y_pos = y_position - negative_n * max_width * (layer.lateral_space_between_layers + layer.shape[index_y])
                else:
                    y_pos = -negative_n * max_width * (layer.lateral_space_between_layers + layer.shape[index_y])

                negative_n += 1

            else:
                if y_position is not None:
                    y_pos = y_position + positive_n * max_width * (layer.lateral_space_between_layers + layer.shape[index_y])
                else:
                    y_pos = positive_n * max_width * (layer.lateral_space_between_layers + layer.shape[index_y])

                positive_n += 1
            if next_layer.name not in layers_lateral:
                layers_lateral.append(next_layer.name)
                x_position = layer.center_position[index_x] + layer.shape[index_x] / 2
                get_lateral_position_layers(next_layer, layers, layers_lateral, x_position, y_pos, 10)

    elif len(layer.next_layers) == 1:
        n_layer = layer.next_layers[0]
        next_layer = layers[n_layer]
        next_layer.previous_y_position = layer.previous_y_position
        if next_layer.name not in layers_lateral:
            layers_lateral.append(next_layer.name)
            x_position = layer.center_position[index_x] + layer.shape[index_x] / 2
            get_lateral_position_layers(next_layer, layers,  layers_lateral, x_position, y_position)
