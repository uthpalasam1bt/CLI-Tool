const fs = require("fs");
const path = require("path");
const { templatePath } = require("./constants");

const getCurrentDirectoryBase = () => {
  return path.basename(process.cwd());
};

const directoryExists = (filePath) => {
  return fs.existsSync(filePath);
};

const getDirectoriesFormThePath = (filePath) => {
  const files = fs.readdirSync(filePath);
  const directories = files.filter((file) => {
    const filepath = path.join(filePath, file);
    return fs.lstatSync(filepath).isDirectory();
  });

  return directories;
};

const getTemplates = () => {
  return getDirectoriesFormThePath(templatePath);
};

const deleteDirectoryFiles = (dirPath) => {
  try {
    var files = fs.readdirSync(dirPath);
  } catch (e) {
    return;
  }
  if (files.length > 0)
    for (var i = 0; i < files.length; i++) {
      var filePath = dirPath + "/" + files[i];
      if (fs.statSync(filePath).isFile()) fs.unlinkSync(filePath);
      else rmDir(filePath);
    }
};

module.exports = {
  getDirectoriesFormThePath,
  getTemplates,
  deleteDirectoryFiles,
};
