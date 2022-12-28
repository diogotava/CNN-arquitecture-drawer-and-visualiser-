from OpenGL.GL import *
from OpenGL.GLU import *
from OpenGL.GLUT import *
from pygame.locals import *
from Src.Layers.LayerDrawer import *
import math
from Src.Utils.Values import *


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


def get_lateral_position_layers(layer, layers_lateral=None, x_position=None, y_position=None):
    if y_position != None:
        if len(layer.previous_layers) > 1:
            y_position = 0
        # altera o valor de yPosition do layer para o novo valor y_position
        layer.setYPosition(y_position)

    if x_position != None:
        # altera o valor de XPosition do layer para o novo valor x_position
        layer.setXPosition(x_position)

    if layers_lateral == None:
        layers_lateral = []

    # desenha o layer seguinte ao atual
    if len(layer.next_layers) > 1:
        for index, next_layer in enumerate(layer.next_layers):
            # vai buscar o layer correspondente ao next_layer
            layer_to_get_lateral = [e for e in layers if e.id == next_layer.name]
            if len(layer_to_get_lateral) > 1:
                print("ERROR!!")

            n = len(layer.next_layers)/2
            # desenha o próximo layer
            if(index+1 <= n):
                if(y_position != None):
                    y_position = y_position-(index+1)*40
                else:
                    y_position = -(index+1)*40

            else:
                if(y_position != None):
                    y_position = y_position + (index+1)*40
                else:
                    y_position = (index+1)*40

            if(layer_to_get_lateral[0].id not in layers_lateral):
                layers_lateral.append(layer_to_get_lateral[0].id)
                x_position = layer.center_position[0] + layer.shape[0] / 2
                get_lateral_position_layers(layer_to_get_lateral[0], layers_lateral, x_position, y_position)
    elif len(layer.next_layers) == 1:
        layer_to_get_lateral = [e for e in layers if e.id == layer.next_layers[0].name]
        if len(layer_to_get_lateral) > 1:
            print("ERROR!!")
        if(layer_to_get_lateral[0].id not in layers_lateral):
            layers_lateral.append(layer_to_get_lateral[0].id)
            x_position = layer.center_position[0] + layer.shape[0] / 2
            get_lateral_position_layers(layer_to_get_lateral[0], layers_lateral, x_position, y_position)
    return


def draw_layer(layer, layers_drawn):
    glPushMatrix()

    # desenha o layer
    layer.draw()
    layers_drawn.append(layer.id)
    glPopMatrix()

    # desenha o layer seguinte ao atual
    n = len(layer.next_layers)/2
    if len(layer.next_layers) > 1:
        for index, next_layer in enumerate(layer.next_layers):
            # vai buscar o layer correspondente ao next_layer
            layer_to_draw = [e for e in layers if e.id == next_layer.name]
            if len(layer_to_draw) > 1:
                print("ERROR!!")

            # desenha o próximo layer
            if(layer_to_draw[0].id not in layers_drawn):
                draw_layer(layer_to_draw[0], layers_drawn)
    elif len(layer.next_layers) == 1:
        layer_to_draw = [e for e in layers if e.id == layer.next_layers[0].name]
        if len(layer_to_draw) > 1:
            print("ERROR!!")
        if(layer_to_draw[0].id not in layers_drawn):
            draw_layer(layer_to_draw[0], layers_drawn)


def renderScene():
    global camX, camY, camZ, w, h

    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)
    glLoadIdentity()
    gluLookAt(camX, camY, camZ,
              lookX, lookY, lookZ,
              0.0, 0.0, 1.0)

    dir = [1.0, 1.0, 1.0, 1.0]
    glLightfv(GL_LIGHT0, GL_AMBIENT, dir)

    # Draw layers
    layer = layers[0]
    layers_drawn = []
    draw_layer(layer, layers_drawn)

    # renderText()

    if mode:
        picking(0, 0)

    glutSwapBuffers()


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
        if (mode):
            index = 100 + (index+1) * 25
        color_code = (index+1) / 255.0

        color_layer = [color_code, color_code, color_code, 1.0]
        layer.draw_color(color_layer)
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
    elif key == b'm':
        mode = not mode
        print("Mode : ", mode)
    elif key == b'w':
        camX = camX + 5
        lookX = lookX + 5
    elif key == b's':
        camX = camX - 5
        lookX = lookX - 5
    elif key == b'd':
        camY = camY + 5
        lookY = lookY + 5
    elif key == b'a':
        camY = camY - 5
        lookY = lookY - 5
    elif key == b'e':
        camZ = camZ + 5
        lookZ = lookZ + 5
    elif key == b'q':
        camZ = camZ - 5
        lookZ = lookZ - 5
    glutPostRedisplay()


def processMouseButtons(button, state, xx, yy):
    global tracking, alpha, beta, r, startX, startY

    # print(xx, yy)
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
                print("Picked Layer number ", picked)
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

    glutPostRedisplay()
