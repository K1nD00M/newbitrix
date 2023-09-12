const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');

if (!fs.existsSync(dataDir)) {
   fs.mkdirSync(dataDir);
}

function saveJsonFile(data) {
   const date = Date.now()
   const jsonContent = {timeCreate: date, ...data}
   const filePath = path.join(dataDir, date + '.json');
   const jsonData = JSON.stringify(jsonContent, null, 2);

   fs.writeFileSync(filePath, jsonData);
}

function getAllJsonData() {
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

function addToJsonFile(filename, newData) {
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
  getAllJsonData,
  addToJsonFile
};