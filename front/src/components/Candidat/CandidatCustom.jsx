import { memo, useEffect, useState } from "react"
import { apiServer } from "../../api/api"
import ProjectActions from "./ProjectActions"
import StageHistory from "./History/StageHistory"
import PhoneChat from "../PhoneList/PhoneChat";

function CandidatCustom({ item, setOpen }) {
   const [selectedAction, setSelectedAction] = useState('');

   const [stage, setStage] = useState(item.stage)
   const [description, setDescription] = useState('')

   const pushHistory = async () => {
      const res = await apiServer.pushHistoryAvito(item.bxId, selectedAction, stage, description, item.bxId)
      setOpen()
   }

   return (
      <div className="py-12 flex  justify-between pr-5">
         <div className="">
            <span className='text-blue-600 cursor-pointer' onClick={() => setOpen(false)}>Вернуться назад</span>
            {item && <ProjectActions item={item}
               description={description} setDescription={setDescription} 
               stage={stage}  setStage={setStage}
            />}
            <button
               className="mt-12 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none"
               onClick={pushHistory}
            >
               Изменить состояние
            </button>
            {item && <StageHistory item={item} />}
            {item && <PhoneChat number={item.phone} />}
         </div>
      </div>
   )
}


export default memo(CandidatCustom)