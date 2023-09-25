const {default: axios} = require('axios')

const axiosSms = axios.create({
   baseURL: 'https://sms.ru/sms'
})

const apiSms = {
   sendMessage: async (number, message) => {
      try {
         const res = await axiosSms(`https://sms.ru/sms/send?api_id=C750B73A-4E2D-E275-FA10-DD17C9AD8DD9&to=${number}&msg=${message}&json=1`)

         const data = res.data

         return data
      } catch (error) {
         console.log(error)
      }
   }
}

module.exports = apiSms