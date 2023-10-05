const { default: axios } = require("axios")

const avitoAxios = axios.create({
   baseURL: 'https://api.avito.ru',
   headers: {
      'Content-Type': 'application/json'
   },
})

const avitoAPI = {
   getMessages: async (token) => {
      try {
         const req = await avitoAxios('/messenger/v2/accounts/156580969/chats?unread_only=true', {
            headers: {
               'Authorization': `Bearer ${token}`,
            }
         })

         const messages = req.data.chats

         return messages

      } catch (error) {
         return error  
      }
   },
   getChat: async (token, chatId) => {
      try {
         const req = await avitoAxios(`/messenger/v3/accounts/156580969/chats/${chatId}/messages`, {
            headers: {
               'Authorization': `Bearer ${token}`,
            }
         })

         const chat = req.data.messages

         return chat
      } catch (error) {
         return error
      }
   },
   sendMessage: async (token, chatId, message) => {
      try {
         const req = await avitoAxios.post(`/messenger/v1/accounts/156580969/chats/${chatId}/messages`, {
               "message": {
                  "text": message
               },
               "type": "text"
            },
            {
               headers: {
                  'Authorization': `Bearer ${token}`,
               }
            },
         )

         return req
      } catch (error) {
         return error
      }
   },
   readMessage: async (token, chatId) => {
      try {
         const req = await avitoAxios.post(`/messenger/v1/accounts/156580969/chats/${chatId}/read`, {},
            {
               headers: {
                  'Authorization': `Bearer ${token}`,
               }
            },
         )

         return req
      } catch (error) {
         return error
      }
   }
}

// Для второго аккаунта 
const avitoApiTwo = {
   getMessages: async (token) => {
      try {
         const req = await avitoAxios('/messenger/v2/accounts/322385838/chats?unread_only=true', {
            headers: {
               'Authorization': `Bearer ${token}`,
            }
         })

         const messages = req.data.chats

         return messages

      } catch (error) {
         return error  
      }
   },
   getChat: async (token, chatId) => {
      try {
         const req = await avitoAxios(`/messenger/v3/accounts/322385838/chats/${chatId}/messages`, {
            headers: {
               'Authorization': `Bearer ${token}`,
            }
         })

         const chat = req.data.messages

         return chat
      } catch (error) {
         return error
      }
   },
   sendMessage: async (token, chatId, message) => {
      try {
         const req = await avitoAxios.post(`/messenger/v1/accounts/322385838/chats/${chatId}/messages`, {
               "message": {
                  "text": message
               },
               "type": "text"
            },
            {
               headers: {
                  'Authorization': `Bearer ${token}`,
               }
            },
         )

         return req
      } catch (error) {
         return error
      }
   },
   readMessage: async (token, chatId) => {
      try {
         const req = await avitoAxios.post(`/messenger/v1/accounts/322385838/chats/${chatId}/read`, {},
            {
               headers: {
                  'Authorization': `Bearer ${token}`,
               }
            },
         )

         return req
      } catch (error) {
         return error
      }
   }
}

module.exports = { avitoAPI, avitoApiTwo }