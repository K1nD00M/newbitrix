import { memo, useEffect, useState } from "react"
import { apiHH, apiServer } from "../../api/api"
import PdfViewer from "../pdf/PDF"
import HhActoins from "./hhActoins"
import ChatHH from "./Chat/ChatHH"
import ProjectActions from "./ProjectActions"
import StageHistory from "./History/StageHistory"
import PhoneHH from "../CandidatList/PhoneHH"

function CandidatHH({ item, setOpen }) {
   const [pdf, setPdf] = useState(null)
   
   const [messageMail, setMessageMail] = useState('')
   const [messageHh, setMessageHh] = useState('')
   const [selectedAction, setSelectedAction] = useState('');

   const [stage, setStage] = useState(item.stage)
   const [description, setDesctiprion] = useState('')

   const handleActionChange = async (event) => {
      setSelectedAction(event.target.value);
      const action = item.data.actions.find(action => action.id === selectedAction)
      const url = action.templates[0].url
      const data = await apiHH.command(url)
      setMessageHh(data.sms.text)
      setMessageMail(data.mail.text)
   }; 

   useEffect(() => {
      const downloadPdf = async () => {
         const pdf = await apiHH.getPdf(item.data.resume.actions.download.pdf.url)
         setPdf(new Uint8Array(pdf))
      }
      downloadPdf()
   }, [])

   const pushHistory = async () => {
      const res = await apiServer.pushHistoryHH(item.data.id, messageHh, messageMail, selectedAction, stage, description)
   }

   return (
      <div className="py-12 flex ">
         <div className="w-2/3">
            {pdf && <PdfViewer pdfData={pdf} />}
         </div>
         <div className="">
            {item && <HhActoins 
               item={item} 
               messageHh={messageHh} setMessageHh={setMessageHh} 
               messageMail={messageMail} setMessageMail={setMessageMail} 
               selectedAction={selectedAction} handleActionChange={handleActionChange}
            />}
            {item && <ChatHH item={item} />}  
            {item && <ProjectActions 
               item={item} 
               stage={stage} setStage={setStage} 
               description={description} setDescription={setDesctiprion}
            />}
            {item && <StageHistory item={item} />}
            {item && <PhoneHH candidat={item} />}
            <button
               className="mt-12 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none"
               onClick={pushHistory}
            >
               Изменить состояние
            </button>
         </div>
      </div>
   )
}


export default memo(CandidatHH)