let mPage;
let mExportImageCanvas;
let canvas;
let mBlockImage;
let mExportCanvasCameraPositioning = [];
let mExportCanvasOrtho = [0, 0, -100, 100, 1, 50000];


function mCreateCanvas(windowWidth, windowHeight) {
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.parent('column2');
    mPage = createGraphics(width, height, WEBGL);
    mPage.parent('column2');
    mExportImageCanvas = createGraphics(width, height, WEBGL);
    mBlockImage = createGraphics(width, height, WEBGL);
}

function mBox(id, shapeX, shapeY, shapeZ) {
    smooth();
    strokeWeight(dynamicValues.strokeWeight);
    box(shapeX, shapeY, shapeZ);
    mExportImageCanvas.smooth();
    mExportImageCanvas.stroke(0);
    mExportImageCanvas.strokeWeight(dynamicValues.strokeWeight);
    // mExportImageCanvas.noStroke();
    mExportImageCanvas.box(shapeX, shapeY, shapeZ);

    mPage.fill((id >> 16) & 0xFF, (id >> 8) & 0xF, id & 0xFF);
    mPage.noStroke();
    mPage.box(shapeX, shapeY, shapeZ);
    strokeWeight(dynamicValues.strokeWeight);
}

function mBlock(id, shapeX, shapeY, shapeZ, blockColor) {
    smooth();
    strokeWeight(dynamicValues.strokeWeight);
    stroke(blockColor[0], blockColor[1], blockColor[2])
    box(shapeX, shapeY, shapeZ);
    mExportImageCanvas.strokeWeight(dynamicValues.strokeWeight);
    // mExportImageCanvas.noStroke();
    mExportImageCanvas.box(shapeX, shapeY, shapeZ);

    mPage.noFill();
    mPage.strokeWeight(4);
    mPage.stroke((id >> 16) & 0xFF, (id >> 8) & 0xFF, id & 0xFF);
    mPage.box(shapeX, shapeY, shapeZ);
    strokeWeight(dynamicValues.strokeWeight);
}

function mTranslate(...arguments) {
    translate(...[...arguments]);
    mExportImageCanvas.translate(...[...arguments]);
    mPage.translate(...[...arguments]);
}

function mTranslateWithoutMPage(...arguments) {
    translate(...[...arguments]);
    mExportImageCanvas.translate(...[...arguments]);
}

function mResizeCanvas() {
    let element1Width = document.getElementById('column1').offsetWidth;
    let w = parseInt(windowWidth - element1Width, 10);
    let h = parseInt(windowHeight, 10);
    resizeCanvas(w, h);
    mPage.resizeCanvas(w, h);
    layersChanged = true;
}

function mCamera() {
    camera(...[...arguments]);
    mPage.camera(...[...arguments]);
    let maxXPosition = getMaxXPosition();
    mExportImageCanvas.resizeCanvas(maxXPosition * 4 > width / 2 ? maxXPosition * 4 : width / 2, height / 2);

    let camPos = [maxXPosition / 2, -400, 200];
    let lookatPos = [maxXPosition / 2, 0, 0];
    let up = [0, 1, 0];
    mExportCanvasCameraPositioning = [camPos, lookatPos, up];

    mExportImageCanvas.camera(camPos[0], camPos[1], camPos[2], lookatPos[0], lookatPos[1], lookatPos[2], up[0], up[1], up[2]);
    mExportCanvasOrtho[0] = -maxXPosition / 2;
    mExportCanvasOrtho[1] = maxXPosition / 2;

    mExportImageCanvas.ortho(mExportCanvasOrtho[0], mExportCanvasOrtho[1], mExportCanvasOrtho[2], mExportCanvasOrtho[3], mExportCanvasOrtho[4], mExportCanvasOrtho[5]);
}

function mPush(mPageApply = true) {
    push();
    mExportImageCanvas.push();
    if (mPageApply)
        mPage.push();
}

function mPop(mPageApply = true) {
    pop();
    mExportImageCanvas.pop();
    if (mPageApply)
        mPage.pop();
}

function mBackground() {
    background(...[...arguments]);
    mExportImageCanvas.background(...[...arguments]);
    mPage.background(dynamicValues.colors.Background);
}

function mTexture() {
    fill(...[...arguments]);
    mExportImageCanvas.fill(...[...arguments]);
}

function mAngleModeDegrees() {
    angleMode(DEGREES);
    mExportImageCanvas.angleMode(DEGREES);
}

function mRotateX(angle) {
    rotateX(angle);
    mExportImageCanvas.rotateX(angle);
}

function mRotateZ(angle) {
    rotateZ(angle);
    mExportImageCanvas.rotateZ(angle);
}

function mCylinder() {
    cylinder(...[...arguments]);
    mExportImageCanvas.noStroke();
    mExportImageCanvas.cylinder(...[...arguments]);
}

function mCone() {
    cone(...[...arguments]);
    mExportImageCanvas.noStroke();
    mExportImageCanvas.cone(...[...arguments]);
}

function mOrbitControl(sensitivityX = 1, sensitivityY = 1, sensitivityZ = 0.01) {
    orbitControl(sensitivityX, sensitivityY, sensitivityZ);
    mPage.orbitControl(sensitivityX, sensitivityY, sensitivityZ);
}

function getLayerId() {
    let pixels = mPage.get(mouseX, mouseY);

    return (pixels[0] << 16 | pixels[1] << 8 | pixels[2]) - 1;
}

function getBlockId() {
    let pixels = mPage.get(mouseX, mouseY);

    return (pixels[0] << 16 | pixels[1] << 8 | pixels[2]) - 1;
}