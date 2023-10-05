const { default: axios } = require("axios")

const avitoPhoneApi = {
   getPhoneOne: async (chatId) => {
      const res = await axios.post('http://127.0.0.1:8080', {
         "nik": "New_session",
         "id": chatId
      })

      return res.data.number
   },
   getPhoneTwo: async (chatId) => {
      const res = await axios.post('http://127.0.0.1:8080', {
         "nik": "NEw",
         "id": chatId
      })

      return res.data.number
   }
}
module.exports = avitoPhoneApi