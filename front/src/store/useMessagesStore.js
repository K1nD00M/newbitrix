import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { apiAvito } from '../api/api'

const useMessagesStore = create(devtools((set) => ({
   chats: [],
   isError: false,
   isLoading: false,
   getChats: async () => {
      try {
         set(state => ({isLoading: true}))
         const messages = await apiAvito.getMessages()

         set(state => (
            {
               chats: [...messages],
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

export { useMessagesStore }