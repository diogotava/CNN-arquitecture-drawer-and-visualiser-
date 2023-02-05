from PyQt5.QtWidgets import *


class LabelWidget(QLabel):
    def __init__(self, text):
        QLabel.__init__(self, text)
        self.setMaximumWidth(300)

    def change_text(self, text):
        self.setText(text)
