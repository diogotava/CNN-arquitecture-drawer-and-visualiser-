from tensorflow.python.keras.models import Sequential
from PIL import ImageFont

from collections import defaultdict
from tensorflow.python.keras.layers import Dense, Flatten, Conv2D, Dropout, MaxPooling2D, InputLayer, ZeroPadding2D
import pygame
from Src.DrawShapes import Cube
from tensorflow.keras.models import load_model
from pygame.locals import *

from OpenGL.GL import *
from OpenGL.GLU import *


def get_model():
    model = load_model("model_GTSRB_train1_val1_02//cp-0057.ckpt")

    return model


# create VGG16
# image_size = 224
# model = Sequential()
# model.add(InputLayer(input_shape=(image_size, image_size, 3)))

# model.add(ZeroPadding2D((1, 1)))
# model.add(Conv2D(64, activation='relu', kernel_size=(3, 3)))
# model.add(ZeroPadding2D((1, 1)))
# model.add(Conv2D(64, activation='relu', kernel_size=(3, 3)))

# model.add(MaxPooling2D((2, 2), strides=(2, 2)))
# model.add(ZeroPadding2D((1, 1)))
# model.add(Conv2D(128, activation='relu', kernel_size=(3, 3)))
# model.add(ZeroPadding2D((1, 1)))
# model.add(Conv2D(128, activation='relu', kernel_size=(3, 3)))

# model.add(MaxPooling2D((2, 2), strides=(2, 2)))
# model.add(ZeroPadding2D((1, 1)))
# model.add(Conv2D(256, activation='relu', kernel_size=(3, 3)))
# model.add(ZeroPadding2D((1, 1)))
# model.add(Conv2D(256, activation='relu', kernel_size=(3, 3)))
# model.add(ZeroPadding2D((1, 1)))
# model.add(Conv2D(256, activation='relu', kernel_size=(3, 3)))

# model.add(MaxPooling2D((2, 2), strides=(2, 2)))
# model.add(ZeroPadding2D((1, 1)))
# model.add(Conv2D(512, activation='relu', kernel_size=(3, 3)))
# model.add(ZeroPadding2D((1, 1)))
# model.add(Conv2D(512, activation='relu', kernel_size=(3, 3)))
# model.add(ZeroPadding2D((1, 1)))
# model.add(Conv2D(512, activation='relu', kernel_size=(3, 3)))

# model.add(MaxPooling2D((2, 2), strides=(2, 2)))
# model.add(ZeroPadding2D((1, 1)))
# model.add(Conv2D(512, activation='relu', kernel_size=(3, 3)))
# model.add(ZeroPadding2D((1, 1)))
# model.add(Conv2D(512, activation='relu', kernel_size=(3, 3)))
# model.add(ZeroPadding2D((1, 1)))
# model.add(Conv2D(512, activation='relu', kernel_size=(3, 3)))
# model.add(MaxPooling2D())

# model.add(Flatten())

# model.add(Dense(4096, activation='relu'))
# model.add(Dropout(0.5))
# model.add(Dense(4096, activation='relu'))
# model.add(Dropout(0.5))
# model.add(Dense(1000, activation='softmax'))

# model = get_model()
# tf.keras.utils.plot_model(
#     model,
#     to_file="model.png",
#     show_shapes=True,
#     show_dtype=True,
#     show_layer_names=True,
#     rankdir="TB",
#     expand_nested=True,
#     dpi=96,
# )


def main():
    model = get_model()
    one_dim_orientation = 'z'
    layersNames = []
    layerDims = []
    for i, layer in enumerate(model.layers):
        if i < 4:
            layersNames.append(layer.name)
            if isinstance(layer.output_shape, tuple):
                shape = layer.output_shape
            elif isinstance(layer.output_shape, list) and len(
                    layer.output_shape) == 1:  # drop dimension for non seq. models
                shape = layer.output_shape[0]
            else:
                raise RuntimeError(f"not supported tensor shape {layer.output_shape}")

            shape = shape[1:]
            if len(shape) == 1:
                if one_dim_orientation in ['x', 'y', 'z']:
                    shape = (1, ) * "xyz".index(one_dim_orientation) + shape
                else:
                    raise ValueError(f"unsupported orientation: {one_dim_orientation}")

            shape = shape + (1, ) * (4 - len(shape))
            layerDims.append(shape)
    pygame.init()
    display = (1920, 1080)
    pygame.display.set_mode(display, DOUBLEBUF | OPENGL)

    glClearColor(1, 1, 1, 0.5)
    glClear(GL_COLOR_BUFFER_BIT)

    gluPerspective(45, (display[0]/display[1]), 0.1, 15000.0)

    firstCubeDims = [20, 10, 10]
    secondCubeDims = [10, 10, 5]
    thirdCubeDims = [10, 5, 5]
    xPosition = 0
    for index in range(len(layerDims)):
        if(index != 0):
            xPosition = xPosition + (layerDims[index][2]/2)+10

        xPosition = xPosition + (layerDims[index][2]/2)

    xPosition = xPosition/2

    gluLookAt(xPosition + 10, 50.0, 500.0, xPosition, 0.0, 0.0, 0.0, 1.0, 0.0)

    while True:
        mXPosition = 0
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                quit()

        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)
        for index in range(len(layerDims)):
            if(index != 0):
                mXPosition = mXPosition + (layerDims[index][2]/2)+10

            if index % 2:
                glColor3f(0.0, 1.0, 0.0)
            else:
                glColor3f(0.0, 0.0, 1.0)
            Cube(layerDims[index], mXPosition)

            mXPosition = mXPosition + (layerDims[index][2]/2)

        # glColor3f(0.0, 1.0, 0.0)
        # Cube(firstCubeDims, 0)
        # glColor3f(1.0, 0.0, 0.0)
        # Cube(secondCubeDims, (firstCubeDims[0]/2) + secondCubeDims[0]/2 + 2)
        # glColor3f(0.0, 0.0, 1.0)
        # Cube(thirdCubeDims, (firstCubeDims[0]/2) + secondCubeDims[0] + thirdCubeDims[0]/2 + 4)
        pygame.display.flip()
        pygame.time.wait(10)


main()
