from Src.Utils.DrawShapes import *
from Src.Layers.Layer import Layer


class Input(Layer):
    def __init__(self, shape, x_position, layers, index) -> None:
        color = [1.0, 1.0, 0.0, 0.7]

        Layer.__init__(self, color, shape, x_position, layers, index)
        pass

    def draw(self):
        self.x_position = cube(self.shape, self.x_position, self.color)
        return self.x_position
