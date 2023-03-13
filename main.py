from Src.QTWidgets.mainWindow import MainWindow
from PyQt5.QtWidgets import QApplication
import sys
from tensorflow.keras.applications.inception_v3 import InceptionV3
from Src.Layers.LayerDrawer import *
from Src.Utils.Model import *
from Src.Utils.Values import *
from Src.Utils.Utils import *
layers = []

model = get_model("model_GTSRB_train1_val1_02//cp-0057.ckpt")
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
    get_next_layers(layer, layers)
    get_prev_layers(layer, layers)

get_lateral_position_layers(layers[0], layers)
align_previous_layers(layers[0], layers)

if __name__ == "__main__":
    # app = QApplication(sys.argv)
    # app.setStyle("fusion")
    # w = MainWindow(None, layers)
    # w.show()
    # sys.exit(app.exec_())
    model = InceptionV3()
    model.save('inception_v3.h5')
