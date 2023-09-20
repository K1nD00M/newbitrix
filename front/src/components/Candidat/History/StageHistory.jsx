import StageItem from "./StageItem";

export default function StageHistory( {item}) {
   return (
      <div>
         <h3 className="text-center font-bold text-xl mt-4 mb-2">История кандидата</h3>
         <div>
            {item.history.map(history => (
               <StageItem item={history} key={history.time}/>
            ))}
         </div>
      </div>
   )
}
