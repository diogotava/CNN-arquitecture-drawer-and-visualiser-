from PyQt5.QtWidgets import *
from PyQt5.QtCore import *
from PyQt5.QtGui import *
from OpenGL.GL import *
from OpenGL.GLU import *
from Src.Layers.LayerDrawer import *
from Src.Utils.Model import *
from Src.Utils.Values import *
from Src.Utils.Utils import *
from Src.Utils.UtilsCamera import render_scene, change_size, process_mouse_buttons, process_mouse_motion, process_normal_keys
import math


class OpenGLWidget(QOpenGLWidget):
    def __init__(self, parent=None, layers=None):
        self.layers = layers
        self.parent = parent
        super().__init__(parent)
        self.timer = QTimer(self)
        self.timer.timeout.connect(self.update)
        self.timer.start(0)

    def initializeGL(self):
        global camX, camY, camZ, alpha, betha, r

        glEnable(GL_DEPTH_TEST)
        glEnable(GL_CULL_FACE)

        glEnable(GL_LIGHTING)
        ambient_light = [1., 1., 1., 1.0]
        glLightfv(GL_LIGHT1, GL_AMBIENT, ambient_light)
        glEnable(GL_LIGHT1)

        camX = r * math.sin(alpha * 3.14 / 180.0) * math.cos(beta * 3.14 / 180.0)
        camZ = r * math.cos(alpha * 3.14 / 180.0) * math.cos(beta * 3.14 / 180.0)
        camY = r * math.sin(beta * 3.14 / 180.0)

        glLoadIdentity()
        glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA)

        glEnable(GL_BLEND)

        glClearColor(1, 1, 1, 0.5)
        glClear(GL_COLOR_BUFFER_BIT)

    def paintGL(self):
        render_scene(self.layers)

    def resizeGL(self, w: int, h: int) -> None:
        change_size(w, h)

    def mousePressEvent(self, event):
        self.makeCurrent()
        process_mouse_buttons(self.layers, event.button(), True, event.x(), event.y(), self.parent)
        self.doneCurrent()

    def mouseReleaseEvent(self, event):
        process_mouse_buttons(self.layers, event.button(), False, event.x(), event.y(), self.parent)

    def mouseMoveEvent(self, event):
        process_mouse_motion(event.x(), event.y())
