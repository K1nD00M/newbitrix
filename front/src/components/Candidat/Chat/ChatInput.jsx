import { useState } from 'react';

function MessageInput({ onSendMessage, placeholder }) {
   const [message, setMessage] = useState('');

   const handleInputChange = (event) => {
      setMessage(event.target.value);
   };

   const handleSendMessage = () => {
      if (message.trim() !== '') {
         onSendMessage(message);
         setMessage('');
      }
   };

   return (
      <div className="flex p-4 border-t border-gray-300">
         <input
            type="text"
            className="flex-grow px-3 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-blue-500"
            placeholder={placeholder}
            value={message}
            onChange={handleInputChange}
            onKeyPress={(event) => {
               if (event.key === 'Enter') {
                  handleSendMessage();
               }
            }}
         />
         <button
            className="ml-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
            onClick={handleSendMessage}
         >
            Отправить
         </button>
      </div>
   );
}

export default MessageInput;
