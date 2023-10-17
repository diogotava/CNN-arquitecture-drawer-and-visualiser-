def is_class(layer, class_type):
    if not hasattr(layer, "type"):
        return layer.__class__.__name__ == class_type
    else:
        return layer.type == class_type


def should_shape_be_inverted(layer, shape, layers):
    if is_class(layer, "Dense") and len(shape) == 1:
        return False
    if is_class(layer, "Add") and len(shape) == 3:
        if layers is None:
            return False
        else:
            return should_shape_be_inverted(layers[layer.previous_layers[0]], layers[layer.previous_layers[0]].shape,
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

        inverted = should_shape_be_inverted(layer, shape, layers)

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

        inverted = should_shape_be_inverted(layer, shape, layers)

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

            inverted = should_shape_be_inverted(layer, shape, layers)

            if not correct_shape:
                shape = get_shape(shape, inverted)
            shape_return.append(shape)
    if not input_shape:
        layer.invertedShape = inverted
    return shape_return


def get_shape(shape, inverted):
    if shape == [None]:
        return []
    shape = [element for element in shape if element is not None]
    if len(shape) == 1:
        shape = list((1,) * 2 + tuple(shape))
        if not inverted:
            shape_aux = shape[2]
            shape[2] = shape[1]
            shape[1] = shape_aux

    elif len(shape) == 2:
        shape = list(tuple(shape) + (1,) * 1)
        if not inverted:
            shape_aux = shape[2]
            shape[2] = shape[1]
            shape[1] = shape_aux
    index_x = 0
    index_y = 1
    index_z = 2

    if inverted:
        index_x = 2
        index_y = 0
        index_z = 1

    shape_return = shape.copy()
    shape_return[0] = shape[index_x]
    shape_return[1] = shape[index_y]
    shape_return[2] = shape[index_z]

    return shape_return
