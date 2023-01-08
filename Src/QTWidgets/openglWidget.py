from PyQt5.QtWidgets import *
from PyQt5.QtCore import *
from PyQt5.QtGui import *
from OpenGL.GL import *
from OpenGL.GLUT import *
from OpenGL.GLU import *
from Src.Layers.LayerDrawer import *
from Src.Utils.Model import *
from Src.Utils.Values import *
from Src.Utils.Utils import *
from Src.Utils.UtilsCamera import renderScene, changeSize, processMouseButtons, processMouseMotion, processNormalKeys
import math


class OpenGLWidget(QOpenGLWidget):
    def __init__(self, parent=None):
        self.parent = parent
        QOpenGLWidget.__init__(self, parent)
        self.timer = QTimer(self)
        self.timer.timeout.connect(self.update)
        self.timer.start(0)

    def initializeGL(self):
        global camX, camY, camZ, alpha, betha, r

        glEnable(GL_DEPTH_TEST)
        # glEnable(GL_CULL_FACE)

        glEnable(GL_LIGHTING)
        glEnable(GL_LIGHT0)

        camX = r * math.sin(alpha * 3.14 / 180.0) * math.cos(beta * 3.14 / 180.0)
        camZ = r * math.cos(alpha * 3.14 / 180.0) * math.cos(beta * 3.14 / 180.0)
        camY = r * math.sin(beta * 3.14 / 180.0)

        glLoadIdentity()
        glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA)

        glEnable(GL_BLEND)

        glClearColor(1, 1, 1, 0.5)
        glClear(GL_COLOR_BUFFER_BIT)

    def paintGL(self):
        renderScene()

    def resizeGL(self, w: int, h: int) -> None:
        changeSize(w, h)

    def mousePressEvent(self, event):
        self.makeCurrent()
        processMouseButtons(event.button(), True, event.x(), event.y(), self.parent)
        self.doneCurrent()

    def mouseReleaseEvent(self, event):
        processMouseButtons(event.button(), False, event.x(), event.y(), self.parent)

    def mouseMoveEvent(self, event):
        processMouseMotion(event.x(), event.y())
