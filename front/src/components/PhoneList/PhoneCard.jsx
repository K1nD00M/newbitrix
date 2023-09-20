import functionsBX from "../../bx24/functions";

function dateFormating(dateString) {
   const moscowTimeZoneOffset = 3 * 60; // Московское время UTC+3
   const date = new Date(dateString);
  
   // Применяем смещение временной зоны
   date.setMinutes(date.getMinutes() + moscowTimeZoneOffset);
  
   const hours = date.getUTCHours().toString().padStart(2, '0');
   const minutes = date.getUTCMinutes().toString().padStart(2, '0');

   // Получаем день и месяц
   const day = date.getUTCDate().toString().padStart(2, '0');
   const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');

   const formattedDate = `${hours}:${minutes} ${day}.${month}`;

   return formattedDate;
}

export default function PhoneCard({ info }) {
   return (
      <div className="flex flex-col pb-10">
         <div className="flex justify-between p-4 border-b border-gray-300">
            <div className="w-1/4">
               <h3 className="text-lg font-semibold">{info.candidates.TITLE}</h3>
            </div>
            <div className="w-1/4">
               <h3 className="text-lg text-gray-600">{info.candidates.UF_CRM_PHONE}</h3>
            </div>
            <div className="w-1/4">
               <h3 className="text-lg text-gray-600">{info.candidates.UF_CRM_VACANSY}</h3>
            </div>
         </div>
         <div className="flex flex-col gap-5">
            {info.messages.map((item, index) => (
               <div className="flex justify-between" key={index}>
                  <div className="w-2/3">
                     {item}
                  </div>
                  <div className="w-1/6 text-start">
                     {dateFormating(info.dates[index])}
                  </div>
                  <div className={info.isSend[index] ? 'text-green-500 w-1/6 text-center' : 'text-red-500 w-1/6 text-center'}>
                     {info.isSend[index] ? 'Отправлено' : 'В ожидании'}
                  </div>
               </div>
            ))}
         </div>
         <div className="flex justify-end gap-5 mt-10">
            <button 
               onClick={() => functionsBX.updateOkCandidate(info.candidates.ID)}
               className='px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none'
            >
               Успешно пройдено
            </button>
            <button 
               onClick={() => functionsBX.rejectOkCandidate(info.candidates.ID)}
               className='px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none'
            >
               Отказано
            </button>
            <button 
               onClick={() => functionsBX.rejectDontGoCandidate(info.candidates.ID)}
               className='px-4 py-2 text-white bg-yellow-400 rounded-lg hover:bg-yellow-500 focus:outline-none'
            >
               Не пришел на собеседование
            </button>
         </div>
      </div>
   )
}
