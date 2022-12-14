from Src.Utils.DrawShapes import *
from Src.Utils.Values import layersNotToConsider


def getNextLayer(outbound_node):
    if len(outbound_node) != 0:
        out_node = outbound_node[0]
        if type(out_node.outbound_layer) == list:
            if len(out_node.outbound_layer) > 0:
                for n_layer in out_node.outbound_layer:
                    if n_layer.__class__.__name__ not in layersNotToConsider:
                        next_layers.append(n_layer)
            else:
                next_layers = None
        elif out_node.outbound_layer != None:
            if out_node.outbound_layer.__class__.__name__ not in layersNotToConsider:
                next_layers = out_node.outbound_layer
            else:
                next_layers = getNextLayer(out_node.outbound_layer.outbound_nodes)
        else:
            next_layers = None
    else:
        next_layers = None

    return next_layers


class Layer:
    def __init__(self, color, shape, layer):
        if len(layer._inbound_nodes) != 0:
            int_node = layer._inbound_nodes[0]
            if type(int_node.inbound_layers) == list:
                if len(int_node.inbound_layers) > 0:
                    predecessor_layers = int_node.inbound_layers
                else:
                    predecessor_layers = None
            elif int_node.inbound_layers != None:
                predecessor_layers = int_node.inbound_layers
            else:
                predecessor_layers = None
        else:
            predecessor_layers = None

        next_layers = getNextLayer(layer._outbound_nodes)

        self.center_position = [0, 0, 0]
        self.id = layer.name
        self.color = color
        self.shape = shape
        self.space_between_layers = 5
        self.original_model_layer = layer
        self.previous_layers = predecessor_layers
        self.next_layer = next_layers
        self.activation = None
        pass

    def setXPosition(self, x_position):
        self.center_position[0] = x_position + (self.shape[0]/2) + self.space_between_layers

    def draw(self):
        glMaterialfv(GL_FRONT_AND_BACK, GL_AMBIENT_AND_DIFFUSE, self.color)
        cube(self.shape, self.center_position[0])
        return self.center_position[0] + self.shape[0] / 2

    def draw_color(self, color_code):
        glColor4f(color_code[0], color_code[1], color_code[2], color_code[3])
        cube(self.shape, self.center_position[0])
        return self.center_position[0] + self.shape[0] / 2
