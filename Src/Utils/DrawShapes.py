from OpenGL.GL import *

edges = ((0, 1), (0, 3), (0, 4),
         (2, 1), (2, 3), (2, 7),
         (6, 3), (6, 4), (6, 7),
         (5, 1), (5, 4), (5, 7)
         )


# def polygon(dimensions_lower_x, dimensions_bigger_x, shift, value_x):
#     x = value_x
#     y = 0
#     z = 1

#     x_vert = 0
#     y_vert = 0
#     z_vert = 0

#     vertices = ((x / 2 + shift, -dimensions_bigger_x[y] / 2, -dimensions_bigger_x[z] / 2),
#                 (x / 2 + shift, dimensions_bigger_x[y] / 2, -dimensions_bigger_x[z] / 2),
#                 (-x / 2 + shift, dimensions_lower_x[y] / 2, -dimensions_lower_x[z] / 2),
#                 (-x / 2 + shift, -dimensions_lower_x[y] / 2, -dimensions_lower_x[z] / 2),
#                 (x / 2 + shift, -dimensions_bigger_x[y] / 2, dimensions_bigger_x[z] / 2),
#                 (x / 2 + shift, dimensions_bigger_x[y] / 2, dimensions_bigger_x[z] / 2),
#                 (-x / 2 + shift, -dimensions_lower_x[y] / 2, dimensions_lower_x[z] / 2),
#                 (-x / 2 + shift, dimensions_lower_x[y] / 2, dimensions_lower_x[z] / 2),
#                 )

#     glBegin(GL_QUADS)
#     glVertex3f(vertices[1][x_vert], vertices[1][y_vert], vertices[1][z_vert])
#     glVertex3f(vertices[2][x_vert], vertices[2][y_vert], vertices[2][z_vert])
#     glVertex3f(vertices[7][x_vert], vertices[7][y_vert], vertices[7][z_vert])
#     glVertex3f(vertices[5][x_vert], vertices[5][y_vert], vertices[5][z_vert])

#     glVertex3f(vertices[4][x_vert], vertices[4][y_vert], vertices[4][z_vert])
#     glVertex3f(vertices[6][x_vert], vertices[6][y_vert], vertices[6][z_vert])
#     glVertex3f(vertices[3][x_vert], vertices[3][y_vert], vertices[3][z_vert])
#     glVertex3f(vertices[0][x_vert], vertices[0][y_vert], vertices[0][z_vert])

#     glVertex3f(vertices[5][x_vert], vertices[5][y_vert], vertices[5][z_vert])
#     glVertex3f(vertices[7][x_vert], vertices[7][y_vert], vertices[7][z_vert])
#     glVertex3f(vertices[6][x_vert], vertices[6][y_vert], vertices[6][z_vert])
#     glVertex3f(vertices[4][x_vert], vertices[4][y_vert], vertices[4][z_vert])

#     glVertex3f(vertices[0][x_vert], vertices[0][y_vert], vertices[0][z_vert])
#     glVertex3f(vertices[3][x_vert], vertices[3][y_vert], vertices[3][z_vert])
#     glVertex3f(vertices[2][x_vert], vertices[2][y_vert], vertices[2][z_vert])
#     glVertex3f(vertices[1][x_vert], vertices[1][y_vert], vertices[1][z_vert])

#     glVertex3f(vertices[0][x_vert], vertices[0][y_vert], vertices[0][z_vert])
#     glVertex3f(vertices[1][x_vert], vertices[1][y_vert], vertices[1][z_vert])
#     glVertex3f(vertices[5][x_vert], vertices[5][y_vert], vertices[5][z_vert])
#     glVertex3f(vertices[4][x_vert], vertices[4][y_vert], vertices[4][z_vert])

#     glVertex3f(vertices[6][x_vert], vertices[6][y_vert], vertices[6][z_vert])
#     glVertex3f(vertices[7][x_vert], vertices[7][y_vert], vertices[7][z_vert])
#     glVertex3f(vertices[2][x_vert], vertices[2][y_vert], vertices[2][z_vert])
#     glVertex3f(vertices[3][x_vert], vertices[3][y_vert], vertices[3][z_vert])

#     glEnd()

#     glMaterialfv(GL_FRONT_AND_BACK, GL_AMBIENT_AND_DIFFUSE, [0.0, 0.0, 0.0, 1.0])
#     glLineWidth(5)
#     glBegin(GL_LINES)
#     for edge in edges:
#         for vertex in edge:
#             glVertex3fv(vertices[vertex])
#     glEnd()

#     return value_x / 2 + shift


def cube(dimensions_cube, shift):
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
