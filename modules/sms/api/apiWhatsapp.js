const {default: axios} = require('axios')

const axiosWhatsapp = axios.create({
   baseURL: 'https://wappi.pro/api',
   headers: {
      "Content-Type": 'application/json',
      "Authorization": '8086fcc66d2daa79114bf08a340791afbabd0c82'
   }
})

const profileId = 'b211e87f-0708'

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