import bx24 from "./bx24"

const functionsBX = {
   addFields: async () => {
      await bx24.callMethod('crm.deal.userfield.add', {
         fields: {
            "FIELD_NAME": "DESCRIPTION",
            "EDIT_FORM_LABEL": "Описание",
            "LIST_COLUMN_LABEL": "Описание",
            "USER_TYPE_ID": "string",
            "XML_ID": "DESCRIPTION",
            "SETTINGS": { "DEFAULT_VALUE": "" }
         }
         
      })
   },
   addLid: async (lid) => {
      await bx24.callMethod("crm.deal.add", {
         fields: {
            TITLE: lid.title,
            UF_CRM_AREA: lid.area,
            UF_CRM_CHAT_ID: lid.chatId,
            UF_CRM_USER_ID: lid.userId,
            UF_CRM_VACANSY: lid.vacansy,
            UF_CRM_DESCRIPTION: lid.description,
            CATEGORY_ID: '144'
         }
      })
   },
   addReject: async (lid) => {
      await bx24.callMethod("crm.deal.add", {
         fields: {
            TITLE: lid.title,
            STAGE_ID: 'C144:LOSE',
            UF_CRM_AREA: lid.area,
            UF_CRM_CHAT_ID: lid.chatId,
            UF_CRM_PHONE: lid.phone,
            UF_CRM_USER_ID: lid.userId,
            UF_CRM_VACANSY: lid.vacansy
         }
      })
   },
   getCandidats: async () => {
      const res = await bx24.callMethod('crm.deal.list', {
         filter: { "STAGE_ID": 'C157:NEW', CATEGORY_ID: '157' },
         select: [ "TITLE", "UF_CRM_AREA", "UF_CRM_CHAT_ID", "UF_CRM_PHONE", "UF_CRM_USER_ID", "UF_CRM_VACANSY", "ID" ]
      })
      
      const candidates = res.result 

      return candidates
   },
   updateWaitingCandidates: async (id) => {
      await bx24.callMethod( "crm.deal.update", { 
         id: id,  
         fields: { 
            "STAGE_ID": "C157:PREPARATION",
         },
      }) 
   },
   updatePhoneCandidate: async (id) => {
      await bx24.callMethod( "crm.deal.update", { 
         id: id,  
         fields: { 
            "STAGE_ID": "C157:PREPAYMENT_INVOI",
         },
      }) 
   },
   updateOkCandidate: async (id) => {
      await bx24.callMethod( "crm.deal.update", { 
         id: id,  
         fields: { 
            "STAGE_ID": "S",
         },
      })
   }, 
   rejectDontGoCandidate: async (id) => {
      await bx24.callMethod( "crm.deal.update", { 
         id: id,  
         fields: { 
            "STAGE_ID": "C157:1",
         },
      })
   }, 
   rejectOkCandidate: async (id) => {
      await bx24.callMethod( "crm.deal.update", { 
         id: id,  
         fields: { 
            "STAGE_ID": "C157:2",
         },
      })
   }, 
}

export default functionsBX