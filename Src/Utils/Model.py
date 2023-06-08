import numpy as np
import tensorflow as tf
from tensorflow.keras.layers import Dense, Dropout, Activation, Flatten, Conv2D
from tensorflow.keras.layers import LeakyReLU
from tensorflow.keras.models import Sequential
from tensorflow.keras.models import load_model
from tensorflow.keras.optimizers import Adam

min_x = 5
min_zy = 5
max_zy = 400
max_x = 400

def shouldShapeBeInverted(layer, shape):
    if len(shape) == 3 and shape[0] == shape[1] and shape[0] > shape[2]:
        return True
    if layer.__class__.__name__ == "InputLayer" and len(shape) == 3:
        return True
    if layer.__class__.__name__ == "BatchNormalization" and len(shape) == 3:
        return True
    if layer.__class__.__name__ == "Concatenate" and len(shape) == 3:
        return True
    if layer.__class__.__name__ == "Add" and len(shape) == 3 :
        return False

def get_shapes(layer, input_shape=False, correct_shape=False):
    inverted = False
    try:
        if layer.data_format == "channels_last":
            inverted = True
    except:
        inverted = False

    if input_shape:
        layer_shape = layer.input_shape
    else:
        layer_shape = layer.output_shape

    if isinstance(layer_shape, tuple):
        shape = list(layer_shape)

        if layer.__class__.__name__ == "Embedding" or layer.__class__.__name__ == "GRU":
            shape = [shape[-1]]
        else:
            shape = shape[1:]

        if not inverted and shouldShapeBeInverted(layer, shape) != None:
            inverted = shouldShapeBeInverted(layer, shape)
        if not correct_shape:
            shape_return = [get_shape(shape, inverted)]
        else:
            shape_return = [shape]
    elif ( isinstance(layer_shape, list) and len(layer_shape) == 1 ):  # drop dimension for non seq. models
        shape = layer_shape[0]
        if isinstance(shape, tuple):
            shape = list(shape)

        shape = shape[1:]

        if not inverted and shouldShapeBeInverted(layer, shape) != None:
            inverted = shouldShapeBeInverted(layer, shape)

        if not correct_shape:
            shape_return = [get_shape(shape, inverted)]
        else:
            shape_return = [shape]
    else:
        shape_return = []
        for shape in layer_shape:
            if isinstance(shape, tuple):
                shape = list(shape)
            shape = shape[1:]

            if not inverted and shouldShapeBeInverted(layer, shape) != None:
                inverted = shouldShapeBeInverted(layer, shape)

            if not correct_shape:
                shape = get_shape(shape, inverted)
            shape_return.append(shape)

    return shape_return


def get_shape(shape, inverted):
    one_dim_orientation = 'z'

    if shape == [None]:
        return [min_x, min_zy, min_zy]
    shape = [element for element in shape if element is not None]
    if len(shape) == 1:
        if one_dim_orientation in ['x', 'y', 'z']:
            shape = list((1, ) * "xyz".index(one_dim_orientation) + tuple(shape))
        else:
            raise ValueError(f"unsupported orientation: {one_dim_orientation}")

    index_x = 0
    index_y = 1
    index_z = 2

    if inverted:
        index_x = 2
        index_y = 0
        index_z = 1

    if shape[index_x] >= min_x*2:
        shape[index_x] = shape[index_x] / np.log(shape[index_x])

    shape_return = shape.copy()
    shape_return[0] = min(max(shape[index_x], min_x), max_x)
    shape_return[1] = min(max(shape[index_y], min_zy), max_zy)
    shape_return[2] = min(max(shape[index_z], min_zy), max_zy)

    # if shape_return[2] > shape_return[1]:
    #     aux_val = shape_return[1]
    #     shape_return[1] = shape_return[2]
    #     shape_return[2] = aux_val

    return shape_return


def get_model(model_file):
    model = load_model(model_file)

    return model
