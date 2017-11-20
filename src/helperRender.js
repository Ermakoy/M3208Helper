/* eslint-disable max-len */
'use strict';
// Render and technician function
const FolderClass = require('./helperFolder');

let currentFolder;

function setBackspace() {
    $('.sidebar').prepend('<div class=\'backspace\'>\n' +
        '            <div class=\'folderName\'>Вернуться назад</div>\n' +
        '        </div>');
}

function renderTemplate(name, data) {
    let template = document.getElementById(name).innerHTML;

    for (const property in data) {
        if (data.hasOwnProperty(property)) {
            const search = new RegExp(`{${property}}`, 'g');
            template = template.replace(search, data[property]);
        }
    }
    return template;
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function render(urlPattern) {
    $.getJSON(urlPattern, (data) => {
        currentFolder = new FolderClass($.parseJSON(data.child_folders), $.parseJSON(data.child_files), $.parseJSON(data.folder));
        const sidebarContent = $('.sidebar__content');
        const content = $('.content');
        sidebarContent.empty();
        content.empty();
        for (const folder of currentFolder.childFolders) {
            const html = renderTemplate('template-folders', {
                name: folder.fields.name,
                id: folder.pk,
            });
            sidebarContent.append(html);
        }
        for (const file of currentFolder.childFiles) {
            let fileName = file.fields.name;
            if (fileName.indexOf('.') !== -1) {
                fileName = fileName.substring(0, fileName.indexOf('.'));
            }
            const html = renderTemplate('files', {
                name: fileName,
                link: `http://127.0.0.1:8000/media/${file.fields.file}`,
                date: file.fields.date_creation,
            });
            content.append(html);
        }
        if (currentFolder.parentFolderID === null) {
            $('.backspace').css('display', 'none');
        } else if ($('.backspace').length) {
            $('.backspace').css('display', 'flex');
        } else {
            setBackspace();
        }
        history.pushState(null, null, `?folder='${currentFolder.self.pk}'`);
    });
}

function init() {
    const folderParam = getParameterByName('folder');
    const fileParam = getParameterByName('file');
    if (folderParam === null) {
        let urlPattern = 'http://127.0.0.1:8000/api/get-root';
        $.getJSON(urlPattern, (data) => {
            currentFolder = new FolderClass(null, $.parseJSON(data.child_files), $.parseJSON(data.folder));
            urlPattern = `http://127.0.0.1:8000/api/get-folder/${currentFolder.self.pk}`;
            setBackspace();
        });
        render(urlPattern);
    } else if (fileParam === null) {
        render(`http://127.0.0.1:8000/api/get-folder/${folderParam.substr(1, folderParam.length - 2)}`);
    }
}

module.exports = {
    currentFolder() {
        return currentFolder;
    },
    init,
    render,
};
