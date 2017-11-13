// Folder declaration
'use strict';
module.exports = function FolderClass(childFolders, childFiles, self) {
    this.parentFolderID = self[0].fields.parent_folder;
    this.childFolders = childFolders;
    this.childFiles = childFiles;
    this.self = self[0];
};
