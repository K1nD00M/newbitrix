import { apiAvito, apiServer } from "../../api/api";
import { useChatTwoStore as useChatStore } from "../../store/useChatStoreTwo";
import { useMessagesTwoStore as useMessagesStore } from "../../store/useMessagesStoreTwo";
import Loader from "../UI/Loader";
import MessageInput from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DescriptionInput from "./DescriptionInput";

export default function ChatTwo (){
   const messages = useChatStore(state => state.chat)
   const getChat = useChatStore(state => state.getChat)
   const onSendMessage = useChatStore(state => state.newMessage)
   const isError = useChatStore(state => state.isError)
   const isLoading = useChatStore(state => state.isLoading)

   const chats = useMessagesStore(state => state.chats)
   const getMessages = useMessagesStore(state => state.getChats)

   const { chatId } = useParams()
   const navigate = useNavigate()

   const sendNewMessage = (message) => {
      onSendMessage(chatId, message);
   };

   const [user, setUser] = useState(chats.find(item => item.chatId === chatId))
   const [description, setDescription] = useState('')

   const pushCandidat = async () => {
      try {
         await apiServer.addCandidateAvito(user, description)
         navigate('/candidates')
      } catch (error) {
         console.log(error)
      }
      
   }

   useEffect(() => {
      const viewChat = async () => {
         if(!chats.length) await getMessages()
         await getChat(chatId)
         const newChats = chats
         setUser(newChats.find(item => item.chatId === chatId))
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
         <div className="flex justify-between mb-2 pb-2 border-b-2 text-lg">
            <span>{user?.name}</span>
            <span>{user?.titleVacansy}</span>
         </div>
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
            onClick={() => apiAvito.readChat(chatId)}
            className={`ml-4 px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none mb-4`}
         >
            Прочитать сообщение
         </button>
         <DescriptionInput description={description} setDescription={setDescription} />
         <button
            onClick={() => pushCandidat()}
            className={`ml-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none`}
         >
            Добавить кандидата 
         </button>
      </div>
   );
}
