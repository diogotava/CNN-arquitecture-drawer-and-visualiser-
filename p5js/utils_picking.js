/**
 * mPage is a global variable that holds a (hidden) WEBGL canvas for color-based object picking.
 */
var mPage;

/**
 * mCreateCanvas is a 3D object picking version of createCanvas().
 *
 * Its parameters are identical to those for createCanvas().
 */
function mCreateCanvas(windowWidth, windowHeight, WEBGL) {
    createCanvas(windowWidth, windowHeight, WEBGL);
    pixelDensity(1);
    mPage = createGraphics(width, height, WEBGL);
    mPage.pixelDensity(1);
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
    box(shapeX, shapeY, shapeZ);

    mPage.fill((id >> 16) & 0xFF, (id >> 8) & 0xF, id & 0xFF);
    mPage.noStroke();
    mPage.box(shapeX, shapeY, shapeZ);
}

/**
 * mCylinder creates a cylinder primitive with an associated ID number.
 * 
 * @param {Number} ID first parameter assigns an ID number to the object.
 * Following parameters are passed through to cylinder().
 */
function mCylinder() {
    var passon = [...arguments].slice(1);
    var c = arguments[0];
    cylinder(...passon);
    mPage.fill((c >> 16) & 0xFF, (c >> 8) & 0xF, c & 0xFF);
    mPage.cylinder(...passon);
}

/**
 * mCone creates a cone primitive with an associated ID number.
 * 
 * @param {Number} ID first parameter assigns an ID number to the object.
 * Following parameters are passed through to cone().
 */
function mCone() {
    var passon = [...arguments].slice(1);
    var c = arguments[0];
    //mPage.rotateX(PI); // This line was in an early version, seemingly to compensate for
    // a bug whereby the cone would invert. However, it doesn't seem
    // necessary now, but is left here as a comment in case there is
    // an issue still remaining.
    cone(...passon);
    mPage.fill((c >> 16) & 0xFF, (c >> 8) & 0xF, c & 0xFF);
    mPage.cone(...passon);
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
function mOrbitControl() {
    orbitControl(1, 1, 0.1);
    mPage.orbitControl(1, 1, 0.1);
}