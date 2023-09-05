function buttonUploadModelBehavior() {
    const uploadForm = document.getElementById('upload-form');

    uploadForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const loader = document.getElementById("loader");
        loader.style.display = 'block';

        const fileInput = document.getElementById("model-file");
        const file = fileInput.files[0];

        const formData = new FormData();
        formData.append("model-file", file);

        fetch("http://127.0.0.1:5000/process", {
            method: "POST",
            body: formData
        }).then(response => response.json())  // parse response as JSON
            .then(data => {
                // handle the JSON response here
                layers = [];
                dynamicValues.blocks = [];

                dynamicValues.selectedLayerID = -1;

                selectedText()

                for (let jsonLayer of data) {
                    let layer = new Layer(jsonLayer)

                    layers.push(layer)
                }
                layers_backup = layers.map(obj => obj.copy());

                model_inside_model(layers);

                layersChanged = true;
                loader.style.display = 'none';
            })
            .catch(error => {
                loader.style.display = 'none';
                alert("Was not possible to load the model selected!")
                console.error(error);
            });
    });
}

function buttonUploadSettingsFileBehavior() {
    const uploadSettingsFileButton = document.getElementById('buttonUploadSettingsFile');
    uploadSettingsFileButton.addEventListener('click', (event) => {
        event.preventDefault();
        const fileSettings = document.getElementById("settings-file");
        const file = fileSettings.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', (loadEvent) => {
            const fileContent = loadEvent.target.result;
            const jsonData = JSON.parse(fileContent);

            parseSettingsJson(jsonData);
        });

        reader.readAsText(file);

    });
}

function buttonSaveBlockBehavior() {
    const saveBlockButton = document.getElementById('saveBlock');
    const blockPopup = document.getElementById('blockPopup');

    saveBlockButton.addEventListener('click', () => {
        block.setName(document.getElementById('blockName').value);
        let color = document.getElementById('blockColor').value;
        block.setColor([parseInt(color.substring(1, 3), 16), parseInt(color.substring(3, 5), 16), parseInt(color.substring(5, 7), 16)]);
        dynamicValues.blocks.push(block);
        layersChanged = true;
        block = [];
        blockPopup.style.display = 'none';
    });
}

function buttonCancelBlockButtonBehavior() {
    const cancelBlockButton = document.getElementById('cancelBlock');
    const blockPopup = document.getElementById('blockPopup');

    cancelBlockButton.addEventListener('click', () => {
        block = [];
        blockPopup.style.display = 'none';
    });
}

function buttonOpenSettingsBehavior() {
    const settingsButton = document.getElementById('settingsButton');
    const settingsPopup = document.getElementById('settingsPopup');

    settingsButton.addEventListener('click', () => {
        settingsPopup.style.display = 'block';
    });
}

function buttonExportImageBehavior() {
    const exportImageButton = document.getElementById('exportImage');

    exportImageButton.addEventListener('click', () => {
        saveFrames('myCanvas', 'png', 1, 1, () => {
            let jsonData = getLayerColors();
            const dataURL = drawingContext.canvas.toDataURL('image/png');

            const formData = new FormData();
            formData.append('image', dataURL);
            formData.append('json', JSON.stringify(jsonData))

            fetch("http://127.0.0.1:5000/process_image", {
                method: "POST",
                body: formData
            }).then(response => response.json())  // parse response as JSON
                .then(data => {
                    // handle the JSON response here
                    const downloadLink = document.createElement('a');
                    downloadLink.href = 'data:image/png;base64,' + data.image;
                    downloadLink.download = 'network.png';
                    downloadLink.textContent = 'Network image';

                    downloadLink.click();
                })
                .catch(error => {
                    loader.style.display = 'none';
                    alert("Was not possible to generate the image!")
                    console.error(error);
                });
        });
    })
}

function fileInputFieldBehavior() {
    const fileInput = document.getElementById('model-file');
    const fileNameLabel = document.getElementById('modelFileLabel');

    fileInput.addEventListener('change', () => {
        const fileName = fileInput.files[0].name;
        fileNameLabel.innerHTML = `<b>${fileName}</b>`;
    });
}

function settingsFileInputFieldBehavior() {
    const settingsFile = document.getElementById('settings-file');
    const settingsFileLabel = document.getElementById('settingsFileLabel');

    settingsFile.addEventListener('change', () => {
        const fileName = settingsFile.files[0].name;
        settingsFileLabel.innerHTML = `<b>${fileName}</b>`;
    });
}

function buttonsBehaviour() {
    buttonUploadModelBehavior();
    buttonUploadSettingsFileBehavior();
    buttonSaveBlockBehavior();
    buttonOpenSettingsBehavior();
    buttonExportImageBehavior();
    fileInputFieldBehavior();
    settingsFileInputFieldBehavior();


    settingsBehaviour();
    settingsColorsBehaviour();
}

function settingsBehaviour() {
    const saveSettingsButton = document.getElementById('saveSettings');
    const settingsCloseButton = document.getElementById('settingsCloseButton');
    const settingsPopup = document.getElementById('settingsPopup');

    settingsCloseButton.addEventListener('click', () => {
        settingsPopup.style.display = 'none';
    });

    saveSettingsButton.addEventListener('click', (event) => {
        event.preventDefault();
        updateValues();
        layersChanged = true;
    });

    const settingsColorsButton = document.getElementById('settingsColorsButton');
    const settingsColorsPopup = document.getElementById('settingsColorsPopup');
    settingsColorsButton.addEventListener('click', () => {
        settingsColorsPopup.style.display = 'block';
    });
}