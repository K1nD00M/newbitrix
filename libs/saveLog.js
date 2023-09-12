const fs = require('node:fs')
const path = require('node:path')

const saveLog = (req, res, next) => {
   const logEntry = {
     timestamp: new Date().toISOString(),
     method: req.method,
     path: req.path,
     query: req.query,
     body: req.body,
     headers: req.headers,
   };
   
   const logDirPath = path.join(__dirname, '..', 'logs');
   const logFilePath = path.join(logDirPath, `${new Date().toISOString().replace(/:/g, '-')}.json`);
 
   fs.mkdirSync(logDirPath, { recursive: true });
 
   fs.appendFile(logFilePath, JSON.stringify(logEntry) + '\n', err => {
     if (err) {
       console.error('Error saving request log:', err);
     }
   });
 
   next();
}

module.exports = saveLog