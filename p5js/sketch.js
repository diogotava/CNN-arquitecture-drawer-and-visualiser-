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

    document.getElementById("upload-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const loader = document.getElementById("loader");
        loader.style.display = 'block';

        const fileInput = document.getElementById("model-file");
        const file = fileInput.files[0];

        const formData = new FormData();
        formData.append("model-file", file);

        fetch("http://127.0.0.1:5000/process", {
            method: "POST",
            body: formData
        }).then(response => response.json())  // parse response as JSON
            .then(data => {
                // handle the JSON response here
                layers = [];
                for (let jsonLayer of data) {
                    let layer = new Layer(jsonLayer)
                    layers.push(layer)
                }
                layers_backup = layers.map(obj => obj.copy());
                layersChanged = true;
                loader.style.display = 'none';
            })
            .catch(error => {
                loader.style.display = 'none';
                alert("Was not possible to load the model selected!")
                console.error(error);
            });
        // resetDynamicValues();
    });
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