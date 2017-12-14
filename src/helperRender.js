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
/**
 * Function, that renders Folder and File template
 * 
 * @param {string} name name of the template
 * @param {object} data object with data to print
 * @returns DOM node
 */
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
/**
 * Function returns part of Cookie
 * 
 * @param {string} name 
 * @returns 
 */
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie != '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
/**
 * Function checking the extension of file, to define a file icon
 * 
 * @param {string} file Filename string
 * @returns Extension of file or -1 if it hasn't
 */
function checkExtension(file) {
    file=file.substring(file.lastIndexOf('.')+1);
    if (file !== null) {
        return file;
    }else{
        return -1;
    }
}
/**
 * Function for getting parameters from URL's Querystring
 * 
 * @param {string} name Name for searching parameter
 * @param {string} url 
 * @returns Value of parameter
 */
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
/**
 * This function renders folders and files by taking a urlPattern string
 * 
 * @param {string} urlPattern 
 */
function render(urlPattern) {
    $.getJSON(urlPattern, (data) => {
        currentFolder = new FolderClass(data.child_folders, data.files,{id : data.id, name: data.name, parentID : data.parent_folder});
        const sidebarContent = $('.sidebar__content');
        const content = $('.content');
        sidebarContent.empty();
        content.empty();
        for (const folder of currentFolder.childFolders) {
            const html = renderTemplate('template-folders', {
                name: folder.name,
                id: folder.id,
            });
            sidebarContent.append(html);
        }
        for (const file of currentFolder.files) {
            let fileName = file.name;
            if (fileName.indexOf('.') !== -1) {
                fileName = fileName.substring(0, fileName.indexOf('.'));
            }
            const html = renderTemplate('files', {
                name: fileName,
                link: `http://127.0.0.1:8000/media/${file.file}`,
                date: file.date_creation,
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
        $('.appendFiles__form').css('display','none');
        $('.appendFiles').css('display','flex');
        history.pushState(null, null, `?folder='${currentFolder.self.id}'`);
    });
}

function init() {
    const folderParam = getParameterByName('folder');
    const fileParam = getParameterByName('file');
    if (folderParam === null) {
        let urlPattern = 'http://127.0.0.1:8000/storage/api/root/';
        $.getJSON(urlPattern, (data) => {
            currentFolder = new FolderClass(null,data.files, {id : data.id, name : data.name, parentID : data.parent_folder});
            urlPattern = `http://127.0.0.1:8000/storage/api/folder/${currentFolder.self.id}/`;
            setBackspace();
        });
        render(urlPattern);
    } else if (fileParam === null) {
        render(`http://127.0.0.1:8000/storage/api/folder/${folderParam.substr(1, folderParam.length - 2)}/`);
    }
}

module.exports = {
    currentFolder() {
        return currentFolder;
    },
    init,
    render,
    getCookie
};
