import { useState } from "react";
import { useEffect } from "react";
import ItemCanban from "./ItemCanban";

const WindowCanban = (({ status, candidates }) => {
   const [windowCandidates, setWindowCandidates] = useState([])

   const theme = {
      new: 'bg-sky-200',
      phone: 'bg-sky-300',
      interview: 'bg-sky-400',
      thinks: 'bg-sky-500',
      intern: 'bg-sky-600',
      ok: 'bg-sky-600',
      rejectHr: 'bg-red-300',
      rejectCandidate: 'bg-red-400',
      notCome: 'bg-red-700',
   }

   let title = ''

   if (status === 'new') {
      title = 'Первое касание';
   } else if (status === 'phone') {
      title = 'Телефонное интервью';
   } else if (status === 'interview') {
      title = 'Провести собеседование';
   } else if (status === 'thinks') {
      title = 'Думаем';
   }else if (status === 'intern') {
      title = 'Назначить стажировку';
   } else if (status === 'ok') {
      title = 'Принят';
   } else if (status === 'rejectHr') {
      title = 'Отказ HR';
   } else if (status === 'rejectCandidate') {
      title = 'Отказ кандидата';
   } else if (status === 'notCome') {
      title = 'Не пришел';
   }

   useEffect(() => {
      const thisCandidates = candidates.filter(item => item.stage === status)
      setWindowCandidates(thisCandidates)
   }, [candidates, status])

   return (
      <div>
         <div className={`text-center p-3 text-lg font-bold ${theme[status]}`}>
            {title}
         </div>
         <div className="flex flex-col w-80 gap-5 bg-slate-200">
            {windowCandidates.map(item => (
               <ItemCanban item={item} key={item.data} />
            ))}
         </div>
      </div>
   )
})

export default WindowCanban