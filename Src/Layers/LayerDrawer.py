import random

from Src.Utils.DrawShapes import *
from Src.Utils.Utils import get_shape
from Src.Layers.Conv2D import *
from Src.Layers.Input import *
from Src.Layers.Dense import *
from Src.Layers.Layer import *


class LayersDrawer:
    layersNotToDraw = ["LeakyReLU"]

    def __init__(self):
        self.m_x_position = 0
        self.layers_drawn = []

    def draw_layer(self, layer_type, *args):
        shape = get_shape(args[1])
        if layer_type == "Conv2D":
            conv2D = Conv2D(shape, self.m_x_position, args[0], args[2])
            self.m_x_position = conv2D.draw()
            self.layers_drawn.append(conv2D)

        elif layer_type == "Dense":
            dense = Dense(shape, self.m_x_position, args[0], args[2])
            self.m_x_position = dense.draw()
            self.layers_drawn.append(dense)

        elif layer_type == "Flatten":
            flatten = Dense(shape, self.m_x_position, args[0], args[2], [1.0, 0.0, 1.0, 0.7])
            self.m_x_position = flatten.draw()
            self.layers_drawn.append(flatten)

        elif layer_type == "Dropout":
            flatten = Dense(shape, self.m_x_position, args[0], args[2], [0.0, 1.0, 1.0, 0.7])
            self.m_x_position = flatten.draw()
            self.layers_drawn.append(flatten)

        elif layer_type == "InputLayer":
            input = Input(shape, self.m_x_position, args[0], args[2])
            self.m_x_position = input.draw()
            self.layers_drawn.append(input)

        elif layer_type == "Activation":
            self.layers_drawn[-1].activation = args[1]
        elif layer_type in self.layersNotToDraw:
            return
        else:
            color = [0.0, 0.0, 0.0, 0.7]
            layer = Layer(color, shape, self.m_x_position, args[0], args[2])
            self.m_x_position = layer.draw()
            self.layers_drawn.append(layer)
