from Src.Layers.Conv2D import *
from Src.Layers.Dense import *
from Src.Layers.Input import *
from Src.Layers.Layer import *
from Src.Utils.Model import get_shapes
from Src.Utils.Values import layersNotToDraw

activation_layers = ['ReLU', 'Softmax', 'LeakyReLU', 'PReLU', 'ELU', 'ThresholdedReLU']


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
                layer = Dense(shape, layer_model)
                self.layers_to_draw.append(layer)

            elif layer_type == "Dropout":
                layer = Dense(shape, layer_model)
                self.layers_to_draw.append(layer)

            elif layer_type == "InputLayer":
                layer = Input(shape, layer_model)
                self.layers_to_draw.append(layer)

            elif layer_type == 'Activation':
                self.layers_to_draw[-1].activation = layer_model.get_config()['activation']

            elif layer_type in activation_layers:
                self.layers_to_draw[-1].activation = layer_type
            else:
                layer = Layer(shape, layer_model)
                self.layers_to_draw.append(layer)

        return layer
