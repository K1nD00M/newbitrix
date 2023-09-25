import functionsBX from "../../bx24/functions";

function dateFormating(dateString) {
   const date = new Date(dateString);
 
   const hours = date.getHours().toString().padStart(2, '0');
   const minutes = (date.getMinutes() + 3).toString().padStart(2, '0');
   const day = date.getDate().toString().padStart(2, '0');
   const month = (date.getMonth() + 1).toString().padStart(2, '0');
 
   const formattedDate = `${hours}:${minutes} ${day}.${month}`;
   
   
   return formattedDate;
}

export default function PhoneCardHH({ info }) {
   return (
      <div className="flex flex-col pb-10">
         <div className="flex justify-between p-4 border-b border-gray-300">
            <div className="w-1/4">
               <h3 className="text-lg font-semibold">{info.candidates.data.resume.last_name}</h3>
            </div>
            <div className="w-1/4">
               <h3 className="text-lg text-gray-600">{info.candidates.data.resume.first_name}</h3>
            </div>
            <div className="w-1/4">
               <h3 className="text-lg text-gray-600">{info.candidates.data.vacancy.name}</h3>
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
      </div>
   )
}
