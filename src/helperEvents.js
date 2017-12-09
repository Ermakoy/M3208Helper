// Event functions
'use strict';
const render = require('./helperRender').render;
const currentFolder = require('./helperRender').currentFolder;

function init() {
    // Render the choosen folder
    $('.sidebar').on('click', '.folder', (event) => {
        const element = event.currentTarget;
        const id = $(element)[0].dataset.id;
        render(`http://127.0.0.1:8000/api/get-folder/${id}`);
    });
    // Going to previous folder
    $('.sidebar').on('click', '.backspace', () => {
        render(`http://127.0.0.1:8000/api/get-folder/${currentFolder().parentFolderID}`);
    });
    // Creating a new Folder
    $('.appendFolder').on('click', () => {
        const folderName = prompt('Укажите название папки');
        if (folderName !== '' && folderName !== null) {
            $.post({
                url: 'http://127.0.0.1:8000/api/create-folder/',
                data: {
                    name: folderName,
                    parent_folder: currentFolder().self.pk,
                },
                success() {
                    render(`http://127.0.0.1:8000/api/get-folder/${currentFolder().self.pk}`);
                },
            });
        }
    });
    // Showing FileSend form 
    $('.appendFiles').on('click', () => {
        $('.appendFiles').css('display', 'none');
        $('.appendFiles__form').css('display', 'flex');
    });
    //Sending files to server
    $('.upload_files').on('click', function (event) {
        let files = $('.files').files;
        event.stopPropagation(); // остановка всех текущих JS событий
        event.preventDefault();  // остановка дефолтного события для текущего элемента - клик для <a> тега
        if (typeof files === 'undefined') return;
        let data = new FormData();
        $.each(files, function (key, value) {
            data.append(key, value);
        });
        data.append('folder', currentFolder().self.pk);
        $.ajax({
            url: '', // TODO Никита, ёбан-бобан поменяй тут URL для запроса
            type: 'POST',
            data: data,
            cache: false,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (respond, status, jqXHR) {
                if (typeof respond.error === 'undefined') {
                    console.log('Всё прошло нормально')
                }
                else {
                    console.log('КОД КРАСНЫЙ КОД КРАСНЫЙ');
                }
            },
            error: function (jqXHR, status, errorThrown) {
                console.log('ОШИБКА AJAX запроса: ' + status, jqXHR);
            }

        });

    });
}

module.exports = {
    init,
};
