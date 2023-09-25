import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { apiAvitoTwo } from '../api/api'

const useMessagesTwoStore = create(devtools((set) => ({
   chats: [],
   isError: false,
   isLoading: false,
   getChats: async () => {
      try {
         set(state => ({isLoading: true}))
         const messages = await apiAvitoTwo.getMessages()

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

export { useMessagesTwoStore }