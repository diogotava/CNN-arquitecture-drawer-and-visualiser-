from pygame.locals import *

from OpenGL.GL import *
from OpenGL.GLU import *


def self_multiply(tensor_tuple: tuple):
    """

    :param tensor_tuple:
    :return:
    """
    tensor_list = list(tensor_tuple)
    if None in tensor_list:
        tensor_list.remove(None)
    if len(tensor_list) == 0:
        return 0
    s = tensor_list[0]
    for i in range(1, len(tensor_list)):
        s *= tensor_list[i]
    return s


def Cube(dimentions, shift, min_z: int = 20, min_xy: int = 20, max_z: int = 40,
         max_xy: int = 2000,
         scale_z: float = 0.1, scale_xy: float = 4,):
    x = min_xy
    y = min_xy
    z = min_z

    x = min(max(self_multiply(dimentions[2:]) * scale_z, x), max_z)
    y = min(max(dimentions[1] * scale_xy, y), max_xy)
    z = min(max(dimentions[0] * scale_xy, z), max_xy)

    verticies = (
        (x/2 + shift, -y/2, -z/2),
        (x/2 + shift, y/2, -z/2),
        (-x/2 + shift, y/2, -z/2),
        (-x/2 + shift, -y/2, -z/2),
        (x/2 + shift, -y/2, z/2),
        (x/2 + shift, y/2, z/2),
        (-x/2 + shift, -y/2, z/2),
        (-x/2 + shift, y/2, z/2),
    )
    edges = (
        (0, 1),
        (0, 3),
        (0, 4),
        (2, 1),
        (2, 3),
        (2, 7),
        (6, 3),
        (6, 4),
        (6, 7),
        (5, 1),
        (5, 4),
        (5, 7)
    )
    glBegin(GL_QUADS)

    glVertex3f(verticies[1][0], verticies[1][1], verticies[1][2])
    glVertex3f(verticies[2][0], verticies[2][1], verticies[2][2])
    glVertex3f(verticies[7][0], verticies[7][1], verticies[7][2])
    glVertex3f(verticies[5][0], verticies[5][1], verticies[5][2])

    glVertex3f(verticies[4][0], verticies[4][1], verticies[4][2])
    glVertex3f(verticies[6][0], verticies[6][1], verticies[6][2])
    glVertex3f(verticies[3][0], verticies[3][1], verticies[3][2])
    glVertex3f(verticies[0][0], verticies[0][1], verticies[0][2])

    glVertex3f(verticies[5][0], verticies[5][1], verticies[5][2])
    glVertex3f(verticies[7][0], verticies[7][1], verticies[7][2])
    glVertex3f(verticies[6][0], verticies[6][1], verticies[6][2])
    glVertex3f(verticies[4][0], verticies[4][1], verticies[4][2])

    glVertex3f(verticies[0][0], verticies[0][1], verticies[0][2])
    glVertex3f(verticies[3][0], verticies[3][1], verticies[3][2])
    glVertex3f(verticies[2][0], verticies[2][1], verticies[2][2])
    glVertex3f(verticies[1][0], verticies[1][1], verticies[1][2])

    glVertex3f(verticies[7][0], verticies[7][1], verticies[7][2])
    glVertex3f(verticies[2][0], verticies[2][1], verticies[2][2])
    glVertex3f(verticies[3][0], verticies[3][1], verticies[3][2])
    glVertex3f(verticies[6][0], verticies[6][1], verticies[6][2])

    glVertex3f(verticies[1][0], verticies[1][1], verticies[1][2])
    glVertex3f(verticies[5][0], verticies[5][1], verticies[5][2])
    glVertex3f(verticies[4][0], verticies[4][1], verticies[4][2])
    glVertex3f(verticies[0][0], verticies[0][1], verticies[0][2])

    glEnd()
    glColor3f(0.0, 0.0, 0.0)
    glBegin(GL_LINES)
    for edge in edges:
        for vertex in edge:
            glVertex3fv(verticies[vertex])
    glEnd()
