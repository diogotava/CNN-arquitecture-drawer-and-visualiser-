let previousColors = {
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
}

function resetColors() {
    resetConv1D();
    resetConv2D();
    resetConv3D();
    resetDense();
    resetFlatten();
    resetDropout();
    resetInput();
    resetConcatenate();
    resetAdd();
    resetLSTM();
    resetGRU();
    resetSimpleRNN();
    resetTimeDistributed();
    resetBidiretional();
    resetConvLSTM1D();
    resetConvLSTM2D();
    resetConvLSTM3D();
    resetBaseRNN();
    resetMaxPooling1D();
    resetMaxPooling2D();
    resetMaxPooling3D();
    resetAveragePooling1D();
    resetAveragePooling2D();
    resetAveragePooling3D();
    resetGlobalMaxPooling1D();
    resetGlobalMaxPooling2D();
    resetGlobalMaxPooling3D();
    resetGlobalAveragePooling1D();
    resetGlobalAveragePooling2D();
    resetGlobalAveragePooling3D();
    resetReshape();
    resetDefault();
    resetBlock();
    resetSelected();
}

function resetDense(){
    let denseColor;
    let resetPrevious = document.getElementById('resetPrevious').checked;
    if(resetPrevious){
        denseColor = previousColors.Dense;
        document.getElementById('Dense').value = rgbToHex(denseColor[0], denseColor[1], denseColor[2]);
    } else {
        denseColor = document.getElementById('Dense').defaultValue;
        previousColors.Dense =  [parseInt(denseColor.substring(1,3), 16), parseInt(denseColor.substring(3,5), 16), parseInt(denseColor.substring(5,7), 16)];
        document.getElementById('Dense').value = denseColor;
        dynamicValues.colors.Dense = [parseInt(denseColor.substring(1,3), 16), parseInt(denseColor.substring(3,5), 16), parseInt(denseColor.substring(5,7), 16)];
    }
}

function resetFlatten(){
    let flattenColor;
    let resetPrevious = document.getElementById('resetPrevious').checked;
    if(resetPrevious){
        flattenColor = previousColors.Flatten;
        document.getElementById('Flatten').value = rgbToHex(flattenColor[0], flattenColor[1], flattenColor[2]);
    } else {
        flattenColor = document.getElementById('Flatten').defaultValue;
        previousColors.Flatten = [parseInt(flattenColor.substring(1, 3), 16), parseInt(flattenColor.substring(3, 5), 16), parseInt(flattenColor.substring(5, 7), 16)];
        document.getElementById('Flatten').value = flattenColor;
        dynamicValues.colors.Flatten = [parseInt(flattenColor.substring(1, 3), 16), parseInt(flattenColor.substring(3, 5), 16), parseInt(flattenColor.substring(5, 7), 16)];
    }
}

function resetDropout(){
    let dropoutColor;
    let resetPrevious = document.getElementById('resetPrevious').checked;
    if(resetPrevious){
        dropoutColor = previousColors.Dropout;
        document.getElementById('Dropout').value = rgbToHex(dropoutColor[0], dropoutColor[1], dropoutColor[2]);
    } else {
        dropoutColor = document.getElementById('Dropout').defaultValue;
        previousColors.Dropout = [parseInt(dropoutColor.substring(1, 3), 16), parseInt(dropoutColor.substring(3, 5), 16), parseInt(dropoutColor.substring(5, 7), 16)];
        document.getElementById('Dropout').value = dropoutColor;
        dynamicValues.colors.Dropout = [parseInt(dropoutColor.substring(1, 3), 16), parseInt(dropoutColor.substring(3, 5), 16), parseInt(dropoutColor.substring(5, 7), 16)];
    }
}

function resetInput(){
    let inputColor;
    let resetPrevious = document.getElementById('resetPrevious').checked;
    if(resetPrevious){
        inputColor = previousColors.InputLayer;
        document.getElementById('Input').value = rgbToHex(inputColor[0], inputColor[1], inputColor[2]);
    } else {
        inputColor = document.getElementById('Input').defaultValue;
        previousColors.InputLayer = [parseInt(inputColor.substring(1, 3), 16), parseInt(inputColor.substring(3, 5), 16), parseInt(inputColor.substring(5, 7), 16)];
        document.getElementById('Input').value = inputColor;
        dynamicValues.colors.InputLayer = [parseInt(inputColor.substring(1, 3), 16), parseInt(inputColor.substring(3, 5), 16), parseInt(inputColor.substring(5, 7), 16)];
    }
}

function resetConcatenate(){
    let concatenateColor;
    let resetPrevious = document.getElementById('resetPrevious').checked;
    if(resetPrevious){
        concatenateColor = previousColors.Concatenate;
        document.getElementById('Concatenate').value = rgbToHex(concatenateColor[0], concatenateColor[1], concatenateColor[2]);
    } else {
        concatenateColor = document.getElementById('Concatenate').defaultValue;
        previousColors.Concatenate = [parseInt(concatenateColor.substring(1, 3), 16), parseInt(concatenateColor.substring(3, 5), 16), parseInt(concatenateColor.substring(5, 7), 16)];
        document.getElementById('Concatenate').value = concatenateColor;
        dynamicValues.colors.Concatenate = [parseInt(concatenateColor.substring(1, 3), 16), parseInt(concatenateColor.substring(3, 5), 16), parseInt(concatenateColor.substring(5, 7), 16)];
    }
}

function resetAdd(){
    let addColor;
    let resetPrevious = document.getElementById('resetPrevious').checked;
    if(resetPrevious){
        addColor = previousColors.Add;
        document.getElementById('Add').value = rgbToHex(addColor[0], addColor[1], addColor[2]);
    } else {
        addColor = document.getElementById('Add').defaultValue;
        previousColors.Add = [parseInt(addColor.substring(1, 3), 16), parseInt(addColor.substring(3, 5), 16), parseInt(addColor.substring(5, 7), 16)];
        document.getElementById('Add').value = addColor;
        dynamicValues.colors.Add = [parseInt(addColor.substring(1, 3), 16), parseInt(addColor.substring(3, 5), 16), parseInt(addColor.substring(5, 7), 16)];
    }
}

function resetLSTM(){
    let lstmColor;
    let resetPrevious = document.getElementById('resetPrevious').checked;
    if(resetPrevious){
        lstmColor = previousColors.LSTM;
        document.getElementById('LSTM').value = rgbToHex(lstmColor[0], lstmColor[1], lstmColor[2]);
    } else {
        lstmColor = document.getElementById('LSTM').defaultValue;
        previousColors.LSTM = [parseInt(lstmColor.substring(1, 3), 16), parseInt(lstmColor.substring(3, 5), 16), parseInt(lstmColor.substring(5, 7), 16)];
        document.getElementById('LSTM').value = lstmColor;
        dynamicValues.colors.LSTM = [parseInt(lstmColor.substring(1, 3), 16), parseInt(lstmColor.substring(3, 5), 16), parseInt(lstmColor.substring(5, 7), 16)];
    }
}

function resetGRU(){
    let gruColor;
    let resetPrevious = document.getElementById('resetPrevious').checked;
    if(resetPrevious){
        gruColor = previousColors.GRU;
        document.getElementById('GRU').value = rgbToHex(gruColor[0], gruColor[1], gruColor[2]);
    } else {
        gruColor = document.getElementById('GRU').defaultValue;
        previousColors.GRU = [parseInt(gruColor.substring(1, 3), 16), parseInt(gruColor.substring(3, 5), 16), parseInt(gruColor.substring(5, 7), 16)];
        document.getElementById('GRU').value = gruColor;
        dynamicValues.colors.GRU = [parseInt(gruColor.substring(1, 3), 16), parseInt(gruColor.substring(3, 5), 16), parseInt(gruColor.substring(5, 7), 16)];
    }
}

function resetSimpleRNN(){
    let simpleRNNColor;
    let resetPrevious = document.getElementById('resetPrevious').checked;
    if(resetPrevious){
        simpleRNNColor = previousColors.SimpleRNN;
        document.getElementById('SimpleRNN').value = rgbToHex(simpleRNNColor[0], simpleRNNColor[1], simpleRNNColor[2]);
    } else {
        simpleRNNColor = document.getElementById('SimpleRNN').defaultValue;
        previousColors.SimpleRNN = [parseInt(simpleRNNColor.substring(1, 3), 16), parseInt(simpleRNNColor.substring(3, 5), 16), parseInt(simpleRNNColor.substring(5, 7), 16)];
        document.getElementById('SimpleRNN').value = simpleRNNColor;
        dynamicValues.colors.SimpleRNN = [parseInt(simpleRNNColor.substring(1, 3), 16), parseInt(simpleRNNColor.substring(3, 5), 16), parseInt(simpleRNNColor.substring(5, 7), 16)];
    }
}

function resetTimeDistributed(){
    let timeDistributedColor;
    let resetPrevious = document.getElementById('resetPrevious').checked;
    if(resetPrevious){
        timeDistributedColor = previousColors.TimeDistributed;
        document.getElementById('TimeDistributed').value = rgbToHex(timeDistributedColor[0], timeDistributedColor[1], timeDistributedColor[2]);
    } else {
        timeDistributedColor = document.getElementById('TimeDistributed').defaultValue;
        previousColors.TimeDistributed = [parseInt(timeDistributedColor.substring(1, 3), 16), parseInt(timeDistributedColor.substring(3, 5), 16), parseInt(timeDistributedColor.substring(5, 7), 16)];
        document.getElementById('TimeDistributed').value = timeDistributedColor;
        dynamicValues.colors.TimeDistributed = [parseInt(timeDistributedColor.substring(1, 3), 16), parseInt(timeDistributedColor.substring(3, 5), 16), parseInt(timeDistributedColor.substring(5, 7), 16)];
    }
}

function resetBidiretional(){
    let bidirectionalColor;
    let resetPrevious = document.getElementById('resetPrevious').checked;
    if(resetPrevious){
        bidirectionalColor = previousColors.Bidirectional;
        document.getElementById('Bidirectional').value = rgbToHex(bidirectionalColor[0], bidirectionalColor[1], bidirectionalColor[2]);
    } else {
        bidirectionalColor = document.getElementById('Bidirectional').defaultValue;
        previousColors.Bidirectional = [parseInt(bidirectionalColor.substring(1, 3), 16), parseInt(bidirectionalColor.substring(3, 5), 16), parseInt(bidirectionalColor.substring(5, 7), 16)];
        document.getElementById('Bidirectional').value = bidirectionalColor;
        dynamicValues.colors.Bidirectional = [parseInt(bidirectionalColor.substring(1, 3), 16), parseInt(bidirectionalColor.substring(3, 5), 16), parseInt(bidirectionalColor.substring(5, 7), 16)];
    }
}

function resetBaseRNN(){
    let baseRNNColor;
    let resetPrevious = document.getElementById('resetPrevious').checked;
    if(resetPrevious){
        baseRNNColor = previousColors.BaseRNN;
        document.getElementById('BaseRNN').value = rgbToHex(baseRNNColor[0], baseRNNColor[1], baseRNNColor[2]);
    } else {
        baseRNNColor = document.getElementById('BaseRNN').defaultValue;
        previousColors.BaseRNN = [parseInt(baseRNNColor.substring(1, 3), 16), parseInt(baseRNNColor.substring(3, 5), 16), parseInt(baseRNNColor.substring(5, 7), 16)];
        document.getElementById('BaseRNN').value = baseRNNColor;
        dynamicValues.colors.BaseRNN = [parseInt(baseRNNColor.substring(1, 3), 16), parseInt(baseRNNColor.substring(3, 5), 16), parseInt(baseRNNColor.substring(5, 7), 16)];
    }
}

function resetConvLSTM1D(){
    let allSameColor = document.getElementById('s1-14').checked;
    if(allSameColor){
        resetConvLSTM2D();
        resetConvLSTM3D();
    }
    let convLSTM1DColor;
    let resetPrevious = document.getElementById('resetPrevious').checked;
    if(resetPrevious){
        convLSTM1DColor = previousColors.ConvLSTM1D;
        document.getElementById('ConvLSTM1D').value = rgbToHex(convLSTM1DColor[0], convLSTM1DColor[1], convLSTM1DColor[2]);
    } else {
        convLSTM1DColor = document.getElementById('ConvLSTM1D').defaultValue;
        previousColors.ConvLSTM1D = [parseInt(convLSTM1DColor.substring(1, 3), 16), parseInt(convLSTM1DColor.substring(3, 5), 16), parseInt(convLSTM1DColor.substring(5, 7), 16)];
        document.getElementById('ConvLSTM1D').value = convLSTM1DColor;
        dynamicValues.colors.ConvLSTM1D = [parseInt(convLSTM1DColor.substring(1, 3), 16), parseInt(convLSTM1DColor.substring(3, 5), 16), parseInt(convLSTM1DColor.substring(5, 7), 16)];
    }
}

function resetConvLSTM2D(){
    let convLSTM2DColor;
    let resetPrevious = document.getElementById('resetPrevious').checked;
    if(resetPrevious){
        convLSTM2DColor = previousColors.ConvLSTM2D;
        document.getElementById('ConvLSTM2D').value = rgbToHex(convLSTM2DColor[0], convLSTM2DColor[1], convLSTM2DColor[2]);
    } else {
        convLSTM2DColor = document.getElementById('ConvLSTM2D').defaultValue;
        previousColors.ConvLSTM2D = [parseInt(convLSTM2DColor.substring(1, 3), 16), parseInt(convLSTM2DColor.substring(3, 5), 16), parseInt(convLSTM2DColor.substring(5, 7), 16)];
        document.getElementById('ConvLSTM2D').value = convLSTM2DColor;
        dynamicValues.colors.ConvLSTM2D = [parseInt(convLSTM2DColor.substring(1, 3), 16), parseInt(convLSTM2DColor.substring(3, 5), 16), parseInt(convLSTM2DColor.substring(5, 7), 16)];
    }
}

function resetConvLSTM3D(){
    let convLSTM3DColor;
    let resetPrevious = document.getElementById('resetPrevious').checked;
    if(resetPrevious){
        convLSTM3DColor = previousColors.ConvLSTM3D;
        document.getElementById('ConvLSTM3D').value = rgbToHex(convLSTM3DColor[0], convLSTM3DColor[1], convLSTM3DColor[2]);
    } else {
        convLSTM3DColor = document.getElementById('ConvLSTM3D').defaultValue;
        previousColors.ConvLSTM3D = [parseInt(convLSTM3DColor.substring(1, 3), 16), parseInt(convLSTM3DColor.substring(3, 5), 16), parseInt(convLSTM3DColor.substring(5, 7), 16)];
        document.getElementById('ConvLSTM3D').value = convLSTM3DColor;
        dynamicValues.colors.ConvLSTM3D = [parseInt(convLSTM3DColor.substring(1, 3), 16), parseInt(convLSTM3DColor.substring(3, 5), 16), parseInt(convLSTM3DColor.substring(5, 7), 16)];
    }
}

function resetConv1D() {
    let allSameColor = document.getElementById('s1-15').checked;
    if(allSameColor){
        resetConv2D();
        resetConv3D();
    }
    let conv1DColor;
    let resetPrevious = document.getElementById('resetPrevious').checked;
    if(resetPrevious){
        conv1DColor = previousColors.Conv1D;
        document.getElementById('Conv1D').value = rgbToHex(conv1DColor[0], conv1DColor[1], conv1DColor[2]);
    } else {
        conv1DColor = document.getElementById('Conv1D').defaultValue;
        previousColors.Conv1D = [parseInt(conv1DColor.substring(1, 3), 16), parseInt(conv1DColor.substring(3, 5), 16), parseInt(conv1DColor.substring(5, 7), 16)];
        document.getElementById('Conv1D').value = conv1DColor;
        dynamicValues.colors.Conv1D = [parseInt(conv1DColor.substring(1, 3), 16), parseInt(conv1DColor.substring(3, 5), 16), parseInt(conv1DColor.substring(5, 7), 16)];
    }
}
function resetConv2D(){
    let conv2DColor;
    let resetPrevious = document.getElementById('resetPrevious').checked;
    if(resetPrevious){
        conv2DColor = previousColors.Conv2D;
        document.getElementById('Conv2D').value = rgbToHex(conv2DColor[0], conv2DColor[1], conv2DColor[2]);
    } else {
        conv2DColor = document.getElementById('Conv2D').defaultValue;
        previousColors.Conv2D = [parseInt(conv2DColor.substring(1, 3), 16), parseInt(conv2DColor.substring(3, 5), 16), parseInt(conv2DColor.substring(5, 7), 16)];
        document.getElementById('Conv2D').value = conv2DColor;
        dynamicValues.colors.Conv2D = [parseInt(conv2DColor.substring(1, 3), 16), parseInt(conv2DColor.substring(3, 5), 16), parseInt(conv2DColor.substring(5, 7), 16)];
    }
}

function resetConv3D(){
    let conv3DColor;
    let resetPrevious = document.getElementById('resetPrevious').checked;
    if(resetPrevious){
        conv3DColor = previousColors.Conv3D;
        document.getElementById('Conv3D').value = rgbToHex(conv3DColor[0], conv3DColor[1], conv3DColor[2]);
    } else {
        conv3DColor = document.getElementById('Conv3D').defaultValue;
        previousColors.Conv3D = [parseInt(conv3DColor.substring(1, 3), 16), parseInt(conv3DColor.substring(3, 5), 16), parseInt(conv3DColor.substring(5, 7), 16)];
        document.getElementById('Conv3D').value = conv3DColor;
        dynamicValues.colors.Conv3D = [parseInt(conv3DColor.substring(1, 3), 16), parseInt(conv3DColor.substring(3, 5), 16), parseInt(conv3DColor.substring(5, 7), 16)];
    }
}

function resetMaxPooling1D(){
    let allSameColor = document.getElementById('s1-16').checked;
    if(allSameColor){
        resetMaxPooling2D();
        resetMaxPooling3D();
    }
    let maxPooling1DColor;
    let resetPrevious = document.getElementById('resetPrevious').checked;
    if(resetPrevious){
        maxPooling1DColor = previousColors.MaxPooling1D;
        document.getElementById('MaxPooling1D').value = rgbToHex(maxPooling1DColor[0], maxPooling1DColor[1], maxPooling1DColor[2]);
    } else {
        maxPooling1DColor = document.getElementById('MaxPooling1D').defaultValue;
        previousColors.MaxPooling1D = [parseInt(maxPooling1DColor.substring(1, 3), 16), parseInt(maxPooling1DColor.substring(3, 5), 16), parseInt(maxPooling1DColor.substring(5, 7), 16)];
        document.getElementById('MaxPooling1D').value = maxPooling1DColor;
        dynamicValues.colors.MaxPooling1D = [parseInt(maxPooling1DColor.substring(1, 3), 16), parseInt(maxPooling1DColor.substring(3, 5), 16), parseInt(maxPooling1DColor.substring(5, 7), 16)];
    }
}

function resetMaxPooling2D() {
    let maxPooling2DColor;
    let resetPrevious = document.getElementById('resetPrevious').checked;
    if(resetPrevious){
        maxPooling2DColor = previousColors.MaxPooling2D;
        document.getElementById('MaxPooling2D').value = rgbToHex(maxPooling2DColor[0], maxPooling2DColor[1], maxPooling2DColor[2]);
    } else {
        maxPooling2DColor = document.getElementById('MaxPooling2D').defaultValue;
        previousColors.MaxPooling2D = [parseInt(maxPooling2DColor.substring(1, 3), 16), parseInt(maxPooling2DColor.substring(3, 5), 16), parseInt(maxPooling2DColor.substring(5, 7), 16)];
        document.getElementById('MaxPooling2D').value = maxPooling2DColor;
        dynamicValues.colors.MaxPooling2D = [parseInt(maxPooling2DColor.substring(1, 3), 16), parseInt(maxPooling2DColor.substring(3, 5), 16), parseInt(maxPooling2DColor.substring(5, 7), 16)];
    }
}

function resetMaxPooling3D() {
    let maxPooling3DColor;
    let resetPrevious = document.getElementById('resetPrevious').checked;
    if(resetPrevious){
        maxPooling3DColor = previousColors.MaxPooling3D;
        document.getElementById('MaxPooling3D').value = rgbToHex(maxPooling3DColor[0], maxPooling3DColor[1], maxPooling3DColor[2]);
    } else {
        maxPooling3DColor = document.getElementById('MaxPooling3D').defaultValue;
        previousColors.MaxPooling3D = [parseInt(maxPooling3DColor.substring(1, 3), 16), parseInt(maxPooling3DColor.substring(3, 5), 16), parseInt(maxPooling3DColor.substring(5, 7), 16)];
        document.getElementById('MaxPooling3D').value = maxPooling3DColor;
        dynamicValues.colors.MaxPooling3D = [parseInt(maxPooling3DColor.substring(1, 3), 16), parseInt(maxPooling3DColor.substring(3, 5), 16), parseInt(maxPooling3DColor.substring(5, 7), 16)];
    }
}

function resetAveragePooling1D() {
    let allSameColor = document.getElementById('s1-17').checked;
    if(allSameColor){
        resetAveragePooling2D();
        resetAveragePooling3D();
    }
    let averagePooling1DColor;
    let resetPrevious = document.getElementById('resetPrevious').checked;
    if(resetPrevious){
        averagePooling1DColor = previousColors.AveragePooling1D;
        document.getElementById('AveragePooling1D').value = rgbToHex(averagePooling1DColor[0], averagePooling1DColor[1], averagePooling1DColor[2]);
    } else {
        averagePooling1DColor = document.getElementById('AveragePooling1D').defaultValue;
        previousColors.AveragePooling1D = [parseInt(averagePooling1DColor.substring(1, 3), 16), parseInt(averagePooling1DColor.substring(3, 5), 16), parseInt(averagePooling1DColor.substring(5, 7), 16)];
        document.getElementById('AveragePooling1D').value = averagePooling1DColor;
        dynamicValues.colors.AveragePooling1D = [parseInt(averagePooling1DColor.substring(1, 3), 16), parseInt(averagePooling1DColor.substring(3, 5), 16), parseInt(averagePooling1DColor.substring(5, 7), 16)];
    }
}

function resetAveragePooling2D() {
    let averagePooling2DColor;
    let resetPrevious = document.getElementById('resetPrevious').checked;
    if(resetPrevious){
        averagePooling2DColor = previousColors.AveragePooling2D;
        document.getElementById('AveragePooling2D').value = rgbToHex(averagePooling2DColor[0], averagePooling2DColor[1], averagePooling2DColor[2]);
    } else {
        averagePooling2DColor = document.getElementById('AveragePooling2D').defaultValue;
        previousColors.AveragePooling2D = [parseInt(averagePooling2DColor.substring(1, 3), 16), parseInt(averagePooling2DColor.substring(3, 5), 16), parseInt(averagePooling2DColor.substring(5, 7), 16)];
        document.getElementById('AveragePooling2D').value = averagePooling2DColor;
        dynamicValues.colors.AveragePooling2D = [parseInt(averagePooling2DColor.substring(1, 3), 16), parseInt(averagePooling2DColor.substring(3, 5), 16), parseInt(averagePooling2DColor.substring(5, 7), 16)];
    }
}

function resetAveragePooling3D() {
    let averagePooling3DColor;
    let resetPrevious = document.getElementById('resetPrevious').checked;
    if(resetPrevious){
        averagePooling3DColor = previousColors.AveragePooling3D;
        document.getElementById('AveragePooling3D').value = rgbToHex(averagePooling3DColor[0], averagePooling3DColor[1], averagePooling3DColor[2]);
    } else {
        averagePooling3DColor = document.getElementById('AveragePooling3D').defaultValue;
        previousColors.AveragePooling3D = [parseInt(averagePooling3DColor.substring(1, 3), 16), parseInt(averagePooling3DColor.substring(3, 5), 16), parseInt(averagePooling3DColor.substring(5, 7), 16)];
        document.getElementById('AveragePooling3D').value = averagePooling3DColor;
        dynamicValues.colors.AveragePooling3D = [parseInt(averagePooling3DColor.substring(1, 3), 16), parseInt(averagePooling3DColor.substring(3, 5), 16), parseInt(averagePooling3DColor.substring(5, 7), 16)];
    }
}

function resetGlobalMaxPooling1D() {
    let allSameColor = document.getElementById('s1-18').checked;
    if(allSameColor){
        resetGlobalMaxPooling2D();
        resetGlobalMaxPooling3D();
    }
    let globalMaxPooling1DColor;
    let resetPrevious = document.getElementById('resetPrevious').checked;
    if(resetPrevious){
        globalMaxPooling1DColor = previousColors.GlobalMaxPooling1D;
        document.getElementById('GlobalMaxPooling1D').value = rgbToHex(globalMaxPooling1DColor[0], globalMaxPooling1DColor[1], globalMaxPooling1DColor[2]);
    } else {
        globalMaxPooling1DColor = document.getElementById('GlobalMaxPooling1D').defaultValue;
        previousColors.GlobalMaxPooling1D = [parseInt(globalMaxPooling1DColor.substring(1, 3), 16), parseInt(globalMaxPooling1DColor.substring(3, 5), 16), parseInt(globalMaxPooling1DColor.substring(5, 7), 16)];
        document.getElementById('GlobalMaxPooling1D').value = globalMaxPooling1DColor;
        dynamicValues.colors.GlobalMaxPooling1D = [parseInt(globalMaxPooling1DColor.substring(1, 3), 16), parseInt(globalMaxPooling1DColor.substring(3, 5), 16), parseInt(globalMaxPooling1DColor.substring(5, 7), 16)];
    }
}

function resetGlobalMaxPooling2D() {
    let globalMaxPooling2DColor;
    let resetPrevious = document.getElementById('resetPrevious').checked;
    if(resetPrevious){
        globalMaxPooling2DColor = previousColors.GlobalMaxPooling2D;
        document.getElementById('GlobalMaxPooling2D').value = rgbToHex(globalMaxPooling2DColor[0], globalMaxPooling2DColor[1], globalMaxPooling2DColor[2]);
    } else {
        globalMaxPooling2DColor = document.getElementById('GlobalMaxPooling2D').defaultValue;
        previousColors.GlobalMaxPooling2D = [parseInt(globalMaxPooling2DColor.substring(1, 3), 16), parseInt(globalMaxPooling2DColor.substring(3, 5), 16), parseInt(globalMaxPooling2DColor.substring(5, 7), 16)];
        document.getElementById('GlobalMaxPooling2D').value = globalMaxPooling2DColor;
        dynamicValues.colors.GlobalMaxPooling2D = [parseInt(globalMaxPooling2DColor.substring(1, 3), 16), parseInt(globalMaxPooling2DColor.substring(3, 5), 16), parseInt(globalMaxPooling2DColor.substring(5, 7), 16)];
    }
}

function resetGlobalMaxPooling3D() {
    let globalMaxPooling3DColor;
    let resetPrevious = document.getElementById('resetPrevious').checked;
    if(resetPrevious){
        globalMaxPooling3DColor = previousColors.GlobalMaxPooling3D;
        document.getElementById('GlobalMaxPooling3D').value = rgbToHex(globalMaxPooling3DColor[0], globalMaxPooling3DColor[1], globalMaxPooling3DColor[2]);
    } else {
        globalMaxPooling3DColor = document.getElementById('GlobalMaxPooling3D').defaultValue;
        previousColors.GlobalMaxPooling3D = [parseInt(globalMaxPooling3DColor.substring(1, 3), 16), parseInt(globalMaxPooling3DColor.substring(3, 5), 16), parseInt(globalMaxPooling3DColor.substring(5, 7), 16)];
        document.getElementById('GlobalMaxPooling3D').value = globalMaxPooling3DColor;
        dynamicValues.colors.GlobalMaxPooling3D = [parseInt(globalMaxPooling3DColor.substring(1, 3), 16), parseInt(globalMaxPooling3DColor.substring(3, 5), 16), parseInt(globalMaxPooling3DColor.substring(5, 7), 16)];
    }
}

function resetGlobalAveragePooling1D() {
    let allSameColor = document.getElementById('s1-19').checked;
    if(allSameColor){
        resetGlobalAveragePooling2D();
        resetGlobalAveragePooling3D();
    }
    let globalAveragePooling1DColor;
    let resetPrevious = document.getElementById('resetPrevious').checked;
    if(resetPrevious){
        globalAveragePooling1DColor = previousColors.GlobalAveragePooling1D;
        document.getElementById('GlobalAveragePooling1D').value = rgbToHex(globalAveragePooling1DColor[0], globalAveragePooling1DColor[1], globalAveragePooling1DColor[2]);
    } else {
        globalAveragePooling1DColor = document.getElementById('GlobalAveragePooling1D').defaultValue;
        previousColors.GlobalAveragePooling1D = [parseInt(globalAveragePooling1DColor.substring(1, 3), 16), parseInt(globalAveragePooling1DColor.substring(3, 5), 16), parseInt(globalAveragePooling1DColor.substring(5, 7), 16)];
        document.getElementById('GlobalAveragePooling1D').value = globalAveragePooling1DColor;
        dynamicValues.colors.GlobalAveragePooling1D = [parseInt(globalAveragePooling1DColor.substring(1, 3), 16), parseInt(globalAveragePooling1DColor.substring(3, 5), 16), parseInt(globalAveragePooling1DColor.substring(5, 7), 16)];
    }
}

function resetGlobalAveragePooling2D() {
    let globalAveragePooling2DColor;
    let resetPrevious = document.getElementById('resetPrevious').checked;
    if(resetPrevious){
        globalAveragePooling2DColor = previousColors.GlobalAveragePooling2D;
        document.getElementById('GlobalAveragePooling2D').value = rgbToHex(globalAveragePooling2DColor[0], globalAveragePooling2DColor[1], globalAveragePooling2DColor[2]);
    } else {
        globalAveragePooling2DColor = document.getElementById('GlobalAveragePooling2D').defaultValue;
        previousColors.GlobalAveragePooling2D = [parseInt(globalAveragePooling2DColor.substring(1, 3), 16), parseInt(globalAveragePooling2DColor.substring(3, 5), 16), parseInt(globalAveragePooling2DColor.substring(5, 7), 16)];
        document.getElementById('GlobalAveragePooling2D').value = globalAveragePooling2DColor;
        dynamicValues.colors.GlobalAveragePooling2D = [parseInt(globalAveragePooling2DColor.substring(1, 3), 16), parseInt(globalAveragePooling2DColor.substring(3, 5), 16), parseInt(globalAveragePooling2DColor.substring(5, 7), 16)];
    }
}

function resetGlobalAveragePooling3D() {
    let globalAveragePooling3DColor;
    let resetPrevious = document.getElementById('resetPrevious').checked;
    if(resetPrevious){
        globalAveragePooling3DColor = previousColors.GlobalAveragePooling3D;
        document.getElementById('GlobalAveragePooling3D').value = rgbToHex(globalAveragePooling3DColor[0], globalAveragePooling3DColor[1], globalAveragePooling3DColor[2]);
    } else {
        globalAveragePooling3DColor = document.getElementById('GlobalAveragePooling3D').defaultValue;
        previousColors.GlobalAveragePooling3D = [parseInt(globalAveragePooling3DColor.substring(1, 3), 16), parseInt(globalAveragePooling3DColor.substring(3, 5), 16), parseInt(globalAveragePooling3DColor.substring(5, 7), 16)];
        document.getElementById('GlobalAveragePooling3D').value = globalAveragePooling3DColor;
        dynamicValues.colors.GlobalAveragePooling3D = [parseInt(globalAveragePooling3DColor.substring(1, 3), 16), parseInt(globalAveragePooling3DColor.substring(3, 5), 16), parseInt(globalAveragePooling3DColor.substring(5, 7), 16)];
    }
}

function resetReshape() {
    let reshapeColor;
    let resetPrevious = document.getElementById('resetPrevious').checked;
    if(resetPrevious){
        reshapeColor = previousColors.Reshape;
        document.getElementById('Reshape').value = rgbToHex(reshapeColor[0], reshapeColor[1], reshapeColor[2]);
    } else {
        reshapeColor = document.getElementById('Reshape').defaultValue;
        previousColors.Reshape = [parseInt(reshapeColor.substring(1, 3), 16), parseInt(reshapeColor.substring(3, 5), 16), parseInt(reshapeColor.substring(5, 7), 16)];
        document.getElementById('Reshape').value = reshapeColor;
        dynamicValues.colors.Reshape = [parseInt(reshapeColor.substring(1, 3), 16), parseInt(reshapeColor.substring(3, 5), 16), parseInt(reshapeColor.substring(5, 7), 16)];
    }
}

function resetDefault() {
    let defaultColor;
    let resetPrevious = document.getElementById('resetPrevious').checked;
    if(resetPrevious){
        defaultColor = previousColors.Default;
        document.getElementById('Default').value = rgbToHex(defaultColor[0], defaultColor[1], defaultColor[2]);
    } else {
        defaultColor = document.getElementById('Default').defaultValue;
        previousColors.Default = [parseInt(defaultColor.substring(1, 3), 16), parseInt(defaultColor.substring(3, 5), 16), parseInt(defaultColor.substring(5, 7), 16)];
        document.getElementById('Default').value = defaultColor;
        dynamicValues.colors.Default = [parseInt(defaultColor.substring(1, 3), 16), parseInt(defaultColor.substring(3, 5), 16), parseInt(defaultColor.substring(5, 7), 16)];
    }
}

function resetBlock() {
    let blockColor;
    let resetPrevious = document.getElementById('resetPrevious').checked;
    if(resetPrevious){
        blockColor = previousColors.Block;
        document.getElementById('Block').value = rgbToHex(blockColor[0], blockColor[1], blockColor[2]);
    } else {
        blockColor = document.getElementById('Block').defaultValue;
        previousColors.Block = [parseInt(blockColor.substring(1, 3), 16), parseInt(blockColor.substring(3, 5), 16), parseInt(blockColor.substring(5, 7), 16)];
        document.getElementById('Block').value = blockColor;
        dynamicValues.colors.Block = [parseInt(blockColor.substring(1, 3), 16), parseInt(blockColor.substring(3, 5), 16), parseInt(blockColor.substring(5, 7), 16)];
    }
}

function resetSelected() {
    let selectedColor;
    let resetPrevious = document.getElementById('resetPrevious').checked;
    if(resetPrevious){
        selectedColor = previousColors.Selected;
        document.getElementById('Selected').value = rgbToHex(selectedColor[0], selectedColor[1], selectedColor[2]);
    } else {
        selectedColor = document.getElementById('Selected').defaultValue;
        previousColors.Selected = [parseInt(selectedColor.substring(1, 3), 16), parseInt(selectedColor.substring(3, 5), 16), parseInt(selectedColor.substring(5, 7), 16)];
        document.getElementById('Selected').value = selectedColor;
        dynamicValues.colors.Selected = [parseInt(selectedColor.substring(1, 3), 16), parseInt(selectedColor.substring(3, 5), 16), parseInt(selectedColor.substring(5, 7), 16)];
    }
}

//-------------------------------------------------------- UPDATE --------------------------------------------------------//
function updateConv(){
    let allSameColor = document.getElementById('s1-15').checked;
    let color1D = document.getElementById('Conv1D').value;
    let color2D = document.getElementById('Conv2D').value;
    let color3D = document.getElementById('Conv3D').value;

    if(!equalsCheck([parseInt(color1D.substring(1,3), 16), parseInt(color1D.substring(3,5), 16), parseInt(color1D.substring(5,7), 16)], dynamicValues.colors.Conv1D))
        previousColors.Conv1D = dynamicValues.colors.Conv1D;
    if(!equalsCheck([parseInt(color2D.substring(1,3), 16), parseInt(color2D.substring(3,5), 16), parseInt(color2D.substring(5,7), 16)], dynamicValues.colors.Conv2D))
        previousColors.Conv2D = dynamicValues.colors.Conv2D;
    if(!equalsCheck([parseInt(color3D.substring(1,3), 16), parseInt(color3D.substring(3,5), 16), parseInt(color3D.substring(5,7), 16)], dynamicValues.colors.Conv3D))
        previousColors.Conv3D = dynamicValues.colors.Conv3D;

    dynamicValues.colors.Conv1D = [parseInt(color1D.substring(1,3), 16), parseInt(color1D.substring(3,5), 16), parseInt(color1D.substring(5,7), 16)];

    if(allSameColor) {
        if(!equalsCheck([parseInt(color1D.substring(1,3), 16), parseInt(color1D.substring(3,5), 16), parseInt(color1D.substring(5,7), 16)], dynamicValues.colors.Conv2D))
            previousColors.Conv2D = dynamicValues.colors.Conv2D;
        if(!equalsCheck([parseInt(color1D.substring(1,3), 16), parseInt(color1D.substring(3,5), 16), parseInt(color1D.substring(5,7), 16)], dynamicValues.colors.Conv3D))
            previousColors.Conv3D = dynamicValues.colors.Conv3D;

        dynamicValues.colors.Conv2D = [parseInt(color1D.substring(1,3), 16), parseInt(color1D.substring(3,5), 16), parseInt(color1D.substring(5,7), 16)];
        document.getElementById('Conv2D').value = rgbToHex(dynamicValues.colors.Conv2D[0], dynamicValues.colors.Conv2D[1], dynamicValues.colors.Conv2D[2]);
        dynamicValues.colors.Conv3D = [parseInt(color1D.substring(1,3), 16), parseInt(color1D.substring(3,5), 16), parseInt(color1D.substring(5,7), 16)];
        document.getElementById('Conv3D').value = rgbToHex(dynamicValues.colors.Conv3D[0], dynamicValues.colors.Conv3D[1], dynamicValues.colors.Conv3D[2]);
    } else{
        dynamicValues.colors.Conv2D = [parseInt(color2D.substring(1,3), 16), parseInt(color2D.substring(3,5), 16), parseInt(color2D.substring(5,7), 16)];
        dynamicValues.colors.Conv3D = [parseInt(color3D.substring(1,3), 16), parseInt(color3D.substring(3,5), 16), parseInt(color3D.substring(5,7), 16)];
    }

}

function updateConvLSTM(){
    let allSameColor = document.getElementById('s1-14').checked;
    let color1D = document.getElementById('ConvLSTM1D').value;
    let color2D = document.getElementById('ConvLSTM2D').value;
    let color3D = document.getElementById('ConvLSTM3D').value;

    if(!equalsCheck([parseInt(color1D.substring(1,3), 16), parseInt(color1D.substring(3,5), 16), parseInt(color1D.substring(5,7), 16)], dynamicValues.colors.ConvLSTM1D))
        previousColors.ConvLSTM1D = dynamicValues.colors.ConvLSTM1D;
    if(!equalsCheck([parseInt(color2D.substring(1,3), 16), parseInt(color2D.substring(3,5), 16), parseInt(color2D.substring(5,7), 16)], dynamicValues.colors.ConvLSTM2D))
        previousColors.ConvLSTM2D = dynamicValues.colors.ConvLSTM2D;
    if(!equalsCheck([parseInt(color3D.substring(1,3), 16), parseInt(color3D.substring(3,5), 16), parseInt(color3D.substring(5,7), 16)], dynamicValues.colors.ConvLSTM3D))
        previousColors.ConvLSTM3D = dynamicValues.colors.ConvLSTM3D;

    dynamicValues.colors.ConvLSTM1D = [parseInt(color1D.substring(1,3), 16), parseInt(color1D.substring(3,5), 16), parseInt(color1D.substring(5,7), 16)];

    if(allSameColor) {
        dynamicValues.colors.ConvLSTM2D = [parseInt(color1D.substring(1,3), 16), parseInt(color1D.substring(3,5), 16), parseInt(color1D.substring(5,7), 16)];
        document.getElementById('ConvLSTM2D').value = rgbToHex(dynamicValues.colors.ConvLSTM2D[0], dynamicValues.colors.ConvLSTM2D[1], dynamicValues.colors.ConvLSTM2D[2]);
        dynamicValues.colors.ConvLSTM3D = [parseInt(color1D.substring(1,3), 16), parseInt(color1D.substring(3,5), 16), parseInt(color1D.substring(5,7), 16)];
        document.getElementById('ConvLSTM3D').value = rgbToHex(dynamicValues.colors.ConvLSTM3D[0], dynamicValues.colors.ConvLSTM3D[1], dynamicValues.colors.ConvLSTM3D[2]);
    } else{
        dynamicValues.colors.ConvLSTM2D = [parseInt(color2D.substring(1,3), 16), parseInt(color2D.substring(3,5), 16), parseInt(color2D.substring(5,7), 16)];
        dynamicValues.colors.ConvLSTM3D = [parseInt(color3D.substring(1,3), 16), parseInt(color3D.substring(3,5), 16), parseInt(color3D.substring(5,7), 16)];
    }

}

function updateMaxPooling(){
    let allSameColor = document.getElementById('s1-16').checked;
    let color1D = document.getElementById('MaxPooling1D').value;
    let color2D = document.getElementById('MaxPooling2D').value;
    let color3D = document.getElementById('MaxPooling3D').value;

    if(!equalsCheck([parseInt(color1D.substring(1,3), 16), parseInt(color1D.substring(3,5), 16), parseInt(color1D.substring(5,7), 16)], dynamicValues.colors.MaxPooling1D))
        previousColors.MaxPooling1D = dynamicValues.colors.MaxPooling1D;
    if(!equalsCheck([parseInt(color2D.substring(1,3), 16), parseInt(color2D.substring(3,5), 16), parseInt(color2D.substring(5,7), 16)], dynamicValues.colors.MaxPooling2D))
        previousColors.MaxPooling2D = dynamicValues.colors.MaxPooling2D;
    if(!equalsCheck([parseInt(color3D.substring(1,3), 16), parseInt(color3D.substring(3,5), 16), parseInt(color3D.substring(5,7), 16)], dynamicValues.colors.MaxPooling3D))
        previousColors.MaxPooling3D = dynamicValues.colors.MaxPooling3D;

    dynamicValues.colors.MaxPooling1D = [parseInt(color1D.substring(1,3), 16), parseInt(color1D.substring(3,5), 16), parseInt(color1D.substring(5,7), 16)];

    if(allSameColor) {
        dynamicValues.colors.MaxPooling2D = [parseInt(color1D.substring(1,3), 16), parseInt(color1D.substring(3,5), 16), parseInt(color1D.substring(5,7), 16)];
        document.getElementById('MaxPooling2D').value = rgbToHex(dynamicValues.colors.MaxPooling2D[0], dynamicValues.colors.MaxPooling2D[1], dynamicValues.colors.MaxPooling2D[2]);
        dynamicValues.colors.MaxPooling3D = [parseInt(color1D.substring(1,3), 16), parseInt(color1D.substring(3,5), 16), parseInt(color1D.substring(5,7), 16)];
        document.getElementById('MaxPooling3D').value = rgbToHex(dynamicValues.colors.MaxPooling3D[0], dynamicValues.colors.MaxPooling3D[1], dynamicValues.colors.MaxPooling3D[2]);
    } else{
        dynamicValues.colors.MaxPooling2D = [parseInt(color2D.substring(1,3), 16), parseInt(color2D.substring(3,5), 16), parseInt(color2D.substring(5,7), 16)];
        dynamicValues.colors.MaxPooling3D = [parseInt(color3D.substring(1,3), 16), parseInt(color3D.substring(3,5), 16), parseInt(color3D.substring(5,7), 16)];
    }

}

function updateAveragePooling(){
    let allSameColor = document.getElementById('s1-17').checked;
    let color1D = document.getElementById('AveragePooling1D').value;
    let color2D = document.getElementById('AveragePooling2D').value;
    let color3D = document.getElementById('AveragePooling3D').value;

    if(!equalsCheck([parseInt(color1D.substring(1,3), 16), parseInt(color1D.substring(3,5), 16), parseInt(color1D.substring(5,7), 16)], dynamicValues.colors.AveragePooling1D))
        previousColors.AveragePooling1D = dynamicValues.colors.AveragePooling1D;
    if(!equalsCheck([parseInt(color2D.substring(1,3), 16), parseInt(color2D.substring(3,5), 16), parseInt(color2D.substring(5,7), 16)], dynamicValues.colors.AveragePooling2D))
        previousColors.AveragePooling2D = dynamicValues.colors.AveragePooling2D;
    if(!equalsCheck([parseInt(color3D.substring(1,3), 16), parseInt(color3D.substring(3,5), 16), parseInt(color3D.substring(5,7), 16)], dynamicValues.colors.AveragePooling3D))
        previousColors.AveragePooling3D = dynamicValues.colors.AveragePooling3D;

    dynamicValues.colors.AveragePooling1D = [parseInt(color1D.substring(1,3), 16), parseInt(color1D.substring(3,5), 16), parseInt(color1D.substring(5,7), 16)];

    if(allSameColor) {
        dynamicValues.colors.AveragePooling2D = [parseInt(color1D.substring(1,3), 16), parseInt(color1D.substring(3,5), 16), parseInt(color1D.substring(5,7), 16)];
        document.getElementById('AveragePooling2D').value = rgbToHex(dynamicValues.colors.AveragePooling2D[0], dynamicValues.colors.AveragePooling2D[1], dynamicValues.colors.AveragePooling2D[2]);
        dynamicValues.colors.AveragePooling3D = [parseInt(color1D.substring(1,3), 16), parseInt(color1D.substring(3,5), 16), parseInt(color1D.substring(5,7), 16)];
        document.getElementById('AveragePooling3D').value = rgbToHex(dynamicValues.colors.AveragePooling3D[0], dynamicValues.colors.AveragePooling3D[1], dynamicValues.colors.AveragePooling3D[2]);
    } else{
        dynamicValues.colors.AveragePooling2D = [parseInt(color2D.substring(1,3), 16), parseInt(color2D.substring(3,5), 16), parseInt(color2D.substring(5,7), 16)];
        dynamicValues.colors.AveragePooling3D = [parseInt(color3D.substring(1,3), 16), parseInt(color3D.substring(3,5), 16), parseInt(color3D.substring(5,7), 16)];
    }

}

function updateGlobalMaxPooling(){
    let allSameColor = document.getElementById('s1-18').checked;
    let color1D = document.getElementById('GlobalMaxPooling1D').value;
    let color2D = document.getElementById('GlobalMaxPooling2D').value;
    let color3D = document.getElementById('GlobalMaxPooling3D').value;

    if(!equalsCheck([parseInt(color1D.substring(1,3), 16), parseInt(color1D.substring(3,5), 16), parseInt(color1D.substring(5,7), 16)], dynamicValues.colors.GlobalMaxPooling1D))
        previousColors.GlobalMaxPooling1D = dynamicValues.colors.GlobalMaxPooling1D;
    if(!equalsCheck([parseInt(color2D.substring(1,3), 16), parseInt(color2D.substring(3,5), 16), parseInt(color2D.substring(5,7), 16)], dynamicValues.colors.GlobalMaxPooling2D))
        previousColors.GlobalMaxPooling2D = dynamicValues.colors.GlobalMaxPooling2D;
    if(!equalsCheck([parseInt(color3D.substring(1,3), 16), parseInt(color3D.substring(3,5), 16), parseInt(color3D.substring(5,7), 16)], dynamicValues.colors.GlobalMaxPooling3D))
        previousColors.GlobalMaxPooling3D = dynamicValues.colors.GlobalMaxPooling3D;

    dynamicValues.colors.GlobalMaxPooling1D = [parseInt(color1D.substring(1,3), 16), parseInt(color1D.substring(3,5), 16), parseInt(color1D.substring(5,7), 16)];

    if(allSameColor) {
        dynamicValues.colors.GlobalMaxPooling2D = [parseInt(color1D.substring(1,3), 16), parseInt(color1D.substring(3,5), 16), parseInt(color1D.substring(5,7), 16)];
        document.getElementById('GlobalMaxPooling2D').value = rgbToHex(dynamicValues.colors.GlobalMaxPooling2D[0], dynamicValues.colors.GlobalMaxPooling2D[1], dynamicValues.colors.GlobalMaxPooling2D[2]);
        dynamicValues.colors.GlobalMaxPooling3D = [parseInt(color1D.substring(1,3), 16), parseInt(color1D.substring(3,5), 16), parseInt(color1D.substring(5,7), 16)];
        document.getElementById('GlobalMaxPooling3D').value = rgbToHex(dynamicValues.colors.GlobalMaxPooling3D[0], dynamicValues.colors.GlobalMaxPooling3D[1], dynamicValues.colors.GlobalMaxPooling3D[2]);
    } else{
        dynamicValues.colors.GlobalMaxPooling2D = [parseInt(color2D.substring(1,3), 16), parseInt(color2D.substring(3,5), 16), parseInt(color2D.substring(5,7), 16)];
        dynamicValues.colors.GlobalMaxPooling3D = [parseInt(color3D.substring(1,3), 16), parseInt(color3D.substring(3,5), 16), parseInt(color3D.substring(5,7), 16)];
    }

}

function updateGlobalAveragePooling(){
    let allSameColor = document.getElementById('s1-19').checked;
    let color1D = document.getElementById('GlobalAveragePooling1D').value;
    let color2D = document.getElementById('GlobalAveragePooling2D').value;
    let color3D = document.getElementById('GlobalAveragePooling3D').value;

    if(!equalsCheck([parseInt(color1D.substring(1,3), 16), parseInt(color1D.substring(3,5), 16), parseInt(color1D.substring(5,7), 16)], dynamicValues.colors.GlobalAveragePooling1D))
        previousColors.GlobalAveragePooling1D = dynamicValues.colors.GlobalAveragePooling1D;
    if(!equalsCheck([parseInt(color2D.substring(1,3), 16), parseInt(color2D.substring(3,5), 16), parseInt(color2D.substring(5,7), 16)], dynamicValues.colors.GlobalAveragePooling2D))
        previousColors.GlobalAveragePooling2D = dynamicValues.colors.GlobalAveragePooling2D;
    if(!equalsCheck([parseInt(color3D.substring(1,3), 16), parseInt(color3D.substring(3,5), 16), parseInt(color3D.substring(5,7), 16)], dynamicValues.colors.GlobalAveragePooling3D))
        previousColors.GlobalAveragePooling3D = dynamicValues.colors.GlobalAveragePooling3D;

    dynamicValues.colors.GlobalAveragePooling1D = [parseInt(color1D.substring(1,3), 16), parseInt(color1D.substring(3,5), 16), parseInt(color1D.substring(5,7), 16)];

    if(allSameColor) {
        dynamicValues.colors.GlobalAveragePooling2D = [parseInt(color1D.substring(1,3), 16), parseInt(color1D.substring(3,5), 16), parseInt(color1D.substring(5,7), 16)];
        document.getElementById('GlobalAveragePooling2D').value = rgbToHex(dynamicValues.colors.GlobalAveragePooling2D[0], dynamicValues.colors.GlobalAveragePooling2D[1], dynamicValues.colors.GlobalAveragePooling2D[2]);
        dynamicValues.colors.GlobalAveragePooling3D = [parseInt(color1D.substring(1,3), 16), parseInt(color1D.substring(3,5), 16), parseInt(color1D.substring(5,7), 16)];
        document.getElementById('GlobalAveragePooling3D').value = rgbToHex(dynamicValues.colors.GlobalAveragePooling3D[0], dynamicValues.colors.GlobalAveragePooling3D[1], dynamicValues.colors.GlobalAveragePooling3D[2]);
    } else{
        dynamicValues.colors.GlobalAveragePooling2D = [parseInt(color2D.substring(1,3), 16), parseInt(color2D.substring(3,5), 16), parseInt(color2D.substring(5,7), 16)];
        dynamicValues.colors.GlobalAveragePooling3D = [parseInt(color3D.substring(1,3), 16), parseInt(color3D.substring(3,5), 16), parseInt(color3D.substring(5,7), 16)];
    }

}

function updateColors(){
    let denseColor = document.getElementById('Dense').value;
    if(!equalsCheck([parseInt(denseColor.substring(1,3), 16), parseInt(denseColor.substring(3,5), 16), parseInt(denseColor.substring(5,7), 16)], dynamicValues.colors.Dense))
        previousColors.Dense = dynamicValues.colors.Dense;
    dynamicValues.colors.Dense = [parseInt(denseColor.substring(1,3), 16), parseInt(denseColor.substring(3,5), 16), parseInt(denseColor.substring(5,7), 16)];

    let flattenColor = document.getElementById('Flatten').value;
    if(!equalsCheck([parseInt(denseColor.substring(1,3), 16), parseInt(denseColor.substring(3,5), 16), parseInt(denseColor.substring(5,7), 16)], dynamicValues.colors.Flatten))
        previousColors.Flatten = dynamicValues.colors.Flatten;
    dynamicValues.colors.Flatten = [parseInt(flattenColor.substring(1,3), 16), parseInt(flattenColor.substring(3,5), 16), parseInt(flattenColor.substring(5,7), 16)];

    let dropoutColor = document.getElementById('Dropout').value;
    if(!equalsCheck([parseInt(denseColor.substring(1,3), 16), parseInt(denseColor.substring(3,5), 16), parseInt(denseColor.substring(5,7), 16)], dynamicValues.colors.Dropout))
        previousColors.Dropout = dynamicValues.colors.Dropout;
    dynamicValues.colors.Dropout = [parseInt(dropoutColor.substring(1,3), 16), parseInt(dropoutColor.substring(3,5), 16), parseInt(dropoutColor.substring(5,7), 16)];

    let inputColor = document.getElementById('Input').value;
    if(!equalsCheck([parseInt(denseColor.substring(1,3), 16), parseInt(denseColor.substring(3,5), 16), parseInt(denseColor.substring(5,7), 16)], dynamicValues.colors.InputLayer))
        previousColors.InputLayer = dynamicValues.colors.InputLayer;
    dynamicValues.colors.InputLayer = [parseInt(inputColor.substring(1,3), 16), parseInt(inputColor.substring(3,5), 16), parseInt(inputColor.substring(5,7), 16)];

    let concatenateColor = document.getElementById('Concatenate').value;
    if(!equalsCheck([parseInt(denseColor.substring(1,3), 16), parseInt(denseColor.substring(3,5), 16), parseInt(denseColor.substring(5,7), 16)], dynamicValues.colors.Concatenate))
        previousColors.Concatenate = dynamicValues.colors.Concatenate;
    dynamicValues.colors.Concatenate = [parseInt(concatenateColor.substring(1,3), 16), parseInt(concatenateColor.substring(3,5), 16), parseInt(concatenateColor.substring(5,7), 16)];

    let addColor = document.getElementById('Add').value;
    if(!equalsCheck([parseInt(denseColor.substring(1,3), 16), parseInt(denseColor.substring(3,5), 16), parseInt(denseColor.substring(5,7), 16)], dynamicValues.colors.Add))
        previousColors.Add = dynamicValues.colors.Add;
    dynamicValues.colors.Add = [parseInt(addColor.substring(1,3), 16), parseInt(addColor.substring(3,5), 16), parseInt(addColor.substring(5,7), 16)];

    let lstmColor = document.getElementById('LSTM').value;
    if(!equalsCheck([parseInt(denseColor.substring(1,3), 16), parseInt(denseColor.substring(3,5), 16), parseInt(denseColor.substring(5,7), 16)], dynamicValues.colors.LSTM))
        previousColors.LSTM = dynamicValues.colors.LSTM;
    dynamicValues.colors.LSTM = [parseInt(lstmColor.substring(1,3), 16), parseInt(lstmColor.substring(3,5), 16), parseInt(lstmColor.substring(5,7), 16)];

    let gruColor = document.getElementById('GRU').value;
    if(!equalsCheck([parseInt(denseColor.substring(1,3), 16), parseInt(denseColor.substring(3,5), 16), parseInt(denseColor.substring(5,7), 16)], dynamicValues.colors.GRU))
        previousColors.GRU = dynamicValues.colors.GRU;
    dynamicValues.colors.GRU = [parseInt(gruColor.substring(1,3), 16), parseInt(gruColor.substring(3,5), 16), parseInt(gruColor.substring(5,7), 16)];

    let simpleRNNColor = document.getElementById('SimpleRNN').value;
    if(!equalsCheck([parseInt(denseColor.substring(1,3), 16), parseInt(denseColor.substring(3,5), 16), parseInt(denseColor.substring(5,7), 16)], dynamicValues.colors.SimpleRNN))
        previousColors.SimpleRNN = dynamicValues.colors.SimpleRNN;
    dynamicValues.colors.SimpleRNN = [parseInt(simpleRNNColor.substring(1,3), 16), parseInt(simpleRNNColor.substring(3,5), 16), parseInt(simpleRNNColor.substring(5,7), 16)];

    let timeDistributedColor = document.getElementById('TimeDistributed').value;
    if(!equalsCheck([parseInt(denseColor.substring(1,3), 16), parseInt(denseColor.substring(3,5), 16), parseInt(denseColor.substring(5,7), 16)], dynamicValues.colors.TimeDistributed))
        previousColors.TimeDistributed = dynamicValues.colors.TimeDistributed;
    dynamicValues.colors.TimeDistributed = [parseInt(timeDistributedColor.substring(1,3), 16), parseInt(timeDistributedColor.substring(3,5), 16), parseInt(timeDistributedColor.substring(5,7), 16)];

    let bidirectionalColor = document.getElementById('Bidirectional').value;
    if(!equalsCheck([parseInt(denseColor.substring(1,3), 16), parseInt(denseColor.substring(3,5), 16), parseInt(denseColor.substring(5,7), 16)], dynamicValues.colors.Bidirectional))
        previousColors.Bidirectional = dynamicValues.colors.Bidirectional;
    dynamicValues.colors.Bidirectional = [parseInt(bidirectionalColor.substring(1,3), 16), parseInt(bidirectionalColor.substring(3,5), 16), parseInt(bidirectionalColor.substring(5,7), 16)];

    let baseRNNColor = document.getElementById('BaseRNN').value;
    if(!equalsCheck([parseInt(denseColor.substring(1,3), 16), parseInt(denseColor.substring(3,5), 16), parseInt(denseColor.substring(5,7), 16)], dynamicValues.colors.BaseRNN))
        previousColors.BaseRNN = dynamicValues.colors.BaseRNN;
    dynamicValues.colors.BaseRNN = [parseInt(baseRNNColor.substring(1,3), 16), parseInt(baseRNNColor.substring(3,5), 16), parseInt(baseRNNColor.substring(5,7), 16)];

    updateConv();
    updateConvLSTM();
    updateMaxPooling();
    updateAveragePooling();
    updateGlobalMaxPooling();
    updateGlobalAveragePooling();

    let reshapeColor = document.getElementById('Reshape').value;
    if(!equalsCheck([parseInt(denseColor.substring(1,3), 16), parseInt(denseColor.substring(3,5), 16), parseInt(denseColor.substring(5,7), 16)], dynamicValues.colors.Reshape))
        previousColors.Reshape = dynamicValues.colors.Reshape;
    dynamicValues.colors.Reshape = [parseInt(reshapeColor.substring(1,3), 16), parseInt(reshapeColor.substring(3,5), 16), parseInt(reshapeColor.substring(5,7), 16)];

    let defaultColor = document.getElementById('Default').value;
    if(!equalsCheck([parseInt(denseColor.substring(1,3), 16), parseInt(denseColor.substring(3,5), 16), parseInt(denseColor.substring(5,7), 16)], dynamicValues.colors.Default))
        previousColors.Default = dynamicValues.colors.Default;
    dynamicValues.colors.Default = [parseInt(defaultColor.substring(1,3), 16), parseInt(defaultColor.substring(3,5), 16), parseInt(defaultColor.substring(5,7), 16)];

    let blockColor = document.getElementById('Block').value;
    if(!equalsCheck([parseInt(denseColor.substring(1,3), 16), parseInt(denseColor.substring(3,5), 16), parseInt(denseColor.substring(5,7), 16)], dynamicValues.colors.Block))
        previousColors.Block = dynamicValues.colors.Block;
    dynamicValues.colors.Block = [parseInt(blockColor.substring(1,3), 16), parseInt(blockColor.substring(3,5), 16), parseInt(blockColor.substring(5,7), 16)];

    let selectedColor = document.getElementById('Selected').value;
    if(!equalsCheck([parseInt(denseColor.substring(1,3), 16), parseInt(denseColor.substring(3,5), 16), parseInt(denseColor.substring(5,7), 16)], dynamicValues.colors.Selected))
        previousColors.Selected = dynamicValues.colors.Selected;
    dynamicValues.colors.Selected = [parseInt(selectedColor.substring(1,3), 16), parseInt(selectedColor.substring(3,5), 16), parseInt(selectedColor.substring(5,7), 16)];
}

