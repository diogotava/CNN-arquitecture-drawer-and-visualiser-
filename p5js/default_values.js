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
            "Conv2D": [],
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
    dynamicValues.defaultLateralSpaceBetweenLayers = Number(document.getElementById('defaultLateralSpaceBetweenLayers').value);
    dynamicValues.blockSize = Number(document.getElementById('blockSize').value);
}

function updateCameraValues(){
     dynamicValues.camX = document.getElementById('camX').value;
     dynamicValues.camY = document.getElementById('camY').value;
     dynamicValues.camZ = document.getElementById('camZ').value;
     dynamicValues.lookX = document.getElementById('lookX').value;
     dynamicValues.lookY = document.getElementById('lookY').value;
     dynamicValues.lookZ = document.getElementById('lookZ').value;
}

function updateCameraShownValues(){
    document.getElementById('camX').value = dynamicValues.camX;
    document.getElementById('camY').value = dynamicValues.camY;
    document.getElementById('camZ').value = dynamicValues.camZ;
    document.getElementById('lookX').value = dynamicValues.lookX;
    document.getElementById('lookY').value = dynamicValues.lookY;
    document.getElementById('lookZ').value = dynamicValues.lookZ;
}

function resetValues() {
    dynamicValues.camX = Number(document.getElementById('camX').defaultValue);
    dynamicValues.camY = Number(document.getElementById('camY').defaultValue);
    dynamicValues.camZ = Number(document.getElementById('camZ').defaultValue);
    dynamicValues.lookX = Number(document.getElementById('lookX').defaultValue);
    dynamicValues.lookY = Number(document.getElementById('lookY').defaultValue);
    dynamicValues.lookZ = Number(document.getElementById('lookZ').defaultValue);
    updateCameraShownValues();
    resetColors();
}

function resetColors(){
    let conv2DColor = document.getElementById('Conv2D').defaultValue;
    document.getElementById('Conv2D').value = document.getElementById('Conv2D').defaultValue;
    dynamicValues.colors.Conv2D = [parseInt(conv2DColor.substring(1,3), 16), parseInt(conv2DColor.substring(3,5), 16), parseInt(conv2DColor.substring(5,7), 16)];

    let denseColor = document.getElementById('Dense').defaultValue;
    document.getElementById('Dense').value = document.getElementById('Dense').defaultValue;
    dynamicValues.colors.Dense = [parseInt(denseColor.substring(1,3), 16), parseInt(denseColor.substring(3,5), 16), parseInt(denseColor.substring(5,7), 16)];

    let flattenColor = document.getElementById('Flatten').defaultValue;
    document.getElementById('Flatten').value = document.getElementById('Flatten').defaultValue;
    dynamicValues.colors.Flatten = [parseInt(flattenColor.substring(1,3), 16), parseInt(flattenColor.substring(3,5), 16), parseInt(flattenColor.substring(5,7), 16)];

    let dropoutColor = document.getElementById('Dropout').defaultValue;
    document.getElementById('Dropout').value = document.getElementById('Dropout').defaultValue;
    dynamicValues.colors.Dropout = [parseInt(dropoutColor.substring(1,3), 16), parseInt(dropoutColor.substring(3,5), 16), parseInt(dropoutColor.substring(5,7), 16)];

    let inputColor = document.getElementById('InputLayer').defaultValue;
    document.getElementById('InputLayer').value = document.getElementById('InputLayer').defaultValue;
    dynamicValues.colors.InputLayer = [parseInt(inputColor.substring(1,3), 16), parseInt(inputColor.substring(3,5), 16), parseInt(inputColor.substring(5,7), 16)];

    let concatenateColor = document.getElementById('Concatenate').defaultValue;
    document.getElementById('Concatenate').value = document.getElementById('Concatenate').defaultValue;
    dynamicValues.colors.Concatenate = [parseInt(concatenateColor.substring(1,3), 16), parseInt(concatenateColor.substring(3,5), 16), parseInt(concatenateColor.substring(5,7), 16)];

    let addColor = document.getElementById('Add').defaultValue;
    document.getElementById('Add').value = document.getElementById('Add').defaultValue;
    dynamicValues.colors.Add = [parseInt(addColor.substring(1,3), 16), parseInt(addColor.substring(3,5), 16), parseInt(addColor.substring(5,7), 16)];

    let lstmColor = document.getElementById('LSTM').defaultValue;
    document.getElementById('LSTM').value = document.getElementById('LSTM').defaultValue;
    dynamicValues.colors.LSTM = [parseInt(lstmColor.substring(1,3), 16), parseInt(lstmColor.substring(3,5), 16), parseInt(lstmColor.substring(5,7), 16)];

    let gruColor = document.getElementById('GRU').defaultValue;
    document.getElementById('GRU').value = document.getElementById('GRU').defaultValue;
    dynamicValues.colors.GRU = [parseInt(gruColor.substring(1,3), 16), parseInt(gruColor.substring(3,5), 16), parseInt(gruColor.substring(5,7), 16)];

    let simpleRNNColor = document.getElementById('SimpleRNN').defaultValue;
    document.getElementById('SimpleRNN').value = document.getElementById('SimpleRNN').defaultValue;
    dynamicValues.colors.SimpleRNN = [parseInt(simpleRNNColor.substring(1,3), 16), parseInt(simpleRNNColor.substring(3,5), 16), parseInt(simpleRNNColor.substring(5,7), 16)];

    let timeDistributedColor = document.getElementById('TimeDistributed').defaultValue;
    document.getElementById('TimeDistributed').value = document.getElementById('TimeDistributed').defaultValue;
    dynamicValues.colors.TimeDistributed = [parseInt(timeDistributedColor.substring(1,3), 16), parseInt(timeDistributedColor.substring(3,5), 16), parseInt(timeDistributedColor.substring(5,7), 16)];

    let bidirectionalColor = document.getElementById('Bidirectional').defaultValue;
    document.getElementById('Bidirectional').value = document.getElementById('Bidirectional').defaultValue;
    dynamicValues.colors.Bidirectional = [parseInt(bidirectionalColor.substring(1,3), 16), parseInt(bidirectionalColor.substring(3,5), 16), parseInt(bidirectionalColor.substring(5,7), 16)];

    let convLSTM1DColor = document.getElementById('ConvLSTM1D').defaultValue;
    document.getElementById('ConvLSTM1D').value = document.getElementById('ConvLSTM1D').defaultValue;
    dynamicValues.colors.ConvLSTM1D = [parseInt(convLSTM1DColor.substring(1,3), 16), parseInt(convLSTM1DColor.substring(3,5), 16), parseInt(convLSTM1DColor.substring(5,7), 16)];

    let convLSTM2DColor = document.getElementById('ConvLSTM2D').defaultValue;
    document.getElementById('ConvLSTM2D').value = document.getElementById('ConvLSTM2D').defaultValue;
    dynamicValues.colors.ConvLSTM2D = [parseInt(convLSTM2DColor.substring(1,3), 16), parseInt(convLSTM2DColor.substring(3,5), 16), parseInt(convLSTM2DColor.substring(5,7), 16)];

    let convLSTM3DColor = document.getElementById('ConvLSTM3D').defaultValue;
    document.getElementById('ConvLSTM3D').value = document.getElementById('ConvLSTM3D').defaultValue;
    dynamicValues.colors.ConvLSTM3D = [parseInt(convLSTM3DColor.substring(1,3), 16), parseInt(convLSTM3DColor.substring(3,5), 16), parseInt(convLSTM3DColor.substring(5,7), 16)];

    let baseRNNColor = document.getElementById('BaseRNN').defaultValue;
    document.getElementById('BaseRNN').value = document.getElementById('BaseRNN').defaultValue;
    dynamicValues.colors.BaseRNN = [parseInt(baseRNNColor.substring(1,3), 16), parseInt(baseRNNColor.substring(3,5), 16), parseInt(baseRNNColor.substring(5,7), 16)];

    let maxPooling1DColor = document.getElementById('MaxPooling1D').defaultValue;
    document.getElementById('MaxPooling1D').value = document.getElementById('MaxPooling1D').defaultValue;
    dynamicValues.colors.MaxPooling1D = [parseInt(maxPooling1DColor.substring(1,3), 16), parseInt(maxPooling1DColor.substring(3,5), 16), parseInt(maxPooling1DColor.substring(5,7), 16)];

    let maxPooling2DColor = document.getElementById('MaxPooling2D').defaultValue;
    document.getElementById('MaxPooling2D').value = document.getElementById('MaxPooling2D').defaultValue;
    dynamicValues.colors.MaxPooling2D = [parseInt(maxPooling2DColor.substring(1,3), 16), parseInt(maxPooling2DColor.substring(3,5), 16), parseInt(maxPooling2DColor.substring(5,7), 16)];

    let maxPooling3DColor = document.getElementById('MaxPooling3D').defaultValue;
    document.getElementById('MaxPooling3D').value = document.getElementById('MaxPooling3D').defaultValue;
    dynamicValues.colors.MaxPooling3D = [parseInt(maxPooling3DColor.substring(1,3), 16), parseInt(maxPooling3DColor.substring(3,5), 16), parseInt(maxPooling3DColor.substring(5,7), 16)];

    let averagePooling1DColor = document.getElementById('AveragePooling1D').defaultValue;
    document.getElementById('AveragePooling1D').value = document.getElementById('AveragePooling1D').defaultValue;
    dynamicValues.colors.AveragePooling1D = [parseInt(averagePooling1DColor.substring(1,3), 16), parseInt(averagePooling1DColor.substring(3,5), 16), parseInt(averagePooling1DColor.substring(5,7), 16)];

    let averagePooling2DColor = document.getElementById('AveragePooling2D').defaultValue;
    document.getElementById('AveragePooling2D').value = document.getElementById('AveragePooling2D').defaultValue;
    dynamicValues.colors.AveragePooling2D = [parseInt(averagePooling2DColor.substring(1,3), 16), parseInt(averagePooling2DColor.substring(3,5), 16), parseInt(averagePooling2DColor.substring(5,7), 16)];

    let averagePooling3DColor = document.getElementById('AveragePooling3D').defaultValue;
    document.getElementById('AveragePooling3D').value = document.getElementById('AveragePooling3D').defaultValue;
    dynamicValues.colors.AveragePooling3D = [parseInt(averagePooling3DColor.substring(1,3), 16), parseInt(averagePooling3DColor.substring(3,5), 16), parseInt(averagePooling3DColor.substring(5,7), 16)];

    let globalMaxPooling1DColor = document.getElementById('GlobalMaxPooling1D').defaultValue;
    document.getElementById('GlobalMaxPooling1D').value = document.getElementById('GlobalMaxPooling1D').defaultValue;
    dynamicValues.colors.GlobalMaxPooling1D = [parseInt(globalMaxPooling1DColor.substring(1,3), 16), parseInt(globalMaxPooling1DColor.substring(3,5), 16), parseInt(globalMaxPooling1DColor.substring(5,7), 16)];

    let globalMaxPooling2DColor = document.getElementById('GlobalMaxPooling2D').defaultValue;
    document.getElementById('GlobalMaxPooling2D').value = document.getElementById('GlobalMaxPooling2D').defaultValue;
    dynamicValues.colors.GlobalMaxPooling2D = [parseInt(globalMaxPooling2DColor.substring(1,3), 16), parseInt(globalMaxPooling2DColor.substring(3,5), 16), parseInt(globalMaxPooling2DColor.substring(5,7), 16)];

    let globalMaxPooling3DColor = document.getElementById('GlobalMaxPooling3D').defaultValue;
    document.getElementById('GlobalMaxPooling3D').value = document.getElementById('GlobalMaxPooling3D').defaultValue;
    dynamicValues.colors.GlobalMaxPooling3D = [parseInt(globalMaxPooling3DColor.substring(1,3), 16), parseInt(globalMaxPooling3DColor.substring(3,5), 16), parseInt(globalMaxPooling3DColor.substring(5,7), 16)];

    let globalAveragePooling1DColor = document.getElementById('GlobalAveragePooling1D').defaultValue;
    document.getElementById('GlobalAveragePooling1D').value = document.getElementById('GlobalAveragePooling1D').defaultValue;
    dynamicValues.colors.GlobalAveragePooling1D = [parseInt(globalAveragePooling1DColor.substring(1,3), 16), parseInt(globalAveragePooling1DColor.substring(3,5), 16), parseInt(globalAveragePooling1DColor.substring(5,7), 16)];

    let globalAveragePooling2DColor = document.getElementById('GlobalAveragePooling2D').defaultValue;
    document.getElementById('GlobalAveragePooling2D').value = document.getElementById('GlobalAveragePooling2D').defaultValue;
    dynamicValues.colors.GlobalAveragePooling2D = [parseInt(globalAveragePooling2DColor.substring(1,3), 16), parseInt(globalAveragePooling2DColor.substring(3,5), 16), parseInt(globalAveragePooling2DColor.substring(5,7), 16)];

    let globalAveragePooling3DColor = document.getElementById('GlobalAveragePooling3D').defaultValue;
    document.getElementById('GlobalAveragePooling3D').value = document.getElementById('GlobalAveragePooling3D').defaultValue;
    dynamicValues.colors.GlobalAveragePooling3D = [parseInt(globalAveragePooling3DColor.substring(1,3), 16), parseInt(globalAveragePooling3DColor.substring(3,5), 16), parseInt(globalAveragePooling3DColor.substring(5,7), 16)];

    let reshapeColor = document.getElementById('Reshape').defaultValue;
    document.getElementById('Reshape').value = document.getElementById('Reshape').defaultValue;
    dynamicValues.colors.Reshape = [parseInt(reshapeColor.substring(1,3), 16), parseInt(reshapeColor.substring(3,5), 16), parseInt(reshapeColor.substring(5,7), 16)];

    let defaultColor = document.getElementById('Default').defaultValue;
    document.getElementById('Default').value = document.getElementById('Default').defaultValue;
    dynamicValues.colors.Default = [parseInt(defaultColor.substring(1,3), 16), parseInt(defaultColor.substring(3,5), 16), parseInt(defaultColor.substring(5,7), 16)];

    let selectedColor = document.getElementById('Selected').defaultValue;
    document.getElementById('Selected').value = document.getElementById('Selected').defaultValue;
    dynamicValues.colors.Selected = [parseInt(selectedColor.substring(1,3), 16), parseInt(selectedColor.substring(3,5), 16), parseInt(selectedColor.substring(5,7), 16)];
}

function updateColors(){
    let conv2DColor = document.getElementById('Conv2D').value;
    dynamicValues.colors.Conv2D = [parseInt(conv2DColor.substring(1,3), 16), parseInt(conv2DColor.substring(3,5), 16), parseInt(conv2DColor.substring(5,7), 16)];

    let denseColor = document.getElementById('Dense').value;
    dynamicValues.colors.Dense = [parseInt(denseColor.substring(1,3), 16), parseInt(denseColor.substring(3,5), 16), parseInt(denseColor.substring(5,7), 16)];

    let flattenColor = document.getElementById('Flatten').value;
    dynamicValues.colors.Flatten = [parseInt(flattenColor.substring(1,3), 16), parseInt(flattenColor.substring(3,5), 16), parseInt(flattenColor.substring(5,7), 16)];

    let dropoutColor = document.getElementById('Dropout').value;
    dynamicValues.colors.Dropout = [parseInt(dropoutColor.substring(1,3), 16), parseInt(dropoutColor.substring(3,5), 16), parseInt(dropoutColor.substring(5,7), 16)];

    let inputColor = document.getElementById('InputLayer').value;
    dynamicValues.colors.InputLayer = [parseInt(inputColor.substring(1,3), 16), parseInt(inputColor.substring(3,5), 16), parseInt(inputColor.substring(5,7), 16)];

    let concatenateColor = document.getElementById('Concatenate').value;
    dynamicValues.colors.Concatenate = [parseInt(concatenateColor.substring(1,3), 16), parseInt(concatenateColor.substring(3,5), 16), parseInt(concatenateColor.substring(5,7), 16)];

    let addColor = document.getElementById('Add').value;
    dynamicValues.colors.Add = [parseInt(addColor.substring(1,3), 16), parseInt(addColor.substring(3,5), 16), parseInt(addColor.substring(5,7), 16)];

    let lstmColor = document.getElementById('LSTM').value;
    dynamicValues.colors.LSTM = [parseInt(lstmColor.substring(1,3), 16), parseInt(lstmColor.substring(3,5), 16), parseInt(lstmColor.substring(5,7), 16)];

    let gruColor = document.getElementById('GRU').value;
    dynamicValues.colors.GRU = [parseInt(gruColor.substring(1,3), 16), parseInt(gruColor.substring(3,5), 16), parseInt(gruColor.substring(5,7), 16)];

    let simpleRNNColor = document.getElementById('SimpleRNN').value;
    dynamicValues.colors.SimpleRNN = [parseInt(simpleRNNColor.substring(1,3), 16), parseInt(simpleRNNColor.substring(3,5), 16), parseInt(simpleRNNColor.substring(5,7), 16)];

    let timeDistributedColor = document.getElementById('TimeDistributed').value;
    dynamicValues.colors.TimeDistributed = [parseInt(timeDistributedColor.substring(1,3), 16), parseInt(timeDistributedColor.substring(3,5), 16), parseInt(timeDistributedColor.substring(5,7), 16)];

    let bidirectionalColor = document.getElementById('Bidirectional').value;
    dynamicValues.colors.Bidirectional = [parseInt(bidirectionalColor.substring(1,3), 16), parseInt(bidirectionalColor.substring(3,5), 16), parseInt(bidirectionalColor.substring(5,7), 16)];

    let convLSTM1DColor = document.getElementById('ConvLSTM1D').value;
    dynamicValues.colors.ConvLSTM1D = [parseInt(convLSTM1DColor.substring(1,3), 16), parseInt(convLSTM1DColor.substring(3,5), 16), parseInt(convLSTM1DColor.substring(5,7), 16)];

    let convLSTM2DColor = document.getElementById('ConvLSTM2D').value;
    dynamicValues.colors.ConvLSTM2D = [parseInt(convLSTM2DColor.substring(1,3), 16), parseInt(convLSTM2DColor.substring(3,5), 16), parseInt(convLSTM2DColor.substring(5,7), 16)];

    let convLSTM3DColor = document.getElementById('ConvLSTM3D').value;
    dynamicValues.colors.ConvLSTM3D = [parseInt(convLSTM3DColor.substring(1,3), 16), parseInt(convLSTM3DColor.substring(3,5), 16), parseInt(convLSTM3DColor.substring(5,7), 16)];

    let baseRNNColor = document.getElementById('BaseRNN').value;
    dynamicValues.colors.BaseRNN = [parseInt(baseRNNColor.substring(1,3), 16), parseInt(baseRNNColor.substring(3,5), 16), parseInt(baseRNNColor.substring(5,7), 16)];

    let maxPooling1DColor = document.getElementById('MaxPooling1D').value;
    dynamicValues.colors.MaxPooling1D = [parseInt(maxPooling1DColor.substring(1,3), 16), parseInt(maxPooling1DColor.substring(3,5), 16), parseInt(maxPooling1DColor.substring(5,7), 16)];

    let maxPooling2DColor = document.getElementById('MaxPooling2D').value;
    dynamicValues.colors.MaxPooling2D = [parseInt(maxPooling2DColor.substring(1,3), 16), parseInt(maxPooling2DColor.substring(3,5), 16), parseInt(maxPooling2DColor.substring(5,7), 16)];

    let maxPooling3DColor = document.getElementById('MaxPooling3D').value;
    dynamicValues.colors.MaxPooling3D = [parseInt(maxPooling3DColor.substring(1,3), 16), parseInt(maxPooling3DColor.substring(3,5), 16), parseInt(maxPooling3DColor.substring(5,7), 16)];

    let averagePooling1DColor = document.getElementById('AveragePooling1D').value;
    dynamicValues.colors.AveragePooling1D = [parseInt(averagePooling1DColor.substring(1,3), 16), parseInt(averagePooling1DColor.substring(3,5), 16), parseInt(averagePooling1DColor.substring(5,7), 16)];

    let averagePooling2DColor = document.getElementById('AveragePooling2D').value;
    dynamicValues.colors.AveragePooling2D = [parseInt(averagePooling2DColor.substring(1,3), 16), parseInt(averagePooling2DColor.substring(3,5), 16), parseInt(averagePooling2DColor.substring(5,7), 16)];

    let averagePooling3DColor = document.getElementById('AveragePooling3D').value;
    dynamicValues.colors.AveragePooling3D = [parseInt(averagePooling3DColor.substring(1,3), 16), parseInt(averagePooling3DColor.substring(3,5), 16), parseInt(averagePooling3DColor.substring(5,7), 16)];

    let globalMaxPooling1DColor = document.getElementById('GlobalMaxPooling1D').value;
    dynamicValues.colors.GlobalMaxPooling1D = [parseInt(globalMaxPooling1DColor.substring(1,3), 16), parseInt(globalMaxPooling1DColor.substring(3,5), 16), parseInt(globalMaxPooling1DColor.substring(5,7), 16)];

    let globalMaxPooling2DColor = document.getElementById('GlobalMaxPooling2D').value;
    dynamicValues.colors.GlobalMaxPooling2D = [parseInt(globalMaxPooling2DColor.substring(1,3), 16), parseInt(globalMaxPooling2DColor.substring(3,5), 16), parseInt(globalMaxPooling2DColor.substring(5,7), 16)];

    let globalMaxPooling3DColor = document.getElementById('GlobalMaxPooling3D').value;
    dynamicValues.colors.GlobalMaxPooling3D = [parseInt(globalMaxPooling3DColor.substring(1,3), 16), parseInt(globalMaxPooling3DColor.substring(3,5), 16), parseInt(globalMaxPooling3DColor.substring(5,7), 16)];

    let globalAveragePooling1DColor = document.getElementById('GlobalAveragePooling1D').value;
    dynamicValues.colors.GlobalAveragePooling1D = [parseInt(globalAveragePooling1DColor.substring(1,3), 16), parseInt(globalAveragePooling1DColor.substring(3,5), 16), parseInt(globalAveragePooling1DColor.substring(5,7), 16)];

    let globalAveragePooling2DColor = document.getElementById('GlobalAveragePooling2D').value;
    dynamicValues.colors.GlobalAveragePooling2D = [parseInt(globalAveragePooling2DColor.substring(1,3), 16), parseInt(globalAveragePooling2DColor.substring(3,5), 16), parseInt(globalAveragePooling2DColor.substring(5,7), 16)];

    let globalAveragePooling3DColor = document.getElementById('GlobalAveragePooling3D').value;
    dynamicValues.colors.GlobalAveragePooling3D = [parseInt(globalAveragePooling3DColor.substring(1,3), 16), parseInt(globalAveragePooling3DColor.substring(3,5), 16), parseInt(globalAveragePooling3DColor.substring(5,7), 16)];

    let reshapeColor = document.getElementById('Reshape').value;
    dynamicValues.colors.Reshape = [parseInt(reshapeColor.substring(1,3), 16), parseInt(reshapeColor.substring(3,5), 16), parseInt(reshapeColor.substring(5,7), 16)];

    let defaultColor = document.getElementById('Default').value;
    dynamicValues.colors.Default = [parseInt(defaultColor.substring(1,3), 16), parseInt(defaultColor.substring(3,5), 16), parseInt(defaultColor.substring(5,7), 16)];

    let selectedColor = document.getElementById('Selected').value;
    dynamicValues.colors.Selected = [parseInt(selectedColor.substring(1,3), 16), parseInt(selectedColor.substring(3,5), 16), parseInt(selectedColor.substring(5,7), 16)];
}
