const fs = require('fs');
const path = require('path');

function saveJsonFile(data, dataDir, fileName = null) {
   let jsonName = ''
   if(fileName === null) {
      jsonName = Date.now()
   } else {
      jsonName = fileName
   }

   const date = Date.now()
   const jsonContent = {timeCreate: date, ...data}
   const filePath = path.join(dataDir, jsonName + '.json');
   const jsonData = JSON.stringify(jsonContent, null, 2);

   fs.writeFileSync(filePath, jsonData);
}

function getJsonData(dataDir, fileName) {
   const filePath = path.join(dataDir, `${fileName}.json`);
   const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
   return jsonData
}

function getAllJsonData(dataDir) {
   const jsonFiles = fs.readdirSync(dataDir)
      .filter(file => file.endsWith('.json'));

   const allData = [];

   jsonFiles.forEach(file => {
      const filePath = path.join(dataDir, file);
      const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      allData.push(jsonData);
  });

  return allData;
}

function updateJsonFile(filename, newData, dataDir) {
   const filePath = path.join(dataDir, `${filename}.json`);

   try {
      const updatedJsonData = JSON.stringify(newData, null, 2);
      fs.writeFileSync(filePath, updatedJsonData);

      return true;
   } catch (error) {
      console.error(`Error adding data to JSON file ${filename}: ${error}`);
      return false;
   }
}

module.exports = {
  saveJsonFile,
  getJsonData,
  getAllJsonData,
  updateJsonFile
};