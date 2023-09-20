import { useEffect, useState } from "react"
import { apiHH } from "../../api/api"
import PdfViewer from "../pdf/PDF";
import { getFilePlugin } from '@react-pdf-viewer/get-file';
import DescriptionInput from "../Chat/DescriptionInput";
import functionsBX from "../../bx24/functions";

const incomeRange = (incomeFrom, incomeTo) => {
   let incomeText = '';

   if (incomeFrom && incomeTo) {
      incomeText = `${incomeFrom}Р - ${incomeTo}Р`;
   } else if (incomeFrom) {
      incomeText = `От ${incomeFrom}Р`;
   } else if (incomeTo) {
      incomeText = `До ${incomeTo}Р`;
   } else {
      incomeText = 'Не указано';
   }
   return incomeText
}

export default function MessagesHH() {
   const [messages, setMessages] = useState([])
   const [selectPerson, setSelectPerson] = useState(null)
   const [selectPdf, setSelectPdf] = useState(undefined)

   useEffect(() => {
      const getMessages = async () => {
         const newMessages = await apiHH.getMessages()
         setMessages(newMessages)
      }

      getMessages()
   }, [])

   const selectedOnId = async (item) => {
      setSelectPerson(item)
      const pdf = await apiHH.getPdf(item.resume.actions.download.pdf.url)
      setSelectPdf(new Uint8Array(pdf))
   }
   const getFilePluginInstance = getFilePlugin();
   const { DownloadButton } = getFilePluginInstance;

   const [phone, setPhone] = useState('')
   const [description, setDescription] = useState('')
   
   const onChangePhone = (value) => {
      setPhone(value)
   }

   const addLid = async () => {
      functionsBX.addLid({
         phone: phone,
         title: selectPerson.resume.last_name + ' ' + selectPerson.resume.first_name,
         area: 'HH',
         chatId: selectPerson.chat_id,
         userId: selectPerson.id,
         vacansy: selectPerson.vacancy.name,
         description: description
      })
   }

   const addReject = async () => {
      await functionsBX.addReject({
         phone: phone,
         title: selectPerson.resume.last_name + ' ' + selectPerson.resume.first_name,
         area: 'HH',
         chatId: selectPerson.chat_id,
         userId: selectPerson.id,
         vacansy: selectPerson.vacancy.name,
         description: description
      })
   }

   return (
      <div className="flex">
         <div className="w-1/3">
            {messages.map((item, index) => (
               <div className="flex justify-between gap-x-6 py-5 pr-2 
            hover:bg-gray-100 cursor-pointer"
               onClick={() => selectedOnId(item)}
               key={index}
               >
                  <div className="flex min-w-0 gap-x-4 ml-3">
                     <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={item.resume?.photo?.small} alt="" />
                     <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{item.resume?.last_name + ' ' + item.resume?.first_name}</p>
                     </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                     <p className="text-sm leading-6 text-gray-900">{item.vacancy?.name}</p>
                     <p className="mt-1 text-xs leading-5 text-gray-500">{incomeRange(item.vacancy?.salary.from, item.vacancy?.salary.to)}</p>
                  </div>
               </div>
            ))}
         </div>
         <div className="w-2/3 flex flex-col pl-6 gap-5">
            <div className="h-[460px] w-full">
               {selectPdf && (
                  <div
                     className="rpv-core__viewer"
                     style={{
                        border: '1px solid rgba(0, 0, 0, 0.3)',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                     }}
                  >
                     <div
                        style={{
                           alignItems: 'center',
                           backgroundColor: '#eeeeee',
                           borderBottom: '1px solid rgba(0, 0, 0, 0.3)',
                           display: 'flex',
                           padding: '4px',
                        }}
                     >
                        <DownloadButton />
                     </div>
                     <div
                        style={{
                           flex: 1,
                           overflow: 'hidden',
                        }}
                     >
                        <PdfViewer pdfData={selectPdf} plugins={[getFilePluginInstance]}/>
                     </div>
                  </div>
               )}
            </div>
            {selectPerson && selectPerson.actions.map(item => (
               <button
                  onClick={() => apiHH.command(item.url)}
                  key={item.id}
                  className=" px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
               >
                  {item?.name}
               </button>
            ))}
            <DescriptionInput description={description} setDescription={setDescription} />
            <div className="flex mt-6">
               <input 
                  placeholder="Введите номер клиента" 
                  onChange={(event) => onChangePhone(event.target.value)}
                  className="pr-4 pl-2 border-2 border-green-500 border-solid around rounded-md"
               />
               <button
                  className={`ml-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none ${!phone && 'opacity-50 hover:bg-blue-500'}`}
                  disabled={!phone}
                  onClick={() => addLid()}
               >
               Добавить в собеседуемые
               </button>
               <button
                  className="ml-4 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
                  onClick={() => addReject()}
               >
               Добавить в отказан
               </button>
            </div>
         </div>
      </div>
   )
}