const Telegraf = require('telegraf')

const bot = new Telegraf('2084912120:AAHpSNybncetms3dgR0bwI4ayHx35PVY2lY')

const helpMessage = `
Say something to me
/start - start the bot
/help - command reference
`;
//this is a middleware function used to return data about the user
bot.use((ctx, next) => {
  if (ctx.updateSubTypes[0] === "text") {
    console.log(`${ctx.from.username} said ${ctx.message.text}`)
  } else {
    console.log(`${ctx.from.username} sent ${ctx.updateSubTypes[0]}`)
  }
  
  next()
})

bot.start((ctx) => {
  ctx.reply("Hi I am Echo Bot.");
  ctx.reply(helpMessage);
})

bot.help((ctx) => {
  ctx.reply(helpMessage);
})

//this is a unique command that will respond to the user input /echo
//this command will return whatever text follows /echo
bot.command("echo", (ctx) => {
 
  let input = ctx.message.text;//store the users input

  let inputArray = input.split(" ");//splits the users input so that we can remove the /echo command
  
  let message = "";

  if (inputArray.length === 1) {
    message = "you said echo."
  } else {
    inputArray.shift();//removes the /echo command from the array
    message = inputArray.join(' ')
  }

  ctx.reply(message)
})
bot.launch()