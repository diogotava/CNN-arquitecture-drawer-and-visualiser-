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
        "minZY": 5,
        "maxX": 400,
        "maxZY": 200,
        "minWindowSize": 400,
        "blocks": [],
        "defaultSpaceBetweenLayers": Number(document.getElementById('defaultSpaceBetweenLayers').defaultValue),
        "defaultLateralSpaceBetweenLayers": Number(document.getElementById('defaultLateralSpaceBetweenLayers').defaultValue),
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
    dynamicValues.defaultSpaceBetweenLayers = Number(document.getElementById('defaultSpaceBetweenLayers').value);
    document.getElementById('arrowHeight').max = dynamicValues.defaultSpaceBetweenLayers / 2 - 1;
    dynamicValues.defaultLateralSpaceBetweenLayers = Number(document.getElementById('defaultLateralSpaceBetweenLayers').value);
    dynamicValues.blockSize = Number(document.getElementById('blockSize').value);
}

function updateCameraValues() {
    dynamicValues.camX = document.getElementById('camX').value;
    dynamicValues.camY = document.getElementById('camY').value;
    dynamicValues.camZ = document.getElementById('camZ').value;
    dynamicValues.lookX = document.getElementById('lookX').value;
    dynamicValues.lookY = document.getElementById('lookY').value;
    dynamicValues.lookZ = document.getElementById('lookZ').value;
}

function updateCameraShownValues() {
    document.getElementById('camX').value = dynamicValues.camX;
    document.getElementById('camY').value = dynamicValues.camY;
    document.getElementById('camZ').value = dynamicValues.camZ;
    document.getElementById('lookX').value = dynamicValues.lookX;
    document.getElementById('lookY').value = dynamicValues.lookY;
    document.getElementById('lookZ').value = dynamicValues.lookZ;
}

function updateShownValues() {
    document.getElementById('arrowWidth').value = dynamicValues.arrowWidth;
    document.getElementById('arrowHeight').value = dynamicValues.arrowHeight;
    document.getElementById('arrowPointRadius').value = dynamicValues.arrowPointRadius;
    document.getElementById('sensitivityX').value = dynamicValues.sensitivityX;
    document.getElementById('sensitivityY').value = dynamicValues.sensitivityY;
    document.getElementById('sensitivityZ').value = dynamicValues.sensitivityZ;
    document.getElementById('defaultSpaceBetweenLayers').value = dynamicValues.defaultSpaceBetweenLayers;
    document.getElementById('defaultLateralSpaceBetweenLayers').value = dynamicValues.defaultLateralSpaceBetweenLayers;
    document.getElementById('blockSize').value = dynamicValues.blockSize;
}

function resetValues() {
    updateCameraShownValues();
    updateShownValues();
    resetColors();
}