import math

import PyQt5.QtCore as QtCore
from OpenGL.GLU import *
from PyQt5.Qt import Qt

from Src.Layers.LayerDrawer import *
from Src.Utils.Model import get_shapes
from Src.Utils.Values import *


def change_size(ww, hh):
    global w, h, near, far

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


def draw_layer(layer, layers, layers_drawn):
    glPushMatrix()

    # desenha o layer
    layer.draw()
    layers_drawn.append(layer.name)
    glPopMatrix()

    # desenha o layer seguinte ao atual
    for n_layer in layer.next_layers:
        next_layer = [e for e in layers if e.id == n_layer][0]
        # desenha o próximo layer
        if next_layer.name not in layers_drawn:
            draw_layer(next_layer, layers, layers_drawn)


def render_text(parent, layer=None):
    global selected_layer
    if layer is None:
        if selected_layer is not None:
            selected_layer.selected = False
        selected_layer = None
        text = f"<b>Nothing Selected!</b>"
    else:
        if selected_layer is not None:
            selected_layer.selected = False
        selected_layer = layer
        layer.selected = True
        input_shape = get_shapes(layer.original_model_layer, True, True)
        if len(input_shape) > 1:
            text = f"<b>Layer:</b> '{layer.name}'<br><b>Type: </b>{layer.__class__.__name__}<br><b>Input shape:</b>"
            for index, shape in enumerate(input_shape):
                if index > 0:
                    text = text + "&nbsp;" * 25 + f"({shape[0]: .2f} X {shape[1]: .2f} X {shape[2]: .2f})<br>"
                else:
                    text = text + f" ({shape[0]: .2f} X {shape[1]: .2f} X {shape[2]: .2f})<br>"

            text = text + f"<b>Output shape:</b> ({layer.shape[0]: .2f} X {layer.shape[1]: .2f} X {layer.shape[2]: .2f})"
        else:
            shape = input_shape[0]
            text = f"<b>Layer:</b> '{layer.name}'<br><b>Type: </b>{layer.__class__.__name__}<br><b>Input shape:</b> " \
                   f"({shape[0]: .2f} X {shape[1]: .2f} X {shape[2]: .2f})<br><b>Output shape:</b> ({layer.shape[0]: .2f} X " \
                   f"{layer.shape[1]: .2f} X {layer.shape[2]: .2f}) "
    parent.labelWidget.setText(text)


def render_scene(layers):
    global camX, camY, camZ, w, h

    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)
    glLoadIdentity()
    gluLookAt(camX, camY, camZ,
              lookX, lookY, lookZ,
              0.0, 0.0, 1.0)

    # Draw layers
    layer = layers[0]
    layers_drawn = []
    draw_layer(layer, layers, layers_drawn)


def picking(x, y, layers):
    global camX, camY, camZ, lookX, lookY, lookZ, mode

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

        color_code = (index + 1) / 255.0

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

def process_normal_keys(key):
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


def process_mouse_buttons(layers, button, state, xx, yy, parent):
    global tracking, alpha, beta, r, startX, startY

    # print(xx, yy)
    if state:
        startX = xx
        startY = yy
        if button == QtCore.Qt.LeftButton:
            tracking = 1
        elif button == QtCore.Qt.RightButton:
            tracking = 2
        else:  # Middle button
            tracking = 0
            index_layer_picked = picking(xx, yy, layers)
            if index_layer_picked and index_layer_picked != 255:
                layer_to_render_text = [e for e in layers if e.id == index_layer_picked - 1]
                render_text(parent, layer_to_render_text[0])
            else:
                render_text(parent)

    elif not state:
        if tracking == 1:
            alpha += (xx - startX)
            beta += (yy - startY)

        elif tracking == 2:
            r -= yy - startY
            if r < 3:
                r = 3.0

        tracking = 0


def process_mouse_motion(xx, yy):
    global camX, camY, camZ, lookX, lookY, lookZ, alpha, beta, r
    alpha_aux = 0
    beta_aux = 0
    r_aux = 0

    if not tracking:
        return

    delta_x = xx - startX
    delta_y = yy - startY

    if tracking == 1:
        alpha_aux = alpha + delta_x
        beta_aux = beta + delta_y

        if beta_aux > 85.0:
            beta_aux = 85.0
        elif beta_aux < -85.0:
            beta_aux = -85.0

        r_aux = r

    elif tracking == 2:

        alpha_aux = alpha
        beta_aux = beta
        r_aux = r - delta_y
        if r_aux < 3:
            r_aux = 3

    camX = lookX + r_aux * math.sin(alpha_aux * 3.14 / 180.0) * math.cos(beta_aux * 3.14 / 180.0)
    camY = lookY + r_aux * math.cos(alpha_aux * 3.14 / 180.0) * math.cos(beta_aux * 3.14 / 180.0)
    camZ = lookZ + r_aux * math.sin(beta_aux * 3.14 / 180.0)
