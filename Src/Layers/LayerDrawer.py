from Src.Layers.Layer import *
from Src.Utils.Shapes import get_shapes
from Src.Utils.Values import layersNotToDraw

activation_layers = ['ReLU', 'Softmax', 'LeakyReLU', 'PReLU', 'ELU', 'ThresholdedReLU']


def create_layer(layer_type, layer_model, prev_layer):
    shape = get_shapes(layer_model)[0]
    layer = None
    if layer_type not in layersNotToDraw:
        if layer_type == "BatchNormalization":
            prev_layer.batch_normalization = get_shapes(layer_model, False, True)[0][0]

        elif layer_type == 'Activation':
            prev_layer.activation = layer_model.get_config()['activation']

        elif layer_type in activation_layers:
            prev_layer.activation = layer_type
        else:
            layer = Layer(shape, layer_model)

    return layer
