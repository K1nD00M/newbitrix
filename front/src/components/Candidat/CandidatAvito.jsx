import { memo, useEffect, useState } from "react"
import { apiHH, apiServer } from "../../api/api"
import PdfViewer from "../pdf/PDF"
import HhActoins from "./hhActoins"
import ChatHH from "./Chat/ChatHH"
import ProjectActions from "./ProjectActions"
import StageHistory from "./History/StageHistory"

function CandidatAvito({ item, setOpen }) {
   const [selectedAction, setSelectedAction] = useState('');

   const [stage, setStage] = useState(item.stage)
   const [description, setDesctiprion] = useState('')

   const pushHistory = async () => {
      const res = await apiServer.pushHistoryAvito(item.data.chatId, selectedAction, stage, description)
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


export default memo(CandidatAvito)