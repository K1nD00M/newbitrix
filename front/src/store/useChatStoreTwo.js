import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { apiAvitoTwo } from '../api/api'

const useChatTwoStore = create(devtools((set) => ({
   chat: [],
   isError: false,
   isLoading: false,
      
   getChat: async (chatId) => {
      try {
         set(state => ({isLoading: true}))
         const chat = await apiAvitoTwo.getChat(chatId)

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
         const chat = await apiAvitoTwo.sendMessage(chatId, newMessage)

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

export { useChatTwoStore }