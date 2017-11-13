/* eslint-disable max-len */
'use strict';
// Render and technician function
const FolderClass = require('./helperFolder');

let currentFolder;

function setBackspace() {
    $('.sidebar').prepend('<div class=\'backspace\'>\n' +
        '            <i class=\'backspaceIcon\'></i>\n' +
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
        for (const i in currentFolder.childFolders) {
            const html = renderTemplate('template-folders', {
                name: currentFolder.childFolders[i].fields.name,
                id: currentFolder.childFolders[i].pk,
            });
            sidebarContent.append(html);
        }
        for (const i in currentFolder.childFiles) {
            const html = renderTemplate('files', {
                name: currentFolder.childFiles[i].fields.name,
                link: `http://127.0.0.1:8000/media/${currentFolder.childFiles[i].fields.file}`,
                date: currentFolder.childFiles[i].fields.date_creation,
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
