let layers = [];
let layers_backup = [];
let layersChanged = false;

// Call python code to get the layer information of the model
function setup() {
    resetDynamicValues();
    const element1Width = document.getElementById('column1').offsetWidth;
    let w = parseInt(windowWidth - element1Width, 10);
    let h = parseInt(windowHeight, 10);
    mCreateCanvas(w, h);

    buttonsBehaviour();
}

function draw() {
    mBackground(dynamicValues.colors.Background);
    mCamera(dynamicValues.camX, dynamicValues.camY, dynamicValues.camZ, dynamicValues.lookX, dynamicValues.lookY, dynamicValues.lookZ, 0, 1, 0);
    const settingsPopup = document.getElementById('settingsPopup');
    if (settingsPopup.style.display === 'none' || settingsPopup.style.display === '')
        mOrbitControl(dynamicValues.sensitivityX, dynamicValues.sensitivityY, dynamicValues.sensitivityZ);
    else if (settingsPopup.style.display === 'block')
        mOrbitControl(dynamicValues.sensitivityX, dynamicValues.sensitivityY, 0);
    const cam = _renderer._curCamera;
    let keysDynamicValues = ['camX', 'camY', 'camZ', 'lookX', 'lookY', 'lookZ'];
    let keysCam = ['eyeX', 'eyeY', 'eyeZ', 'centerX', 'centerY', 'centerZ'];
    keysDynamicValues.forEach((key, index) => {
        if (parseFloat(cam[keysCam[index]]) !== parseFloat(dynamicValues[key])) {
            dynamicValues[key] = !isNaN(parseFloat(cam[keysCam[index]])) ? parseFloat(cam[keysCam[index]]) : 0;
            updateCameraShownValues();
        }
    })

    updateShownLayerInformation();

    if (layers.length > 0) {
        if (layersChanged) {
            layers = layers_backup.map(obj => obj.copy());
            getLayersPosition(layers);
            layersChanged = false;
            selectedText();
        }
        layers.forEach((layer) => drawLayer(layer, layers));
    }
}

function windowResized() {
    mResizeCanvas();
}


function updateValue() {
    // Get the selected option value
    var select = document.getElementById("select-options");
    var value = select.options[select.selectedIndex].value;

    // Update the input value
    var input = document.getElementById("select-value");
    input.value = value;
}
