let mPage;
let canvas;

function mCreateCanvas(windowWidth, windowHeight, WEBGL) {
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    pixelDensity(1);
    canvas.parent('column2');
    mPage = createGraphics(width, height, WEBGL);
    mPage.pixelDensity(1);
    mPage.parent('column2');
}

function mBox(id, shapeX, shapeY, shapeZ) {
    smooth();
    strokeWeight(2);
    box(shapeX, shapeY, shapeZ);

    mPage.fill((id >> 16) & 0xFF, (id >> 8) & 0xF, id & 0xFF);
    mPage.noStroke();
    mPage.box(shapeX, shapeY, shapeZ);
    strokeWeight(1);
}

function mTranslate() {
    translate(...[...arguments]);
    mPage.translate(...[...arguments]);
}

function mResizeCanvas() {
    var element1Width = document.getElementById('column1').offsetWidth + 50;
    let w = parseInt(windowWidth - element1Width, 10);
    let h = parseInt(windowHeight, 10);
    resizeCanvas(w, h);
    pixelDensity(1);
    mPage.resizeCanvas(w, h);
    mPage.pixelDensity(1);
}

function mResetMatrix() {
    resetMatrix();
    mPage.resetMatrix();
}

function mCamera() {
    camera(...[...arguments]);
    mPage.camera(...[...arguments]);
}

function mOrtho() {
    ortho(-width / 2, width / 2, height / 2, -height / 2, 0.01, 10000);
    mPage.ortho(-width / 2, width / 2, height / 2, -height / 2, 0.01, 10000);
}

function mPerspective() {
    perspective(PI / 3, width / height, 10, 10000);
    mPage.perspective(PI / 3, width / height, 10, 10000);
}

function mPush() {
    push();
    mPage.push();
}

function mPop() {
    pop();
    mPage.pop();
}

function mBackground() {
    background(...[...arguments]);
    mPage.background(0);
}

function mTexture() {
    fill(...[...arguments]);
}

function mOrbitControl(sensitivityX = 1, sensitivityY = 1, sensitivityZ = 0.01) {
    orbitControl(sensitivityX, sensitivityY, sensitivityZ);
    mPage.orbitControl(sensitivityX, sensitivityY, sensitivityZ);
}