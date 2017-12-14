// Event functions
'use strict';
const render = require('./helperRender').render;
const currentFolder = require('./helperRender').currentFolder;
const getCookie = require('./helperRender').getCookie;
function init() {
    // Render the choosen folder
    $('.sidebar').on('click', '.folder', (event) => {
        const element = event.currentTarget;
        const id = $(element)[0].dataset.id;
        render(`http://127.0.0.1:8000/storage/api/folder/${id}/`);
    });
    // Going to previous folder
    $('.sidebar').on('click', '.backspace', () => {
        render(`http://127.0.0.1:8000/storage/api/folder/${currentFolder().parentFolderID}/`);
    });
    // Creating a new Folder
    $('.appendFolder').on('click', () => {
        const folderName = prompt('Укажите название папки');
        if (folderName !== '' && folderName !== null) {
            $.post({
                url: 'http://127.0.0.1:8000/storage/api/folder/create/',
                data: {
                    name: folderName,
                    parent_folder: currentFolder().self.pk,
                },
                success() {
                    render(`http://127.0.0.1:8000/storage/api/folder/${currentFolder().self.id}/`);
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
    $('.sendFiles').on('click', function (event) {
        event.preventDefault();
        let files = new FormData();
        files.append('folder', currentFolder().self.id);
        files.append('files', $('.files')[0].files);
        let csrfToken = getCookie('csrftoken');
        $.ajaxSetup({
            beforeSend: function (xhr, settings) {
                if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type)) {
                    xhr.setRequestHeader("X-CSRFToken", csrfToken);
                }
            }
        });
        $.ajax({
            url: 'http://127.0.0.1:8000/storage/api/upload/',
            data: files,
            method: 'POST',
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
