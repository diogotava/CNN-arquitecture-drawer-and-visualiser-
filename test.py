# from Src.DrawShapes import Cube
import OpenGL
from OpenGL.GL import *
from OpenGL.GLUT import *
from OpenGL.GLU import *
from pygame.locals import *

from Src.Layers.LayerDrawer import *
from Src.Utils.Model import *
from Src.Utils.UtilsCamera import *
import math

model = get_model()
layers = []
for i, layer_to_save in enumerate(model.layers):
    layers.append(layer_to_save)


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
    glutCreateWindow("Picking SnowMen from CG @ DI")
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
