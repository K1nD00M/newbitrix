import { useEffect } from "react"
import WindowCanban from "./WindowCanban"
import { apiServer } from "../../api/api"
import { useState } from "react"

export default function Canban() {
   const [candidates, setCandidates] = useState([])
   const [isGetNewCandidates, setIsGetNewCandidates] = useState(true)

   const [phoneFilter, setPhoneFilter] = useState('')
   const [vacancyFilter, setVacancyFilter] = useState('')
   const [filteredCandidates, setFilteredCandidates] = useState([])
 
   useEffect(() => {
      const getCandidates = async () => {
         const candidates = await apiServer.getCandidates()
         setCandidates(candidates)
         setIsGetNewCandidates(false)
      }
      if(isGetNewCandidates) getCandidates()
   }, [isGetNewCandidates])

   useEffect(() => {
      const phoneCandidates = candidates.filter(item => item?.phone.includes(phoneFilter))
      const  vacansyCandidates = phoneCandidates.filter(item => item.area === 'hh' 
         ? item?.data?.vacancy?.name.includes(vacancyFilter) 
         : item?.data?.titleVacansy.includes(vacancyFilter)
      )
      setFilteredCandidates(vacansyCandidates)
   }, [phoneFilter, vacancyFilter, candidates])

   return (
      <div>
         <input 
            value={phoneFilter}
            onChange={(event) => setPhoneFilter(event.target.value)}
            placeholder="Фильтр по номеру"
            className="flex-grow px-5 py-2 rounded-lg border border-blue-400 border-solid focus:outline-none focus:border-blue-500"
         />
         <input 
            value={vacancyFilter}
            onChange={(event) => setVacancyFilter(event.target.value)}
            placeholder="Фильтр по вакансии"
            className="flex-grow px-5 py-2 rounded-lg border border-blue-400 border-solid focus:outline-none focus:border-blue-500"
         />
         <div className="flex overflow-x-scroll gap-10 bg-slate-100 p-6 h-full">
            <WindowCanban status={'new'} candidates={filteredCandidates} isGetNewCandidates={setIsGetNewCandidates}/>
            <WindowCanban status={'phone'} candidates={filteredCandidates} isGetNewCandidates={setIsGetNewCandidates}/>
            <WindowCanban status={'interview'} candidates={filteredCandidates} isGetNewCandidates={setIsGetNewCandidates} />
            <WindowCanban status={'thinks'} candidates={filteredCandidates} isGetNewCandidates={setIsGetNewCandidates}/>
            <WindowCanban status={'thinksCandidate'} candidates={filteredCandidates} isGetNewCandidates={setIsGetNewCandidates}/>
            <WindowCanban status={'intern'} candidates={filteredCandidates} isGetNewCandidates={setIsGetNewCandidates}/>
            <WindowCanban status={'notCome'} candidates={filteredCandidates} isGetNewCandidates={setIsGetNewCandidates}/>
            <WindowCanban status={'rejectCandidate'} candidates={filteredCandidates} isGetNewCandidates={setIsGetNewCandidates}/>
            <WindowCanban status={'rejectHr'} candidates={filteredCandidates} isGetNewCandidates={setIsGetNewCandidates}/>
            <WindowCanban status={'ok'} candidates={filteredCandidates} isGetNewCandidates={setIsGetNewCandidates}/>
         </div>
      </div>
   )
}
