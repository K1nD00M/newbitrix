const { default: axios } = require("axios")

const avitoPhoneApi = {
   getPhoneOne: async (chatId) => {
      const res = await axios.post('http://localhost:8080', {
         "nik": "New_session",
         "id": chatId
      })

      return res.data.phone
   },
   getPhoneTwo: async (chatId) => {
      const res = await axios.post('http://localhost:8080', {
         "nik": "NEw",
         "id": chatId
      })

      return res.data.phone
   }
}
module.exports = avitoPhoneApi