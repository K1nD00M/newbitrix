const { default: axios } = require("axios")

const axiosBx = axios.create({
   baseURL: 'https://vodovoz.bitrix24.ru/rest/84089/m6lom1fbd0qpxfsi',
   headers: {
      'Content-Type': 'application/json'
   },
})

const bitrixApi = {
   addCandidateHH: (candidate) => {
      axiosBx.post('/crm.deal.add.json', {
         fields: {
            "TITLE": `${candidate.resume.last_name} ${candidate.resume.first_name}`,
            "UF_CRM_AREA": "HH",
            "UF_CRM_CHAT_ID": candidate.id,
            "UF_CRM_VACANSY": candidate.vacancy.name,
            "CATEGORY_ID": 144
         } 
      })
   },
}

module.exports = bitrixApi