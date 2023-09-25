import { useState } from "react"
import { apiHH } from "../../api/api";

export default function HhActoins({item,messageHh, messageMail, setMessageHh, setMessageMail, selectedAction, handleActionChange}) {
   
   
   return (
      <div className="px-4 mt-8 pb-12">
         <h3 className="text-center font-bold text-xl">Изменить состояние кандидата в HH</h3>
         <select
            value={selectedAction}
            onChange={handleActionChange}
            className="block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
         >
            <option value=''>Не выбрано</option>
            {item.data.actions.map(item => (
               <option value={item.id} key={item.id}>{item.name}</option>
            ))}
         </select>
         <h3 className="text-center font-bold text-base mt-4 mb-2">Сообщение на почту</h3>
         <textarea 
            className="resize-none block w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows="7"
            value={messageMail}
            onChange={(event) => setMessageMail(event.target.value)}
            placeholder="Выбите статус кандидата и введите сообщение"
            disabled={!selectedAction}
         />
         <h3 className="text-center font-bold text-base mt-4 mb-2">Сообщение в HH</h3>
         <textarea 
            className="resize-none block w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows="4"
            value={messageHh}
            onChange={(event) => setMessageHh(event.target.value)}
            placeholder="Выбите статус кандидата и введите сообщение"
         />
      </div>
   )
}
