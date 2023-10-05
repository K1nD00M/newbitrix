import { useEffect, useState } from "react"
import { apiServer } from "../../api/api"
import { PhoneMessage } from "./PhoneMessage"

export default function PhoneChat({ number }) {
   const [chat, setChat] = useState([])
   const [isError, setIsError] = useState(false)

   const [isOpen, setIsOpen] = useState(false)

   const [message, setMessage] = useState('')

   useEffect(() => {
      const getChat = async () => {
         try {
            const data = await apiServer.getChatPhone(number)
            const messages = data.messages.filter(item => typeof item.body === 'string')
            setChat(messages)
         } catch (error) {
            setIsError(true)
         }
      }
      if(number && isOpen) getChat()
   }, [isOpen, number])

   const sendMessage = async () => {
      const data = await apiServer.sendChatMessage(number, message)
      setChat(data.messages)
   }

   if(isError) { 
      return <div>Ошибка при открытии чата</div>
   }

   return (
      <div>
         <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-green-500 font-bold border-1 border-solid border-green-500 p-2"
         >
            Открыть чат
         </button>
         <div className={`${isOpen ? 'h-auto' : 'h-0'} overflow-hidden `}>
            <div className="flex flex-col-reverse">
               {chat.map(item => (
                  <PhoneMessage text={item.body} isSentByUser={item.from === '79633437672@c.us'} key={item.id} />
               ))}
            </div>
            {!chat.length || (
               <div className="flex mt-2 mb-4 gap-4">
                  <input 
                     type="text"
                     className="flex-grow px-3 py-2 w-full rounded-lg border border-solid border-gray-400 focus:outline-none focus:border-green-500"
                     placeholder={'Введите сообщение'}
                     value={message}
                     onChange={(event) => setMessage(event.target.value)}
                  />
                  <button
                     className="px-3 py-2 border border-solid bg-green-500 text-white"
                     onClick={sendMessage}
                  >
                     Отправить
                  </button>
               </div>
            )}
            {!chat.length && (<div>Переписка с кандидатом еще не ведется</div>)}
         </div>
      </div>
   )
}
