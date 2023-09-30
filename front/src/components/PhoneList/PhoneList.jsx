import { useEffect, useState } from "react"
import { apiServer } from "../../api/api"
import PhoneCard from "./PhoneCard"
import PhoneCardHH from "./PhoneCardHH"
import PhoneCardAvito from "./PhoneCardAvito"
import PhoneChat from "./PhoneChat"

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
               return (
                  <div key={index}>
                     <PhoneCardHH info={item} />
                     <PhoneChat number={item.number} />
                  </div>
               )
            } 
            else{
               return (
                  <div key={index}>
                     <PhoneCardAvito info={item}  />
                     <PhoneChat number={item.phone} />
                  </div>
               )
            }
         })}
      </div>
   )
}
