from Src.Utils.Values import *


def get_next_layers(layer):
    nextLayers = []
    for next_layer in layer.next_layers:
        # vai buscar o layer correspondente ao next_layer
        nextLayer = [e for e in layers if e.name == next_layer.name]
        if len(nextLayer) > 1:
            print("ERROR!!")
        nextLayers.append(nextLayer[0])

    layer.next_layers = nextLayers
    return


def get_prev_layers(layer):
    prevLayers = []
    for prev_layer in layer.previous_layers:
        # vai buscar o layer correspondente ao prev_layer
        prevLayer = [e for e in layers if e.name == prev_layer.name]
        if len(prevLayer) > 1:
            print("ERROR!!")
        prevLayers.append(prevLayer[0])

    layer.previous_layers = prevLayers
    return


def get_max_width(layer):
    max_layers = {}

    # Initialize a counter for the number of layers that the current layer connects to
    count = 0
    # Iterate over the layers that the current layer connects to
    for next_layer in layer.next_layers:
        # Increment the counter for the number of layers that the current layer connects to
        if(len(next_layer.previous_layers) > 1):
            count += 1
        else:
            count += len(next_layer.next_layers)

    return max(max_layers.get(layer.name, 0), count)


def get_lateral_position_layers(layer, layers_lateral=None, x_position=None, y_position=None, nr_layers=0, space_between_layers=None):
    if y_position != None:
        if len(layer.previous_layers) > 1:
            nr_layers = 0
            y_position = 0
        # altera o valor de yPosition do layer para o novo valor y_position
        layer.setYPosition(y_position)

    if x_position != None:
        if space_between_layers != None:
            layer.space_between_layers = space_between_layers
        if len(layer.previous_layers) > 1:
            layer.space_between_layers = 10

        # altera o valor de XPosition do layer para o novo valor x_position
        layer.setXPosition(x_position)

    if layers_lateral == None:
        layers_lateral = []

    # desenha o layer seguinte ao atual
    if len(layer.next_layers) > 1:
        nr_layers += 1
        n = len(layer.next_layers)/2
        for index, next_layer in enumerate(layer.next_layers):
            max_width = get_max_width(next_layer)
            # desenha o próximo layer
            if(index+1 <= n):
                if(y_position != None):
                    y_position = y_position-(index+1) * max_width * layer.lateral_space_between_layers
                else:
                    y_position = -(index+1) * max_width * layer.lateral_space_between_layers

            else:
                if(y_position != None):
                    y_position = y_position + (index+1) * max_width * layer.lateral_space_between_layers
                else:
                    y_position = (index+1) * max_width * layer.lateral_space_between_layers

            if(next_layer.name not in layers_lateral):
                layers_lateral.append(next_layer.name)
                x_position = layer.center_position[0] + layer.shape[0] / 2
                nr_layers = get_lateral_position_layers(next_layer, layers_lateral, x_position, y_position, nr_layers, 10)

    elif len(layer.next_layers) == 1:
        next_layer = layer.next_layers[0]
        if(next_layer.name not in layers_lateral):
            layers_lateral.append(next_layer.name)
            x_position = layer.center_position[0] + layer.shape[0] / 2
            nr_layers = get_lateral_position_layers(next_layer, layers_lateral, x_position, y_position, nr_layers)

    return nr_layers
