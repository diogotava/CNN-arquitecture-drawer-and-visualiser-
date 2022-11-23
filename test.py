# from Src.DrawShapes import Cube
from OpenGL.GL import *
from OpenGL.GLU import *
from pygame.locals import *

from Src.Layers.LayerDrawer import *
from Src.Utils.Utils import *
from Src.Utils.MousePicker import *


def main():
    model = get_model()
    layers = []
    for i, layer_to_save in enumerate(model.layers):
        layers.append(layer_to_save)

    pygame.init()

    display = (1280, 720)
    # display = (1920, 1080)
    screen = pygame.display.set_mode(display,  DOUBLEBUF | OPENGL)

    display_center = [screen.get_size()[i] // 2 for i in range(2)]
    mouse_move = [0, 0]
    pygame.mouse.set_pos(display_center)

    glLoadIdentity()
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA)

    glEnable(GL_BLEND)

    glClearColor(1, 1, 1, 0.5)
    glClear(GL_COLOR_BUFFER_BIT)

    glMatrixMode(GL_PROJECTION)
    gluPerspective(45, (display[0]/display[1]), 0.1, 15000.0)

    glMatrixMode(GL_MODELVIEW)
    gluLookAt(0, -8, 0, 0, 0, 0, 0, 0, 1)
    viewMatrix = glGetFloatv(GL_MODELVIEW_MATRIX)
    glLoadIdentity()

    glEnable(GL_CULL_FACE)
    glEnable(GL_DEPTH_TEST)
    print(model.summary())

    paused = False
    run = True
    up_down_angle = 0.0
    while run:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                run = False
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE or event.key == pygame.K_RETURN:
                    run = False
                if event.key == pygame.K_PAUSE or event.key == pygame.K_p:
                    paused = not paused
                    pygame.mouse.set_pos(display_center)
            if not paused:
                if event.type == pygame.MOUSEMOTION:
                    mouse_move = [event.pos[i] - display_center[i] for i in range(2)]
                pygame.mouse.set_pos(display_center)

        if not paused:
            # get keys
            keypress = pygame.key.get_pressed()
            #mouseMove = pygame.mouse.get_rel()

            # init model view matrix
            glLoadIdentity()

            # apply the look up and down
            up_down_angle += mouse_move[1]*0.1
            glRotatef(up_down_angle, 1.0, 0.0, 0.0)

            # init the view matrix
            glPushMatrix()
            glLoadIdentity()

            # apply the movment
            if keypress[pygame.K_w]:
                glTranslatef(0, 0, 0.8)
            if keypress[pygame.K_s]:
                glTranslatef(0, 0, -0.8)
            if keypress[pygame.K_d]:
                glTranslatef(-0.8, 0, 0)
            if keypress[pygame.K_a]:
                glTranslatef(0.8, 0, 0)
            if keypress[pygame.K_LCTRL]:
                glTranslatef(0, 0.8, 0)
            if keypress[pygame.K_LSHIFT]:
                glTranslatef(0, -0.8, 0)

            # apply the left and right rotation
            glRotatef(mouse_move[0]*0.1, 0.0, 1.0, 0.0)

            # multiply the current matrix by the get the new view matrix and store the final vie matrix
            glMultMatrixf(viewMatrix)
            viewMatrix = glGetFloatv(GL_MODELVIEW_MATRIX)

            # apply view matrix
            glPopMatrix()
            glMultMatrixf(viewMatrix)

            #-------------------------------------------#
            glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)

            glPushMatrix()

            layer_drawer = LayersDrawer()
            for index, layer in enumerate(layers):

                layer_drawer.draw_layer(layer.__class__.__name__, layers, layer, index)

            glPopMatrix()

            pygame.display.flip()
            pygame.time.wait(10)


main()
