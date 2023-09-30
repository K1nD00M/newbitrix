import CandidatHH from "../Candidat/CandidatHH";
import CandidatAvito from "../Candidat/CandidatAvito";

function СandidatModal({ item, isOpen, setIsOpen }) {
   const closeModal = () => {
      setIsOpen(false);
   };

   return (
      <>
         {isOpen && (
            <div 
               className="fixed top-0 left-0 flex items-center justify-center bg-opacity-50 h-screen w-screen bg-black cursor-default z-50" 
               onClick={closeModal}
            >
               <div 
                  className="w-[1148px] h-[644px] bg-white overflow-y-scroll"
                  onClick={(event) => event.stopPropagation()}
               >
                  {item.area === 'hh' ? <CandidatHH item={item} setOpen={setIsOpen}/> : <CandidatAvito item={item} setOpen={setIsOpen} />}
               </div>
            </div>
         )}
      </>
   );
}

export default СandidatModal;