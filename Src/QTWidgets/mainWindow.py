from PyQt5.QtWidgets import *
from PyQt5 import QtCore
from PyQt5.QtGui import *
from Src.QTWidgets.openglWidget import OpenGLWidget
from Src.QTWidgets.labelWidget import LabelWidget
from Src.Utils.UtilsCamera import processNormalKeys


class MainWindow(QMainWindow):
    def __init__(self, parent=None):
        QMainWindow.__init__(self, parent)
        layout = QHBoxLayout()

        self.openglwidget = OpenGLWidget(self)
        # fmt = QSurfaceFormat()
        # fmt.setSamples(8)
        # self.openglwidget.setFormat(fmt)
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
        processNormalKeys(event.key())
