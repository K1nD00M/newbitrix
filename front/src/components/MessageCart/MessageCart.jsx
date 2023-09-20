import { Link } from "react-router-dom"

export default function MessageCart(props) {
   const {
      chatId,
      titleVacansy,
      name,
      avatar,
      lastMessage,
      time
   } = props

   let timeMessage = ''

   if(time < 60000) {
      timeMessage = `${time / 1000} сек. назад`      
   }
   if(time < 3600000) {
      timeMessage = `${Math.floor(time / 60 / 1000)} мин. назад`      
   }
   if(time >= 3600000) {
      timeMessage = `${Math.floor(time / 60 / 60 / 1000)} ч. назад`       
   }

   return (
      <Link to={`/chat/${chatId}`}>
         <li className="flex justify-between gap-x-6 py-5 pr-2 
         hover:bg-gray-100 cursor-pointer"
         >
            <div className="flex min-w-0 gap-x-4 ml-3">
               <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={avatar} alt="" />
               <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{name}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{lastMessage}</p>
               </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
               <p className="text-sm leading-6 text-gray-900">{titleVacansy}</p>
               <p className="mt-1 text-xs leading-5 text-gray-500">{timeMessage}</p>
            </div>
         </li>
      </Link>
   )
}
