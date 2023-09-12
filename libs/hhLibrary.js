const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data', 'hh');

if (!fs.existsSync(dataDir)) {
   fs.mkdirSync(dataDir);
}

function saveJsonFileHH(data) {
   const date = Date.now()
   const jsonContent = {timeCreate: date, ...data}
   const filePath = path.join(dataDir, data.id + '.json');
   const jsonData = JSON.stringify(jsonContent, null, 2);

   fs.writeFileSync(filePath, jsonData);
}

function getAllJsonDataHH() {
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

function getJsonByName(filename) {
   const filePath = path.join(dataDir, filename + '.json');
   if (fs.existsSync(filePath)) {
       try {
           const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
           return jsonData;
       } catch (error) {
           console.error('Ошибка при чтении файла:', error.message);
           return null;
       }
   } else {
       console.error('Файл не найден:', filename);
       return null;
   }
}


function addToJsonFileHH(filename, newData) {
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

const addPdf = async (filename, data) => {
   const filePath = path.join(dataDir, 'pdf', filename + '.pdf');
   try {
      fs.writeFileSync(filePath, data);

      return 'OK'
   } catch (error) {
      console.error(`Произошла ошибка: ${error.message}`);
      return error;
   }
}
 
module.exports = {
  saveJsonFileHH,
  getAllJsonDataHH,
  addToJsonFileHH,
  getJsonByName,
  addPdf
};