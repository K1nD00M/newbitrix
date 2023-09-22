const timeConvert = (time) => {
   const date = new Date(time);

   date.setHours(date.getHours());

   // Получаем день и месяц из объекта Date
   const day = date.getDate();
   const month = date.getMonth() + 1; // Добавляем 1, так как месяцы в JavaScript нумеруются с 0 (0 - январь, 1 - февраль и так далее)
   
   // Форматируем день и месяц, чтобы добавить ведущий ноль, если они меньше 10
   const formattedDay = day < 10 ? `0${day}` : day;
   const formattedMonth = month < 10 ? `0${month}` : month;
   const hours = date.getHours();
   const minutes = date.getMinutes();

   const formattedHours = hours < 10 ? `0${hours}` : hours;
   const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
   
   // Создаем строку в формате день:месяц
   const formattedDate = `${formattedHours}:${formattedMinutes} ${formattedDay}.${formattedMonth}`;

   return formattedDate
}

export { timeConvert }