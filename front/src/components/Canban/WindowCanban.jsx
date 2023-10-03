import { useState } from "react";
import { useEffect } from "react";
import ItemCanban from "./ItemCanban";

const WindowCanban = (({ status, candidates, isGetNewCandidates }) => {
   const [windowCandidates, setWindowCandidates] = useState([])

   const theme = {
      new: 'bg-sky-200',
      phone: 'bg-sky-300',
      interview: 'bg-sky-400',
      thinks: 'bg-sky-500',
      thinksCandidate: 'bg-sky-600',
      intern: 'bg-sky-700',
      ok: 'bg-sky-800',
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
      title = 'Собеседование';
   } else if (status === 'thinks') {
      title = 'Мы думаем';
   } else if (status === 'thinksCandidate') {
      title = 'Кандидат думает';
   }else if (status === 'intern') {
      title = 'Стажировка';
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
      thisCandidates.sort((a,b) => a.timeUpdate < b.timeUpdate ? 1 : -1) 
      setWindowCandidates(thisCandidates)
   }, [candidates, status])

   return (
      <div className="">
         <div className={`w-full text-center p-3 text-lg font-bold ${theme[status]}`}>
            {title}
         </div>
         <div className="flex flex-col gap-5 pt-4 overflow-y-scroll h-full">
            {windowCandidates.map(item => (
               <ItemCanban item={item} key={item.data} isGetNewCandidates={isGetNewCandidates} />
            ))}
         </div>
      </div>
   )
})

export default WindowCanban