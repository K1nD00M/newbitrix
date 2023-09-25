const cron = require('node-cron');
const apiWhatsapp = require('./api/apiWhatsapp');
const apiSms = require('./api/apiSms');
const { getAllJsonData, updateJsonFile } = require('../../libs/jsonLibrary');
const path = require('path')

const dataDir = path.join(__dirname, 'data');

const check = () => {
   cron.schedule('* * * * *', async () => {
      console.log('Отработал')
      const messages = getAllJsonData(dataDir)
      const dateNow = new Date()
      messages.filter(async (item) => {
         let newIsSend = [...item.isSend]
         for (let index = 0; index < item.dates.length; index++) {
            const element = item.dates[index];
            if (new Date(element) < dateNow && !newIsSend[index]) {
               try {
                  await apiWhatsapp.sendMessage(item.phone, item.messages[index]);
                  await apiSms.sendMessage(item.phone, item.messages[index])
                  newIsSend[index] = true;
                  await updateJsonFile(item.timeCreate, { ...item, isSend: newIsSend }, dataDir);
               } catch (error) {
                  console.error("An error occurred:", error);
               }
            }
         }
      })
   });
}

module.exports = check
