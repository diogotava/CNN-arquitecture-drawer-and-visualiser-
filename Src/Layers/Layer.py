from Src.Utils.DrawShapes import *
from Src.Utils.Values import layersNotToConsider


def getNextLayer(outbound_nodes):
    next_layers = []
    if len(outbound_nodes) != 0:
        for out_node in outbound_nodes:
            layers = out_node.outbound_layer

            if type(layers) == list:
                for layer in layers:
                    if layer.__class__.__name__ not in layersNotToConsider:
                        next_layers.append(layer)
                    else:
                        next_layers_of_next = getNextLayer(layer.outbound_nodes)
                        next_layers = next_layers + next_layers_of_next
            else:
                if layers.__class__.__name__ not in layersNotToConsider:
                    next_layers.append(layers)
                else:
                    next_layers = getNextLayer(layers.outbound_nodes)

    return next_layers


def getPrevLayer(inbound_nodes):
    prev_layers = []
    if len(inbound_nodes) != 0:
        for in_node in inbound_nodes:
            layers = in_node.inbound_layers
            if type(layers) == list:
                for layer in layers:
                    if layer.__class__.__name__ not in layersNotToConsider:
                        prev_layers.append(layer)
                    else:
                        prev_layers_of_prev = getPrevLayer(layer.inbound_nodes)
                        prev_layers = prev_layers + prev_layers_of_prev
            else:
                if layers.__class__.__name__ not in layersNotToConsider:
                    prev_layers.append(layers)
                else:
                    prev_layers = getPrevLayer(layers.inbound_nodes)

    return prev_layers


class Layer:

    def __init__(self, color, shape, layer):
        previous_layers = getPrevLayer(layer._inbound_nodes)

        self.lateral_space_between_layers = 10
        self.space_between_layers = 5
        next_layers = getNextLayer(layer._outbound_nodes)
        self.center_position = [0, 0, 0]
        self.name = layer.name
        self.color = color
        self.shape = shape
        self.original_model_layer = layer
        self.previous_layers = previous_layers
        self.next_layers = next_layers
        self.activation = None
        pass

    def setXPosition(self, x_position):
        self.center_position[0] = x_position + (self.shape[0]/2) + self.space_between_layers

    def setYPosition(self, y_position):
        self.center_position[1] = y_position

    def draw(self):
        glMaterialfv(GL_FRONT_AND_BACK, GL_AMBIENT_AND_DIFFUSE, self.color)
        cube(self.shape, self.center_position)

    def draw_color(self, color_code):
        glColor4f(color_code[0], color_code[1], color_code[2], color_code[3])
        cube(self.shape, self.center_position)
