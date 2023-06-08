from flask import Flask, request
from flask_cors import CORS

import sys
from Src.Layers.LayerDrawer import *
from Src.Utils.Model import *
from Src.Utils.Utils import *
from Src.Layers.Layer import *

import json
import os
import shutil
import zipfile

app = Flask(__name__)
CORS(app)


@app.route('/process', methods=['POST'])
def process_file():

    layers = []
    file = request.files["model-file"]
    file.save(file.filename)
    try:
        if ".zip" in file.filename:
            with zipfile.ZipFile(file.filename) as zip_file:
                model_name = ""
                name_of_model = False
                for file_of_zip in zip_file.filelist:
                    path_layers = file_of_zip.filename.split("/")
                    num_layers = len(path_layers)
                    if(num_layers == 1):
                        name_of_model = True
                        model_name = file_of_zip.filename
                if(not name_of_model):
                   model_name = zip_file.filelist[0].filename.split("/")[0]+"/"
                directory = False
                zip_file.extractall()
                if "/" == model_name[-1]:
                    directory = True
                    model_name = model_name[:-1]
                model = get_model(model_name)
                if directory:
                    shutil.rmtree(model_name)
                else:
                    os.remove(model_name)
        else:
            model = get_model(file.filename)


        index = 0
        prev_layer = None
        for layer_to_save in model.layers:
            l = [e for e in layers if e.name == layer_to_save.name]

            if len(l) == 0:
                layer = create_layer(layer_to_save.__class__.__name__, layer_to_save, prev_layer)
                if layer is not None:
                    layer.id = index
                    layers.append(layer)
                    index += 1
            else:
                layer = l[0]

            if layer is not None:
                prev_layer = layer
                next_layers = []
                model_next_layers = get_next_layer(layer_to_save._outbound_nodes)
                for layer_of_layer in model_next_layers:
                    # vai buscar o layer correspondente ao next_layer
                    layer_to_fill = [e for e in layers if e.name == layer_of_layer.name]
                    if len(layer_to_fill) > 1:
                        print("ERROR!!")
                    elif len(layer_to_fill) == 0:
                        next_layer = create_layer(layer_of_layer.__class__.__name__, layer_of_layer, prev_layer)
                        if next_layer is not None:
                            next_layer.id = index
                            layers.append(next_layer)
                            next_layers.append(index)
                            index += 1
                    elif layer_to_fill[0].id not in next_layers:
                        next_layers.append(layer_to_fill[0].id)
                layer.next_layers = next_layers

                previous_layers = []
                model_previous_layers = get_prev_layer(layer_to_save._inbound_nodes)
                for layer_of_layer in model_previous_layers:
                    # vai buscar o layer correspondente ao next_layer
                    layer_to_fill = [e for e in layers if e.name == layer_of_layer.name]
                    if len(layer_to_fill) > 1:
                        print("ERROR!!")
                    elif len(layer_to_fill) == 0:
                        previous_layer = create_layer(layer_of_layer.__class__.__name__, layer_of_layer, prev_layer)
                        if previous_layer is not None:
                            previous_layer.id = index
                            layers.append(previous_layer)
                            previous_layers.append(index)
                            index += 1
                    elif layer_to_fill[0].id not in previous_layers:
                        previous_layers.append(layer_to_fill[0].id)

                layer.previous_layers = previous_layers

        # get_lateral_position_layers(layers[0], layers)
        # align_previous_layers(layers[0], layers)

    except:
        os.remove(file.filename)
    else:
        layer_json = []
        for layer in layers:
            l_json = vars(layer)
            del l_json['original_model_layer']
            del l_json['previous_y_position']
            del l_json['computed_position']
            layer_json.append(l_json)
        print('Sent!')
        os.remove(file.filename)
        response = json.dumps(layer_json)
        return response

if __name__ == '__main__':
    app.run(debug=True)
