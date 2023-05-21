let layers = [];
let layersChanged = false;
let inputModelFile;


// Call python code to get the layer information of the model
function setup() {
    resetDynamicValues();
    let w = parseInt(windowWidth * 0.81, 10);
    let h = parseInt(windowHeight * 0.98, 10);
    mCreateCanvas(w, h, WEBGL);
    mPerspective(PI / 3, width / height, 0.01, 150000);

    inputModelFile = select('#inFile');

    document.getElementById("upload-form").addEventListener("submit", function (event) {
        event.preventDefault();

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
                layersChanged = true;
            })
            .catch(error => {
                console.error(error);
            });
        resetDynamicValues();
    });
}

function draw() {
    mBackground(255);
    mCamera(dynamicValues.camX, dynamicValues.camY, dynamicValues.camZ, dynamicValues.lookX, dynamicValues.lookY, dynamicValues.lookZ, 0, 1, 0);
    mOrbitControl(dynamicValues.sensitivityX, dynamicValues.sensitivityY, dynamicValues.sensitivityZ);
    const cam = _renderer._curCamera;
    dynamicValues.camX = cam.eyeX;
    dynamicValues.camY = cam.eyeY;
    dynamicValues.camZ = cam.eyeZ;
    dynamicValues.lookX = cam.centerX;
    dynamicValues.lookY = cam.centerY;
    dynamicValues.lookZ = cam.centerZ;

    mResetMatrix();

    if (layers.length > 0) {
        if (layersChanged)
            getLateralPositionLayers(layers[0], layers)
        layers.forEach(drawLayer);
        layersChanged = false;
    }
}

function windowResized() {
    mResizeCanvas();
}