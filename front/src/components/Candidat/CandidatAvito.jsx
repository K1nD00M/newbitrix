import { memo, useEffect, useState } from "react"
import { apiServer } from "../../api/api"
import ProjectActions from "./ProjectActions"
import StageHistory from "./History/StageHistory"
import ChatAvito from "./Chat/ChatAvito";
import ChatTwo from "../Chat/ChatTwo";
import ChatAvitoTwo from "./Chat/ChatAvitoTwo";
import PhoneAvito from "../CandidatList/PhoneAvito";

function CandidatAvito({ item, setOpen }) {
   const [selectedAction, setSelectedAction] = useState('');

   const [stage, setStage] = useState(item.stage)
   const [description, setDescription] = useState('')

   const pushHistory = async () => {
      const res = await apiServer.pushHistoryAvito(item.data.chatId, selectedAction, stage, description)
      setOpen()
   }

   return (
      <div className="py-12 flex  justify-between pr-5">
         <div>
            {item.data.isNorth === true ? <ChatAvitoTwo item={item} /> : <ChatAvito item={item} />}
            
         </div>
         <div className="">
            <span className='text-blue-600 cursor-pointer' onClick={() => setOpen(false)}>Вернуться назад</span>
            {item && <ProjectActions item={item}
               description={description} setDescription={setDescription} 
               stage={stage}  setStage={setStage}
            />}
            {item && <PhoneAvito candidat={item} />}
            <button
               className="mt-12 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none"
               onClick={pushHistory}
            >
               Изменить состояние
            </button>
            {item && <StageHistory item={item} />}
         </div>
      </div>
   )
}


export default memo(CandidatAvito)