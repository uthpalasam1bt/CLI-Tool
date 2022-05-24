const fs = require("fs");
const path =require('path');
const { templatePath } = require("./constants");

const getCurrentDirectoryBase= () => {
  return path.basename(process.cwd());
}

const directoryExists=(filePath) => {
  return fs.existsSync(filePath);
}

const getDirectoriesFormThePath=(filePath)=>{
  const files= fs.readdirSync(filePath)
  const directories=files.filter((file)=>{
  const filepath=path.join(filePath,file)
     return fs.lstatSync(filepath).isDirectory() 
})

  return directories
}

const getTemplates=()=>{
  return getDirectoriesFormThePath(templatePath)
}


module.exports={
  getDirectoriesFormThePath,
  getTemplates
}

