from Src.Utils.DrawShapes import *
from Src.Layers.Layer import Layer


class Input(Layer):
    def __init__(self, shape, layer) -> None:
        color = [1.0, 1.0, 0.0, 1.0]

        Layer.__init__(self, color, shape, layer)
        pass
