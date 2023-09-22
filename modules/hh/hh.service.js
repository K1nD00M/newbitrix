const hhApi = require("./hh.api")

class HHService {
   static async getJwtInCode(code) {
      try {
         const { newAccess, newRefresh } = await hhApi.getJwtInCode(code)
         const date = new Date()
         fs.writeFileSync('tokenHH.txt', `${newAccess}\n${newRefresh}\n${date}`)   
         return { newAccess, newRefresh }
      } catch (error) {
         return error
      }
   }
   static async getMessages(token, id) {
      try {
         const messages = await hhApi.getMessages(token, id)

         return messages
      } catch (error) {
         return error
      }
   }
}

module.exports = HHService