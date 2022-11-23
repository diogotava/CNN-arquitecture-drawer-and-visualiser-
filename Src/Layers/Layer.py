from Src.Utils.DrawShapes import *


class Layer:
    def __init__(self, color, shape, x_position, layers, index):
        previous_layer = layers[index-1]
        layer = layers[index]
        next_layer = layers[index+1]

        self.color = color
        self.shape = shape
        self.space_between_layers = 5
        self.x_position = x_position + (shape[0]/2) + self.space_between_layers
        self.original_model_layer = layer
        self.previous_layer = previous_layer
        self.next_layer = next_layer
        self.activation = None
        pass

    def draw(self):
        self.x_position = cube(self.shape, self.x_position, self.color)
        return self.x_position
