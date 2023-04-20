/**
 * mPage is a global variable that holds a (hidden) WEBGL canvas for color-based object picking.
 */
var mPage;
var canvas;
/**
 * mCreateCanvas is a 3D object picking version of createCanvas().
 *
 * Its parameters are identical to those for createCanvas().
 */
function mCreateCanvas(windowWidth, windowHeight, WEBGL) {
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    pixelDensity(1);
    canvas.parent('column2');
    mPage = createGraphics(width, height, WEBGL);
    mPage.pixelDensity(1);
    mPage.parent('column2');
}

/**
 * getLayerId returns the ID number of the layer at the mouse position.
 *
 * @return {Number} the ID number of the layer at muse position.
 */
function getLayerId() {
    var gl = mPage.elt.getContext('webgl');
    var pixels = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
    gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    var index = 4 * ((gl.drawingBufferHeight - mouseY) * gl.drawingBufferWidth + mouseX);

    return (pixels[index] << 16 | pixels[index + 1] << 8 | pixels[index + 2]) - 1;
}

/**
 * mBox creates a box primitive with an associated ID number.
 */
function mBox(id, shapeX, shapeY, shapeZ) {
    strokeWeight(2);
    box(shapeX, shapeY, shapeZ);

    mPage.fill((id >> 16) & 0xFF, (id >> 8) & 0xF, id & 0xFF);
    mPage.noStroke();
    mPage.box(shapeX, shapeY, shapeZ);
    strokeWeight(1);
}

/**
 * mTranslate performs the translate function to both visible and hidden 3D models.
 *
 * All parameters are the same as for translate().
 */
function mTranslate() {
    translate(...[...arguments]);
    mPage.translate(...[...arguments]);
}

/**
 * mResetMatrix performs the resetMatrix function to both visible and hidden 3D models.
 *
 * All parameters are the same as for resetMatrix().
 */
function mResetMatrix() {
    resetMatrix();
    mPage.resetMatrix();
}

/**
 * mCamera performs the camera function to both visible and hidden 3D models.
 *
 * All parameters are the same as for camera().
 */
function mCamera() {
    camera(...[...arguments]);
    mPage.camera(...[...arguments]);
}

/**
 * mOrtho performs the ortho function to both visible and hidden 3D models.
 *
 * All parameters are the same as for ortho().
 */
function mOrtho() {
    ortho(...[...arguments]);
    mPage.ortho(...[...arguments]);
}

/**
 * mPerspective performs the perspective function to both visible and hidden 3D models.
 *
 * All parameters are the same as for perspective().
 */
function mPerspective() {
    perspective(...[...arguments]);
    mPage.perspective(...[...arguments]);
}

/**
 * mPush performs the push function to both visible and hidden 3D models.
 */
function mPush() {
    push();
    mPage.push();
}

/**
 * mPop performs the pop function to both visible and hidden 3D models.
 */
function mPop() {
    pop();
    mPage.pop();
}

/**
 * mBackground performs the background function to the visible 3D models and sets
 * the background color of the hidden 3D model to 0 (black).
 *
 * All parameters are the same as for background().
 */
function mBackground() {
    background(...[...arguments]);
    mPage.background(0);
}

/**
 * mTexture performs the texture function to the visible 3D models.
 *
 * All parameters are the same as for texture().
 */
function mTexture() {
    fill(...[...arguments]);
}

/**
 * mOrbitcontrol defines the orbitControl command 
 */
function mOrbitControl(sensitivityX = 1, sensitivityY = 1, sensitivityZ = 0.01) {
    orbitControl(sensitivityX, sensitivityY, sensitivityZ);
    mPage.orbitControl(sensitivityX, sensitivityY, sensitivityZ);
}