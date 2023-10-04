const pdf = require('pdf-parse');

const getNumberPdf = async (dataBuffer) => {
   try {
      const result = await pdf(dataBuffer);
      let rt = result.text.split('\n')
      let ii = 0;
      for (let i = 0; i < rt.length; i++){
         if (rt[i].includes("+7")){ii = i; break;}
      }
      rt = rt[ii].replace("(", "").replace(")", "").replace("-", "")
      rt = rt[0]+rt[1]+rt[3]+rt[4]+rt[5]+rt[7]+rt[8]+rt[9]+rt[10]+rt[11]+rt[12]+rt[13];
      return rt;
   } catch (error) {
      console.error(error);
      return null; // Либо возвращайте ошибку, либо другое значение по умолчанию, в зависимости от вашей логики
   }
};

module.exports = getNumberPdf