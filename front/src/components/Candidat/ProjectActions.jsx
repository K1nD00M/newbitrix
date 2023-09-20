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

export default function ProjectActions({item, description, setDescription, stage, setStage}) {
   return (
      <div>
         <h3 className="text-center font-bold text-xl mt-4 mb-2">Перевести на новый шаг</h3>
         <select
            value={stage}
            onChange={(event) => setStage(event.target.value)}
         >
            {status.map(stat => (
               <option key={stat.id} >{stat.text}</option>
            ))}
         </select>
         <textarea 
            className="resize-none block w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows="4"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Введите описание кандидата для нового шага"
         />
      </div>
      
   )
}
