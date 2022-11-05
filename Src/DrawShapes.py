from pygame.locals import *

from OpenGL.GL import *
from OpenGL.GLU import *


def self_multiply(tensor_tuple: tuple):
    tensor_list = list(tensor_tuple)
    if None in tensor_list:
        tensor_list.remove(None)
    if len(tensor_list) == 0:
        return 0
    s = tensor_list[0]
    for i in range(1, len(tensor_list)):
        s *= tensor_list[i]
    return s


def Pollygon(dimentionsLowerX, dimentionsBiggerX, shift, color, min_z: int = 10, min_xy: int = 10, max_z: int = 400,
             max_xy: int = 2000, scale_z: float = 0.1, scale_xy: float = 4):
    x = min_xy
    y = 5
    z = min_z

    dimentionsBiggerX[1] = min(max(dimentionsBiggerX[1], y), max_xy)
    dimentionsBiggerX[2] = min(max(dimentionsBiggerX[2], z), max_xy)
    dimentionsLowerX[1] = min(max(dimentionsLowerX[1], y), max_xy)
    dimentionsLowerX[2] = min(max(dimentionsLowerX[2], z), max_xy)

    verticies = ((x/2 + shift, -dimentionsBiggerX[1]/2, -dimentionsBiggerX[2]/2),
                 (x/2 + shift, dimentionsBiggerX[1]/2, -dimentionsBiggerX[2]/2),
                 (-x/2 + shift, dimentionsLowerX[1]/2, -dimentionsLowerX[2]/2),
                 (-x/2 + shift, -dimentionsLowerX[1]/2, -dimentionsLowerX[2]/2),
                 (x/2 + shift, -dimentionsBiggerX[1]/2, dimentionsBiggerX[2]/2),
                 (x/2 + shift, dimentionsBiggerX[1]/2, dimentionsBiggerX[2]/2),
                 (-x/2 + shift, -dimentionsLowerX[1]/2, dimentionsLowerX[2]/2),
                 (-x/2 + shift, dimentionsLowerX[1]/2, dimentionsLowerX[2]/2),
                 )
    edges = ((0, 1), (0, 3), (0, 4),
             (2, 1), (2, 3), (2, 7),
             (6, 3), (6, 4), (6, 7),
             (5, 1), (5, 4), (5, 7)
             )

    glColor4f(color[0], color[1], color[2], 0.7)
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

    glEnd()

    vert = ((-1, 1, 1), (-1, 1, -1), (-1, -1, -1), (-1, -1, 1))
    Face((dimentionsLowerX[0], dimentionsLowerX[1], x), vert, shift, color)

    vert = ((1, 1, -1), (1, 1, 1), (1, -1, 1), (1, -1, -1))
    Face((dimentionsBiggerX[0], dimentionsBiggerX[1], x), vert, shift, color)

    glColor3f(0.0, 0.0, 0.0)
    glBegin(GL_LINES)
    for edge in edges:
        for vertex in edge:
            glVertex3fv(verticies[vertex])
    glEnd()


def Face(dimentions, verticePoints, shift, color, min_z: int = 20, min_xy: int = 20, max_z: int = 400,
         max_xy: int = 2000, scale_z: float = 0.1, scale_xy: float = 4):
    x = dimentions[2]
    y = dimentions[1]
    z = dimentions[0]

    verticies = (
        (verticePoints[0][0] * x/2 + shift, verticePoints[0][1] * y/2, verticePoints[0][2] * z/2),
        (verticePoints[1][0] * x/2 + shift, verticePoints[1][1] * y/2, verticePoints[1][2] * z/2),
        (verticePoints[2][0] * x/2 + shift, verticePoints[2][1] * y/2, verticePoints[2][2] * z/2),
        (verticePoints[3][0] * x/2 + shift, verticePoints[3][1] * y/2, verticePoints[3][2] * z/2)
    )

    glColor4f(color[0], color[1], color[2], 0.7)
    glBegin(GL_QUADS)
    glVertex3f(verticies[0][0], verticies[0][1], verticies[0][2])
    glVertex3f(verticies[1][0], verticies[1][1], verticies[1][2])
    glVertex3f(verticies[2][0], verticies[2][1], verticies[2][2])
    glVertex3f(verticies[3][0], verticies[3][1], verticies[3][2])

    glEnd()


def Cube(dimentions, shift, color, min_z: float = 20., min_xy: float = 20., max_z: int = 400,
         max_xy: int = 2000, scale_z: float = 0.1, scale_xy: float = 4):
    x = min_xy
    y = min_xy
    z = min_z

    x = dimentions[2]
    y = dimentions[1]
    z = dimentions[0]

    # x = min(max(dimentions[2] * scale_z, x), max_z)
    # y = min(max(dimentions[1] * scale_xy, y), max_xy)
    # z = min(max(dimentions[0] * scale_xy, z), max_xy)
    verticies = ((x/2 + shift, -y/2, -z/2),
                 (x/2 + shift, y/2, -z/2),
                 (-x/2 + shift, y/2, -z/2),
                 (-x/2 + shift, -y/2, -z/2),
                 (x/2 + shift, -y/2, z/2),
                 (x/2 + shift, y/2, z/2),
                 (-x/2 + shift, -y/2, z/2),
                 (-x/2 + shift, y/2, z/2),
                 )
    edges = ((0, 1), (0, 3), (0, 4),
             (2, 1), (2, 3), (2, 7),
             (6, 3), (6, 4), (6, 7),
             (5, 1), (5, 4), (5, 7)
             )

    vert = ((1, 1, -1), (-1, 1, -1), (-1, 1, 1), (1, 1, 1))
    Face(dimentions, vert, shift, color)

    vert = ((1, -1, 1), (-1, -1, 1), (-1, -1, -1), (1, -1, -1))
    Face(dimentions, vert, shift, color)

    vert = ((1, 1, 1), (-1, 1, 1), (-1, -1, 1), (1, -1, 1))
    Face(dimentions, vert, shift, color)

    vert = ((1, -1, -1), (-1, -1, -1), (-1, 1, -1), (1, 1, -1))
    Face(dimentions, vert, shift, color)

    vert = ((-1, 1, 1), (-1, 1, -1), (-1, -1, -1), (-1, -1, 1))
    Face(dimentions, vert, shift, color)

    vert = ((1, 1, -1), (1, 1, 1), (1, -1, 1), (1, -1, -1))
    Face(dimentions, vert, shift, color)

    glColor3f(0.0, 0.0, 0.0)
    glBegin(GL_LINES)
    for edge in edges:
        for vertex in edge:
            glVertex3fv(verticies[vertex])
    glEnd()
