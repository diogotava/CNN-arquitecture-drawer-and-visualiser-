from Src.Layers.Layer import Layer


class Dense(Layer):
    def __init__(self, shape, layer, color=[255, 0.0, 0.0]) -> None:
        shape = [shape[2], shape[0], shape[1]]
        Layer.__init__(self, color, shape, layer)
        pass
