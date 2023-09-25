import { Routes, Route } from 'react-router-dom'
import MessagesList from '../components/MessagesList/MessagesList'
import Chat from '../components/Chat/Chat'
import PhoneList from '../components/PhoneList/PhoneList'
import MessagesHH from '../components/MessagesHH/MessagesHH'
import Canban from '../components/Canban/Canban'
import MessagesListTwo from '../components/MessagesList/MessagesListTwo'
import ChatTwo from '../components/Chat/ChatTwo'

const routerConfig = [
   {
      path: '/',
      element: <MessagesList />
   },
   {
      path: '/chat/:chatId',
      element: <Chat />
   },
   {
      path: '/phones',
      element: <PhoneList />
   },
   {
      path: '/hh',
      element: <MessagesHH />
   },
   {
      path: '/candidates',
      element: <Canban />
   },
   {
      path: '/avito',
      element: <MessagesListTwo />
   },
   {
      path: '/chat/two/:chatId',
      element: <ChatTwo />
   }
]

const AppRouter =
   <Routes>
      {routerConfig.map((route, index) => (
         <Route key={index} path={route.path} element={route.element} />
      ))}
   </Routes>

export default AppRouter