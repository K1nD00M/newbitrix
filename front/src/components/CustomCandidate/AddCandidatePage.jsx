import React, { useState } from 'react'
import CustomCandidateModal from './CustomCandidateModal'

export default function AddCandidatePage() {
    const [isShow, setIsShow] = useState(false)
    return (
      <div>
        <button
          onClick={() => setIsShow(true)}
        >
          Добавить кандидата
        </button>
        <CustomCandidateModal isOpen={isShow} setIsOpen={setIsShow} />
      </div> 
    )
}
