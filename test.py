# from Src.DrawShapes import Cube
import OpenGL
from OpenGL.GL import *
from OpenGL.GLUT import *
from OpenGL.GLU import *
from pygame.locals import *

from Src.Layers.LayerDrawer import *
from Src.Utils.Model import *
from Src.Utils.Values import *
from Src.Utils.UtilsCamera import get_lateral_position_layers, renderScene, changeSize, processMouseButtons, processMouseMotion, processNormalKeys
import math

model = get_model()
model.summary()
layer_drawer = LayersDrawer()

for layer_to_save in model.layers:
    layer = layer_drawer.create_layer(layer_to_save.__class__.__name__, layer_to_save)
    if layer != None:
        layers.append(layer)

get_lateral_position_layers(layers[0])


def init():
    global camX, camY, camZ, alpha, betha, r
    glEnable(GL_DEPTH_TEST)
    # glEnable(GL_CULL_FACE)

    glEnable(GL_LIGHTING)
    glEnable(GL_LIGHT0)

    camX = r * math.sin(alpha * 3.14 / 180.0) * math.cos(beta * 3.14 / 180.0)
    camZ = r * math.cos(alpha * 3.14 / 180.0) * math.cos(beta * 3.14 / 180.0)
    camY = r * math.sin(beta * 3.14 / 180.0)


def main():
    global w, h
    print("USe left mouse button to explore the scene, the right button to zoom, and the middle button for picking\n")
    glutInit()
    glutInitDisplayMode(GLUT_DEPTH | GLUT_DOUBLE | GLUT_RGBA)
    glutInitWindowPosition(0, 0)
    glutInitWindowSize(h, w)
    glutCreateWindow("CNN Arquitecture Visualiser")
    glLoadIdentity()
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA)

    glEnable(GL_BLEND)

    glClearColor(1, 1, 1, 0.5)
    glClear(GL_COLOR_BUFFER_BIT)

    # registo de fun��es
    glutDisplayFunc(renderScene)
    glutReshapeFunc(changeSize)
    glutIdleFunc(renderScene)

    # registo da funcoes do teclado e rato
    glutKeyboardFunc(processNormalKeys)
    glutMouseFunc(processMouseButtons)
    glutMotionFunc(processMouseMotion)

    init()

    glutMainLoop()

    return 0


if __name__ == "__main__":
    main()
