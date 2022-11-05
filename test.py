
import pygame
# from Src.DrawShapes import Cube
from Src.Layers import *
from Src.Utils import *

from pygame.locals import *

from OpenGL.GL import *
from OpenGL.GLU import *


def main():
    model = get_model()
    layers = []
    for i, layer_to_save in enumerate(model.layers):
        layers.append(layer_to_save)

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
        for index, layer in enumerate(layers):

            shape = getShape(layer)
            if(layer.__class__.__name__ == "Dense"):
                inputShape = getShape(layer, input=True)
                if (index != 0):
                    s = 10
                    mXPosition = mXPosition + (s/2) + spaceBetweenLayers
            else:
                if (index != 0):
                    mXPosition = mXPosition + (shape[2]/2) + spaceBetweenLayers

            layerDrawer.drawLayer(layer.__class__.__name__, layer, shape, mXPosition)

            if(layer.__class__.__name__ == "Dense"):
                s = abs(shape[2] - inputShape[2])
                mXPosition = mXPosition + (s/2)
            else:
                mXPosition = mXPosition + (shape[2]/2)

        pygame.display.flip()
        pygame.time.wait(10)


main()
