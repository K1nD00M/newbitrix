import { useEffect } from "react"
import WindowCanban from "./WindowCanban"
import { apiServer } from "../../api/api"
import { useState } from "react"

export default function Canban() {
   const [candidates, setCandidates] = useState([])
   const [isGetNewCandidates, setIsGetNewCandidates] = useState(true)

   useEffect(() => {
      const getCandidates = async () => {
         const candidates = await apiServer.getCandidates()
         setCandidates(candidates)
         setIsGetNewCandidates(false)
      }
      if(isGetNewCandidates) getCandidates()
   }, [isGetNewCandidates])

   return (
      <div className="flex overflow-x-scroll gap-10 bg-slate-100 p-6 h-full">
         <WindowCanban status={'new'} candidates={candidates} isGetNewCandidates={setIsGetNewCandidates}/>
         <WindowCanban status={'phone'} candidates={candidates} isGetNewCandidates={setIsGetNewCandidates}/>
         <WindowCanban status={'interview'} candidates={candidates} isGetNewCandidates={setIsGetNewCandidates} />
         <WindowCanban status={'thinks'} candidates={candidates} isGetNewCandidates={setIsGetNewCandidates}/>
         <WindowCanban status={'intern'} candidates={candidates} isGetNewCandidates={setIsGetNewCandidates}/>
         <WindowCanban status={'notCome'} candidates={candidates} isGetNewCandidates={setIsGetNewCandidates}/>
         <WindowCanban status={'rejectCandidate'} candidates={candidates} isGetNewCandidates={setIsGetNewCandidates}/>
         <WindowCanban status={'rejectHr'} candidates={candidates} isGetNewCandidates={setIsGetNewCandidates}/>
         <WindowCanban status={'ok'} candidates={candidates} isGetNewCandidates={setIsGetNewCandidates}/>
      </div>
   )
}
