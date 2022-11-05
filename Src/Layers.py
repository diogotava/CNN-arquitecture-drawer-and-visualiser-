import random

from Src.DrawShapes import *
from Src.Utils import get_shape


class LayersDrawer:
    layersColors = {"Conv2D": [1.0, 0.5, 0.0],
                    "Dense": [1.0, 0.0, 0.0]}

    def __init__(self):
        self.m_x_position = 0
        self.space_between_layers = 5

    def draw_layer(self, layer_type, *args):
        shape = get_shape(args[0])

        if layer_type == "Dense":
            self.m_x_position = self.m_x_position + 5 + self.space_between_layers
        else:
            self.m_x_position = self.m_x_position + (shape[2]/2) + self.space_between_layers

        if layer_type == "Conv2D":
            LayersDrawer.draw_conv_2d_layer(self, shape, self.m_x_position)

        elif layer_type == "Dense":
            input_shape = get_shape(args[0], input_shape=True)
            LayersDrawer.draw_dense(self, shape, input_shape, self.m_x_position)

        else:
            if layer_type not in self.layersColors.keys():
                value1 = random.uniform(0.0, 1.0)
                value2 = random.uniform(0.0, 1.0)
                value3 = random.uniform(0.0, 1.0)
                c = [value1, value2, value3]

                while c in self.layersColors.values():
                    value1 = random.uniform(0.0, 1.0)
                    value2 = random.uniform(0.0, 1.0)
                    value3 = random.uniform(0.0, 1.0)
                    c = [value1, value2, value3]

                self.layersColors[layer_type] = c
            color = self.layersColors[layer_type]

            cube(shape, self.m_x_position, color)

        if layer_type == "Dense":
            self.m_x_position = self.m_x_position + 5
        else:
            self.m_x_position = self.m_x_position + (shape[2]/2)

    def draw_conv_2d_layer(self, shape, position):
        color = self.layersColors["Conv2D"]
        cube(shape, position, color)

    def draw_dense(self, output_shape, input_shape, position):
        color = self.layersColors["Dense"]
        polygon(input_shape, output_shape, position, color)
