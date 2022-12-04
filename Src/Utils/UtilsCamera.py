from OpenGL.GL import *
from OpenGL.GLU import *
from OpenGL.GLUT import *
from pygame.locals import *
from Src.Layers.LayerDrawer import *
from test import layers
import math
from Src.Utils.Values import *


def changeSize(ww, hh):

    ratio = 0.0

    w = ww
    h = hh
    # Prevent a divide by zero, when window is too short
    # (you cant make a window of zero width).
    if h == 0:
        h = 1

    ratio = 1.0 * w / h

    # Reset the coordinate system before modifying
    glMatrixMode(GL_PROJECTION)
    glLoadIdentity()

    # Set the viewport to be the entire window
    glViewport(0, 0, w, h)

    # Set the clipping volume
    gluPerspective(45, ratio, 1, 1000)
    glMatrixMode(GL_MODELVIEW)


def renderScene():
    global camX, camY, camZ

    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)
    glLoadIdentity()
    gluLookAt(camX, camY, camZ,
              lookX, lookY, lookZ,
              0.0, 0.0, 1.0)

    dir = [1.0, 1.0, 1.0, 1.0]
    glLightfv(GL_LIGHT0, GL_POSITION, dir)

    # Draw layers
    layer_drawer = LayersDrawer()
    for index, layer in enumerate(layers):
        glPushMatrix()
        layer_drawer.draw_layer(layer.__class__.__name__, layers, layer, index)
        glPopMatrix()

        # renderText()

    if mode:
        picking(0, 0)

    glutSwapBuffers()


def picking(x, y):
    global camX, camY, camZ, lookX, lookY, lookZ
    res = []
    viewport = []

    glDisable(GL_LIGHTING)

    viewport = glGetIntegerv(GL_VIEWPORT)

    glClear(GL_COLOR_BUFFER_BIT)
    glLoadIdentity()
    gluLookAt(camX, camY, camZ,
              lookX, lookY, lookZ,
              0.0, 0.0, 1.0)
    glDepthFunc(GL_LEQUAL)

    # Draw SnowMen
    layer_drawer = LayersDrawer()
    for index, layer in enumerate(layers):
        glPushMatrix()
        layer_drawer.draw_layer_code(layer.__class__.__name__, (index+1), layers, layer, index)
        glPopMatrix()

    glDepthFunc(GL_LESS)

    res = glReadPixels(x, viewport[3] - y, 1, 1, GL_RGBA, GL_UNSIGNED_BYTE)

    glEnable(GL_LIGHTING)

    return res[0]


# ----------------------------------------------------------
# MOUSE AND KEYBOARD
# ----------------------------------------------------------

def processNormalKeys(key, x, y):
    global camX, camY, camZ, lookX, lookY, lookZ, mode, alpha, beta, r
    if key == b'\x1b':
        quit(0)
    elif key == b'c':
        print("Camera : ", alpha, beta, r)
    elif key == b'a':
        mode = not mode
        print("Mode : ", mode)
    elif key == b't':
        # camX = camX + 0.8
        lookX = lookX + 0.8
    elif key == b'g':
        # camX = camX - 0.8
        lookX = lookX - 0.8
    elif key == b'h':
        # camY = camY + 0.8
        lookY = lookY + 0.8
    elif key == b'f':
        # camY = camY - 0.8
        lookY = lookY - 0.8
    elif key == b'y':
        # camZ = camZ + 0.8
        lookZ = lookZ + 0.8
    elif key == b'r':
        # camZ = camZ - 0.8
        lookZ = lookZ - 0.8
    glutPostRedisplay()


def processMouseButtons(button, state, xx, yy):
    global tracking, alpha, beta, r, startX, startY

    print(xx, yy)
    if (state == GLUT_DOWN):
        startX = xx
        startY = yy
        if (button == GLUT_LEFT_BUTTON):
            tracking = 1
        elif (button == GLUT_RIGHT_BUTTON):
            tracking = 2
        else:  # Middle button
            tracking = 0
            picked = picking(xx, yy)
            if (picked):
                print("Picked Snowman number ", picked)
            else:
                print("Nothing selected")
                glutPostRedisplay()

    elif state == GLUT_UP:
        if tracking == 1:
            alpha += (xx - startX)
            beta += (yy - startY)

        elif tracking == 2:
            r -= yy - startY
            if r < 3:
                r = 3.0

        tracking = 0


def processMouseMotion(xx,  yy):
    global camX, camY, camZ, alpha, beta, r
    deltaX = 0
    deltaY = 0
    alphaAux = 0
    betaAux = 0
    rAux = 0

    if not tracking:
        return

    deltaX = xx - startX
    deltaY = yy - startY

    if tracking == 1:
        alphaAux = alpha + deltaX
        betaAux = beta + deltaY

        if betaAux > 85.0:
            betaAux = 85.0
        elif betaAux < -85.0:
            betaAux = -85.0

        rAux = r

    elif tracking == 2:

        alphaAux = alpha
        betaAux = beta
        rAux = r - deltaY
        if rAux < 3:
            rAux = 3

    camX = rAux * math.sin(alphaAux * 3.14 / 180.0) * math.cos(betaAux * 3.14 / 180.0)
    camY = rAux * math.cos(alphaAux * 3.14 / 180.0) * math.cos(betaAux * 3.14 / 180.0)
    camZ = rAux * math.sin(betaAux * 3.14 / 180.0)

    glutPostRedisplay()
