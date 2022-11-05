from OpenGL.GL import *

edges = ((0, 1), (0, 3), (0, 4),
         (2, 1), (2, 3), (2, 7),
         (6, 3), (6, 4), (6, 7),
         (5, 1), (5, 4), (5, 7)
         )


def polygon(dimensions_lower_x, dimensions_bigger_x, shift, color, min_z: int = 10, min_xy: int = 10, max_xy: int = 2000):
    value_x = min_xy
    value_y = 5
    value_z = min_z

    dimensions_bigger_x[1] = min(max(dimensions_bigger_x[1], value_y), max_xy)
    dimensions_bigger_x[2] = min(max(dimensions_bigger_x[2], value_z), max_xy)
    dimensions_lower_x[1] = min(max(dimensions_lower_x[1], value_y), max_xy)
    dimensions_lower_x[2] = min(max(dimensions_lower_x[2], value_z), max_xy)

    vertices = ((value_x / 2 + shift, -dimensions_bigger_x[1] / 2, -dimensions_bigger_x[2] / 2),
                (value_x / 2 + shift, dimensions_bigger_x[1] / 2, -dimensions_bigger_x[2] / 2),
                (-value_x / 2 + shift, dimensions_lower_x[1] / 2, -dimensions_lower_x[2] / 2),
                (-value_x / 2 + shift, -dimensions_lower_x[1] / 2, -dimensions_lower_x[2] / 2),
                (value_x / 2 + shift, -dimensions_bigger_x[1] / 2, dimensions_bigger_x[2] / 2),
                (value_x / 2 + shift, dimensions_bigger_x[1] / 2, dimensions_bigger_x[2] / 2),
                (-value_x / 2 + shift, -dimensions_lower_x[1] / 2, dimensions_lower_x[2] / 2),
                (-value_x / 2 + shift, dimensions_lower_x[1] / 2, dimensions_lower_x[2] / 2),
                )

    glColor4f(color[0], color[1], color[2], 0.7)
    glBegin(GL_QUADS)
    glVertex3f(vertices[1][0], vertices[1][1], vertices[1][2])
    glVertex3f(vertices[2][0], vertices[2][1], vertices[2][2])
    glVertex3f(vertices[7][0], vertices[7][1], vertices[7][2])
    glVertex3f(vertices[5][0], vertices[5][1], vertices[5][2])

    glVertex3f(vertices[4][0], vertices[4][1], vertices[4][2])
    glVertex3f(vertices[6][0], vertices[6][1], vertices[6][2])
    glVertex3f(vertices[3][0], vertices[3][1], vertices[3][2])
    glVertex3f(vertices[0][0], vertices[0][1], vertices[0][2])

    glVertex3f(vertices[5][0], vertices[5][1], vertices[5][2])
    glVertex3f(vertices[7][0], vertices[7][1], vertices[7][2])
    glVertex3f(vertices[6][0], vertices[6][1], vertices[6][2])
    glVertex3f(vertices[4][0], vertices[4][1], vertices[4][2])

    glVertex3f(vertices[0][0], vertices[0][1], vertices[0][2])
    glVertex3f(vertices[3][0], vertices[3][1], vertices[3][2])
    glVertex3f(vertices[2][0], vertices[2][1], vertices[2][2])
    glVertex3f(vertices[1][0], vertices[1][1], vertices[1][2])

    glVertex3f(vertices[0][0], vertices[0][1], vertices[0][2])
    glVertex3f(vertices[1][0], vertices[1][1], vertices[1][2])
    glVertex3f(vertices[5][0], vertices[5][1], vertices[5][2])
    glVertex3f(vertices[4][0], vertices[4][1], vertices[4][2])

    glVertex3f(vertices[6][0], vertices[6][1], vertices[6][2])
    glVertex3f(vertices[7][0], vertices[7][1], vertices[7][2])
    glVertex3f(vertices[2][0], vertices[2][1], vertices[2][2])
    glVertex3f(vertices[3][0], vertices[3][1], vertices[3][2])

    glEnd()

    vert = ((-1, 1, 1), (-1, 1, -1), (-1, -1, -1), (-1, -1, 1))
    face((dimensions_lower_x[0], dimensions_lower_x[1], value_x), vert, shift, color)

    vert = ((1, 1, -1), (1, 1, 1), (1, -1, 1), (1, -1, -1))
    face((dimensions_bigger_x[0], dimensions_bigger_x[1], value_x), vert, shift, color)

    glColor3f(0.0, 0.0, 0.0)
    glLineWidth(5)
    glBegin(GL_LINES)
    for edge in edges:
        for vertex in edge:
            glVertex3fv(vertices[vertex])
    glEnd()


def face(dimensions_face, vertices_points, shift, color):
    value_x = dimensions_face[2]
    value_y = dimensions_face[1]
    value_z = dimensions_face[0]

    vertices = (
        (vertices_points[0][0] * value_x / 2 + shift, vertices_points[0][1] * value_y / 2, vertices_points[0][2] * value_z / 2),
        (vertices_points[1][0] * value_x / 2 + shift, vertices_points[1][1] * value_y / 2, vertices_points[1][2] * value_z / 2),
        (vertices_points[2][0] * value_x / 2 + shift, vertices_points[2][1] * value_y / 2, vertices_points[2][2] * value_z / 2),
        (vertices_points[3][0] * value_x / 2 + shift, vertices_points[3][1] * value_y / 2, vertices_points[3][2] * value_z / 2)
    )

    glColor4f(color[0], color[1], color[2], 0.7)
    glBegin(GL_QUADS)
    glVertex3f(vertices[0][0], vertices[0][1], vertices[0][2])
    glVertex3f(vertices[1][0], vertices[1][1], vertices[1][2])
    glVertex3f(vertices[2][0], vertices[2][1], vertices[2][2])
    glVertex3f(vertices[3][0], vertices[3][1], vertices[3][2])

    glEnd()


def cube(dimensions_cube, shift, color, min_z: float = 10., min_xy: float = 10., max_z: int = 400,
         max_xy: int = 2000):
    value_x = min_z
    value_y = min_xy
    value_z = min_xy

    value_x = min(max(dimensions_cube[2], value_x), max_z)
    value_y = min(max(dimensions_cube[1], value_y), max_xy)
    value_z = min(max(dimensions_cube[0], value_z), max_xy)

    vertices = ((value_x / 2 + shift, -value_y / 2, -value_z / 2),
                (value_x / 2 + shift, value_y / 2, -value_z / 2),
                (-value_x / 2 + shift, value_y / 2, -value_z / 2),
                (-value_x / 2 + shift, -value_y / 2, -value_z / 2),
                (value_x / 2 + shift, -value_y / 2, value_z / 2),
                (value_x / 2 + shift, value_y / 2, value_z / 2),
                (-value_x / 2 + shift, -value_y / 2, value_z / 2),
                (-value_x / 2 + shift, value_y / 2, value_z / 2),
                )

    dims = [value_z, value_y, value_x]
    vert = ((1, 1, -1), (-1, 1, -1), (-1, 1, 1), (1, 1, 1))
    face(dims, vert, shift, color)

    vert = ((1, -1, 1), (-1, -1, 1), (-1, -1, -1), (1, -1, -1))
    face(dims, vert, shift, color)

    vert = ((1, 1, 1), (-1, 1, 1), (-1, -1, 1), (1, -1, 1))
    face(dims, vert, shift, color)

    vert = ((1, -1, -1), (-1, -1, -1), (-1, 1, -1), (1, 1, -1))
    face(dims, vert, shift, color)

    vert = ((-1, 1, 1), (-1, 1, -1), (-1, -1, -1), (-1, -1, 1))
    face(dims, vert, shift, color)

    vert = ((1, 1, -1), (1, 1, 1), (1, -1, 1), (1, -1, -1))
    face(dims, vert, shift, color)

    glColor3f(0.0, 0.0, 0.0)
    glBegin(GL_LINES)
    for edge in edges:
        for vertex in edge:
            glVertex3fv(vertices[vertex])
    glEnd()
