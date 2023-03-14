var camX = 199.0;
var camY = -180.0;
var camZ = 28.0;
var lookX = 0.0;
var lookY = 0.0;
var lookZ = 0.0;
var values;
var layers = [];
var uploadButton;
var inputModelFile;


// Call python code to get the layer information of the model
fetch('./default_values.json')
    .then((response) => response.json())
    .then((json) => values = json);


function setup() {
    let w = parseInt(windowWidth * 0.81, 10);
    let h = parseInt(windowHeight * 0.98, 10);
    mCreateCanvas(w, h, WEBGL);
    mPerspective(PI / 3, width / height, 0.01, 150000);
    smooth();
    // uploadButton = select('#model_button');
    // uploadButton.mousePressed(getModelData);
    inputModelFile = select('#in_file');

    document.getElementById("upload-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const fileInput = document.getElementById("model-file");
        const file = fileInput.files[0];

        const formData = new FormData();
        formData.append("model-file", file);

        fetch("http://127.0.0.1:5000/process", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())  // parse response as JSON
            .then(data => {
                // handle the JSON response here
                layers = data;
            })
            .catch(error => {
                console.error(error);
            });
    });
}

function draw() {
    // console.log(layers);
    mBackground(255);
    mCamera(values.camX, values.camY, values.camZ, values.lookX, values.lookY, values.lookZ, 0, 1, 0);
    mOrbitControl(values.sensitivityX, values.sensitivityY, values.sensitivityZ);
    const cam = _renderer._curCamera;
    values.camX = cam.eyeX;
    values.camY = cam.eyeY;
    values.camZ = cam.eyeZ;
    values.lookX = cam.centerX;
    values.lookY = cam.centerY;
    values.lookZ = cam.centerZ;

    mResetMatrix();

    if (layers.length > 0) {
        layers.forEach(draw_layer);
    }
}

function getModelData() {
    inputModelFile = document.getElementById('in_file');
    console.log(inputModelFile.files[0]);
    const formData = new FormData();
    formData.append("js_input", inputModelFile.files[0]);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:5000/process_model");
    xhr.send(formData);
    // $.post("http://127.0.0.1:5000/rep_bot",
    //     { js_input: inputModelFile.files[0] },
    //     function (data) { layers = JSON.parse(data); }
    // )
}

function windowResized() {
    let w = parseInt(windowWidth * 0.81, 10);
    let h = parseInt(windowHeight * 0.98, 10);
    resizeCanvas(w, h);
    mPerspective(PI / 3, width / height, 0.01, 150000);
}