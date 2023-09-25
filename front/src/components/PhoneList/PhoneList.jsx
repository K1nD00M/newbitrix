import { useEffect, useState } from "react"
import { apiServer } from "../../api/api"
import PhoneCard from "./PhoneCard"
import PhoneCardHH from "./PhoneCardHH"
import PhoneCardAvito from "./PhoneCardAvito"

export default function PhoneList() {
   const [phones, setPhones] = useState([])

   useEffect(() => {
      const getPhones = async () => {
         const phonesRes = await apiServer.getPhones()
         setPhones(phonesRes)
      }

      getPhones()
   }, [])

   if(!phones.length) {
      return (
         <div>
            Список отложенных сообщений пуст
         </div>
      )
   }

   return (
      <div>
         {phones.map((item, index) => {
            if(item.area === 'hh') {
               return (<PhoneCardHH info={item} key={index} />)
            } 
            else{
               return (<PhoneCardAvito info={item} key={index} />)
            }
         })}
      </div>
   )
}
