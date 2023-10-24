# Neural Network Explorer

This project consists in a visualizer of neural networks architectures, currently only networks developed in keras.
This can be used to visualize the architecture of a neural network, and/or export an image and information about it.

Author: Diogo Tavares - pg42826@alunos.uminho.pt - University of Minho

## Requirements

Python 3.9

All the packages needed can be installed with:
```
python -m pip install -r ./requirements.txt
```

## Install
Clone the code with:
```
git clone https://github.com/diogotava/Neural-Network-Visualizer.git
```

## Run
To run the platform run the following command in the terminal:
```
python app.py
```

Then access the following url:
```
https://diogotava.github.io/Neural-Network-Visualizer/
```

## How to use
### Button 'C'

When hovering a layer or block and this button is clicked shows the respective information

### Button 'B'

When hovering a layer and this button is clicked, is started the creation of a new block, selecting the initial layer.
If the initial layer is already selected the click action selects the end layer and shows the UI to define the parameters of the block. This parameters are:

- Name
- Color
- Type

The type field is a selection field or an input field if the type that is wanted isn't yet defined.

### Button 'V'

When hovering a block and this button is clicked, is expanded the block to see the layers inside it.
If you want to collapse it again just hover the initial or end layer or the border of the block that shows up and click the button.

### Button 'R'

When hovering a block and this button is clicked, the block is removed and all of the its layers are shown again.

### Button 'E'

When hovering a block and this button is clicked, the block edit menu shows up and lets the user change the settings of the block.
