// Event functions
'use strict';
const render = require('./helperRender').render;
const currentFolder = require('./helperRender').currentFolder;

function init() {
    $('.sidebar').on('click', '.folder', (event) => {
        const element = event.currentTarget;
        const id = $(element)[0].dataset.id;
        render(`http://127.0.0.1:8000/api/get-folder/${id}`);
    });
    $('.sidebar').on('click', '.backspace', () => {
        render(`http://127.0.0.1:8000/api/get-folder/${currentFolder().parentFolderID}`);
    });
    $('.appendFolder').on('click', () => {
        const folderName = prompt('Укажите название папки');
        $.get({
            url: 'http://127.0.0.1:8000/api/append-folder/',
            data: {
                name: folderName,
                parent_folder: currentFolder().self.pk,
            },
            success() {
                render(`http://127.0.0.1:8000/api/get-folder/${currentFolder().self.pk}`);
            },
        });
    });
}
module.exports = {
    init,
};
