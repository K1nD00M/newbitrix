import { useState } from 'react';

function MessageInput({ onSendMessage, placeholder }) {
   const [message, setMessage] = useState('');

   const handleInputChange = (event) => {
      setMessage(event.target.value);
   };

   const handleSendMessage = () => {
      if (message.trim() !== '') {
         onSendMessage(message);
         setMessage('');
      }
   };

   const helloMessage = () => {
      setMessage('Здравствуйте, напишите номер телефона, по которому можно с Вами связаться')
   }
   const noCallMessage = () => {
      setMessage('Добрый день. К сожалению, не смогла до Вас дозвониться. Перезвоните, пожалуйста по номеру: +7968 193-54-71. Или напишите в ватсап.')
   }
   const goodbuyMessage = () => {
      setMessage(`Добрый день! Благодарим за время, которое вы уделили знакомству с нашей компанией и открытой сейчас вакансией. Было приятно пообщаться и узнать больше про ваши планы на будущее и текущий опыт. К сожалению, несмотря на позитивное впечатление от нашего общения мы решили продолжить диалог с другими кандидатами. Желаем интересных проектов!`)
   }

   return (
      <div>
         <div className="flex p-4 border-t border-gray-300">
            <input
               type="text"
               className="flex-grow px-3 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-blue-500"
               placeholder={placeholder}
               value={message}
               onChange={handleInputChange}
               onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                     handleSendMessage();
                  }
               }}
            />
            <button
               className="ml-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
               onClick={handleSendMessage}
            >
            Отправить
            </button>
         </div>
         <div className='flex gap-5 mb-4'>
            <button 
               className="ml-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none" 
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
               className="ml-4 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none" 
               onClick={goodbuyMessage}
            >
               Неудача
            </button>
         </div>
      </div>
   );
}

export default MessageInput;
