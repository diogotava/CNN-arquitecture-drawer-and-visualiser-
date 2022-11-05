# from Src.DrawShapes import Cube
from OpenGL.GL import *
from OpenGL.GLU import *
from pygame.locals import *

from Src.Layers import *
from Src.Utils import *


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

    glClearColor(1, 1, 1, 0.5)
    glClear(GL_COLOR_BUFFER_BIT)

    gluPerspective(45, (display[0]/display[1]), 0.1, 15000.0)

    glTranslatef(0, 0, -5)

    glRotatef(-20, 0, 1, 0)

    glEnable(GL_CULL_FACE)
    glEnable(GL_DEPTH_TEST)
    while True:
        x_camera, y_camera, z_camera = move_camera(x_camera, y_camera, z_camera)
        glTranslatef(x_camera, y_camera, z_camera)

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                quit()

        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)

        layer_drawer = LayersDrawer()
        for index, layer in enumerate(layers):

            layer_drawer.draw_layer(layer.__class__.__name__, layer, index)

        pygame.display.flip()
        pygame.time.wait(10)


main()
