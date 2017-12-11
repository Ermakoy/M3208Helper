// Folder declaration
/**
 * Main abstraction
 * 
 * @param {array} childFolders Array of folders
 * @param {array} childFiles Array of files
 * @param {object} self Information about folder itself
 */
module.exports = function FolderClass(childFolders, childFiles, self) {
    this.parentFolderID = self.parentID;
    this.childFolders = childFolders;
    this.files = childFiles;
    this.self = self;
};
