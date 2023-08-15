import json
import os
import shutil
import zipfile
from PIL import Image, ImageDraw, ImageFont
from io import BytesIO
import base64
import re
from flask import Flask, request, jsonify
from flask_cors import CORS
from waitress import serve
from Src.Utils.Utils import *

app = Flask(__name__)
CORS(app)


@app.route('/process', methods=['POST'])
def process_file():
    file = request.files["model-file"]
    print(f'Received {file.filename}!')
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

        layers, _ = create_layers(model)

    except:
        os.remove(file.filename)
    else:
        layer_json = []
        for layer in layers:
            l_json = vars(layer)
            try:
                del l_json['original_model_layer']
                del l_json['previous_y_position']
                del l_json['computed_position']
            except KeyError:
                pass
            if layer.layers != None:
                layer_of_layer_json = []
                for l in layer.layers:
                    l_o_l_json = vars(l)
                    del l_o_l_json['original_model_layer']
                    del l_o_l_json['previous_y_position']
                    del l_o_l_json['computed_position']
                    layer_of_layer_json.append(l_o_l_json)
                l_json['layers'] = layer_of_layer_json
            layer_json.append(l_json)
        print('Sent!')
        os.remove(file.filename)
        response = json.dumps(layer_json)
        return response

@app.route('/process_image', methods=['POST'])
def process_image():
    image_data = re.sub('^data:image/.+;base64,', '', request.form['image'])
    image = Image.open(BytesIO(base64.b64decode(image_data)))
    data = json.loads(request.form['json'])
    background_color = (255, 255, 255, 255)  # Background color with transparency

    # Create a drawing object
    draw = ImageDraw.Draw(image)

    # Choose a font and size
    font = ImageFont.truetype("arial.ttf", 20)

    initial_x = 35
    y_position = image.height - 30
    max_x = image.width - 15

    # Calculate background position and size
    background_x = 0
    background_y = y_position-10
    background_width = image.width
    background_height = 40

    # Draw background
    draw.rectangle([background_x, background_y, background_x + background_width, background_y + background_height], fill=background_color)
    x_position = initial_x
    max_height = 0
    for l in data:
        _, _, text_width, text_height = draw.textbbox((0, 0), l, font=font)
        if(text_height > max_height):
            max_height = text_height
    for layer in data:
        _, _, text_width, text_height = draw.textbbox((0, 0), layer, font=font)

        if(x_position + text_width >= max_x):
            x_position = initial_x
            y_position = y_position - max_height -10
            draw.rectangle([background_x, background_y - 40, background_x + background_width, background_y - 40 + background_height], fill=background_color)
        # Calculate text size

        # Draw square
        square_size = max_height
        draw.rectangle([x_position - square_size, y_position+20 - square_size, x_position, y_position+20], fill=tuple(data[layer]), outline ="black")

        # Define text color
        text_color = (0, 0, 0)  # White

        # Add text to the image
        draw.text((x_position + 5, y_position), layer, font=font, fill=text_color)

        x_position = x_position + text_width + 35

    image_byte_stream = BytesIO()
    image.save(image_byte_stream, format='PNG')  # You can change the format as needed

    # Encode the image byte stream to Base64
    image_base64 = base64.b64encode(image_byte_stream.getvalue()).decode('utf-8')

    response = {
        "image": image_base64
    }
    print('Sent Image!')
    return jsonify(response)

if __name__ == '__main__':
    
    serve(app, host="0.0.0.0", port=5000)
