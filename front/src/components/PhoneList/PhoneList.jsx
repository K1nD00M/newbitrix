import { useEffect, useState } from "react"
import { apiServer } from "../../api/api"
import PhoneCard from "./PhoneCard"
import PhoneCardHH from "./PhoneCardHH"
import PhoneCardAvito from "./PhoneCardAvito"
import PhoneChat from "./PhoneChat"

export default function PhoneList() {
   const [phones, setPhones] = useState([])
   const [phoneFilter, setPhoneFilter] = useState('')
   const [filteredCandidates, setFilteredCandidates] = useState([])

   useEffect(() => {
      const getPhones = async () => {
         const phonesRes = await apiServer.getPhones()
         setPhones(phonesRes)
      }

      getPhones()
   }, [])

   useEffect(() => {
      const newCandidates = phones.filter(item => item.phone.includes(phoneFilter))
      setFilteredCandidates(newCandidates)
   }, [phoneFilter, phones])   

   if(!phones.length) {
      return (
         <div>
            Список отложенных сообщений пуст
         </div>
      )
   }

   return (
      <div>
         <input 
            value={phoneFilter}
            onChange={(event) => setPhoneFilter(event.target.value)}
            placeholder="Фильтр по номеру"
            className="flex-grow px-5 py-2 rounded-lg border border-blue-400 border-solid focus:outline-none focus:border-blue-500"
         />
         <div className="flex flex-col-reverse">
            {filteredCandidates.map((item, index) => {
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
      </div>
   )
}
