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
         const data = await apiServer.getChatPhone(number)
         const messages = data.messages.filter(item => typeof item.body === 'string')
         setChat(messages)
      }
      if(number && isOpen) getChat()
   }, [isOpen, number])

   const sendMessage = async () => {
      const data = await apiServer.sendChatMessage(number, message)
      setChat(data.messages.filter(item => typeof item.body === 'string'))
   }

   const helloMessage = () => {
      setMessage('Добрый день. Благодарим Вас за проявленный интерес к нашей вакансии «». К сожалению, не указан ваш номер телефона, вы можете перезвонить нам на номер: +7 (969) 203-02-45 или оставьте свой номер, и мы с вами свяжемся.')
   }
   const noCallMessage = () => {
      setMessage('Добрый день. К сожалению, не смогла до Вас дозвониться. Перезвоните, пожалуйста по номеру: +7968 193-54-71. Или напишите в ватсап.')
   }
   const goodbuyMessage = () => {
      setMessage(`Добрый день! Благодарим за время, которое вы уделили знакомству с нашей компанией и открытой сейчас вакансией. Было приятно пообщаться и узнать больше про ваши планы на будущее и текущий опыт. К сожалению, несмотря на позитивное впечатление от нашего общения мы решили продолжить диалог с другими кандидатами. Желаем интересных проектов!`)
   }
   const slavaMessage = () => {
      setMessage(`Добрый день! Ждем вас на собеседование 05.07.2023 в 10:00 по адресу: м. Проспект Славы или м. Дунайская, ул. Софийская дом 62 корпус 6.
тел. для связи - Кирилл - 89658133676.
С собой необходимо взять паспорт.
      `)}
   const prosvetMessage = () => {
      setMessage(`Добрый день! Ждем вас на собеседование 05.07.23 в 14:00 по адресу: м. Проспект Просвещения, п. Бугры, ул. 2-й Гаражный проезд, дом 10 строение 1. (Через Яндекс-навигатор).
тел. для связи - Дмитрий - 89669330581.   
С собой необходимо взять паспорт.
   `)}
   const interviewMessage = () => {
      setMessage(`Компания Веселый водовоз, приглашает Вас на интервью в свой офис по адресу: ул. Седова, д. 12, БЦ Т4, 3 этаж, кабинет 302. От метро Елизаровская до нашего Бизнес-центра ходит бесплатный автобус "Теорема" (интервал 5-10 мин).
Время интервью: 05.07.2023 в 12:00.
Как подойдете, сообщите, необходимо выписать пропуск.
      `)
   }
   const goraMessage = () => {
      setMessage(`Добрый день! Приглашаем вас на собеседование 05.06.23 в 14:00 по адресу: ул. Снятная гора, д. 2.
тел. для связи - Владимир - 89643164525 или Алексей 89118910557
      `)
   }
   const fantomMessage = () => {
      setMessage(`Компания Фантом приглашает Вас на интервью в свой офис по адресу: ул. Седова, д. 12, БЦ Т4, 1 этаж, кабинет 115. От метро Елизаровская до нашего Бизнес-центра ходит бесплатный автобус "Теорема" (интервал 5-10 мин).
Время интервью: 22.05.2023 в 11:00.
Контактное лицо: Роман +7 (992) 195-25-01.
      `)
   }
   const rejectMessage = () => {
      setMessage(`Здравствуйте!
Большое спасибо за интерес, проявленный к вакансии. К сожалению, в настоящий момент мы не готовы пригласить Вас на дальнейшее интервью по этой вакансии. Мы внимательно ознакомились с Вашим резюме и, возможно, вернемся к Вашей кандидатуре, когда у нас возникнет такая потребность.
      `)
   }
   const reminderMessage = () => {
      setMessage(`Здравствуйте, Ирина.
Напоминаем вам, что вы записаны к нам на собеседование 12.07.23 в 12:00.
По адресу: 
Ожидаем вас?
      `)
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
         <div className={`${isOpen ? 'h-auto' : 'h-0'} overflow-hidden`}>
            <div className="flex flex-col-reverse">
               {chat.map(item => (
                  <PhoneMessage text={item.body} isSentByUser={item.from === '79633437672@c.us'} key={item.id} />
               ))}
            </div>
            <div className="flex mt-2 mb-4 gap-4">
               <textarea
                  rows={4}
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
            <div className='flex gap-5 mb-4 flex-wrap'>
               <button 
                  className="ml-4 px-4 py-2 text-white bg-blue-300 rounded-lg hover:bg-blue-600 focus:outline-none" 
                  onClick={helloMessage}
               >
               Приветствие
               </button>
               <button 
                  className="ml-4 px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none" 
                  onClick={noCallMessage}
               >
               Не дозвонились
               </button>
               <button 
                  className="ml-4 px-4 py-2 text-white bg-red-500 rounded-lg focus:outline-none" 
                  onClick={goodbuyMessage}
               >
               Неудача
               </button>
               <button 
                  className="ml-4 px-4 py-2 text-white bg-cyan-300 rounded-lg focus:outline-none" 
                  onClick={slavaMessage}
               >
               Софийская
               </button>
               <button 
                  className="ml-4 px-4 py-2 text-white bg-cyan-400 rounded-lg focus:outline-none" 
                  onClick={prosvetMessage}
               >
               Бугры
               </button>
               <button 
                  className="ml-4 px-4 py-2 text-white bg-cyan-500 rounded-lg focus:outline-none" 
                  onClick={interviewMessage}
               >
               Офис
               </button>
               <button 
                  className="ml-4 px-4 py-2 text-white bg-cyan-600 rounded-lg focus:outline-none" 
                  onClick={goraMessage}
               >
               Псков
               </button>
               <button 
                  className="ml-4 px-4 py-2 text-white bg-cyan-700 rounded-lg focus:outline-none" 
                  onClick={fantomMessage}
               >
               Фантом
               </button>
               <button 
                  className="ml-4 px-4 py-2 text-white bg-red-400 rounded-lg focus:outline-none" 
                  onClick={rejectMessage}
               >
               Отказ
               </button>
               <button 
                  className="ml-4 px-4 py-2 text-white bg-yellow-300 rounded-lg focus:outline-none" 
                  onClick={reminderMessage}
               >
               Напоминание
               </button>
            </div>
            {!chat.length && (<div>Переписка с кандидатом еще не ведется</div>)}
         </div>
      </div>
   )
}
