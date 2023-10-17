let images = [];
let index = 0;

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

                model_inside_model(layers);

                getLayersPosition(layers);
                layers_backup = layers.map(obj => obj.copy());

                // layersChanged = true;
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

function checkTypeOption(value) {
    // Get the types element
    var types = document.getElementById("types");

    // Loop through the options
    for (var i = 0; i < types.options.length; i++) {
        // Get the current option value
        var option = types.options[i].value;

        // Compare with the desired value
        if (option === value) {
            // Return true if found
            return true;
        }
    }

    // Return false if not found
    return false;
}

function buttonSaveBlockBehavior() {
    const saveBlockButton = document.getElementById('saveBlock');
    const blockPopup = document.getElementById('blockPopup');
    const typeInput = document.getElementById('select-type');
    const types = document.getElementById('types');

    saveBlockButton.addEventListener('click', () => {
        block.setName(document.getElementById('blockName').value);
        let color = document.getElementById('blockColor').value;
        block.setColor([parseInt(color.substring(1, 3), 16), parseInt(color.substring(3, 5), 16), parseInt(color.substring(5, 7), 16)]);
        block.type = typeInput.value;
        if (!checkTypeOption(typeInput.value)) {
            var option = document.createElement("option");
            option.value = typeInput.value;
            option.text = typeInput.value;

            // Append the option element to the datalist element
            types.appendChild(option);
        }
        typeInput.value = "";
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

function buttonExportImagePreviewBehavior() {
    const exportImagePreviewButton = document.getElementById('exportImagePreview');
    const exportImagePreview = document.getElementById('exportImagePreviewImages');
    exportImagePreviewButton.addEventListener('click', () => {
        images = [];
        files = [];
        document.getElementById("imageToExport").src = "";
        exportImagePreview.style.display = 'block';
        let jsonData = getLayerColors();

        let layerInfo = getLayerInformations(layers, mExportCanvasOrtho, mExportCanvasCameraPositioning, mExportImageCanvas.width, mExportImageCanvas.height);
        // images.push({ from: "model", data: mExportImageCanvas.canvas.toDataURL('image/png') });
        const dataURL = mExportImageCanvas.canvas.toDataURL('image/png');
        const formData = new FormData();
        formData.append('image', dataURL);
        formData.append('json', JSON.stringify(jsonData, null, 2));
        formData.append('layerInfo', JSON.stringify(layerInfo, null, 2));
        let colorsInfo = { background: dynamicValues.colors.Background, text: dynamicValues.colors.text, textId: dynamicValues.colors.textId }
        formData.append('colors', JSON.stringify(colorsInfo, null, 2));

        fetch("http://127.0.0.1:5000/process_image", {
            method: "POST",
            body: formData
        }).then(response => response.json())  // parse response as JSON
            .then(data => {
                // handle the JSON response here
                images.push({ from: "model", data: 'data:image/png;base64,' + data.image });
                document.getElementById("imageToExport").src = images[0].data;
                const dataUri = data.layerInfo;
                files.push({ from: "model", data: dataUri });
            })
            .catch(error => {
                loader.style.display = 'none';
                alert("Was not possible to generate the image to preview!")
                console.error(error);
            });

        for (block of dynamicValues.blocks) {
            let blockLayers = [];
            blockLayers = layers.map(obj => obj.copy()).slice(block.initialLayer, block.endLayer + 1);
            let initialId = blockLayers[0].id;
            blockLayers.forEach((layer) => {
                layer.nextLayers = [...layers_backup[layer.id].nextLayers];
                layer.prevLayers = [...layers_backup[layer.id].prevLayers];
                layer.centerPosition = [0, 0, 0];
                layer.shape = [...layers_backup[layer.id].shape];
                layer.shouldBeDrawn = true;
                layer.shouldBeBlock = false;
                layer.id = layer.id - initialId;
                layer.nextLayers = layer.nextLayers.map(function (v, i) { return (v - initialId); });
                layer.prevLayers = layer.prevLayers.map(function (v, i) { return (v - initialId); });
            });
            blockLayers[blockLayers.length - 1].nextLayers = [];
            blockLayers[0].prevLayers = [];

            getLayersPosition(blockLayers, false);

            mBlockImage.resizeCanvas(getMaxXPosition(blockLayers) * 4 > width / 2 ? getMaxXPosition(blockLayers) * 4 : width / 2, height / 2)
            mBlockImage.camera(getMaxXPosition(blockLayers) / 2, getMaxXPosition(blockLayers) + 50, getMaxXPosition(blockLayers) + 20, getMaxXPosition(blockLayers) / 2, 0, 0, 0, 1, 0)
            mBlockImage.ortho(-getMaxXPosition(blockLayers) / 2, getMaxXPosition(blockLayers) / 2, -100, 100, 10, 5000);
            mBlockImage.background(dynamicValues.colors.Background);

            blockLayers.forEach((layer) => { drawLayerBlockImage(layer, blockLayers); });

            let jsonData = getLayerColors(blockLayers);
            blockLayers.forEach((layer) => {
                layer.id = layer.id + initialId;
                layer.prevLayers = [...layers_backup[layer.id].prevLayers];
                layer.nextLayers = [...layers_backup[layer.id].nextLayers];
            });
            let orthoInfo = [-getMaxXPosition(blockLayers) / 2, getMaxXPosition(blockLayers) / 2, -100, 100, 10, 5000];
            let camInfo = [[getMaxXPosition(blockLayers) / 2, getMaxXPosition(blockLayers) + 50, getMaxXPosition(blockLayers) + 20], [getMaxXPosition(blockLayers) / 2, 0, 0], [0, 1, 0]];
            let layerInfo = getLayerInformations(blockLayers, orthoInfo, camInfo, mBlockImage.width, mBlockImage.height);
            // images.push({ from: "model", data: mExportImageCanvas.canvas.toDataURL('image/png') });
            const dataURL = mBlockImage.canvas.toDataURL('image/png');
            const formData = new FormData();
            formData.append('image', dataURL);
            formData.append('json', JSON.stringify(jsonData, null, 2));
            formData.append('layerInfo', JSON.stringify(layerInfo, null, 2));
            formData.append('colors', JSON.stringify(colorsInfo, null, 2));

            let blockType = block.type;
            let blockName = block.name;
            formData.append('block', JSON.stringify({ 'blockType': blockType, 'blockName': blockName }, null, 2));
            fetch("http://127.0.0.1:5000/process_image", {
                method: "POST",
                body: formData
            }).then(response => response.json())  // parse response as JSON
                .then(data => {
                    // handle the JSON response here
                    images.push({ from: blockName, data: 'data:image/png;base64,' + data.image });
                    const dataUri = data.layerInfo;
                    files.push({ from: blockName, data: dataUri });
                })
                .catch(error => {
                    loader.style.display = 'none';
                    alert("Was not possible to export the image!")
                    console.error(error);
                });
        }

    });

}

function showNextImage() {
    index++;
    if (index >= images.length) {
        index = 0;
    }
    document.getElementById("imageToExport").src = images[index].data;
}

function buttonExportImageBehavior() {
    const exportImageButton = document.getElementById('exportImage');

    exportImageButton.addEventListener('click', () => {
        let exportSetting = document.getElementById('exportSetting').checked;
        if (exportSetting) {
            let content = [];
            for (img of images) {
                content.push({ text: [{ text: "Image of: ", bold: true, italics: true }, img.from], fontSize: 15, color: "#5A5AFF" });
                content.push("\n");
                content.push({
                    image: img.data,
                    width: 500,
                    alignment: 'center'
                });
                content.push("\n");
            }
            files.forEach(file => {
                content.push({ text: [{ text: "Layer info of: ", bold: true, italics: true }, file.from], fontSize: 15, color: "#FF5A5A" });
                content.push("\n");
                let data = JSON.parse(file.data);
                Object.entries(data).forEach(layer => {
                    Object.entries(layer[1]).forEach(entry => {
                        if (Array.isArray(entry[1])) { // If the entry is a list, it is a shape like entry, so handle it correctly
                            let entryText = "";
                            for (item of entry[1]) {
                                entryText = entryText + item + " X ";
                            }
                            entryText = entryText.slice(0, -3);
                            content.push({
                                columns: [
                                    { text: entry[0], width: 250, bold: true },
                                    { text: entryText, width: 250 },
                                ]
                            });
                        } else if (entry[0] != 'centerPosition') {
                            content.push({
                                columns: [
                                    { text: entry[0], width: 250, bold: true },
                                    { text: entry[1], width: 250 },
                                ]
                            });
                        }
                    });
                    content.push("\n\n");
                });
            });

            var docDefinition = {
                content: content
            };
            const fileInput = document.getElementById("model-file");
            const file = fileInput.files[0];
            let pdf = pdfMake.createPdf(docDefinition);
            pdf.download(file.name.split(".")[0] + ".pdf");

        } else {
            saveFrames('myCanvas', 'png', 1, 1, () => {
                for (img of images) {

                    // handle the JSON response here
                    const downloadLink = document.createElement('a');
                    downloadLink.href = img.data;
                    downloadLink.download = img.from + '.png';

                    downloadLink.click();

                }

            });
            for (file of files) {
                const downloadLink = document.createElement('a');
                downloadLink.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(file.data);
                downloadLink.download = file.from + '.json';

                downloadLink.click();
            }
        }
    })
}

function buttonCancelExportImageButtonBehavior() {
    const cancelExportImageButton = document.getElementById('cancelExportImage');
    const exportImagePreviewImages = document.getElementById('exportImagePreviewImages');

    cancelExportImageButton.addEventListener('click', () => {
        exportImagePreviewImages.style.display = 'none';
    });
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
    buttonCancelBlockButtonBehavior();
    buttonOpenSettingsBehavior();
    buttonExportImageBehavior();
    buttonExportImagePreviewBehavior();
    buttonCancelExportImageButtonBehavior();
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