const {default: axios} = require('axios')

const axiosWhatsapp = axios.create({
   baseURL: 'https://wappi.pro/api',
   headers: {
      "Content-Type": 'application/json',
      "Authorization": 'bedb113e094b1760bd7779874cacbb7ce946469c'
   }
})

const profileId = '8d654a6a-5ca9'

const apiWhatsapp = {
   sendMessage: async (number, message) => {
      try {
         const res = await axiosWhatsapp.post(`/sync/message/send?profile_id=${profileId}`, {
            body: message,
            recipient: number
         })

         return res
      } catch (error) {
         console.log(error)
      }
   },
   getChat: async (number) => {
      try {
         const res = await axiosWhatsapp(`/sync/messages/get?profile_id=${profileId}&chat_id=${number}`)
         return res.data
      } catch (error) {
         return error
      }
   }
}

module.exports = apiWhatsapp