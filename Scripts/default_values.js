let dynamicValues;

function resetDynamicValues() {
    dynamicValues = {
        "camX": Number(document.getElementById('camX').defaultValue),
        "camY": Number(document.getElementById('camY').defaultValue),
        "camZ": Number(document.getElementById('camZ').defaultValue),
        "lookX": Number(document.getElementById('lookX').defaultValue),
        "lookY": Number(document.getElementById('lookY').defaultValue),
        "lookZ": Number(document.getElementById('lookZ').defaultValue),
        "colors": {
            "Conv1D": [],
            "Conv2D": [],
            "Conv3D": [],
            "Dense": [],
            "Flatten": [],
            "Dropout": [],
            "InputLayer": [],
            "Concatenate": [],
            "Add": [],
            "LSTM": [],
            "GRU": [],
            "SimpleRNN": [],
            "TimeDistributed": [],
            "Bidirectional": [],
            "ConvLSTM1D": [],
            "ConvLSTM2D": [],
            "ConvLSTM3D": [],
            "BaseRNN": [],
            "MaxPooling1D": [],
            "MaxPooling2D": [],
            "MaxPooling3D": [],
            "AveragePooling1D": [],
            "AveragePooling2D": [],
            "AveragePooling3D": [],
            "GlobalMaxPooling1D": [],
            "GlobalMaxPooling2D": [],
            "GlobalMaxPooling3D": [],
            "GlobalAveragePooling1D": [],
            "GlobalAveragePooling2D": [],
            "GlobalAveragePooling3D": [],
            "Reshape": [],
            "Default": [],
            "Block": [],
            "Selected": []
        },
        "arrowWidth": Number(document.getElementById('arrowWidth').defaultValue),
        "arrowHeight": Number(document.getElementById('arrowHeight').defaultValue),
        "arrowPointRadius": Number(document.getElementById('arrowPointRadius').defaultValue),
        "sensitivityX": Number(document.getElementById('sensitivityX').defaultValue),
        "sensitivityY": Number(document.getElementById('sensitivityY').defaultValue),
        "sensitivityZ": Number(document.getElementById('sensitivityZ').defaultValue),
        "minX": 5,
        "minZY": 2,
        "maxX": Number(document.getElementById('maxLength').defaultValue),
        "maxZY": Number(document.getElementById('maxWidth').defaultValue),
        "minWindowSize": 400,
        "blocks": [],
        "defaultSpaceBetweenLayers": Number(document.getElementById('spaceBetweenLayers').defaultValue),
        "defaultLateralSpaceBetweenLayers": Number(document.getElementById('lateralSpaceBetweenLayers').defaultValue),
        "blockSize": Number(document.getElementById('blockSize').defaultValue),
        "selectedLayerID": -1,
        "bPressed": false
    };
    resetValues();
}

function updateValues() {
    updateCameraValues();
    updateColors();
    dynamicValues.arrowWidth = Number(document.getElementById('arrowWidth').value);
    dynamicValues.arrowHeight = Number(document.getElementById('arrowHeight').value);
    dynamicValues.arrowPointRadius = Number(document.getElementById('arrowPointRadius').value);
    dynamicValues.sensitivityX = Number(document.getElementById('sensitivityX').value);
    dynamicValues.sensitivityY = Number(document.getElementById('sensitivityY').value);
    dynamicValues.sensitivityZ = Number(document.getElementById('sensitivityZ').value);
    dynamicValues.maxX = Number(document.getElementById('maxLength').value);
    dynamicValues.maxZY = Number(document.getElementById('maxWidth').value);
    dynamicValues.defaultSpaceBetweenLayers = Number(document.getElementById('spaceBetweenLayers').value);
    document.getElementById('arrowHeight').max = dynamicValues.defaultSpaceBetweenLayers / 2 - 1;
    dynamicValues.defaultLateralSpaceBetweenLayers = Number(document.getElementById('lateralSpaceBetweenLayers').value);
    dynamicValues.blockSize = Number(document.getElementById('blockSize').value);
    layersChanged = true;
}

function updateCameraValues() {
    dynamicValues.camX = !isNaN(Number(document.getElementById('camX').value)) ? Number(document.getElementById('camX').value) : 0;
    dynamicValues.camY = !isNaN(Number(document.getElementById('camY').value)) ? Number(document.getElementById('camY').value) : 0;
    dynamicValues.camZ = !isNaN(Number(document.getElementById('camZ').value)) ? Number(document.getElementById('camZ').value) : 0;
    dynamicValues.lookX = !isNaN(Number(document.getElementById('lookX').value)) ? Number(document.getElementById('lookX').value) : 0;
    dynamicValues.lookY = !isNaN(Number(document.getElementById('lookY').value)) ? Number(document.getElementById('lookY').value) : 0;
    dynamicValues.lookZ = !isNaN(Number(document.getElementById('lookZ').value)) ? Number(document.getElementById('lookZ').value) : 0;
}

function updateCameraShownValues() {
    document.getElementById('camX').value = !isNaN(Math.round(dynamicValues.camX)) ? Math.round(dynamicValues.camX) : 0;
    document.getElementById('camY').value = !isNaN(Math.round(dynamicValues.camY)) ? Math.round(dynamicValues.camY) : 0;
    document.getElementById('camZ').value = !isNaN(Math.round(dynamicValues.camZ)) ? Math.round(dynamicValues.camZ) : 0;
    document.getElementById('lookX').value = !isNaN(Math.round(dynamicValues.lookX)) ? Math.round(dynamicValues.lookX) : 0;
    document.getElementById('lookY').value = !isNaN(Math.round(dynamicValues.lookY)) ? Math.round(dynamicValues.lookY) : 0;
    document.getElementById('lookZ').value = !isNaN(Math.round(dynamicValues.lookZ)) ? Math.round(dynamicValues.lookZ) : 0;
}

function updateShownValues() {
    updateCameraShownValues();
    updateColorsShownValues();
    document.getElementById('arrowWidth').value = dynamicValues.arrowWidth;
    document.getElementById('arrowHeight').value = dynamicValues.arrowHeight;
    document.getElementById('arrowPointRadius').value = dynamicValues.arrowPointRadius;
    document.getElementById('sensitivityX').value = dynamicValues.sensitivityX;
    document.getElementById('sensitivityY').value = dynamicValues.sensitivityY;
    document.getElementById('sensitivityZ').value = dynamicValues.sensitivityZ;
    document.getElementById('maxLength').value = dynamicValues.maxX;
    document.getElementById('maxWidth').value = dynamicValues.maxZY;
    document.getElementById('spaceBetweenLayers').value = dynamicValues.defaultSpaceBetweenLayers;
    document.getElementById('lateralSpaceBetweenLayers').value = dynamicValues.defaultLateralSpaceBetweenLayers;
    document.getElementById('blockSize').value = dynamicValues.blockSize;
}

function resetValues() {
    resetColors();
    updateShownValues();
}