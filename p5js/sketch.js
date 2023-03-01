var camX = 199.0;
var camY = -180.0;
var camZ = 28.0;
var lookX = 0.0;
var lookY = 0.0;
var lookZ = 0.0;
var a = -228.0;
var b = 6.0;
var r = 271.0;
var startX, startY = 0;
var tracking = 0;

var layers = [];

// Call python code to get the layer information of the model
$.post("http://127.0.0.1:5000/rep_bot",
    { js_input: "model_GTSRB_train1_val1_02//cp-0057.ckpt" },
    function (data) { layers = JSON.parse(data); }
)

function setup() {
    mCreateCanvas(windowWidth, windowHeight, WEBGL);
    mPerspective(PI / 3, width / height, 0.1, 15000);
    // mOrtho(-width / 2, width / 2, -height / 2, height / 2, 0.1, 150000);
}

function draw() {
    // console.log(layers);
    mBackground(255);
    const cam = _renderer._curCamera;
    camX = cam.eyeX;
    camY = cam.eyeY;
    camZ = cam.eyeZ;
    lookX = cam.centerX;
    lookY = cam.centerY;
    lookZ = cam.centerZ;

    mResetMatrix();

    mCamera(camX, camY, camZ, lookX, lookY, lookZ, 0, 1, 0);
    mOrbitControl();

    if (layers.length > 0) {
        layers.forEach(draw_layer);
    }
}

function mousePressed() {
    startX = mouseX
    startY = mouseY
    if (mouseButton === LEFT) {


    }
}