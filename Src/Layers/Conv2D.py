from Src.Layers.Layer import Layer
from Src.Utils.DrawShapes import *


class Conv2D(Layer):
    def __init__(self, shape, x_position, layers, index) -> None:
        color = [1.0, 0.5, 0.0, 0.7]

        Layer.__init__(self, color, shape, x_position, layers, index)
        pass

    def draw(self):
        self.x_position = cube(self.shape, self.x_position, self.color)
        return self.x_position

    def draw_color(self, color_code):
        self.x_position = cube(self.shape, self.x_position, color_code)
        return self.x_position