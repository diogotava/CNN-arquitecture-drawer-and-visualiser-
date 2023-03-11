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
$.post("http://127.0.0.1:5000/rep_bot",
    { js_input: "model_GTSRB_train1_val1_02//cp-0057.ckpt" },
    function (data) { layers = JSON.parse(data); }
)
fetch('./default_values.json')
    .then((response) => response.json())
    .then((json) => values = json);

function setup() {
    let w = parseInt(windowWidth * 0.81, 10);
    let h = parseInt(windowHeight * 0.98, 10);
    mCreateCanvas(w, h, WEBGL);
    mPerspective(PI / 3, width / height, 0.01, 150000);
    smooth();
    uploadButton = select('#model_button');
    uploadButton.mousePressed(getModelData);
    inputModelFile = select('#in_file');
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
    console.log(inputModelFile.value());
}

function windowResized() {
    let w = parseInt(windowWidth * 0.81, 10);
    let h = parseInt(windowHeight * 0.98, 10);
    resizeCanvas(w, h);
}