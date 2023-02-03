from PyQt5.QtWidgets import *
import PyQt5.QtCore as QtCore
from PyQt5.QtGui import *
from PyQt5.Qt import Qt
from OpenGL.GL import *
from OpenGL.GLU import *
from pygame.locals import *
from Src.Layers.LayerDrawer import *
import math
from Src.Utils.Values import *
from Src.Utils.Model import get_shapes


def changeSize(ww, hh):
    global w, h, near, far
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
    gluPerspective(45, ratio, near, far)
    glMatrixMode(GL_MODELVIEW)


def draw_layer(layer, layers_drawn):
    glPushMatrix()

    # desenha o layer
    layer.draw()
    layers_drawn.append(layer.name)
    glPopMatrix()

    # desenha o layer seguinte ao atual
    n = len(layer.next_layers)/2
    if len(layer.next_layers) > 1:
        for index, next_layer in enumerate(layer.next_layers):
            # desenha o próximo layer
            if(next_layer.name not in layers_drawn):
                draw_layer(next_layer, layers_drawn)

    elif len(layer.next_layers) == 1:
        next_layer = layer.next_layers[0]
        if(next_layer.name not in layers_drawn):
            draw_layer(next_layer, layers_drawn)


def renderText(parent, layer=None):
    global selected_layer
    if layer == None:
        selected_layer.selected = False
        selected_layer = None
        text = f"<b>Nothing Selected!</b>"
    else:
        if selected_layer != None:
            selected_layer.selected = False
        selected_layer = layer
        layer.selected = True
        input_shape = get_shapes(layer.original_model_layer, True, True)
        if(len(input_shape) > 1):
            text = f"<b>Layer:</b> '{layer.name}'<br><b>Type: </b>{layer.__class__.__name__}<br><b>Input shape:</b>"
            for index, shape in enumerate(input_shape):
                if index > 0:
                    text = text + "&nbsp;"*25 + f"({shape[0]: .2f} X {shape[1]: .2f} X {shape[2]: .2f})<br>"
                else:
                    text = text + f" ({shape[0]: .2f} X {shape[1]: .2f} X {shape[2]: .2f})<br>"

            text = text + f"<b>Output shape:</b> ({layer.shape[0]: .2f} X {layer.shape[1]: .2f} X {layer.shape[2]: .2f})"
        else:
            shape = input_shape[0]
            text = f"<b>Layer:</b> '{layer.name}'<br><b>Type: </b>{layer.__class__.__name__}<br><b>Input shape:</b> ({shape[0]: .2f} X {shape[1]: .2f} X {shape[2]: .2f})<br><b>Output shape:</b> ({layer.shape[0]: .2f} X {layer.shape[1]: .2f} X {layer.shape[2]: .2f})"
    parent.labelWidget.setText(text)


def renderScene():
    global camX, camY, camZ, w, h

    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)
    glLoadIdentity()
    gluLookAt(camX, camY, camZ,
              lookX, lookY, lookZ,
              0.0, 0.0, 1.0)

    # Draw layers
    layer = layers[0]
    layers_drawn = []
    draw_layer(layer, layers_drawn)


def picking(x, y):
    global camX, camY, camZ, lookX, lookY, lookZ, mode
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

    # Draw layers
    for index, layer in enumerate(layers):
        glPushMatrix()
        color_code = 0

        color_code = (index+1) / 255.0

        color_layer = [color_code, color_code, color_code, 1.0]
        layer.draw(color_layer)
        glPopMatrix()

    glDepthFunc(GL_LESS)

    res = glReadPixels(x, viewport[3] - y, 1, 1, GL_RGBA, GL_UNSIGNED_BYTE)

    glEnable(GL_LIGHTING)

    return res[0]


# ----------------------------------------------------------
# MOUSE AND KEYBOARD
# ----------------------------------------------------------

def processNormalKeys(key):
    global camX, camY, camZ, lookX, lookY, lookZ, mode, alpha, beta, r
    if key == Qt.Key_Escape:
        quit(0)
    elif key == Qt.Key_C:
        print("Camera : ", alpha, beta, r)
    elif key == Qt.Key_M:
        mode = not mode
        print("Mode : ", mode)
    elif key == Qt.Key_W:
        camX = camX + 5
        lookX = lookX + 5
    elif key == Qt.Key_S:
        camX = camX - 5
        lookX = lookX - 5
    elif key == Qt.Key_D:
        camY = camY + 5
        lookY = lookY + 5
    elif key == Qt.Key_A:
        camY = camY - 5
        lookY = lookY - 5
    elif key == Qt.Key_E:
        camZ = camZ + 5
        lookZ = lookZ + 5
    elif key == Qt.Key_Q:
        camZ = camZ - 5
        lookZ = lookZ - 5


def processMouseButtons(button, state, xx, yy, parent):
    global tracking, alpha, beta, r, startX, startY

    # print(xx, yy)
    if (state == True):
        startX = xx
        startY = yy
        if (button == QtCore.Qt.LeftButton):
            tracking = 1
        elif (button == QtCore.Qt.RightButton):
            tracking = 2
        else:  # Middle button
            tracking = 0
            picked = picking(xx, yy)
            if picked and picked != 255:
                layer_to_render_text = [e for e in layers if e.id == picked-1]
                renderText(parent, layer_to_render_text[0])
            else:
                renderText(parent)

    elif state == False:
        if tracking == 1:
            alpha += (xx - startX)
            beta += (yy - startY)

        elif tracking == 2:
            r -= yy - startY
            if r < 3:
                r = 3.0

        tracking = 0


def processMouseMotion(xx,  yy):
    global camX, camY, camZ, lookX, lookY, lookZ, alpha, beta, r
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

    camX = lookX + rAux * math.sin(alphaAux * 3.14 / 180.0) * math.cos(betaAux * 3.14 / 180.0)
    camY = lookY + rAux * math.cos(alphaAux * 3.14 / 180.0) * math.cos(betaAux * 3.14 / 180.0)
    camZ = lookZ + rAux * math.sin(betaAux * 3.14 / 180.0)
