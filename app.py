import json
import os
import shutil
import zipfile

from flask import Flask, request
from flask_cors import CORS

from Src.Utils.Utils import *

app = Flask(__name__)
CORS(app)


@app.route('/process', methods=['POST'])
def process_file():
    print('Received!')
    file = request.files["model-file"]
    file.save(file.filename)
    layers = []
    try:
        if ".zip" in file.filename:
            with zipfile.ZipFile(file.filename) as zip_file:
                model_name = ""
                name_of_model = False
                for file_of_zip in zip_file.filelist:
                    path_layers = file_of_zip.filename.split("/")
                    num_layers = len(path_layers)
                    if num_layers == 1:
                        name_of_model = True
                        model_name = file_of_zip.filename
                if not name_of_model:
                    model_name = zip_file.filelist[0].filename.split("/")[0] + "/"
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

        layers = create_layers(model)

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
