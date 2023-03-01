from Src.Layers.Layer import Layer


class Input(Layer):
    def __init__(self, shape, layer) -> None:
        color = [255.0, 255.0, 0.0]

        Layer.__init__(self, color, shape, layer)
        pass
