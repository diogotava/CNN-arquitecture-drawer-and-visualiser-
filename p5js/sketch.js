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
    if( settingsPopup.style.display === 'none' )
        mOrbitControl(dynamicValues.sensitivityX, dynamicValues.sensitivityY, dynamicValues.sensitivityZ);
    else if( settingsPopup.style.display === 'block' )
        mOrbitControl(dynamicValues.sensitivityX, dynamicValues.sensitivityY, 0);
    const cam = _renderer._curCamera;
    if (Math.round(cam.eyeX) !== dynamicValues.camX || Math.round(cam.eyeY) !== dynamicValues.camY || Math.round(cam.eyeZ) !== dynamicValues.camZ || Math.round(cam.centerX) !== dynamicValues.lookX || Math.round(cam.centerY) !== dynamicValues.lookY || Math.round(cam.centerZ) !== dynamicValues.lookZ) {
        dynamicValues.camX = Math.round(cam.eyeX);
        dynamicValues.camY = Math.round(cam.eyeY);
        dynamicValues.camZ = Math.round(cam.eyeZ);
        dynamicValues.lookX = Math.round(cam.centerX);
        dynamicValues.lookY = Math.round(cam.centerY);
        dynamicValues.lookZ = Math.round(cam.centerZ);
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