const fs = require('fs');
const path = require('path');
const { saveJsonFile, getJsonData, updateJsonFile, getAllJsonData } = require('../../libs/jsonLibrary');
const { Candidate } = require('./candidate.interface')
const dataDir = path.join(__dirname, 'data');

if (!fs.existsSync(dataDir)) {
   fs.mkdirSync(dataDir);
}

class CandidateService {
   static async getAllCandidate() {
      try {
         const candidate = await getAllJsonData(dataDir)
         return candidate
      } catch (error) {
         return error
      }
   }
   
   static async addCandidate(candidateData) {
      try {
         const candidate = new Candidate(candidateData, 'avito')
         saveJsonFile(candidate, dataDir)
         return candidateData
      } catch (error) {
         return error
      }
   }

   static async pushHistory(filename, history) {
      try {
         const user = getJsonData(dataDir, filename)
         user.stage = history.stage
         user.history.push(history)
         user.timeUpdate = Date.now( )
         await updateJsonFile(filename, user, dataDir)

         return user
      } catch (error) {
         return error
      }
   }

   static async updatePhone(filename, phone) {
      try {
         const user = getJsonData(dataDir, filename)
         user.phone = phone
         await updateJsonFile(filename, user, dataDir)

         return user
      } catch (error) {
         return error
      }
   }
}


module.exports = CandidateService