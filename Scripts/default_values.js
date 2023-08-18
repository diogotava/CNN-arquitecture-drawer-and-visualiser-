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
        "minX": Number(document.getElementById('minLength').defaultValue),
        "minZY": Number(document.getElementById('minWidth').defaultValue),
        "maxX": Number(document.getElementById('maxLength').defaultValue),
        "maxZY": Number(document.getElementById('maxWidth').defaultValue),
        "minWindowSize": 400,
        "paragraphsWorldCoord": { x: 0, y: 0, z: 0 },
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
    dynamicValues.minX = Number(document.getElementById('minLength').value);
    dynamicValues.maxX = Number(document.getElementById('maxLength').value);
    dynamicValues.minZY = Number(document.getElementById('minWidth').value);
    dynamicValues.maxZY = Number(document.getElementById('maxWidth').value);
    dynamicValues.defaultSpaceBetweenLayers = Number(document.getElementById('spaceBetweenLayers').value);
    document.getElementById('arrowHeight').max = dynamicValues.defaultSpaceBetweenLayers / 2 - 1;
    dynamicValues.defaultLateralSpaceBetweenLayers = Number(document.getElementById('lateralSpaceBetweenLayers').value);
    dynamicValues.blockSize = Number(document.getElementById('blockSize').value);
    layersChanged = true;
}

function updateCameraValues() {
    dynamicValues.camX = !isNaN(parseFloat(document.getElementById('camX').value.replace(",", "."))) ? parseFloat(document.getElementById('camX').value.replace(",", ".")) : 0;
    dynamicValues.camY = !isNaN(parseFloat(document.getElementById('camY').value.replace(",", "."))) ? parseFloat(document.getElementById('camY').value.replace(",", ".")) : 0;
    dynamicValues.camZ = !isNaN(parseFloat(document.getElementById('camZ').value.replace(",", "."))) ? parseFloat(document.getElementById('camZ').value.replace(",", ".")) : 0;
    dynamicValues.lookX = !isNaN(parseFloat(document.getElementById('lookX').value.replace(",", "."))) ? parseFloat(document.getElementById('lookX').value.replace(",", ".")) : 0;
    dynamicValues.lookY = !isNaN(parseFloat(document.getElementById('lookY').value.replace(",", "."))) ? parseFloat(document.getElementById('lookY').value.replace(",", ".")) : 0;
    dynamicValues.lookZ = !isNaN(parseFloat(document.getElementById('lookZ').value.replace(",", "."))) ? parseFloat(document.getElementById('lookZ').value.replace(",", ".")) : 0;
}

function updateCameraShownValues() {
    document.getElementById('camX').value = !isNaN(dynamicValues.camX) ? dynamicValues.camX : 0;
    document.getElementById('camY').value = !isNaN(dynamicValues.camY) ? dynamicValues.camY : 0;
    document.getElementById('camZ').value = !isNaN(dynamicValues.camZ) ? dynamicValues.camZ : 0;
    document.getElementById('lookX').value = !isNaN(dynamicValues.lookX) ? dynamicValues.lookX : 0;
    document.getElementById('lookY').value = !isNaN(dynamicValues.lookY) ? dynamicValues.lookY : 0;
    document.getElementById('lookZ').value = !isNaN(dynamicValues.lookZ) ? dynamicValues.lookZ : 0;
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
    document.getElementById('minLength').value = dynamicValues.minX;
    document.getElementById('maxLength').value = dynamicValues.maxX;
    document.getElementById('minWidth').value = dynamicValues.minZY;
    document.getElementById('maxWidth').value = dynamicValues.maxZY;
    document.getElementById('spaceBetweenLayers').value = dynamicValues.defaultSpaceBetweenLayers;
    document.getElementById('lateralSpaceBetweenLayers').value = dynamicValues.defaultLateralSpaceBetweenLayers;
    document.getElementById('blockSize').value = dynamicValues.blockSize;
}

function resetValues() {
    resetColors();
    updateShownValues();
}