from Src.Layers.Conv2D import *
from Src.Layers.Dense import *
from Src.Layers.Input import *
from Src.Layers.Layer import *
from Src.Utils.Model import get_shapes
from Src.Utils.Values import layersNotToDraw


class LayersDrawer:
    def __init__(self):
        self.layers_to_draw = []

    def create_layer(self, layer_type, layer_model):
        shape = get_shapes(layer_model)[0]
        layer = None
        if layer_type not in layersNotToDraw:
            if layer_type == "Conv2D":
                layer = Conv2D(shape, layer_model)
                self.layers_to_draw.append(layer)

            elif layer_type == "Dense":
                layer = Dense(shape, layer_model)
                self.layers_to_draw.append(layer)

            elif layer_type == "Flatten":
                layer = Dense(shape, layer_model, [255.0, 0.0, 255.0])
                self.layers_to_draw.append(layer)

            elif layer_type == "Dropout":
                layer = Dense(shape, layer_model, [0.0, 255.0, 255.0])
                self.layers_to_draw.append(layer)

            elif layer_type == "InputLayer":
                layer = Input(shape, layer_model)
                self.layers_to_draw.append(layer)

            elif layer_type == "Activation":
                self.layers_to_draw[-1].activation = layer_model
            else:
                color = [128, 128, 128]
                layer = Layer(color, shape, layer_model)
                self.layers_to_draw.append(layer)

        return layer
