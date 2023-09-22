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
   
   static async addCandidate(candidateData, description) {
      try {
         const candidate = new Candidate(candidateData, 'avito', description)
         saveJsonFile(candidate, dataDir, candidateData.chatId)
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

   static async updateUser(filename, userData) {
      try {
         const user = getJsonData(dataDir, filename)
         user.data = user
         await updateJsonFile(filename, user, dataDir)

         return user
      } catch (error) {
         return error
      }
   }
}


module.exports = CandidateService