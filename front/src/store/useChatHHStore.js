import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { apiHH } from '../api/api'

const useChatHHStore = create(devtools((set) => ({
   chat: [],
   isError: false,
   isLoading: false,
      
   getChat: async (chatId) => {
      try {
         set(state => ({isLoading: true}))
         const chat = await apiHH.getMessages(chatId)
         
         set(state => (
            {
               chat,
               isLoading: false
            }
         ))
      } catch (error) {
         set(state => (
            {
               isError: true,
               isLoading: false
            }
         ))
      }
   },
   newMessage: async (chatId, newMessage) => {
      try {
         set(state => ({isLoading: true}))
         const chat = await apiHH.sendMessages(chatId, newMessage)
         console.log(chat)
         set(state => (
            {
               chat,
               isLoading: false
            }
         ))
      } catch (error) {
         set(state => (
            {
               isError: true,
               isLoading: false
            }
         ))
      }
   },
})))

export { useChatHHStore }