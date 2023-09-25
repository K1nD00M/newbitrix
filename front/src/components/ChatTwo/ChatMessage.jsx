export const ChatMessage = ({ text, isSentByUser }) => {
   const messageClass = isSentByUser ? 'bg-blue-500 text-white' : 'bg-gray-200';
   
   if(!text) {
      return <></>
   }
   
   return (
      <div className={`rounded p-2 mb-2 max-w-md ${isSentByUser ? 'ml-auto' : 'mr-auto'}`}>
         <div className={`p-2 rounded ${messageClass}`}>
            <p className="text-sm">{text}</p>
         </div>
      </div>
   );
};