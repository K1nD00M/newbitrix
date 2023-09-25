import { apiAvito } from "../../../api/api";
import { useChatTwoStore as useChatStore } from "../../../store/useChatStoreTwo";
import Loader from "../../UI/Loader";
import MessageInput from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { useEffect, useState } from 'react'

export default function ChatAvitoTwo ({ item }){
   const messages = useChatStore(state => state.chat)
   const getChat = useChatStore(state => state.getChat)
   const onSendMessage = useChatStore(state => state.newMessage)
   const isError = useChatStore(state => state.isError)
   const isLoading = useChatStore(state => state.isLoading)

   const sendNewMessage = (message) => {
      onSendMessage(item.data.chatId, message);
   };

   useEffect(() => {
      const viewChat = async () => {
         getChat(item.data.chatId)
      }
      viewChat()
   }, [])

   if(isError) {
      return <div>Ошибка</div>
   }

   if(isLoading) {
      return <Loader />
   }

   return (
      <div className="bg-white p-4 rounded shadow-md mx-auto mt-4 flex flex-col">
         <div className=" flex flex-col-reverse">
            {messages.map((message, index) => (
               <ChatMessage
                  key={index}
                  text={message.content.text}
                  isSentByUser={message.author_id === 322385838}
               />
            ))}
         </div>
         <MessageInput onSendMessage={sendNewMessage} placeholder={"Введите сообщение..."} />
         <button
            onClick={() => apiAvito.readChat(item.data.chatId)}
            className={`ml-4 px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none mb-4`}
         >
            Прочитать сообщение
         </button>
      </div>
   );
}