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
   
   const [messageHh, setMessageHh] = useState('')
   const [selectedAction, setSelectedAction] = useState('');

   const [stage, setStage] = useState(item.stage)
   const [description, setDesctiprion] = useState('')

   const handleActionChange = async (event) => {
      try {
         const actionName = event.target.value
         const action = item.data.actions.find(action => action.id === actionName)
         const url = action.templates[0].url
         const data = await apiHH.command(url)
         setMessageHh(data.mail.text)
         setSelectedAction(actionName);
      } catch (error) {
         return 
      }
      
   }; 

   useEffect(() => {
      const downloadPdf = async () => {
         const pdf = await apiHH.getPdf(item.data.resume.actions.download.pdf.url)
         setPdf(new Uint8Array(pdf))
      }
      downloadPdf()
   }, [])

   const pushHistory = async () => {
      const personAction = item.data.actions.find(action => action.id === selectedAction)
      let url = ''
      if(personAction) {
         url = personAction.url
      }
      const res = await apiServer.pushHistoryHH(item.data.id, messageHh, url, stage, description, item.bxId)
      setOpen()
   }
   return (
      <div className="py-12 flex ">
         <div className="w-[60%] flex-shrink-0 pr-4">
            {pdf && <PdfViewer pdfData={pdf} />}
         </div>
         <div className="">
            <span className='text-blue-600 cursor-pointer
             ' onClick={() => setOpen(false)}>Вернуться назад</span>
            {item && <HhActoins 
               item={item} 
               messageHh={messageHh} setMessageHh={setMessageHh} 
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