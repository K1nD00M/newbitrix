const { default: axios } = require("axios");

const data = new URLSearchParams();
const accessApp = 'APPLSUP5QK71U5JUHGS984OV36ELE1ELVDIE0EKB8TDT709STCTDSP1J722MJS6N'
data.append('grant_type', 'authorization_code');
data.append('client_id', 'VSP8B7I7EJ9C2VR0O0MPVG1VBIMGPI5PEFM7RUDHHI064AQ28FNI8EDEB7CICLHE');
data.append('client_secret', 'OAVF68G46LPL8SNQD7IN1KS6B4KKA81G62SHB55ALRBE4J2TB6OLSBQG9T347F5C')

const hhAxios = axios.create({
   baseURL: 'https://api.hh.ru',
   headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Recruting (k.timofeeva@vodovoz-spb.ru)'
   },
})

const hhApi = {
   getJwtInCode: async (code) => {
      data.append('code', code)
      try {
         const req = await axios.post('https://hh.ru/oauth/token', data, {
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
            }
         })
   
         const newAccess = req.data.access_token
         const newRefresh = req.data.refresh_token
   
         return { newAccess, newRefresh }
   
      } catch (error) {
         return error
      } 
   },
   getJwtInRefresh: async (code) => {
      data.append('code', code)
      try {
         const req = await axios.post('https://hh.ru/oauth/token', data, {
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
            }
         })
   
         const newAccess = req.data.access_token
         const newRefresh = req.data.refresh_token
   
         return { newAccess, newRefresh }
   
      } catch (error) {
         return error
      } 
   },
   getNegotiation: async (token, id) => {
      try {
         const res = await hhAxios(`/negotiations/${id}`, {
            headers: {
               'Authorization': `Bearer ${token}`,
            }
         })

         const negotiation = res.data

         return negotiation
      } catch (error) {
         return error
      }
   },
   getMessages: async (token, id) => {
      try {
         const res = await hhAxios(`/negotiations/${id}/messages`, {
            headers: {
               'Authorization': `Bearer ${token}`,
            }
         })

         const messages = res.data.items

         return messages
      } catch (error) {
         return error
      }
   },
   sendMessage: async (token, message, id) => {
      try {
         const res = await hhAxios.post(`/negotiations/${id}/messages?message=${message}`, {}, { headers: {
            'Authorization': `Bearer ${token}`,
         }})
   
         return res.data
      } catch (error) {
         return errror
      }
   },
   url: async (token, url) => {
      try {
         const res = await axios(url, {
            headers: {
               'Content-Type': 'application/json',
               'User-Agent': 'Recruting (k.timofeeva@vodovoz-spb.ru)',
               'Authorization': `Bearer ${token}`,
            },
         })
   
         return res.data
      } catch (error) {
         return error
      }
   },
   getPdf: async (token, url) => {
      try {
         const res = await axios(url, {
            headers: {
               'Authorization': `Bearer ${token}`,
               'User-Agent': 'Recruting (k.timofeeva@vodovoz-spb.ru)',
            },
            responseType: 'arraybuffer' 
         },)
         return res.data
      } catch (error) {
         return error
      }
   },
   updateCandidat: async (token, url, message) => {
      try {
         const res = await axios.put(url, {
            message,
            send_sms: true
         }, {
            headers: {
               'Authorization': `Bearer ${token}`,
               'User-Agent': 'Recruting (k.timofeeva@vodovoz-spb.ru)',
            },
         },)

         return res.data
      } catch (error) {
         return error
      }
   }
}

module.exports = hhApi