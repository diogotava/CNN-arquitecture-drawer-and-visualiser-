from flask import Flask, request, render_template_string, jsonify
from flask_cors import CORS


from Src.QTWidgets.mainWindow import MainWindow
from PyQt5.QtWidgets import QApplication
import sys
from Src.Layers.LayerDrawer import *
from Src.Utils.Model import *
from Src.Utils.Utils import *

import json

app = Flask(__name__)
CORS(app)


def get_response(data):
    print('data:', data)  # "Hi"
    return "Hello !"


@app.route('/rep_bot', methods=['GET', 'POST'])
def bot_rep_py():
    if request.method == 'POST':
        input_text = request.form["js_input"]
        # input_text = "model_GTSRB_train1_val1_02//cp-0057.ckpt"
        model = get_model(input_text)

        layers = []
        # model.summary()
        layer_drawer = LayersDrawer()
        index = 0
        for layer_to_save in model.layers:
            layer = layer_drawer.create_layer(layer_to_save.__class__.__name__, layer_to_save)
            if layer is not None:
                layer.id = index
                layers.append(layer)
                index += 1

        for layer in layers:
            get_next_layers(layer, layers)
            get_prev_layers(layer, layers)

        get_lateral_position_layers(layers[0], layers)
        align_previous_layers(layers[0], layers)
        layer_json = []
        for layer in layers:
            l_json = vars(layer)
            del l_json['original_model_layer']
            del l_json['activation']
            layer_json.append(l_json)
        print('Sent!')
        return json.dumps(layer_json)  # jsonify({'answer': layers})
    else:
        return "???"


if __name__ == '__main__':
    app.run(debug=True)  # , use_reloader=False)
    # test = bot_rep_py()
    # print(test)
