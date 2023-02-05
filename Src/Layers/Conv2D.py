from Src.Layers.Layer import Layer


class Conv2D(Layer):
    def __init__(self, shape, layer) -> None:
        color = [0.0, 1.0, 0.0, 1.0]

        Layer.__init__(self, color, shape, layer)
        pass
