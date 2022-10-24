from genericpath import exists
from unittest import case
from Src.DrawShapes import *
import random


class layersDrawer:
    layersColors = {"Conv2D": [1.0, 0.5, 0.0],
                    "Dense": [1.0, 0.0, 0.0]}

    def drawLayer(self, layerType, *args):
        if(layerType == "Conv2D"):
            layersDrawer.drawConv2DLayer(self, args[1], args[2])
        elif(layerType == "Dense"):
            layersDrawer.drawDense(self, args[1], args[2])
        else:
            if(layerType not in self.layersColors.keys()):
                value1 = random.uniform(0.0, 1.0)
                value2 = random.uniform(0.0, 1.0)
                value3 = random.uniform(0.0, 1.0)
                c = [value1, value2, value3]
                while(c in self.layersColors.values()):
                    value1 = random.uniform(0.0, 1.0)
                    value2 = random.uniform(0.0, 1.0)
                    value3 = random.uniform(0.0, 1.0)
                    c = [value1, value2, value3]

                self.layersColors[layerType] = c
            color = self.layersColors[layerType]

            Cube(args[1], args[2], color)

    def drawConv2DLayer(self, shape, position):
        color = self.layersColors["Conv2D"]
        Cube(shape, position, color)

    def drawDense(self, shape, position):
        color = self.layersColors["Dense"]
        Cube(shape, position, color)
