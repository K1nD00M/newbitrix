import axios from "axios";

const axiosApi = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
})

const apiServer = {
   pushHistoryHH: async (chatId, messageHh, messageMail, selectedAction, stage, description) => {
      const res = await axiosApi.post(`/candidate/history/${chatId}`, {
         messageHh,
         messageMail,
         selectedAction,
         stage,
         description
      })

      return res.data
   },
   pushHistoryAvito: async (chatId, selectedAction, stage, description) => {
      const res = await axiosApi.post(`/candidate/history/avito/${chatId}`, {
         selectedAction,
         stage,
         description
      })

      return res.data
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
   setInterview: async (candidates, messages, dates) => {
      axiosApi.post('/interview', {
         candidates,
         messages,
         dates
      })
   },
   getPhones: async () => {
      const res = await axiosApi('/phone')
      const phones = res.data

      return phones
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

export { apiAvito, apiHH, apiServer }