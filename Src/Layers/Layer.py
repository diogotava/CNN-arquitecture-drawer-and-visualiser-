from Src.Utils.DrawShapes import *


class Layer:
    center_position = [0, 0, 0]

    def __init__(self, color, shape, x_position, layer):
        if len(layer._inbound_nodes) != 0:
            int_node = layer._inbound_nodes[0]
            if int_node.inbound_layers != None or len(int_node.inbound_layers) > 0:
                predecessor_layers = int_node.inbound_layers
            else:
                predecessor_layers = None
        else:
            predecessor_layers = None
        if len(layer._outbound_nodes) != 0:
            out_node = layer._outbound_nodes[0]

            if out_node.outbound_layer != None:
                next_layers = out_node.outbound_layer
            else:
                next_layers = None
        else:
            next_layers = None

        self.color = color
        self.shape = shape
        self.space_between_layers = 5
        self.center_position[0] = x_position + (shape[0]/2) + self.space_between_layers
        self.original_model_layer = layer
        self.previous_layers = predecessor_layers
        self.next_layer = next_layers
        pass

    def draw(self):
        glMaterialfv(GL_FRONT_AND_BACK, GL_AMBIENT_AND_DIFFUSE, self.color)
        self.center_position[0] = cube(self.shape, self.center_position[0])
        return self.center_position[0]

    def draw_color(self, color_code):
        glColor4f(color_code[0], color_code[1], color_code[2], color_code[3])
        self.center_position[0] = cube(self.shape, self.center_position[0])
        return self.center_position[0]
