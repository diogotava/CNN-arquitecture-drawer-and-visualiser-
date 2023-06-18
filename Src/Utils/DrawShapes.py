from OpenGL.GL import *

edges = ((0, 1), (0, 3), (0, 4),
         (2, 1), (2, 3), (2, 7),
         (6, 3), (6, 4), (6, 7),
         (5, 1), (5, 4), (5, 7)
         )


def cube(dimensions_cube, shift, color, code=False):
    if code:
        glColor3f(color[0], color[1], color[2])
    else:
        glMaterialfv(GL_FRONT_AND_BACK, GL_AMBIENT_AND_DIFFUSE, color)

    x = 0
    y = 1
    z = 2

    value_x = dimensions_cube[x] / 2
    value_y = dimensions_cube[y] / 2
    value_z = dimensions_cube[z] / 2

    vertices = ((value_x + shift[x], -value_y + shift[y], -value_z + shift[z]),
                (value_x + shift[x], value_y + shift[y], -value_z + shift[z]),
                (-value_x + shift[x], value_y + shift[y], -value_z + shift[z]),
                (-value_x + shift[x], -value_y + shift[y], -value_z + shift[z]),
                (value_x + shift[x], -value_y + shift[y], value_z + shift[z]),
                (value_x + shift[x], value_y + shift[y], value_z + shift[z]),
                (-value_x + shift[x], -value_y + shift[y], value_z + shift[z]),
                (-value_x + shift[x], value_y + shift[y], value_z + shift[z]),
                )

    glBegin(GL_QUADS)
    glVertex3f(vertices[1][x], vertices[1][y], vertices[1][z])
    glVertex3f(vertices[2][x], vertices[2][y], vertices[2][z])
    glVertex3f(vertices[7][x], vertices[7][y], vertices[7][z])
    glVertex3f(vertices[5][x], vertices[5][y], vertices[5][z])

    glVertex3f(vertices[4][x], vertices[4][y], vertices[4][z])
    glVertex3f(vertices[6][x], vertices[6][y], vertices[6][z])
    glVertex3f(vertices[3][x], vertices[3][y], vertices[3][z])
    glVertex3f(vertices[0][x], vertices[0][y], vertices[0][z])

    glVertex3f(vertices[5][x], vertices[5][y], vertices[5][z])
    glVertex3f(vertices[7][x], vertices[7][y], vertices[7][z])
    glVertex3f(vertices[6][x], vertices[6][y], vertices[6][z])
    glVertex3f(vertices[4][x], vertices[4][y], vertices[4][z])

    glVertex3f(vertices[0][x], vertices[0][y], vertices[0][z])
    glVertex3f(vertices[3][x], vertices[3][y], vertices[3][z])
    glVertex3f(vertices[2][x], vertices[2][y], vertices[2][z])
    glVertex3f(vertices[1][x], vertices[1][y], vertices[1][z])

    glVertex3f(vertices[0][x], vertices[0][y], vertices[0][z])
    glVertex3f(vertices[1][x], vertices[1][y], vertices[1][z])
    glVertex3f(vertices[5][x], vertices[5][y], vertices[5][z])
    glVertex3f(vertices[4][x], vertices[4][y], vertices[4][z])

    glVertex3f(vertices[6][x], vertices[6][y], vertices[6][z])
    glVertex3f(vertices[7][x], vertices[7][y], vertices[7][z])
    glVertex3f(vertices[2][x], vertices[2][y], vertices[2][z])
    glVertex3f(vertices[3][x], vertices[3][y], vertices[3][z])

    glEnd()

    glMaterialfv(GL_FRONT_AND_BACK, GL_AMBIENT_AND_DIFFUSE, [0.0, 0.0, 0.0, 1.0])
    glLineWidth(2)
    glBegin(GL_LINES)
    for edge in edges:
        for vertex in edge:
            glVertex3fv(vertices[vertex])
    glEnd()
