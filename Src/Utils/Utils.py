from Src.Layers.Layer import *
from Src.Layers.LayerDrawer import *
from tensorflow.keras.models import load_model

def get_model(model_file):
    model = load_model(model_file)

    return model

def get_layers(layer, layers, prev=False):
    layers_to_fill = []
    if prev:
        layers_of_layer = get_prev_layer(layer.original_model_layer._inbound_nodes)
    else:
        layers_of_layer = get_next_layer(layer.original_model_layer._outbound_nodes)

    for layer_of_layer in layers_of_layer:
        # gets the correspondent layer to the next_layer
        layer_to_fill = [e for e in layers if e.name == layer_of_layer.name]
        if len(layer_to_fill) > 1:
            print("ERROR!!")
        if len(layer_to_fill) > 0 and layer_to_fill[0].type != "Sequential" and layer_to_fill[0].type != "Functional":
            layers_to_fill.append(layer_to_fill[0].id)
        elif(prev):
            layers_to_fill.append(layer.id - 1)
            layers[layer.id - 1].next_layers.append(layer.id)
        else:
            layers_to_fill.append(layer.id + 1)

    if prev:
        layer.previous_layers = layers_to_fill
    else:
        layer.next_layers = layers_to_fill
    return


def get_next_layers(layer, layers):
    get_layers(layer, layers)


def get_prev_layers(layer, layers):
    get_layers(layer, layers, True)


def create_layers(model, index = 0, model_inside_model = False, model_name = None):
    layers = []
    prev_layer = None
    for layer_index, layer_to_save in enumerate(model.layers):
        l = [e for e in layers if e.name == layer_to_save.name]

        if layer_index == 0:
            model_previous_layers = get_prev_layer(layer_to_save._inbound_nodes)
            if len(model_previous_layers) > 0:
                for layer_of_layer in model_previous_layers:

                    layer_to_fill = [e for e in layers if e.name == layer_of_layer.name]
                    if len(layer_to_fill) > 1:
                        print("ERROR!!")
                    elif len(layer_to_fill) == 0:
                        prev_layer = create_layer(layer_of_layer.__class__.__name__, layer_of_layer, prev_layer, model_inside_model, model_name)
                        if prev_layer is not None:
                            try:
                                if layer_to_save.layers:
                                    prev_layer.layers, index = create_layers(layer_to_save, index, True, prev_layer.name)
                                    for i, l in enumerate(prev_layer.layers):
                                        if i == 0:
                                            for prev_l in prev_layer.previous_layers:
                                                target_index = layers[prev_l].next_layers.index(prev_layer.id)
                                                layers[prev_l].next_layers[target_index] = l.id
                                        layers.append(l)
                                    prev_l = l
                            except AttributeError:
                                prev_layer.setId(index)
                                layers.append(prev_layer)
                                index += 1
                                prev_layer = prev_layer

        if len(l) == 0:
            layer = create_layer(layer_to_save.__class__.__name__, layer_to_save, prev_layer, model_inside_model, model_name)
            if layer is not None:
                try:
                    if layer_to_save.layers:
                        layer.layers, index = create_layers(layer_to_save, index, True, layer.name)
                        for i, l in enumerate(layer.layers):
                            if i == 0:
                                for prev_l in layer.previous_layers:
                                    target_index = layers[prev_l].next_layers.index(layer.id)
                                    layers[prev_l].next_layers[target_index] = l.id
                            layers.append(l)
                        prev_l = l
                except AttributeError:
                    layer.setId(index)
                    layers.append(layer)
                    index += 1
                    prev_layer = layer

    for layer in layers:
        get_next_layers(layer, layers)
        get_prev_layers(layer, layers)
        if layer.type == "Add":
            layer.shape = get_shapes(layer, False, False, layers)[0]

    return layers, index
