from Src.Utils.Values import *


def get_layers(layer, layers, prev=False):
    layers_to_fill = []
    if prev:
        layers_of_layer = layer.previous_layers
    else:
        layers_of_layer = layer.next_layers

    for layer_of_layer in layers_of_layer:
        # vai buscar o layer correspondente ao next_layer
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
        next_layer = [e for e in layers if e.id == n_layer][0]
        # Increment the counter for the number of layers that the current layer connects to
        if len(next_layer.previous_layers) > 1:
            count += 1
        else:
            count += len(next_layer.next_layers)

    return max(max_layers.get(layer.name, 0), count)


def align_position(layer, layers):
    if len(layer.previous_layers) > 1:
        max_x = 0
        for p_Layer in layer.previous_layers:
            prevLayer = layers[p_Layer]
            if len(prevLayer.next_layers) == 1:
                x = prevLayer.center_position[0] + prevLayer.shape[0] / 2
                if x > max_x:
                    max_x = x
        for p_Layer in layer.previous_layers:
            prevLayer = layers[p_Layer]
            if len(prevLayer.next_layers) == 1:
                x = prevLayer.center_position[0] + prevLayer.shape[0] / 2
                if x != max_x:
                    new_x = max_x - prevLayer.shape[0] / 2
                    prevLayer.center_position[0] = new_x


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


def process_node(layers):
    # Create a list to store the nodes that need to be processed
    layer_stack = [0]
    x_position = 0
    y_position = 0
    compute_position(layers[0], x_position, y_position)
    layers_viewed = [0]

    # Process the layers in parallel
    while layer_stack:
        next_layers = []
        for l_stack in layer_stack:
            layer = layers[l_stack]
            if len(layer.previous_layers) > 1:
                layer.space_between_layers = 10
                if not all(layers[prev_layer].computed_position for prev_layer in layer.previous_layers):
                    continue

            if len(layer.next_layers) > 1:
                layer.space_between_layers = 10
                # Split into independent branches
                n = len(layer.next_layers) / 2
                for index, n_layer in enumerate(layer.next_layers):
                    next_layer = layers[n_layer]
                    next_layer.previous_y_position = layer.getYPosition()
                    max_width = get_max_width(next_layer, layers)
                    # desenha o próximo layer
                    if index + 1 <= n:
                        y_position = next_layer.previous_y_position - (index + 1) * max_width * layer.lateral_space_between_layers

                    else:
                        y_position = next_layer.previous_y_position + (index) * max_width * layer.lateral_space_between_layers

                    if next_layer.id not in next_layers and not next_layer.computed_position:
                        x_position = layer.center_position[0] + layer.shape[0] / 2
                        compute_position(next_layer, x_position, y_position)
                        layers_viewed.append(next_layer.id)
                        if next_layer.id not in next_layers:
                            next_layers.append(next_layer.id)

            elif len(layer.next_layers) == 1:
                next_layer = layers[layer.next_layers[0]]
                y_position = layer.getYPosition()
                x_position = layer.center_position[0] + layer.shape[0] / 2
                compute_position(next_layer, x_position, y_position)
                layers_viewed.append(next_layer.id)
                if next_layer.id not in next_layers:
                    next_layers.append(next_layer.id)

            if len(layer.previous_layers) > 1:
                if all(layers[prev_layer].computed_position for prev_layer in layer.previous_layers):
                    # All previous layers have finished, start processing
                    align_position(layer, layers)
                    layers_viewed.append(layer.id)
                else:
                    # Wait for all previous layers to finish
                    next_layers_changed = False
                    for prev_layer in layer.previous_layers:
                        if prev_layer not in next_layers and not layers[prev_layer].computed_position and prev_layer not in layers_viewed:
                            next_layers.append(prev_layer)
                            next_layers_changed = True
                        if not next_layers_changed and layer.id not in next_layers and layer.id not in layers_viewed:
                            next_layers.append(layer.id)

        layer_stack = next_layers
