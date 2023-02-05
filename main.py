from Src.QTWidgets.mainWindow import MainWindow
from PyQt5.QtWidgets import QApplication
import sys
from Src.Layers.LayerDrawer import *
from Src.Utils.Model import *
from Src.Utils.Values import *
from Src.Utils.Utils import *

model = get_model()
# model.summary()
layer_drawer = LayersDrawer()
index = 0
for layer_to_save in model.layers:
    layer = layer_drawer.create_layer(layer_to_save.__class__.__name__, layer_to_save)
    if layer is not None:
        layer.id = index
        layers.append(layer)
        index += 1

for layer in layers:
    get_next_layers(layer)
    get_prev_layers(layer)

get_lateral_position_layers(layers[0])
align_previous_layers(layers[0])

if __name__ == "__main__":
    app = QApplication(sys.argv)
    app.setStyle("fusion")
    w = MainWindow()
    w.show()
    sys.exit(app.exec_())
