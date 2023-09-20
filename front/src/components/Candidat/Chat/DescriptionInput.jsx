function DescriptionInput({ description, setDescription }) {
   return (
      <div className="flex p-4 border-t border-gray-300">
         <input
            type="text"
            className="flex-grow px-3 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-blue-500"
            placeholder={"Опишите кандидата"}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
         />
      </div>
   );
}

export default DescriptionInput;
