import { useState } from "react";
import CandidatModal from "./CandidatModal";
import { timeConvert } from "../../lib/timeConvert";

export default function ItemCanban({ item }) {
   const [isOpen, setIsOpen] = useState(false)

   let firstName = ''
   let lastName = ''
   
   const lastItemHistory = item.history[item.history.length - 1];
   const lastDescription = lastItemHistory ? lastItemHistory.description : null;

   const formattedDate = timeConvert(item.timeUpdate)

   if(item.area === 'hh') {
      firstName = item.data.resume.first_name
      lastName = item.data.resume.last_name
   } else {
      firstName = item.data.resume.first_name
      lastName = item.data.resume.last_name
   }

   return (
      <>
         <div className="p-4 flex flex-col w-80 gap-3 rounded-3xl cursor-pointer"
            onClick={() => setIsOpen(true)}
         >
            <div className="flex justify-between">
               <h3>{firstName + ' ' + lastName}</h3>
               <h4>{formattedDate}</h4>
            </div>
            <div>
               {lastDescription}
            </div>
            <div>
               <span className={`${item.area === 'hh' ? 'bg-red-600' : 'bg-green-500'} px-3 py-2 rounded-lg text-white`}>{item.area === 'hh' ? 'HH' : "Avito"}</span>
            </div>
         </div>
      
         <CandidatModal item={item} isOpen={isOpen} setIsOpen={setIsOpen} />
      </>
   )
}
