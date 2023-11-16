import { ReactComponent as Logo } from '../assets/home.svg';
import { Link } from 'react-router-dom'

export default function Header() {
   return (
      <div className="bg-slate-900 w-full h-16 text-xl text-white flex-shrink-0 fixed z-10">
         <div className="mx-auto px-2 max-w-7xl flex items-center justify-between h-full">
            <h3>Рекрутинг</h3>
            <Link to={'/candidates'} className='text-white text-base'>
               Рассмотренные заявки 
            </Link>
            <Link to={'/phones'} className='text-white text-base'>
               SMS
            </Link>
            <Link to={'/add'} className='text-white text-base'>
               Добавить кандидата
            </Link>
            <div className='flex gap-7'>
               <Link to={'/avito'}>
                  Авито C.
               </Link>
               <Link to={'/'}>
                  Авито
               </Link>
            </div>
         </div>
      </div>
   )
}
