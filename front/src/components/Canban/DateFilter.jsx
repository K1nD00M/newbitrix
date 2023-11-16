import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import ru from 'date-fns/locale/ru';

export default function DateFilter({firstDate, setFirstDate, secondDate, setSecondDate}) {
   return (
      <div className='flex flex-nowrap px-4 gap-2'>
         <DatePicker
            locale={ru}
            onChange={(date) => setFirstDate(date)}
            selected={firstDate}
            placeholderText='От'
            dateFormat="dd/MM/yyyy"
            className="border border-gray-300 rounded px-3 py-2 w-full text-center focus:outline-none  focus:border-blue-300"
        />
        <DatePicker
            locale={ru}
            onChange={(date) => setSecondDate(date)}
            selected={secondDate}
            placeholderText='До'
            dateFormat="dd/MM/yyyy"
            className="border border-gray-300 rounded px-3 py-2 w-full text-center focus:outline-none focus:ring focus:border-blue-300"
        />
    </div>
  )
}
