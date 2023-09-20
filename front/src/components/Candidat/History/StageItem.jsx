import { timeConvert } from "../../../lib/timeConvert"

const status = [
   {
      id: 'new',
      text: 'Первичное касание'
   },
   {
      id: 'phone',
      text: 'Телефонное интервью'
   },
   {
      id: 'interview',
      text: 'Назначить собеседование'
   },
   {
      id: 'thinks',
      text: 'Думаем'
   },
   {
      id: 'intern',
      text: 'Пригласить на стажировку'
   },
   {
      id: 'ok',
      text: 'Принято'
   },
   {
      id: 'rejectHr',
      text: 'Отказ HR'
   },
   {
      id: 'rejectCandidate',
      text: 'Отказ кандидата'
   },
   {
      id: 'notCome',
      text: 'Не пришел'
   },
]

export default function StageItem({ item }) {
   const timeUpdate = timeConvert(item.time)
   return (
      <div className="bg-white p-4 shadow-md rounded-md border-b-2 border-gray-200">
         <div className="flex items-center justify-between">
            <div className="font-semibold">
               <span className="text-lg">Новая стадия:</span><br/> {status.find(stat => stat.id === item.stage).text}
            </div>
            <div className="text-sm text-gray-500">
               <span>{timeUpdate}</span>
            </div>
         </div>
         <div className="mt-2">
            <div className="text-gray-700">
               Описание: {item.description}
            </div>
         </div>
      </div>
   )
}
