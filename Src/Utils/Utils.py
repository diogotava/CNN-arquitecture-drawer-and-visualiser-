def get_layers(layer, prev=False):
    layers_to_fill = []
    if prev:
        layers_of_layer = layer.previous_layers
    else:
        layers_of_layer = layer.next_layers

    for layer_of_layer in layers_of_layer:
        # vai buscar o layer correspondente ao next_layer
        layer_of_layer = [e for e in layers_of_layer if e.name == layer_of_layer.name]
        if len(layer_of_layer) > 1:
            print("ERROR!!")
        layers_to_fill.append(layer_of_layer[0])

    if prev:
        layer.previous_layers = layers_to_fill
    else:
        layer.next_layers = layers_to_fill
    return


def get_next_layers(layer):
    get_layers(layer)


def get_prev_layers(layer):
    get_layers(layer, True)


def get_max_width(layer):
    max_layers = {}

    # Initialize a counter for the number of layers that the current layer connects to
    count = 0
    # Iterate over the layers that the current layer connects to
    for next_layer in layer.next_layers:
        # Increment the counter for the number of layers that the current layer connects to
        if len(next_layer.previous_layers) > 1:
            count += 1
        else:
            count += len(next_layer.next_layers)

    return max(max_layers.get(layer.name, 0), count)


def align_previous_layers(layer, layers_viewed=None):
    if layers_viewed is None:
        layers_viewed = []

    if layer.name not in layers_viewed:
        if len(layer.previous_layers) > 1:
            max_x = 0
            for prevLayer in layer.previous_layers:
                if len(prevLayer.next_layers) == 1:
                    x = prevLayer.center_position[0] + prevLayer.shape[0] / 2
                    if x > max_x:
                        max_x = x
            for prevLayer in layer.previous_layers:
                if len(prevLayer.next_layers) == 1:
                    x = prevLayer.center_position[0] + prevLayer.shape[0] / 2
                    if x != max_x:
                        new_x = max_x - prevLayer.shape[0] / 2
                        prevLayer.center_position[0] = new_x

    layers_viewed.append(layer.name)
    for next_layer in layer.next_layers:
        align_previous_layers(next_layer, layers_viewed)


def get_lateral_position_layers(layer, layers_lateral=None, x_position=None, y_position=None, nr_layers=0, space_between_layers=None):
    if y_position is not None:
        if len(layer.previous_layers) > 1:
            nr_layers = 0
            y_position = 0
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

    # desenha o layer seguinte ao atual
    if len(layer.next_layers) > 1:
        nr_layers += 1
        n = len(layer.next_layers) / 2
        for index, next_layer in enumerate(layer.next_layers):
            max_width = get_max_width(next_layer)
            # desenha o próximo layer
            if index + 1 <= n:
                if y_position is not None:
                    y_position = y_position - (index + 1) * max_width * layer.lateral_space_between_layers
                else:
                    y_position = -(index + 1) * max_width * layer.lateral_space_between_layers

            else:
                if y_position is not None:
                    y_position = y_position + (index + 1) * max_width * layer.lateral_space_between_layers
                else:
                    y_position = (index + 1) * max_width * layer.lateral_space_between_layers

            if next_layer.name not in layers_lateral:
                layers_lateral.append(next_layer.name)
                x_position = layer.center_position[0] + layer.shape[0] / 2
                nr_layers = get_lateral_position_layers(next_layer, layers_lateral, x_position, y_position, nr_layers, 10)

    elif len(layer.next_layers) == 1:
        next_layer = layer.next_layers[0]
        if next_layer.name not in layers_lateral:
            layers_lateral.append(next_layer.name)
            x_position = layer.center_position[0] + layer.shape[0] / 2
            nr_layers = get_lateral_position_layers(next_layer, layers_lateral, x_position, y_position, nr_layers)

    return nr_layers
