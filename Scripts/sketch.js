let layers = [];
let layers_backup = [];
let layersChanged = false;

// Call python code to get the layer information of the model
function setup() {
    resetDynamicValues();
    const element1Width = document.getElementById('column1').offsetWidth;
    let w = parseInt(windowWidth - element1Width, 10);
    let h = parseInt(windowHeight, 10);
    mCreateCanvas(w, h, WEBGL);
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
    if (Math.round(cam.eyeX) !== Math.round(dynamicValues.camX) ||
        Math.round(cam.eyeY) !== Math.round(dynamicValues.camY) ||
        Math.round(cam.eyeZ) !== Math.round(dynamicValues.camZ) ||
        Math.round(cam.centerX) !== Math.round(dynamicValues.lookX) ||
        Math.round(cam.centerY) !== Math.round(dynamicValues.lookY) ||
        Math.round(cam.centerZ) !== Math.round(dynamicValues.lookZ)) {
        dynamicValues.camX = !isNaN(Number(cam.eyeX)) ? Number(cam.eyeX) : 0;
        dynamicValues.camY = !isNaN(Number(cam.eyeY)) ? Number(cam.eyeY) : 0;
        dynamicValues.camZ = !isNaN(Number(cam.eyeZ)) ? Number(cam.eyeZ) : 0;
        dynamicValues.lookX = !isNaN(Number(cam.centerX)) ? Number(cam.centerX) : 0;
        dynamicValues.lookY = !isNaN(Number(cam.centerY)) ? Number(cam.centerY) : 0;
        dynamicValues.lookZ = !isNaN(Number(cam.centerZ)) ? Number(cam.centerZ) : 0;
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