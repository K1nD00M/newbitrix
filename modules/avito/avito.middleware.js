const avitoMiddleware = {
   updateMessage: function (message) {
      let isNorth = false
      if(message.users[1].id === 322385838) {
         isNorth = true
      }

      const chatId = message.id
      const titleVacansy = message.context.value.title
      const name = message.users[0].name
      const userId = message.users[0].id
      const avatar = message.users[0].public_user_profile.avatar.default
      const lastMessage = message.last_message.content.text
      const time = Date.now() - (message.last_message.created * 1000)
      
      return {
         chatId,
         titleVacansy,
         name,
         userId,
         avatar,
         lastMessage,
         time,
         isNorth
      }
   },
}

module.exports = avitoMiddleware