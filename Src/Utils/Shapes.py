import numpy as np

min_x = 5
min_zy = 5
max_zy = 400
max_x = 400


def isClass(layer, class_type):
    if not hasattr(layer, "type"):
        return layer.__class__.__name__ == class_type
    else:
        return layer.type == class_type


def shouldShapeBeInverted(layer, shape, layers):
    if isClass(layer, "Dense") and len(shape) == 1:
        return False
    if isClass(layer, "Add") and len(shape) == 3:
        if layers is None:
            return False
        else:
            return shouldShapeBeInverted(layers[layer.previous_layers[0]].original_model_layer, layers[layer.previous_layers[0]].shape,
                                         layers)

    return True


def get_shapes(layer, input_shape=False, correct_shape=False, layers=None):
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

        if shouldShapeBeInverted(layer, shape, layers) is not None:
            inverted = shouldShapeBeInverted(layer, shape, layers)
        if not correct_shape:
            shape_return = [get_shape(shape, inverted)]
        else:
            shape_return = [shape]
    elif isinstance(layer_shape, list) and len(layer_shape) == 1:
        shape = layer_shape[0]
        if isinstance(shape, tuple):
            shape = list(shape)

        if not hasattr(layer, "type"):
            shape = shape[1:]

        if shouldShapeBeInverted(layer, shape, layers) is not None:
            inverted = shouldShapeBeInverted(layer, shape, layers)

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

            if shouldShapeBeInverted(layer, shape, layers) is not None:
                inverted = shouldShapeBeInverted(layer, shape, layers)

            if not correct_shape:
                shape = get_shape(shape, inverted)
            shape_return.append(shape)
    if not input_shape:
        layer.invertedShape = inverted
    return shape_return


def get_shape(shape, inverted):
    one_dim_orientation = 'z'

    if shape == [None]:
        return [min_x, min_zy, min_zy]
    shape = [element for element in shape if element is not None]
    if len(shape) == 1:
        if one_dim_orientation in ['x', 'y', 'z']:
            shape = list((1,) * "xyz".index(one_dim_orientation) + tuple(shape))
            if not inverted:
                shape_aux = shape[2]
                shape[2] = shape[1]
                shape[1] = shape_aux
        else:
            raise ValueError(f"unsupported orientation: {one_dim_orientation}")

    index_x = 0
    index_y = 1
    index_z = 2

    if inverted:
        index_x = 2
        index_y = 0
        index_z = 1

    if shape[index_x] >= min_x * 2:
        shape[index_x] = shape[index_x] / np.log(shape[index_x])
    if shape[index_y] >= min_zy * 2:
        shape[index_y] = shape[index_y] / np.log(shape[index_y])
    if shape[index_z] >= min_zy * 2:
        shape[index_z] = shape[index_z] / np.log(shape[index_z])

    shape_return = shape.copy()
    shape_return[0] = min(max(shape[index_x], min_x), max_x)
    shape_return[1] = min(max(shape[index_y], min_zy), max_zy)
    shape_return[2] = min(max(shape[index_z], min_zy), max_zy)

    return shape_return
