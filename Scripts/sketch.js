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
    mPerspective();

    buttonsBehaviour();
}

function draw() {
    mBackground(255);
    mCamera(dynamicValues.camX, dynamicValues.camY, dynamicValues.camZ, dynamicValues.lookX, dynamicValues.lookY, dynamicValues.lookZ, 0, 1, 0);
    const settingsPopup = document.getElementById('settingsPopup');
    if (settingsPopup.style.display === 'none' || settingsPopup.style.display === '')
        mOrbitControl(dynamicValues.sensitivityX, dynamicValues.sensitivityY, dynamicValues.sensitivityZ);
    else if (settingsPopup.style.display === 'block')
        mOrbitControl(dynamicValues.sensitivityX, dynamicValues.sensitivityY, 0);
    const cam = _renderer._curCamera;
    if (parseFloat(cam.eyeX) !== parseFloat(dynamicValues.camX) ||
        parseFloat(cam.eyeY) !== parseFloat(dynamicValues.camY) ||
        parseFloat(cam.eyeZ) !== parseFloat(dynamicValues.camZ) ||
        parseFloat(cam.centerX) !== parseFloat(dynamicValues.lookX) ||
        parseFloat(cam.centerY) !== parseFloat(dynamicValues.lookY) ||
        parseFloat(cam.centerZ) !== parseFloat(dynamicValues.lookZ)) {
        dynamicValues.camX = !isNaN(parseFloat(cam.eyeX)) ? parseFloat(cam.eyeX) : 0;
        dynamicValues.camY = !isNaN(parseFloat(cam.eyeY)) ? parseFloat(cam.eyeY) : 0;
        dynamicValues.camZ = !isNaN(parseFloat(cam.eyeZ)) ? parseFloat(cam.eyeZ) : 0;
        dynamicValues.lookX = !isNaN(parseFloat(cam.centerX)) ? parseFloat(cam.centerX) : 0;
        dynamicValues.lookY = !isNaN(parseFloat(cam.centerY)) ? parseFloat(cam.centerY) : 0;
        dynamicValues.lookZ = !isNaN(parseFloat(cam.centerZ)) ? parseFloat(cam.centerZ) : 0;
        updateCameraShownValues();
    }

    if (layers.length > 0) {
        if (layersChanged) {
            layers = layers_backup.map(obj => obj.copy());
            getLayersPosition(layers);
            layersChanged = false;
        }
        layers.forEach(drawLayer);
    }
}

function windowResized() {
    mResizeCanvas();
}