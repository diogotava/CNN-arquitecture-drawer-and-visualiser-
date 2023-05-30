from Src.Layers.Conv2D import *
from Src.Layers.Dense import *
from Src.Layers.Input import *
from Src.Layers.Layer import *
from Src.Utils.Model import get_shapes
from Src.Utils.Values import layersNotToDraw

activation_layers = ['ReLU', 'Softmax', 'LeakyReLU', 'PReLU', 'ELU', 'ThresholdedReLU']


def create_layer(layer_type, layer_model, prev_layer):
    shape = get_shapes(layer_model)[0]
    layer = None
    if layer_type not in layersNotToDraw:
        if layer_type == "Conv2D":
            layer = Conv2D(shape, layer_model)

        elif layer_type == "Dense":
            layer = Dense(shape, layer_model)

        elif layer_type == "Flatten":
            layer = Dense(shape, layer_model)

        elif layer_type == "Dropout":
            layer = Dense(shape, layer_model)

        elif layer_type == "InputLayer":
            layer = Input(shape, layer_model)

        elif layer_type == "BatchNormalization":
            prev_layer.batch_normalization = get_shapes(layer_model, False, True)[0][0]

        elif layer_type == 'Activation':
            prev_layer.activation = layer_model.get_config()['activation']

        elif layer_type in activation_layers:
            prev_layer.activation = layer_type
        else:
            layer = Layer(shape, layer_model)

    return layer
