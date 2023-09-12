const tokenObject = {
   value: '',
   getValue() {
      return this.value
   },
   setValue(newValue) {
      this.value = newValue;
   },
   getNewToken: async function() {
      try {
         const newTokenValue = await getToken()
         this.setValue(newTokenValue);
         const date = new Date()
         fs.writeFileSync('tokenHH.txt', `${newTokenValue}\n${date}`)         
         return 
      } catch (error) {
         console.log(error)
      }
   },
   readTokenFromFile: async function() {
      try {
         const data = await fs.promises.readFile('tokenHH.txt', 'utf8');
   
         const lines = data.split('\n');
    
         if (lines.length >= 2) {
            const token = lines[0].trim();
            const timestamp = lines[1].trim();
      
            const time = new Date(timestamp);
      
            const currentTime = new Date();
            const timeDiff = currentTime - time;
      
            const threshold = 24 * 60 * 60 * 1000;
      
            console.log('Токен:', token);
            console.log('Время получения токена:', time);
      
            if (timeDiff >= threshold) {
               console.log('Прошло более 24 часов, получаем новый токен...');
               this.getNewToken();
            } else {
               this.setValue(token)
            }
         } else {
            console.error('Недостаточно данных в файле.');
         }
      } catch (err) {
         console.error('Ошибка при чтении файла:', err);
      }
   }
}