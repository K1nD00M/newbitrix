import { useEffect, useState } from "react"
import { apiServer } from "../../api/api"
import { PhoneMessage } from "./PhoneMessage"

export default function PhoneChat({ number }) {
   const [chat, setChat] = useState([])
   const [isError, setIsError] = useState(false)

   const [isOpen, setIsOpen] = useState(false)

   useEffect(() => {
      const getChat = async () => {
         try {
            const data = await apiServer.getChatPhone(number)
            const messages = data.messages
            setChat(messages)
         } catch (error) {
            setIsError(true)
         }
      }
      if(number) getChat()
   }, [])

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
         <div className={`${isOpen ? 'h-auto' : 'h-0'} overflow-hidden`}>
            {chat.map(item => (
               <PhoneMessage text={item.body} isSentByUser={item.from === '79633437672@c.us'} key={item.id} />
            ))}
            {!chat.length && (<div>Переписка с кандидатом еще не ведется</div>)}
         </div>
      </div>
   )
}
