const fs = require('node:fs')

const axios = require("axios");

const data = new URLSearchParams();
data.append('grant_type', 'client_credentials');
data.append('client_id', 'wa3DBcrcuVL5VT50uWFc');
data.append('client_secret', 'cVMTYrcqDsai8AYDrn5E0kgGaV4O0JmmErVBGif-');

const getToken = async () => {
   try {
      const req = await axios.post('https://api.avito.ru/token/', data, {
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
         }
      })

   const newAccess = req.data.access_token

   return newAccess

   } catch (error) {
      return error
   }
}

const avitoTokenObjectTwo = {
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
         fs.writeFileSync('./modules/avito/tokenAvitoTwo.txt', `${newTokenValue}\n${date}`)         
         return 
      } catch (error) {
         console.log(error)
      }
   },
   readTokenFromFile: async function() {
      try {
         const data = await fs.promises.readFile('./modules/avito/tokenAvitoTwo.txt', 'utf8');
   
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

module.exports = avitoTokenObjectTwo