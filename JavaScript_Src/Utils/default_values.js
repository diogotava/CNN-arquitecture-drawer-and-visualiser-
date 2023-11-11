let recursiveLayerTypes = ["LSTM", "GRU", "SimpleRNN", "TimeDistributed", "Bidirectional", "ConvLSTM1D", "ConvLSTM2D", "ConvLSTM3D", "BaseRNN"];

let dynamicValues;
let defaultColors = {
    "Background": [255, 255, 255],
    "text": [0, 0, 0],
    "textId": [255, 255, 255],
    "Arrow": [0, 0, 0],
    "Conv1D": [10, 255, 0],
    "Conv2D": [0, 255, 0],
    "Conv3D": [0, 255, 0],
    "Dense": [255, 0, 0],
    "Flatten": [255, 0, 255],
    "Dropout": [0, 255, 255],
    "InputLayer": [255, 200, 0],
    "Concatenate": [128, 255, 255],
    "Add": [170, 200, 255],
    "LSTM": [255, 0, 150],
    "GRU": [255, 0, 150],
    "SimpleRNN": [255, 0, 150],
    "TimeDistributed": [255, 0, 150],
    "Bidirectional": [255, 0, 150],
    "ConvLSTM1D": [255, 0, 150],
    "ConvLSTM2D": [255, 0, 150],
    "ConvLSTM3D": [255, 0, 150],
    "BaseRNN": [255, 0, 150],
    "MaxPooling1D": [50, 50, 150],
    "MaxPooling2D": [50, 50, 150],
    "MaxPooling3D": [50, 50, 150],
    "AveragePooling1D": [50, 50, 150],
    "AveragePooling2D": [50, 50, 150],
    "AveragePooling3D": [50, 50, 150],
    "GlobalMaxPooling1D": [50, 50, 150],
    "GlobalMaxPooling2D": [50, 50, 150],
    "GlobalMaxPooling3D": [50, 50, 150],
    "GlobalAveragePooling1D": [50, 50, 150],
    "GlobalAveragePooling2D": [50, 50, 150],
    "GlobalAveragePooling3D": [50, 50, 150],
    "MultiHeadAttention": [200, 0, 0],
    "LayerNormalization": [200, 0, 200],
    "Reshape": [250, 128, 0],
    "Default": [128, 128, 128],
    "Block": [0, 0, 0],
    "Selected": [0, 0, 255],
    "Conv1DTranspose": [0, 150, 0],
    "Conv2DTranspose": [0, 150, 0],
    "Conv3DTranspose": [0, 150, 0],
};

function resetDynamicValues() {
    initialBlockId = 150000;
    endBlockId = initialBlockId + 50000;
    dynamicValues = {
        "camX": Number(document.getElementById('camX').defaultValue),
        "camY": Number(document.getElementById('camY').defaultValue),
        "camZ": Number(document.getElementById('camZ').defaultValue),
        "lookX": Number(document.getElementById('lookX').defaultValue),
        "lookY": Number(document.getElementById('lookY').defaultValue),
        "lookZ": Number(document.getElementById('lookZ').defaultValue),
        "colors": { ...defaultColors },
        "arrowWidth": Number(document.getElementById('arrowWidth').defaultValue),
        "arrowHeight": Number(document.getElementById('arrowHeight').defaultValue),
        "arrowPointRadius": Number(document.getElementById('arrowPointRadius').defaultValue),
        "sensitivityX": Number(document.getElementById('sensitivityX').defaultValue),
        "sensitivityY": Number(document.getElementById('sensitivityY').defaultValue),
        "sensitivityZ": Number(document.getElementById('sensitivityZ').defaultValue),
        "minLength": Number(document.getElementById('minLength').defaultValue),
        "minWidth": Number(document.getElementById('minWidth').defaultValue),
        "maxLength": Number(document.getElementById('maxLength').defaultValue),
        "maxWidth": Number(document.getElementById('maxWidth').defaultValue),
        "strokeWeight": Number(document.getElementById('strokeWeight').defaultValue),
        "minWindowSize": 400,
        "paragraphsWorldCoords": [0, 0, 0],
        "blocks": [],
        "spaceBetweenLayers": Number(document.getElementById('spaceBetweenLayers').defaultValue),
        "lateralSpaceBetweenLayers": Number(document.getElementById('lateralSpaceBetweenLayers').defaultValue),
        "blockSize": Number(document.getElementById('blockSize').defaultValue),
        "selectedLayerID": -1,
        "bPressed": false,
        "initialBlockId": initialBlockId,
        "currentBlockId": -1,
        "endBlockId": endBlockId,
    };
    resetValues();
}

function updateRangeValue() {
    document.getElementById('strokeWeightValue').innerHTML = Number(document.getElementById('strokeWeight').value);
}
function updateValues() {
    updateCameraValues();
    updateColors();
    let keys = ['arrowWidth', 'arrowHeight', 'arrowPointRadius', 'sensitivityX', 'sensitivityY', 'sensitivityZ', 'minLength', 'maxLength', 'minWidth', 'maxWidth', 'strokeWeight', 'spaceBetweenLayers', 'lateralSpaceBetweenLayers', 'blockSize']

    keys.forEach(key => {
        dynamicValues[key] = Number(document.getElementById(key).value);
    });
    updateRangeValue();
    document.getElementById('arrowHeight').max = dynamicValues.spaceBetweenLayers / 2 - 1;
    layersChanged = true;
}

function updateCameraValues() {
    let keys = ['camX', 'camY', 'camZ', 'lookX', 'lookY', 'lookZ']

    keys.forEach(key => {
        dynamicValues[key] = !isNaN(parseFloat(document.getElementById(key).value.replace(",", "."))) ? parseFloat(document.getElementById(key).value.replace(",", ".")) : 0;
    });
}

function updateCameraShownValues() {
    let keys = ['camX', 'camY', 'camZ', 'lookX', 'lookY', 'lookZ']

    keys.forEach(key => {
        document.getElementById(key).value = !isNaN(dynamicValues[key]) ? dynamicValues[key] : 0;
    });
}

function updateShownValues() {
    updateCameraShownValues();
    updateColorsShownValues();
    let keys = ['arrowWidth', 'arrowHeight', 'arrowPointRadius', 'sensitivityX', 'sensitivityY', 'sensitivityZ', 'minLength', 'maxLength', 'minWidth', 'maxWidth', 'strokeWeight', 'spaceBetweenLayers', 'lateralSpaceBetweenLayers', 'blockSize']

    keys.forEach(key => {
        document.getElementById(key).value = dynamicValues[key];
    });
    updateRangeValue();
}

function resetValues() {
    updateShownValues();
}