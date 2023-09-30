import { useEffect, useState } from "react";
import CandidatModal from "./CandidatModal";
import { timeConvert } from "../../lib/timeConvert";

export default function ItemCanban({ item, isGetNewCandidates }) {
   const [isOpen, setIsOpen] = useState(false)

   const closeAndGetCandidate = (newValue = true) => {
      if(!newValue) {
         setIsOpen(false)
      } else {
         console.log(321)
         setIsOpen(false)
         isGetNewCandidates(true)
      }
      
   }

   let firstName = ''
   let lastName = ''
   let vacancy = ''
   
   const lastItemHistory = item.history[item.history.length - 1];
   const lastDescription = lastItemHistory ? lastItemHistory.description : null;

   const formattedDate = timeConvert(item.timeUpdate)

   if(item.area === 'hh') {
      firstName = item.data.resume.first_name
      lastName = item.data.resume.last_name
      vacancy = item.data.vacancy.name
   } else {
      firstName = item.data.name
      lastName = ''
      vacancy = item.data.titleVacansy
   }

   return (
      <>
         <div className="p-4 flex flex-col w-80 gap-3 rounded-3xl cursor-pointer bg-slate-200"
            onClick={() => setIsOpen(true)}
         > 
            <div className="flex justify-between">
               <h3 className="font-semibold">{vacancy}</h3>
            </div>
            <h4 className="opacity-60">{formattedDate}</h4>
            <div className="flex justify-between ">
               <h3>{firstName + ' ' + lastName}</h3>
            </div>
            <div>
               {lastDescription}
            </div>
            <div>
               <span className={`${item.area === 'hh' ? 'bg-red-600' : 'bg-green-500'} px-3 py-2 rounded-lg text-white`}>{item.area === 'hh' ? 'HH' : "Avito"}</span>
            </div>
         </div>
      
         <CandidatModal item={item} isOpen={isOpen} setIsOpen={closeAndGetCandidate} />
      </>
   )
}
