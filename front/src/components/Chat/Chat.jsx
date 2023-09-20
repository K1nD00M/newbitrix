import { apiAvito } from "../../api/api";
import functionsBX from "../../bx24/functions";
import { useChatStore } from "../../store/useChatStore";
import { useMessagesStore } from "../../store/useMessagesStore";
import Loader from "../UI/Loader";
import MessageInput from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DescriptionInput from "./DescriptionInput";

export default function Chat (){
   const messages = useChatStore(state => state.chat)
   const getChat = useChatStore(state => state.getChat)
   const onSendMessage = useChatStore(state => state.newMessage)
   const isError = useChatStore(state => state.isError)
   const isLoading = useChatStore(state => state.isLoading)

   const chats = useMessagesStore(state => state.chats)

   const { chatId } = useParams()
   const navigate = useNavigate()

   const sendNewMessage = (message) => {
      onSendMessage(chatId, message);
   };

   const [user, setUser] = useState(chats.find(item => item.chatId === chatId))
   const [description, setDescription] = useState('')

   useEffect(() => {
      getChat(chatId)
      setUser(user)
      apiAvito.readChat(chatId)
   }, [])

   const [phone, setPhone] = useState('')

   const onChangePhone = (value) => {
      setPhone(value)
   }
   
   const addLid = async () => {
      functionsBX.addLid({
         phone: phone,
         title: user.name,
         area: 'Avito',
         chatId: user.chatId,
         userId: user.userId,
         vacansy: user.titleVacansy,
         description: description
      })
   }

   const addReject = async () => {
      await functionsBX.addReject({
         title: user.name,
         area: 'Avito',
         chatId: user.chatId,
         userId: user.userId,
         vacansy: user.titleVacansy
      })
      navigate('/')
   }

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
                  isSentByUser={message.author_id === 156580969}
               />
            ))}
         </div>
         <MessageInput onSendMessage={sendNewMessage} placeholder={"Введите сообщение..."} />
         <DescriptionInput description={description} setDescription={setDescription} />
         <div className="flex mt-6">
            <input 
               placeholder="Введите номер клиента" 
               onChange={(event) => onChangePhone(event.target.value)}
               className="pr-4 pl-2 border-2 border-green-500 border-solid around rounded-md"
            />
            <button
               className={`ml-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none ${!phone && 'opacity-50 hover:bg-blue-500'}`}
               disabled={!phone}
               onClick={() => addLid()}
            >
               Добавить в собеседуемые
            </button>
            <button
               className="ml-4 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
               onClick={() => addReject()}
            >
               Добавить в отказан
            </button>
         </div>
      </div>
   );
}
