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


def get_lateral_position_layers(layer, layers_lateral=None, x_position=None, y_position=None, nr_layers=0):
    if y_position != None:
        if len(layer.previous_layers) > 1:
            nr_layers = 0
            y_position = 0
        # altera o valor de yPosition do layer para o novo valor y_position
        layer.setYPosition(y_position)

    if x_position != None:
        # altera o valor de XPosition do layer para o novo valor x_position
        layer.setXPosition(x_position)

    if layers_lateral == None:
        layers_lateral = []

    # desenha o layer seguinte ao atual
    if len(layer.next_layers) > 1:
        nr_layers += 1
        for index, next_layer in enumerate(layer.next_layers):
            n = len(layer.next_layers)/2
            # desenha o próximo layer
            if(index+1 <= n):
                if(y_position != None):
                    y_position = y_position-(index+1)*layer.lateral_space_between_layers
                else:
                    y_position = -(index+1)*layer.lateral_space_between_layers

            else:
                if(y_position != None):
                    y_position = y_position + (index+1)*layer.lateral_space_between_layers
                else:
                    y_position = (index+1)*layer.lateral_space_between_layers

            if(next_layer.name not in layers_lateral):
                layers_lateral.append(next_layer.name)
                x_position = layer.center_position[0] + layer.shape[0] / 2
                nr_layers = get_lateral_position_layers(next_layer, layers_lateral, x_position, y_position, nr_layers)

    elif len(layer.next_layers) == 1:
        next_layer = layer.next_layers[0]
        if(next_layer.name not in layers_lateral):
            layers_lateral.append(next_layer.name)
            x_position = layer.center_position[0] + layer.shape[0] / 2
            nr_layers = get_lateral_position_layers(next_layer, layers_lateral, x_position, y_position, nr_layers)

    return nr_layers
