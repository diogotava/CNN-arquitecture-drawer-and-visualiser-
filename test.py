
import pygame
# from Src.DrawShapes import Cube
from Src.Layers import *
from Src.Utils import *

from pygame.locals import *

from OpenGL.GL import *
from OpenGL.GLU import *


def main():
    model = get_model()
    one_dim_orientation = 'z'
    layers = []
    for i, layer in enumerate(model.layers):
        layers.append(layer)
        print(layer.name, type(layer), layer.output_shape)

    pygame.init()
    x_camera = 0
    y_camera = 0
    z_camera = 0

    # display = (1280, 720)
    display = (1920, 1080)
    pygame.display.set_mode(display, DOUBLEBUF | OPENGL)

    spaceBetweenLayers = 5

    glClearColor(1, 1, 1, 0.5)
    glClear(GL_COLOR_BUFFER_BIT)

    gluPerspective(45, (display[0]/display[1]), 0.1, 15000.0)

    glTranslatef(0, 0, -5)

    glRotatef(0, 0, 0, 0)

    glEnable(GL_CULL_FACE)
    glEnable(GL_DEPTH_TEST)
    while True:
        x_camera, y_camera, z_camera = moveCamera(x_camera, y_camera, z_camera)
        glTranslatef(x_camera, y_camera, z_camera)

        mXPosition = 0
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                quit()

        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)

        layerDrawer = layersDrawer()
        for index in range(len(layers)):

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

            if (index != 0):
                mXPosition = mXPosition + (shape[2]/2) + spaceBetweenLayers

            layerDrawer.drawLayer(layers[index].__class__.__name__, layers[index], shape, mXPosition)

            mXPosition = mXPosition + (shape[2]/2)

        pygame.display.flip()
        pygame.time.wait(10)


main()
