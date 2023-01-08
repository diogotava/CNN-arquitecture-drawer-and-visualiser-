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


class LabelWidget(QLabel):
    def __init__(self, text):
        QLabel.__init__(self, text)
        self.setMaximumWidth(300)

    def changeText(self, text):
        self.setText(text)
