import { useChatHHStore } from "../../../store/useChatHHStore";
import Loader from "../../UI/Loader";
import MessageInput from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { useEffect } from 'react'

export default function ChatHH ({ item }){
   const messages = useChatHHStore(state => state.chat)
   const getChat = useChatHHStore(state => state.getChat)
   const onSendMessage = useChatHHStore(state => state.newMessage)
   const isError = useChatHHStore(state => state.isError)
   const isLoading = useChatHHStore(state => state.isLoading)

   const sendNewMessage = (message) => {
      onSendMessage(item.data.id, message);
   };

   useEffect(() => {
      getChat(item.data.id)
   }, [])

   if(isError) {
      return <div>Ошибка</div>
   }

   if(isLoading) {
      return <Loader />
   }
   
   return (
      <div className="bg-white p-4 rounded shadow-md mx-auto mt-4 flex flex-col">
         <h3 className="text-center font-bold text-base mt-4 mb-2">Чат с кандидатом в HH</h3>
         <div className=" flex flex-col">
            {messages.length && messages.map((message, index) => (
               <ChatMessage
                  key={index}
                  text={message.text}
                  isSentByUser={message.author.participant_type === 'employer'}
               />
            ))}
         </div>
         <MessageInput onSendMessage={sendNewMessage} placeholder={"Введите сообщение..."} />
      </div>
   );
}
