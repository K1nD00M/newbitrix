import axios from "axios";

const axiosApi = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
})

const apiServer = {
   pushHistoryHH: async (chatId, messageHh, url, stage, description, bxId) => {
      const res = await axiosApi.post(`/candidates/history/${chatId}`, {
         messageHh,
         url,
         stage,
         description,
         bxId
      })

      return res.data
   },
   pushHistoryAvito: async (chatId, selectedAction, stage, description, bxId) => {
      const res = await axiosApi.post(`/candidates/history/avito/${chatId}`, {
         selectedAction,
         stage,
         description,
         bxId
      })

      return res
   },
   addCandidateAvito: async (data, description) => {
      try {
         const res = await axiosApi.post('/candidates', {data, description})

         return res.data
      } catch (error) {
         return error
      }
   },
   getCandidates: async () => {
      const res = await axiosApi('/candidates')
      const candidates = res.data
      return candidates
   },
   setInterview: async (candidates, messages, dates, phone, area) => {
      axiosApi.post('/sms', {
         candidates,
         messages,
         dates,
         phone,
         area
      })
   },
   getPhones: async () => {
      const res = await axiosApi('/sms')
      const phones = res.data

      return phones
   },
   getChatPhone: async (number) => {
      try {
         const res = await axiosApi(`/sms/chat`, {
            params: {number}
         })
         return res.data
      } catch (error) {
         return error
      }
   },
   sendChatMessage: async (phone, message) => {
      try {
         const res = await axiosApi.post('/sms/chat', {
            phone,
            message
         })
         return res.data
      } catch (error) {
         return error
      }
   },
   downloadExcel: async () => {
      try {
         const res = await axiosApi('/candidates/xl', {
            responseType: 'blob'
         })

         return res
      } catch (error) {
         return error
      }
   }
}

const apiHH = {
   getMessages: async (id) => {
      try {
         const res = await axiosApi(`/hh/messages/${id}`)

         const messages = res.data

         return messages
      } catch (error) {
         return error
      }
   },
   sendMessages: async (id, message) => {
      try {
         const res = await axiosApi.post(`/hh/messages/${id}`, {message})

         const messages = res.data

         return messages
      } catch (error) {
         return error
      }
   },
   getNegotiation: async (token, id) => {
      try {
         const res = await axiosApi(`/negotiations/${id}`)

         const nectioation = res.data

         return nectioation
      } catch (error) {
         return error
      }
   },
   putNegotiation: async (token, id) => {
      try {
         const res = await axiosApi.put(`/negotiations/${id}`)

         const nectioation = res.data

         return nectioation
      } catch (error) {
         return error
      }
   },
   getPdf: async (url) => {
      try {
         const res = await axiosApi.post(`/hh/pdf`, {
            url: url
         }, {
            responseType: 'arraybuffer'
         })
         return res.data
      } catch (error) {
         return error
      }
   },
   command: async (url) => {
      try {
         const res = await axiosApi.post('/hh/command', {
            url
         })


         return res.data
      } catch (error) {
         return error
      }
   }
}

const apiAvito = {
   getMessages: async () => {
      try {
         const res = await axiosApi('/avito/messages')

         const messages = res.data

         return messages
      } catch (error) {
         return error
      }
   },
   getChat: async (chatId) => {
      try {
         const res = await axiosApi(`/avito/messages/${chatId}`)

         const chat = res.data

         return chat
      } catch (error) {
         return error
      }
   },
   sendMessage: async (chatId, message) => {
      try {
         const res = await axiosApi.post(`/avito/messages/${chatId}`, {
            message
         })

         const chat = res.data

         return chat
      } catch (error) {
         return { status: 'error' }
      }
   },
   readChat: async (chatId) => {
      try {
         const res = await axiosApi.post(`/avito/messages/read/${chatId}`)
         if (res.status !== 500) return 'ok'
      } catch (error) {
         return { status: 'error' }
      }
   }
}

const apiAvitoTwo = {
   getMessages: async () => {
      try {
         const res = await axiosApi('/avito/two/messages')

         const messages = res.data

         return messages
      } catch (error) {
         return error
      }
   },
   getChat: async (chatId) => {
      try {
         const res = await axiosApi(`/avito/two/messages/${chatId}`)

         const chat = res.data

         return chat
      } catch (error) {
         return error
      }
   },
   sendMessage: async (chatId, message) => {
      try {
         const res = await axiosApi.post(`/avito/two/messages/${chatId}`, {
            message
         })

         const chat = res.data

         return chat
      } catch (error) {
         return { status: 'error' }
      }
   },
   readChat: async (chatId) => {
      try {
         const res = await axiosApi.post(`/avito/two/messages/read/${chatId}`)
         if (res.status !== 500) return 'ok'
      } catch (error) {
         return { status: 'error' }
      }
   }
}


export { apiAvito, apiAvitoTwo, apiHH, apiServer }