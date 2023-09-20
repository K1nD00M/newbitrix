import { useEffect, useState } from "react"
import functionsBX from "../../bx24/functions"
import Candidat from "./Candidat"

export default function CandidatList() {
   const [candidates, setCandidates] = useState([])

   useEffect(() => {
      const find = async () => {
         const candidatesBx = await functionsBX.getCandidats()
         setCandidates(candidatesBx)
      }
      
      find()
   }, [])

   if(!candidates.length) {
      return (
         <div>
            В настоящее время список кандидатов пуст
         </div>
      )
   }

   return (
      <div>
         {candidates.map((item, index) => (
            <Candidat candidat={item} key={index} />
         ))}
      </div>
   )
}
