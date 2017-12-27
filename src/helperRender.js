/* eslint-disable max-len */


// Render and technician function
const FolderClass = require('./helperFolder');

const currentFolder = new FolderClass(null, null, null);

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
    if (Object.prototype.hasOwnProperty.call(data, property)) {
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
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i += 1) {
      const cookie = jQuery.trim(cookies[i]);
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (`${name}=`)) {
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
// function checkExtension(fileString) {
//   const file = fileString.substring(fileString.lastIndexOf('.') + 1);
//   if (file !== null) {
//     return file;
//   }
//   return -1;
// }
/**
 * Function for getting parameters from URL's Querystring
 *
 * @param {string} name Name for searching parameter
 * @param {string} url
 * @returns Value of parameter
 */
function getParameterByName(nameString) {
  const urlString = window.location.href;
  // eslint-disable-next-line
  const name = nameString.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(urlString);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
/**
 * Callback function that renders all subfolders in this folders
 *
 * @param {Object} folder
 */
function renderFolders(folder) {
  const html = renderTemplate('template-folders', {
    name: folder.name,
    id: folder.id,
  });
  $('.sidebar__content').append(html);
}
/**
 * Callback function, that renders all files in this folder
 *
 * @param {Object} file
 */
function renderFiles(file) {
  let fileName = file.name;
  if (fileName.indexOf('.') !== -1) {
    fileName = fileName.substring(0, fileName.indexOf('.'));
  }
  const html = renderTemplate('files', {
    name: fileName,
    link: `${file.file}`,
    date: file.date_creation,
  });
  $('.content').append(html);
}
/**
 * This function renders folders and files by taking a urlPattern string
 *
 * @param {string} urlPattern
 */
function render(urlPattern) {
  $.getJSON(urlPattern, (data) => {
    // currentFolder = new FolderClass(data.child_folders, data.files, { id: data.id, name: data.name, parentID: data.parent_folder });
    currentFolder.childFolders = data.child_folders;
    currentFolder.files = data.files;
    currentFolder.self = {
      id: data.id,
      name: data.name,
      parentID: data.parent_folder,
    };
    const sidebarContent = $('.sidebar__content');
    sidebarContent.empty();
    const content = $('.content');
    content.empty();
    currentFolder.childFolders.forEach(renderFolders);
    currentFolder.files.forEach(renderFiles);
    if (currentFolder.parentFolderID === null) {
      $('.backspace').css('display', 'none');
    } else if ($('.backspace').length) {
      $('.backspace').css('display', 'flex');
    } else {
      setBackspace();
    }
    $('.appendFiles__form').css('display', 'none');
    $('.appendFiles').css('display', 'flex');
    // eslint-disable-next-line
    history.pushState(null, null, `?folder='${currentFolder.self.id}'`);
  });
}

function init() {
  const folderParam = getParameterByName('folder');
  const fileParam = getParameterByName('file');
  if (folderParam === null) {
    // $.getJSON(urlPattern, (data) => {
    //   currentFolder = new FolderClass(null, data.files, { id: data.id, name: data.name, parentID: data.parent_folder });
    //   urlPattern = `http://127.0.0.1:8000/storage/api/folder/${currentFolder.self.id}/`;
    //   setBackspace();
    // });
    render('http://127.0.0.1:8000/storage/api/root/');
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
  getCookie,
};
