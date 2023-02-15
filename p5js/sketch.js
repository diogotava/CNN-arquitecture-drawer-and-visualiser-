/**
 * Example code to demonstrate use of the mPicker.js object picker functions.
 * See https://p5js.org/reference/ for details of how the standard p5.js
 * 3D functions work.
 * 
 * This code displays a set of 3D objects moving in space. Arrow keys move 
 * the camera. Mouseover changes the texture image for some objects. Mouse clicks 
 * on other objects either change the texture image or spawn other objects.
 *
 * Ensure that the mPicker.js function library is included in the corresponding .html
 * file that includes this code. See comments in mPicker.js for usage of new functions.
 */

var cameraX = 0, cameraY = 0, cameraZ = 0;

// Define some variable names to use as object IDs
const BOX1 = 101;
const CONE1 = 102;
const PLANE1 = 103;
const SPHERE1 = 104;
const TORUS1 = 105;

const CLICKBOX = 128;
const CLICKPLANE = 129;

var layers = null;
$.post("http://127.0.0.1:5000/rep_bot",
  { js_input: "model_GTSRB_train1_val1_02//cp-0057.ckpt" },
  function (data) { layers = JSON.parse(data); }
)
function setup() {
  createCanvas(800, 600, WEBGL);
  pixelDensity(1);
  mPage = createGraphics(width, height, WEBGL);
  mPage.pixelDensity(1);
}

function draw() {
  console.log(layers);
  mBackground(0);
  orbitControl();
  mResetMatrix(); // Always include mResetMatrix to ensure proper operation of the object picker.

  adjustCamera(); // Check for arrow presses that change the camera position.
  mCamera(cameraX, cameraY, cameraZ);

  // Continually rotate the entire 3D space
  mRotateY(frameCount * 0.01);
  mRotateX(frameCount * 0.01);
  // Draw a box that is clickable to spawn new boxes
  mPush();
  mTranslate(50, 50, 50);
  mRotateZ(frameCount * 0.01);
  mTexture(255, 0, 0);
  mBox(1, 100);
  mPop();

  // Draw a plane that is clickable to change its texture image
  mPush();
  mTranslate(150, 150, 150);
  mRotateX(frameCount * 0.02);
  mTexture(0, 255, 0);
  mPlane(PLANE1, 100);
  mPop();

  // Draw a cone that changes texture image when hovered over with the mouse
  mPush();
  mTranslate(-50, -50, -50);
  mRotateZ(frameCount * -0.03);
  mCone(CONE1, 100);
  if (objectAtMouse() == CONE1) {
    mTexture(255, 0, 0);
  } else {
    mTexture(0, 0, 255)
  }
  mCone(CONE1, 100);
  mPop();

  // Draw a sphere that changes texture image when hovered over with a mouse
  mPush();
  mTranslate(0, -200, -50);
  mSphere(SPHERE1, 100);
  if (objectAtMouse() == SPHERE1) {
    mTexture(255, 0, 0);
  } else {
    mTexture(0, 0, 255)
  }
  mSphere(SPHERE1, 100);
  mPop();

  // If the mouse if clicked, check if it is clicked on specific objects
  // and change the objects or spawn new objects
  if (mouseIsPressed) {
    switch (objectAtMouse()) {
      case 1:  // Spawn a set of boxes when clicked
        for (var i = 0; i < 10; i++) {
          mPush();
          mTranslate(0, 0, (i - 5) * 50);
          mRotateZ(frameCount * 0.01);
          mTexture(255, 255, 0);
          mBox(CLICKBOX, 30);
          mPop();
        }
        break;
      case PLANE1:  // Change the texture image when clicked
        mPush();
        mTranslate(150, 150, 150);
        mRotateX(frameCount * 0.02);
        mTexture(0, 255, 255);
        mPlane(CLICKPLANE, 100);
        mPop();
        break;
    }
  }
}

function adjustCamera() {
  if (keyIsDown(UP_ARROW)) {
    cameraZ -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    cameraZ += 10;
  }
  if (keyIsDown(LEFT_ARROW)) {
    cameraX -= 10;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    cameraX += 10;
  }
}