from Src.Utils.DrawShapes import *
from Src.Utils.Values import layersNotToConsider
from Src.Utils.Shapes import get_shapes


def get_next_layer(outbound_nodes):
    next_layers = []
    if len(outbound_nodes) != 0:
        for out_node in outbound_nodes:
            layers = out_node.outbound_layer

            if type(layers) == list:
                for layer in layers:
                    if layer.__class__.__name__ not in layersNotToConsider:
                        if layer not in next_layers:
                            next_layers.append(layer)
                    else:
                        next_layers_of_next = get_next_layer(layer.outbound_nodes)
                        next_layers = next_layers + next_layers_of_next
            else:
                if layers.__class__.__name__ not in layersNotToConsider:
                    if layers not in next_layers:
                        next_layers.append(layers)
                else:
                    next_layers = get_next_layer(layers.outbound_nodes)

    return next_layers


def get_prev_layer(inbound_nodes):
    prev_layers = []
    if len(inbound_nodes) != 0:
        for in_node in inbound_nodes:
            layers = in_node.inbound_layers
            if type(layers) == list:
                for layer in layers:
                    if layer.__class__.__name__ not in layersNotToConsider:
                        if layer not in prev_layers:
                            prev_layers.append(layer)
                    else:
                        prev_layers_of_prev = get_prev_layer(layer.inbound_nodes)
                        prev_layers = prev_layers + prev_layers_of_prev
            else:
                if layers.__class__.__name__ not in layersNotToConsider:
                    if layers not in prev_layers:
                        prev_layers.append(layers)
                else:
                    prev_layers = get_prev_layer(layers.inbound_nodes)

    return prev_layers


class Layer:

    def __init__(self, shape, layer):

        self.selected = False
        self.lateral_space_between_layers = 10
        self.space_between_layers = 5
        self.center_position = [0, 0, 0]
        self.name = layer.name
        self.shape = shape
        self.original_model_layer = layer
        self.previous_layers = []
        self.next_layers = []
        self.activation = None
        self.type = layer.__class__.__name__
        self.input_shape = get_shapes(layer, True, True)
        self.output_shape = get_shapes(layer, False, True)
        self.invertedShape = layer.invertedShape
        self.computed_position = False
        self.layers = None

        self.previous_y_position = 0
        if hasattr(layer, "data_format"):
            self.data_format = layer.data_format
        try:
            self.activation = layer.activation.__name__
        except AttributeError:
            self.activation = None
        pass

    def setId(self, id):
        self.id = id

    def setXPosition(self, x_position):
        self.center_position[0] = x_position + (self.shape[0]/2) + self.space_between_layers

    def setYPosition(self, y_position):
        self.center_position[2] = y_position

    def getYPosition(self):
        return self.center_position[2]
