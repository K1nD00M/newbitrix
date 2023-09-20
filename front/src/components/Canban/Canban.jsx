import { useEffect } from "react"
import WindowCanban from "./WindowCanban"
import { apiServer } from "../../api/api"
import { useState } from "react"

export default function Canban() {
   const [candidates, setCandidates] = useState([])
   useEffect(() => {
      const getCandidates = async () => {
         const candidates = await apiServer.getCandidates()
         setCandidates(candidates)
      }
      getCandidates()
   }, [])

   return (
      <div className="flex overflow-x-scroll gap-10 bg-slate-100 p-6">
         <WindowCanban status={'new'} candidates={candidates} />
         <WindowCanban status={'phone'} candidates={candidates} />
         <WindowCanban status={'interview'} candidates={candidates} />
         <WindowCanban status={'thinks'} candidates={candidates} />
         <WindowCanban status={'intern'} candidates={candidates} />
         <WindowCanban status={'notCome'} candidates={candidates} />
         <WindowCanban status={'rejectCandidate'} candidates={candidates} />
         <WindowCanban status={'rejectHr'} candidates={candidates} />
         <WindowCanban status={'ok'} candidates={candidates} />
      </div>
   )
}
