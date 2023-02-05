from PyQt5 import QtCore
from PyQt5.QtWidgets import *

from Src.QTWidgets.labelWidget import LabelWidget
from Src.QTWidgets.openglWidget import OpenGLWidget
from Src.Utils.UtilsCamera import process_normal_keys


class MainWindow(QMainWindow):
    def __init__(self, parent=None):
        QMainWindow.__init__(self, parent)

        layout = QHBoxLayout()

        self.openglwidget = OpenGLWidget(self)

        self.labelWidget = LabelWidget(f"<b>Nothing Selected!</b>")
        self.labelWidget.setIndent(QtCore.Qt.AlignTop)
        layout.addWidget(self.labelWidget)
        layout.addWidget(self.openglwidget)

        widget = QWidget()
        widget.setLayout(layout)
        self.setCentralWidget(widget)
        self.setWindowTitle("Test OpenGL")
        self.setGeometry(0, 0, 1000, 1000)

    def keyPressEvent(self, event):
        process_normal_keys(event.key())
