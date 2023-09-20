import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { apiAvito } from '../api/api'

const useChatStore = create(devtools((set) => ({
   chat: [],
   isError: false,
   isLoading: false,
      
   getChat: async (chatId) => {
      try {
         set(state => ({isLoading: true}))
         const chat = await apiAvito.getChat(chatId)

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
         const chat = await apiAvito.sendMessage(chatId, newMessage)

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

export { useChatStore }