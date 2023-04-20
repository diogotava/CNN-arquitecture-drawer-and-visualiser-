from flask import Flask, request, render_template_string, jsonify
from flask_cors import CORS


from Src.QTWidgets.mainWindow import MainWindow
from PyQt5.QtWidgets import QApplication
import sys
from Src.Layers.LayerDrawer import *
from Src.Utils.Model import *
from Src.Utils.Utils import *
from Src.Layers.Layer import *

import json

app = Flask(__name__)
CORS(app)


@app.route('/process', methods=['POST'])
def process_file():
    file = request.files["model-file"]
    file.save("model.h5")

    model = get_model("model.h5")

    layers = []

    layer_drawer = LayersDrawer()
    index = 0
    for layer_to_save in model.layers:
        l = [e for e in layers if e.name == layer_to_save.name]

        if len(l) == 0:
            layer = layer_drawer.create_layer(layer_to_save.__class__.__name__, layer_to_save)
            if layer is not None:
                layer.id = index
                layers.append(layer)
                index += 1
        else:
            layer = l[0]

        if layer is not None:
            next_layers = []
            nextLayers = get_next_layer(layer_to_save._outbound_nodes)
            for layer_of_layer in nextLayers:
                # vai buscar o layer correspondente ao next_layer
                layer_to_fill = [e for e in layers if e.name == layer_of_layer.name]
                if len(layer_to_fill) > 1:
                    print("ERROR!!")
                elif len(layer_to_fill) == 0:
                    next_layer = layer_drawer.create_layer(layer_of_layer.__class__.__name__, layer_of_layer)
                    if next_layer is not None:
                        next_layer.id = index
                        layers.append(next_layer)
                        next_layers.append(index)
                        index += 1
                else:
                    next_layers.append(layer_to_fill[0].id)
            layer.next_layers = next_layers

            previous_layers = []
            previousLayers = get_prev_layer(layer_to_save._inbound_nodes)
            for layer_of_layer in previousLayers:
                # vai buscar o layer correspondente ao next_layer
                layer_to_fill = [e for e in layers if e.name == layer_of_layer.name]
                if len(layer_to_fill) > 1:
                    print("ERROR!!")
                elif len(layer_to_fill) == 0:
                    previous_layer = layer_drawer.create_layer(layer_of_layer.__class__.__name__, layer_of_layer)
                    if previous_layer is not None:
                        previous_layer.id = index
                        layers.append(previous_layer)
                        previous_layers.append(index)
                        index += 1
                else:
                    previous_layers.append(layer_to_fill[0].id)

            layer.previous_layers = previous_layers

    get_lateral_position_layers(layers[0], layers)
    # align_previous_layers(layers[0], layers)

    layer_json = []
    for layer in layers:
        l_json = vars(layer)
        del l_json['original_model_layer']
        del l_json['previous_y_position']
        del l_json['computed_position']
        layer_json.append(l_json)
    print('Sent!')
    response = json.dumps(layer_json)
    return response


if __name__ == '__main__':
    app.run(debug=True)
