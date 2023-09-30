layersNotToDraw = []
layersNotToConsider = layersNotToDraw + ['Activation', 'BatchNormalization']
activation_layers = ['ReLU', 'Softmax', 'LeakyReLU', 'PReLU', 'ELU', 'ThresholdedReLU']