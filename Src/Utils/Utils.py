from Src.Layers.Layer import *
from Src.Layers.LayerDrawer import *
from tensorflow.keras.models import load_model

def get_model(model_file):
    model = load_model(model_file)

    return model

def get_layers(layer, layers, layers_of_layer, prev=False):
    layers_to_fill = []

    for layer_of_layer in layers_of_layer:
        # gets the correspondent layer to the next_layer
        layer_to_fill = [e for e in layers if e.name == layer_of_layer.name]
        if len(layer_to_fill) > 1:
            print("ERROR!!")
        if len(layer_to_fill) > 0 and layer_to_fill[0].type != "Sequential" and layer_to_fill[0].type != "Functional":
            layers_to_fill.append(layer_to_fill[0].id)
        elif(prev):
            layers_to_fill.append(layer.id - 1)
        else:
            layers_to_fill.append(layer.id + 1)

    return layers_to_fill

def get_nodes(layers, models, nodes_of_layer, prev=False):
    layers_to_fill = []

    for layer_node in nodes_of_layer:
        # gets the correspondent node to the next_layer
        layer_to_fill = [e for e in layers if e.name == layer_node.name]
        model_to_fill = [e for e in models if e.name == layer_node.name]
        if len(layer_to_fill) > 1 or len(model_to_fill) > 1:
            print("ERROR!!")

        if len(layer_to_fill) == 1:
            layers_to_fill.append(layer_to_fill[0])
        if len(model_to_fill) == 1:
            layers_to_fill.append(model_to_fill[0])

    return layers_to_fill

def get_next_layers(layer, layers):
    layers_of_layer = get_next_layer(layer.original_model_layer._outbound_nodes)
    layers_to_fill = get_layers(layer, layers, layers_of_layer)
    layer.next_layers = layers_to_fill


def get_prev_layers(layer, layers):
    layers_of_layer = get_prev_layer(layer.original_model_layer._inbound_nodes)
    layers_to_fill = get_layers(layer, layers, layers_of_layer, True)
    layer.previous_layers = layers_to_fill

def get_next_nodes_model(model, models, layers):
    layers_of_layer = get_next_layer(model.original_model_layer._outbound_nodes)
    nodes_to_fill = get_nodes(layers, models, layers_of_layer)
    nodes = []
    for node in nodes_to_fill:
        if (node.type == "Sequential" or node.type == "Functional") and node.layers[0].id != model.layers[-1].id:
            nodes.append(node.layers[0].id)
        elif node.id != model.layers[-1].id:
            nodes.append(node.id)
    model.layers[-1].next_layers = nodes

def get_prev_nodes_model(model, models, layers):
    layers_of_layer = get_prev_layer(model.original_model_layer._inbound_nodes)
    nodes_to_fill = get_nodes(layers, models, layers_of_layer, True)
    nodes = []
    for node in nodes_to_fill:
        if (node.type == "Sequential" or node.type == "Functional") and node.layers[-1].id != model.layers[0].id:
            nodes.append(node.layers[-1].id)
        elif node.id != model.layers[0].id:
            nodes.append(node.id)
    model.layers[0].previous_layers = nodes




def create_layers(model, initial_index = 0, prev_layer = None, model_inside_model = False, model_name = None, layers=None, models = None):
    if layers == None:
        layers = []
    if models == None:
        models = []

    index = initial_index
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
                            prev_layer.setId(index)
                            try:
                                if layer_to_save.layers:
                                    prev_layer.layers, index = create_layers(layer_to_save, index, prev_layer, True, prev_layer.name, layers, models)
                                    models.append(prev_layer)
                            except AttributeError:
                                layers.append(prev_layer)
                                index += 1
                                prev_layer = prev_layer

        if len(l) == 0:
            layer = create_layer(layer_to_save.__class__.__name__, layer_to_save, prev_layer, model_inside_model, model_name)
            if layer is not None:
                layer.setId(index)
                try:
                    if layer_to_save.layers:
                        layer.layers, index = create_layers(layer_to_save, index, prev_layer, True, layer.name, layers, models)
                        models.append(layer)
                except AttributeError:
                    layers.append(layer)
                    index += 1
                    prev_layer = layer
        elif len(l) == 1 and l[0].id == 0 and model_inside_model:
            lId = l[0].id
            layer = create_layer(layer_to_save.__class__.__name__, layer_to_save, prev_layer, model_inside_model, model_name)
            layer.setId(lId)
            layers[lId] = layer
            initial_index = initial_index -1

    for layer in layers:
        try:
            get_next_layers(layer, layers)
            get_prev_layers(layer, layers)
            if layer.type == "Add":
                layer.shape = get_shapes(layer, False, False, layers)[0]
        except AttributeError as e:
            print(e)

    if not model_inside_model:
        for model in models:
            get_next_nodes_model(model, models, layers)
            get_prev_nodes_model(model, models, layers)

    return layers[initial_index:], index
