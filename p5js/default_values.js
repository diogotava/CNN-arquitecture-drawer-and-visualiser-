let dynamicValues;

function resetDynamicValues() {
    dynamicValues = {
        "camX": 0.0,
        "camY": 0.0,
        "camZ": 0.0,
        "lookX": 0.0,
        "lookY": 0.0,
        "lookZ": 0.0,
        "colors": {
            "Conv2D": [0, 255, 0],
            "Dense": [255, 0, 0],
            "Flatten": [255, 0, 255],
            "Dropout": [0, 255, 255],
            "InputLayer": [255, 255, 0],
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
            "Reshape": [250, 128, 0],
            "Default": [128, 128, 128],
            "Selected": [0, 0, 255]
        },
        "arrowWidth": 0.2,
        "arrowHeight": 1,
        "arrowPointRadius": 0.5,
        "sensitivityX": 1,
        "sensitivityY": 1,
        "sensitivityZ": 0.01,
        "minX": 5,
        "minZY": 5,
        "maxX": 400,
        "maxZY": 200,
        "minWindowSize": 400,
        "blocks": [],
        "defaultSpaceBetweenLayers": 10,
        "defaultLateralSpaceBetweenLayers": 10,
        "layersAlreadyComputedPosition": [],
        "blockSize": 10,
        "selectedLayerID": -1,
        "bPressed": false
    };
    resetCameraValues();
}

function resetLayersAlreadyComputedPosition() {
    dynamicValues.layersAlreadyComputedPosition = [];
}

function resetCameraValues() {
    dynamicValues.camX = 500.0;
    dynamicValues.camY = -500.0;
    dynamicValues.camZ = 400.0;
    dynamicValues.lookX = 500.0;
    dynamicValues.lookY = 0.0;
    dynamicValues.lookZ = 0.0;
}