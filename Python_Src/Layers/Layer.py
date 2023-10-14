from Python_Src.Utils.Values import layersNotToConsider, activation_layers
from Python_Src.Utils.Shapes import get_shapes


def get_next_layer(outbound_nodes):
    next_layers = []
    if len(outbound_nodes) != 0:
        for out_node in outbound_nodes:
            nodes = out_node.outbound_layer

            if type(nodes) == list:
                for layer in nodes:
                    if layer.__class__.__name__ not in layersNotToConsider and nodes.__class__.__name__ not in activation_layers:
                        if layer not in next_layers:
                            next_layers.append(layer)
                    else:
                        next_layers_of_next = get_next_layer(layer.outbound_nodes)
                        next_layers = next_layers + next_layers_of_next
            else:
                if nodes.__class__.__name__ not in layersNotToConsider and nodes.__class__.__name__ not in activation_layers:
                    if nodes not in next_layers:
                        next_layers.append(nodes)
                else:
                    next_layers = get_next_layer(nodes.outbound_nodes)

    return next_layers


def get_prev_layer(inbound_nodes):
    prev_layers = []
    if len(inbound_nodes) != 0:
        for in_node in inbound_nodes:
            nodes = in_node.inbound_layers
            if type(nodes) == list:
                for layer in nodes:
                    if layer.__class__.__name__ not in layersNotToConsider and nodes.__class__.__name__ not in activation_layers:
                        if layer not in prev_layers:
                            prev_layers.append(layer)
                    else:
                        prev_layers_of_prev = get_prev_layer(layer.inbound_nodes)
                        prev_layers = prev_layers + prev_layers_of_prev
            else:
                if nodes.__class__.__name__ not in layersNotToConsider and nodes.__class__.__name__ not in activation_layers:
                    if nodes not in prev_layers:
                        prev_layers.append(nodes)
                else:
                    prev_layers = get_prev_layer(nodes.inbound_nodes)

    return prev_layers


class Layer:

    def __init__(self, shape, layer, model_inside_model, model_name):

        self.id = None
        self.name = layer.name
        self.shape = shape
        self.original_model_layer = layer
        self.previous_layers = []
        self.next_layers = []
        self.activation = None
        self.kernel_size = layer.kernel_size if 'kernel_size' in layer.__dict__ else None
        self.type = layer.__class__.__name__
        self.input_shape = get_shapes(layer, True, True)
        self.output_shape = get_shapes(layer, False, True)
        self.invertedShape = layer.invertedShape
        self.layers = None
        self.model_inside_model = model_inside_model
        self.model_name = model_name

        if hasattr(layer, "data_format"):
            self.data_format = layer.data_format
        try:
            self.activation = layer.activation.__name__
        except AttributeError:
            self.activation = None

    def set_id(self, identifier):
        self.id = identifier
