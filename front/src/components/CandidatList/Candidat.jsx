import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
import functionsBX from "../../bx24/functions";
import { apiServer } from "../../api/api";

export default function PhoneAvito({ candidat }) {
   const [startDate, setStartDate] = useState([new Date()]);
   const [messages, setMessages] = useState([''])
   
   const addMessage = () => {
      setStartDate([...startDate, new Date()])
      setMessages([...messages, ''])
   }

   const handleMessageChange = (index, value) => {
      const newMessages = [...messages];
      newMessages[index] = value;
      setMessages(newMessages);
   };

   const handleDateChange = (index, value) => {
      const newDates = [...startDate];
      newDates[index] = value;
      setStartDate(newDates);
   };

   const setInterview = (candidat) => {
      apiServer.setInterview(candidat, messages, startDate)
   }

   return (
      <div className="flex flex-col mb-10">
         <div className="flex justify-between p-4 border-b border-gray-300">
            <div className="w-1/4">
               <h3 className="text-lg font-semibold">{candidat.TITLE}</h3>
            </div>
            <div className="w-1/4">
               <h3 className="text-lg text-gray-600">{candidat.UF_CRM_PHONE}</h3>
            </div>
            <div className="w-1/4">
               <h3 className="text-lg text-gray-600">{candidat.UF_CRM_VACANSY}</h3>
            </div>
            <button 
               onClick={addMessage}
               className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none"
            >
               Добавить сообщение
            </button>
         </div>
         <div className="flex flex-col">
            <span className="opacity-70 text-sm mb-2">Описание</span>
            <div>
               {candidat.DESCRIPTION_CANDIDAT}
            </div>
         </div>
         <span className="opacity-70 text-sm mb-2">Описание</span>
         {messages.map((item, index) => (
            <div className="mb-3" key={index}>
               <textarea
                  type="text"
                  rows={4}
                  className="w-3/4 flex-grow px-3 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="Введите сообщение..."
                  value={item}
                  onChange={(event) => handleMessageChange(index, event.target.value)}
               />
               <DatePicker
                  locale={ru}
                  selected={startDate[index]}
                  onChange={(date) => handleDateChange(index, date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={5}
                  minDate={new Date()}
                  dateFormat="Pp"
                  className="border border-gray-300 rounded px-3 py-2 w-full text-center focus:outline-none focus:ring focus:border-blue-300"
               />
            </div>
         ))}   
         <button 
            onClick={() => setInterview(candidat, messages, startDate)}
            className={`
               px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none
               ${messages.includes('') && 'opacity-50 hover:bg-blue-500'}
            `}
            disabled={messages.includes('')}
         >
            Отправить
         </button>
      </div>
   )
}
