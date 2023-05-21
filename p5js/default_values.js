let dynamicValues;

function resetDynamicValues() {
    dynamicValues = {
        "camX": 500.0,
        "camY": -500.0,
        "camZ": 400.0,
        "lookX": 500.0,
        "lookY": 0.0,
        "lookZ": 0.0,
        "colors": {
            "Conv2D": [
                0,
                255,
                0
            ],
            "Dense": [
                255,
                0,
                0
            ],
            "Flatten": [
                255,
                0,
                255
            ],
            "Dropout": [
                0,
                255,
                255
            ],
            "InputLayer": [
                255,
                255,
                0
            ],
            "BatchNormalization": [
                255,
                128,
                0
            ],
            "Concatenate": [
                128,
                255,
                255
            ],
            "Add": [
                170,
                200,
                255
            ],
            "LSTM": [
                255,
                0,
                150
            ],
            "GRU": [
                255,
                0,
                150
            ],
            "SimpleRNN": [
                255,
                0,
                150
            ],
            "TimeDistributed": [
                255,
                0,
                150
            ],
            "Bidirectional": [
                255,
                0,
                150
            ],
            "ConvLSTM1D": [
                255,
                0,
                150
            ],
            "ConvLSTM2D": [
                255,
                0,
                150
            ],
            "ConvLSTM3D": [
                255,
                0,
                150
            ],
            "BaseRNN": [
                255,
                0,
                150
            ],
            "Default": [
                128,
                128,
                128
            ],
            "Selected": [
                0,
                0,
                255
            ]
        },
        "mArrowWidth": 0.1,
        "mArrowHeight": 1,
        "sensitivityX": 1,
        "sensitivityY": 1,
        "sensitivityZ": 0.01,
        "minX": 5,
        "minZY": 5,
        "maxX": 400,
        "maxZY": 200,
        "blocks": [],
        "defaultSpaceBetweenLayers": 5
    };
}