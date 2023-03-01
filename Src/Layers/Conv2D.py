from Src.Layers.Layer import Layer


class Conv2D(Layer):
    def __init__(self, shape, layer) -> None:
        color = [0.0, 255, 0.0]

        Layer.__init__(self, color, shape, layer)
        pass
