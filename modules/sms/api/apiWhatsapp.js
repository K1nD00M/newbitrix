const {default: axios} = require('axios')

const axiosWhatsapp = axios.create({
   baseURL: 'https://wappi.pro/api',
   headers: {
      "Content-Type": 'application/json',
      "Authorization": 'd17f21ac818f060f78571508e569a63e07b76811'
   }
})

const profileId = '961d7817-588e'

const apiWhatsapp = {
   sendMessage: async (number, message) => {
      try {
         const res = await axiosWhatsapp.post(`/sync/message/send?profile_id=${profileId}`, {
            body: message,
            recipient: number
         })

         return res
      } catch (error) {
         return error
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