const { default: axios } = require("axios")

const axiosBx = axios.create({
   baseURL: 'https://vodovoz.bitrix24.ru/rest/84089/m6lom1fbd0qpxfsi',
   headers: {
      'Content-Type': 'application/json'
   },
})

const bitrixApi = {
   addCandidateHH: async (candidate, phone) => {
      const res = await axiosBx.post('/crm.deal.add.json', {
         fields: {
            "TITLE": `${candidate.resume.last_name} ${candidate.resume.first_name}`,
            "UF_CRM_AREA": "HH",
            "UF_CRM_CHAT_ID": candidate.id,
            "UF_CRM_VACANSY": candidate.vacancy.name,
            "UF_CRM_PHONE": phone,
            "CATEGORY_ID": 144
         } 
      })
      return res.data.result
   },
   addCandidateAvito: async (candidate, phone) => {
      const res = await axiosBx.post('/crm.deal.add.json', {
         fields: {
            "TITLE": `${candidate.name}`,
            "UF_CRM_AREA": "Avito",
            "UF_CRM_CHAT_ID": candidate.chatId,
            "UF_CRM_VACANSY": candidate.titleVacansy,
            "UF_CRM_PHONE": phone,
            "CATEGORY_ID": 144
         } 
      })
      return res.data.result
   },
   addCustomCandidate: async (candidate, phone) => {
      const res = await axiosBx.post('/crm.deal.add.json', {
         fields: {
            "TITLE": `${candidate.name}`,
            "UF_CRM_AREA": "Случайный",
            "UF_CRM_VACANSY": candidate.titleVacansy,
            "UF_CRM_PHONE": phone,
            "CATEGORY_ID": 144
         } 
      })
      return res.data.result
   },
   updateCandidate: (status, id) => {
      if (status === 'new') {
         axiosBx.post("/crm.deal.update", { 
            id: id,  
            fields: { 
               "STAGE_ID": "C144:NEW",
            },
         })
      } else if (status === 'phone') {
         axiosBx.post("/crm.deal.update", { 
            id: id,  
            fields: { 
               "STAGE_ID": "C144:PREPARATION",
            },
         })
      } else if (status === 'interview') {
         axiosBx.post("/crm.deal.update", { 
            id: id,  
            fields: { 
               "STAGE_ID": "C144:EXECUTING",
            },
         })
      } else if (status === 'thinks') {
         axiosBx.post("/crm.deal.update", { 
            id: id,  
            fields: { 
               "STAGE_ID": "C144:FINAL_INVOICE",
            },
         })
      } else if (status === 'thinksCandidate') {
         axiosBx.post("/crm.deal.update", { 
            id: id,  
            fields: { 
               "STAGE_ID": "C144:UC_7AZMIV",
            },
         })
      }else if (status === 'intern') {
         axiosBx.post("/crm.deal.update", { 
            id: id,  
            fields: { 
               "STAGE_ID": "C144:UC_EA3Z9Y",
            },
         })
      } else if (status === 'ok') {
         axiosBx.post("/crm.deal.update", { 
            id: id,  
            fields: { 
               "STAGE_ID": "C144:WON",
            },
         })
      } else if (status === 'rejectHr') {
         axiosBx.post("/crm.deal.update", { 
            id: id,  
            fields: { 
               "STAGE_ID": "C144:1",
            },
         })
      } else if (status === 'rejectCandidate') {
         axiosBx.post("/crm.deal.update", { 
            id: id,  
            fields: { 
               "STAGE_ID": "C144:APOLOGY",
            },
         })
      } else if (status === 'notCome') {
         axiosBx.post("/crm.deal.update", { 
            id: id,  
            fields: { 
               "STAGE_ID": "C144:LOSE",
            },
         })
      }
   }
}

module.exports = bitrixApi