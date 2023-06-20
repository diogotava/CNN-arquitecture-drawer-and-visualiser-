let layers = [];
let layers_backup = [];
let layersChanged = false;

// Call python code to get the layer information of the model
function setup() {
    resetDynamicValues();
    var element1Width = document.getElementById('column1').offsetWidth;
    let w = parseInt(windowWidth - element1Width, 10);
    let h = parseInt(windowHeight, 10);
    mCreateCanvas(w, h, WEBGL);
    mPerspective();

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
                layers_backup = layers.map(obj => obj.copy());
                layersChanged = true;
            })
            .catch(error => {
                console.error(error);
            });
        resetDynamicValues();
    });

    const settingsButton = document.getElementById('settingsButton');
    const settingsPopup = document.getElementById('settingsPopup');
    const settingsForm = document.getElementById('settingsForm');

    settingsButton.addEventListener('click', () => {
        settingsPopup.style.display = 'block';
    });

    settingsForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // Handle form submission and save the settings here
        // You can access the form values using settingsForm.username.value and settingsForm.theme.value
        // For example, you can save the settings to local storage or send them to a server
        // After saving, you can close the settings popup
        settingsPopup.style.display = 'none';
    });

    const settingsColorsButton = document.getElementById('settingsColorsButton');
    const settingsColorsPopup = document.getElementById('settingsColorsPopup');
    const settingsColorsForm = document.getElementById('settingsColorsForm');

    settingsColorsButton.addEventListener('click', () => {
        settingsColorsPopup.style.display = 'block';
    });

    settingsColorsForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // Handle form submission and save the settings here
        // You can access the form values using settingsForm.username.value and settingsForm.theme.value
        // For example, you can save the settings to local storage or send them to a server
        // After saving, you can close the settings popup
        settingsColorsPopup.style.display = 'none';
        settingsPopup.style.display = 'block';
    });

    const fileInput = document.getElementById('model-file');
    const fileNameLabel = document.getElementById('modelFileLabel');

    fileInput.addEventListener('change', () => {
        const fileName = fileInput.files[0].name;
        const labelText = fileNameLabel.textContent;
        fileNameLabel.innerHTML = `<b>${fileName}</b>`;
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

    if (layers.length > 0) {
        if (layersChanged) {
            layers = layers_backup.map(obj => obj.copy());
            resetLayersAlreadyComputedPosition();
            getLayersPosition(layers);
            layersChanged = false;
            dynamicValues.camX = (layers[layers.length - 1].centerPosition[0] - layers[0].centerPosition[0]) / 2;
            dynamicValues.lookX = dynamicValues.camX;
        }
        layers.forEach(drawLayer);
    }
}

function windowResized() {
    mResizeCanvas();
}