const {default: axios} = require('axios')

const axiosWhatsapp = axios.create({
   baseURL: 'https://wappi.pro/api',
   headers: {
      "Content-Type": 'application/json',
      "Authorization": '0ca9adeccfde4eca8b80a1de4764dd11a1ba7a63'
   }
})

const profileId = 'bc02bf7d-058f'

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