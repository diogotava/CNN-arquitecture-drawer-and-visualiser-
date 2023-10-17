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
# from waitress import serve
from Python_Src.Utils.Utils import *

app = Flask(__name__)
CORS(app)


@app.route('/process', methods=['POST'])
def process_file():
    file = request.files["model-file"]
    print(f'Received {file.filename}!')
    file.save(file.filename)
    model_layers = []
    directory = False
    try:
        if ".zip" in file.filename:
            with zipfile.ZipFile(file.filename) as zip_file:
                model_file_name = ""
                name_of_model = False
                # Varify if zip file contains a unique file like a .h5 file
                for file_of_zip in zip_file.filelist:
                    path_layers = file_of_zip.filename.split("/")
                    num_path_layers = len(path_layers)
                    if num_path_layers == 1:
                        name_of_model = True
                        model_file_name = file_of_zip.filename
                # If the zip does not contain this file, it is a directory
                # so make de model file name the name of that directory
                if not name_of_model:
                    directory = True
                    model_file_name = zip_file.filelist[0].filename.split("/")[0]

                zip_file.extractall()

                model = get_model(model_file_name)
                # If the content of the zipfile was a directory remove the directory and all its content
                if directory:
                    shutil.rmtree(model_file_name)
                else:
                    os.remove(model_file_name)
        else:
            model = get_model(file.filename)

        model_layers, _ = create_layers(model)

    except Exception as e:
        print(e)
        os.remove(file.filename)
    else:
        layer_json = []
        for layer in model_layers:
            l_json = vars(layer)
            try:
                # Remove the information of the layers that is no
                del l_json['original_model_layer']
            except KeyError:
                pass
            if layer.layers is not None:
                # If the layer is actually a model, insert its layers in the json
                layer_of_layer_json = []
                for layer_of_model in layer.layers:
                    l_o_l_json = vars(layer_of_model)
                    del l_o_l_json['original_model_layer']
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
    layerInfo = json.loads(request.form['layerInfo'])
    colors = json.loads(request.form['colors'])

    blockData = None
    if 'block' in request.form:
        blockData = json.loads(request.form['block'])
    background_color = tuple(colors['background'])  # Background color with transparency

    # Create a drawing object
    draw = ImageDraw.Draw(image)

    # Define text color
    text_color = tuple(colors['text'])  # black
    textId_color = tuple(colors['textId'])  # black
    fontID = ImageFont.truetype("arialbd.ttf", int((10 * image.width) ** (1 / 3)))
    for layer in layerInfo:
        if 'id' in layer:
            _, _, title_width, title_height = draw.textbbox((0, 0), str(layer['id']), font=fontID)
            draw.text((layer['centerPosition']['x']-title_width/2, layer['centerPosition']['y']-title_height/2), str(layer['id']), font=fontID, fill=textId_color)

    # Choose a font and size
    font = ImageFont.truetype("arial.ttf", int((10 * image.width) ** (1 / 3)))
    if blockData != None:
        text = f"Block: {blockData['blockName']}, Block Type: {blockData['blockType']}";
        _, _, title_width, title_height = draw.textbbox((0, 0), text, font=font)
        draw.text((image.width/2 - title_width /2, 5), text, font=font, fill=text_color)
    spacing = 20
    padding = 10

    max_height = 0
    for layer in data:
        _, _, text_width, text_height = draw.textbbox((0, 0), layer, font=font)
        if text_height > max_height:
            max_height = text_height
    initial_x = padding + max_height
    y_position = image.height - max_height - padding
    max_x = image.width - 15

    # Calculate background position and size
    background_x = 0
    background_y = y_position - padding
    background_width = image.width
    background_height = max_height + 20

    # Draw background
    draw.rectangle([background_x, background_y, background_x + background_width, background_y + background_height], fill=background_color)
    x_position = initial_x
    for layer in data:
        _, _, text_width, text_height = draw.textbbox((0, 0), layer, font=font)

        if x_position + text_width >= max_x:
            x_position = initial_x
            y_position = y_position - max_height - padding
            draw.rectangle([background_x, background_y - background_height, background_x + background_width, background_y],
                           fill=background_color)
        # Calculate text size

        # Draw square
        square_size = max_height
        draw.rectangle([x_position - square_size, y_position, x_position, y_position + square_size], fill=tuple(data[layer]),
                       outline="black")

        # Add text to the image
        draw.text((x_position + 5, y_position), layer, font=font, fill=text_color)

        x_position = x_position + text_width + spacing + max_height

    image_byte_stream = BytesIO()
    image.save(image_byte_stream, format='PNG')  # You can change the format as needed

    # Encode the image byte stream to Base64
    image_base64 = base64.b64encode(image_byte_stream.getvalue()).decode('utf-8')

    response = {
        "image": image_base64,
        "layerInfo": request.form['layerInfo']
    }
    print('Sent Image!')
    return jsonify(response)


if __name__ == '__main__':
    # serve(app, host="0.0.0.0", port=5000)
    app.run(debug=True)
