from Src.Utils.DrawShapes import *
from Src.Layers.Layer import Layer


class Input(Layer):
    def __init__(self, shape, layer) -> None:
        color = [1.0, 1.0, 0.0, 1.0]

        Layer.__init__(self, color, shape, layer)
        pass

    def draw(self):
        glMaterialfv(GL_FRONT_AND_BACK, GL_AMBIENT_AND_DIFFUSE, self.color)
        cube(self.shape, self.center_position[0])
        return self.center_position[0] + self.shape[0] / 2

    def draw_color(self, color_code):
        glColor4f(color_code[0], color_code[1], color_code[2], color_code[3])
        cube(self.shape, self.center_position[0])
        return self.center_position[0] + self.shape[0] / 2
