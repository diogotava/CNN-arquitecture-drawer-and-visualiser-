from Src.Utils.DrawShapes import *
from Src.Utils.Values import layersNotToConsider
from Src.Utils.Model import get_shapes


def get_next_layer(outbound_nodes):
    next_layers = []
    if len(outbound_nodes) != 0:
        for out_node in outbound_nodes:
            layers = out_node.outbound_layer

            if type(layers) == list:
                for layer in layers:
                    if layer.__class__.__name__ not in layersNotToConsider:
                        next_layers.append(layer)
                    else:
                        next_layers_of_next = get_next_layer(layer.outbound_nodes)
                        next_layers = next_layers + next_layers_of_next
            else:
                if layers.__class__.__name__ not in layersNotToConsider:
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
                        prev_layers.append(layer)
                    else:
                        prev_layers_of_prev = get_prev_layer(layer.inbound_nodes)
                        prev_layers = prev_layers + prev_layers_of_prev
            else:
                if layers.__class__.__name__ not in layersNotToConsider:
                    prev_layers.append(layers)
                else:
                    prev_layers = get_prev_layer(layers.inbound_nodes)

    return prev_layers


class Layer:

    def __init__(self, color, shape, layer):

        self.selected = False
        self.lateral_space_between_layers = 10
        self.space_between_layers = 5
        self.center_position = [0, 0, 0]
        self.name = layer.name
        self.color = color
        self.shape = shape
        self.original_model_layer = layer
        self.previous_layers = []
        self.next_layers = []
        self.activation = None
        self.type = layer.__class__.__name__
        self.input_shape = get_shapes(layer, True, True)
        self.output_shape = get_shapes(layer, False, True)
        try:
            self.activation = layer.activation
        except AttributeError:
            self.activation = None
        pass

    def setXPosition(self, x_position):
        self.center_position[0] = x_position + (self.shape[0]/2) + self.space_between_layers

    def setYPosition(self, y_position):
        self.center_position[2] = y_position

    def draw(self, color_code=None):
        if self.selected:
            if color_code != None:
                color = color_code
                code = True
            else:
                color = [0.0, 0.0, 255.0]
                code = False
        else:
            if color_code != None:
                code = True
                color = color_code
            else:
                color = self.color
                code = False
        cube(self.shape, self.center_position, color, code)
