import random

from Src.Utils.DrawShapes import *
from Src.Utils.Model import get_shape
from Src.Layers.Conv2D import *
from Src.Layers.Input import *
from Src.Layers.Dense import *
from Src.Layers.Layer import *
from Src.Utils.Values import mode


class LayersDrawer:
    layersNotToDraw = ["LeakyReLU"]

    def __init__(self):
        self.m_x_position = 0
        self.layers_drawn = []

    def draw_layer(self, layer_type, layer_model):
        shape = get_shape(layer_model)
        if layer_type == "Conv2D":
            conv2D = Conv2D(shape, self.m_x_position, layer_model)
            self.m_x_position = conv2D.draw()
            self.layers_drawn.append(conv2D)

        elif layer_type == "Dense":
            dense = Dense(shape, self.m_x_position, layer_model)
            self.m_x_position = dense.draw()
            self.layers_drawn.append(dense)

        elif layer_type == "Flatten":
            flatten = Dense(shape, self.m_x_position, layer_model, [1.0, 0.0, 1.0, 1.0])
            self.m_x_position = flatten.draw()
            self.layers_drawn.append(flatten)

        elif layer_type == "Dropout":
            flatten = Dense(shape, self.m_x_position, layer_model, [0.0, 1.0, 1.0, 1.0])
            self.m_x_position = flatten.draw()
            self.layers_drawn.append(flatten)

        elif layer_type == "InputLayer":
            input = Input(shape, self.m_x_position, layer_model)
            self.m_x_position = input.draw()
            self.layers_drawn.append(input)

        elif layer_type == "Activation":
            self.layers_drawn[-1].activation = layer_model
        elif layer_type in self.layersNotToDraw:
            return
        else:
            color = [0.0, 0.0, 0.0, 1.0]
            layer = Layer(color, shape, self.m_x_position, layer_model)
            self.m_x_position = layer.draw()
            self.layers_drawn.append(layer)

    def draw_layer_code(self, layer_type, code, layer_model):
        global mode
        color_code = 0
        if (mode):
            code = 100 + code * 25
        color_code = code / 255.0

        color_layer = [color_code, color_code, color_code, 1.0]

        shape = get_shape(layer_model)
        if layer_type == "Conv2D":
            conv2D = Conv2D(shape, self.m_x_position, layer_model)
            self.m_x_position = conv2D.draw_color(color_layer)
            self.layers_drawn.append(conv2D)

        elif layer_type == "Dense":
            dense = Dense(shape, self.m_x_position, layer_model)
            self.m_x_position = dense.draw_color(color_layer)
            self.layers_drawn.append(dense)

        elif layer_type == "Flatten":
            flatten = Dense(shape, self.m_x_position, layer_model)
            self.m_x_position = flatten.draw_color(color_layer)
            self.layers_drawn.append(flatten)

        elif layer_type == "Dropout":
            flatten = Dense(shape, self.m_x_position, layer_model)
            self.m_x_position = flatten.draw_color(color_layer)
            self.layers_drawn.append(flatten)

        elif layer_type == "InputLayer":
            input = Input(shape, self.m_x_position, layer_model)
            self.m_x_position = input.draw_color(color_layer)
            self.layers_drawn.append(input)

        elif layer_type == "Activation":
            self.layers_drawn[-1].activation = layer_model
        elif layer_type in self.layersNotToDraw:
            return
        else:
            color = [0.0, 0.0, 0.0, 1.0]
            layer = Layer(color, shape, self.m_x_position, layer_model)
            self.m_x_position = layer.draw_color(color_layer)
            self.layers_drawn.append(layer)
