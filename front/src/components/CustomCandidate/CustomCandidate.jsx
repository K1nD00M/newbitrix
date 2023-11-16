import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function CustomCandidate() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [titleVacansy, setTitleVacansy] = useState('')
  const [phone, setPhone] = useState('')
  const [description, setDescription] = useState('')

  const addCandidate = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/candidates/add`, {
        name,
        titleVacansy,
        phone,
        description
      })
      navigate('/candidates')
    } catch (error) {
      
    }
  }
  
  return (
    <div className='flex flex-col gap-8 items-center justify-center h-full max-w-[880px] m-auto'>
      <input 
        placeholder='Название вакансии' 
        value={titleVacansy} onChange={(event) => setTitleVacansy(event.target.value)} 
        className='w-full px-3 py-4 border border-solid border-gray-400 rounded'
      />
      <input 
        placeholder='Телефон' 
        value={phone} onChange={(event) => setPhone(event.target.value)} 
        className='w-full px-3 py-4 border border-solid border-gray-400 rounded'
      />
      <input 
        placeholder='Имя кандидата' 
        value={name} onChange={(event) => setName(event.target.value)}
        className='w-full px-3 py-4 border border-solid border-gray-400 rounded'
      />
      <textarea 
        placeholder='Комментарий про кандидата' 
        value={description} 
        onChange={(event) => setDescription(event.target.value)}
        className='w-full px-3 py-4 border border-solid border-gray-400 rounded'
        rows={4}
      />
      <button 
        disabled={!name && !titleVacansy && !phone} 
        onClick={addCandidate}
        className='px-4 py-2 bg-green-400 text-white'
      >
        Добавить кандидата
      </button>
    </div>
  )
}
