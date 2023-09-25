import { useEffect } from "react"
import { useMessagesTwoStore as useMessagesStore} from "../../store/useMessagesStoreTwo"
import MessageCart from "../MessageCart/MessageCart"
import Loader from "../UI/Loader"
import MessageCartTwo from "../MessageCart/MessageCartTwo"

export default function MessagesListTwo() {
   const messages = useMessagesStore(state => state.chats)
   const isLoading = useMessagesStore(state => state.isLoading)
   const isError = useMessagesStore(state => state.isError)
   const getMessages = useMessagesStore(state => state.getChats)

   useEffect(() => {
      if(!messages.lenght && !isLoading) getMessages()
   }, [])

   if(isLoading) {
      <Loader />
   }

   if(isError) {
      return <div>Возникла ошибка! Повторите попытку</div>
   }

   if(messages.length === 0) {
      return <div>В настоящий момент нет непрочитанных сообщений</div>
   }

   return (
      <div>
         <h3 className="font-bold mb-3">В настоящий момент непрочитанно 
            <span className="bg-green-500 text-white px-1 py-1 rounded-lg mx-1">{messages.length}</span> 
            сообщений
         </h3>
         {messages.map(item => (
            <MessageCartTwo
               chatId={item.chatId}
               titleVacansy={item.titleVacansy}
               name={item.name}
               avatar={item.avatar}
               lastMessage={item.lastMessage}
               time={item.time}
               key={item.chatId}
            />
         ))}
      </div>
   )
}
