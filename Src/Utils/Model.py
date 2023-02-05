
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.layers import Dense, Dropout, Activation, Flatten, Conv2D
from tensorflow.keras.layers import LeakyReLU
from tensorflow.keras.models import Sequential
from tensorflow.keras.optimizers import Adam
from OpenGL.GL import *
from OpenGL.GLU import *

min_x = 5
min_zy = 5
max_zy = 200
max_x = 400


def get_shapes(layer, input_shape=False, correct_shape=False):
    if input_shape:
        layer_shape = layer.input_shape
    else:
        layer_shape = layer.output_shape

    if isinstance(layer_shape, tuple):
        shape = list(layer_shape)

        shape = shape[1:]
        if not correct_shape:
            shape_return = [get_shape(shape)]
        else:
            shape_return = [shape]
    elif isinstance(layer_shape, list) and len(layer_shape) == 1:  # drop dimension for non seq. models
        shape = layer_shape[0]
        if isinstance(shape, tuple):
            shape = list(shape)

        shape = shape[1:]
        if not correct_shape:
            shape_return = [get_shape(shape)]
        else:
            shape_return = [shape]
    else:
        shape_return = []
        for shape in layer_shape:
            if isinstance(shape, tuple):
                shape = list(shape)
            shape = shape[1:]
            if not correct_shape:
                shape = get_shape(shape)
            shape_return.append(shape)

    return shape_return


def get_shape(shape):
    one_dim_orientation = 'z'

    if len(shape) == 1:
        if one_dim_orientation in ['x', 'y', 'z']:
            shape = list((1, ) * "xyz".index(one_dim_orientation) + tuple(shape))
        else:
            raise ValueError(f"unsupported orientation: {one_dim_orientation}")

    shape[2] = shape[2] / np.log(shape[2])

    shape_return = shape.copy()
    shape_return[0] = min(max(shape[2], min_x), max_x)
    shape_return[1] = min(max(shape[1], min_zy), max_zy)
    shape_return[2] = min(max(shape[0], min_zy), max_zy)
    return shape_return


def get_model():
    model = load_model("model_GTSRB_train1_val1_02//cp-0057.ckpt")

    # model = tf.keras.applications.VGG16(
    #     include_top=True,
    #     weights="imagenet",
    #     input_tensor=None,
    #     input_shape=None,
    #     pooling=None,
    #     classes=1000,
    #     classifier_activation="softmax",
    # )

    # model.summary()
    # model, _ = create_model(10, 28, 3)
    return model


def create_model(class_count, img_size, channels):

    model_logits = Sequential()

    model_logits.add(Conv2D(128, (5, 5), input_shape=(img_size, img_size, channels), name='layer_conv1'))
    # model_logits.add(LeakyReLU(alpha=0.01))
    # model_logits.add(BatchNormalization())
    # model_logits.add(Dropout(0.5))

    # model_logits.add(Conv2D(196, (2, 2), name='layer_conv2'))
    # model_logits.add(LeakyReLU(alpha=0.01))
    # model_logits.add(Conv2D(196, (2, 2), name='layer_conv3'))
    # model_logits.add(LeakyReLU(alpha=0.01))
    # model_logits.add(Conv2D(196, (5, 5), name='layer_conv4'))
    # model_logits.add(LeakyReLU(alpha=0.01))
    # model_logits.add(MaxPooling2D(pool_size=(2, 2)))
    # model_logits.add(BatchNormalization())
    # model_logits.add(Dropout(0.5))

    # model_logits.add(Conv2D(256, (2, 2), name='layer_conv5'))
    # model_logits.add(LeakyReLU(alpha=0.01))
    # model_logits.add(Conv2D(256, (2, 2), name='layer_conv6'))
    # model_logits.add(LeakyReLU(alpha=0.01))
    # model_logits.add(Conv2D(256, (2, 2), name='layer_conv7'))
    # model_logits.add(LeakyReLU(alpha=0.01))
    # model_logits.add(MaxPooling2D(pool_size=(2, 2)))
    # model_logits.add(BatchNormalization())
    # model_logits.add(Dropout(0.5))

    model_logits.add(Flatten())
    # model_logits.add(LeakyReLU(alpha=0.0))
    model_logits.add(Dense(384))
    model_logits.add(LeakyReLU(alpha=0.0))
    model_logits.add(Dropout(0.5))

    model_logits.add(Dense(class_count))

    output = Activation('softmax')(model_logits.output)

    model = tf.keras.Model(model_logits.inputs, output)

    opt = Adam(learning_rate=0.0005)
    model.compile(optimizer=opt, loss='categorical_crossentropy', metrics=['accuracy'])
    return model, model_logits
