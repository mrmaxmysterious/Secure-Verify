const Discord = require('discord.js')

module.exports = class file {
    constructor() {
        this.name = 'verify',
        this.alias = ['v', 'Verify'],
        this.usage = 'v-verify';
    }

    run(bot, message, args) {
        if(message.channel.name === "secure-verify") {
            if(message.member.roles.cache.find(r => r.name === "Securely Verified")) {
                const yourole = new Discord.MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
                .setDescription("You already have the Verified role, you do not need to verify.")
                msg = await message.channel.send(yourole)
                message.delete()
            } else {
            if(message.member.guild.roles.cache.find(role => role.name === "Securely Verified")) {
            let nums = ['1',  '2', '3', '4', '5', '6', '7', '8', '9']
            let rand = `${nums[Math.floor(Math.random() * nums.length)]}${nums[Math.floor(Math.random() * nums.length)]}${nums[Math.floor(Math.random() * nums.length)]}${nums[Math.floor(Math.random() * nums.length)]}`
            const verif = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
            .setTitle("Verify")
            .setDescription(`With this verification please reply with this code below in under 30 seconds: \n \n ***__${rand}__***`)
            msg3 = await message.channel.send(verif)
    
            const filter = (m) => m.author.id === message.author.id
          message.channel.awaitMessages(filter, {max: 1, time: 30000})
              .then(async collected => {
                  const msg = collected.first()
                  var number2 = msg.content.split(' ').slice(0).join(' ');
                  if(msg.content.toLowerCase() === `${rand}`) {
                    const complete = new Discord.MessageEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
                    .setDescription("You completed the verification! Please wait a while to get your role...")
                    msg3.edit(complete)
                    msg.delete()
                    message.delete()
                    var role = message.member.guild.roles.cache.find(role => role.name === "Securely Verified");
                    message.member.roles.add(role).then(a => {
                        const roleAdded = new Discord.MessageEmbed()
                        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
                        .setDescription(`Your role has been added! Role added: ${role}`)
                        msg3.edit(roleAdded)
                    })
                    let logCH = message.guild.channels.cache.find(c => {
                        if(c.name == "verify-logs") {
                            c.send("A user has verified. \n User name: " + message.author.username + " \n User ID: " + message.author.id + " \n \n TIME OF VERIFICATION: " + new Date())
                        }
                    }) 
                  } else {
                    const incorrect = new Discord.MessageEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
                    .setDescription("You have failed the verification. To try again, please use the command: `v-verify`")
                    msg3.edit(incorrect)
                    msg.delete()
                    message.delete()
                  }
              }).catch(() => {
                  const noreply = new Discord.MessageEmbed()
                  .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
                  .setDescription("No response in 30 seconds. Please retry by using the command `v-verify`")
                  msg3.edit(noreply)
                  message.delete()
              })
            } else {
                const error = new Discord.MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
                .setDescription("ERROR OCCURED: \n \n ```Your server has not been setup with the Verified Role.```")
                msg4 = await message.channel.send(error)
                message.delete()
            }
            }
        } else {
            if(message.guild.channels.cache.find(c => c.name === "secure-verify")) {
                var ch = message.guild.channels.cache.find(c => c.name === "secure-verify")
                const error5 = new Discord.MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
                .setDescription("ERROR OCCURED: \n \n ```You can only use this command in the setup verify channel.``` \n Verify channel:" + ` <#${ch.id}>`)
                message.channel.send(error5)
                message.delete()
            } else {
                const error6 = new Discord.MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
                .setDescription("ERROR OCCURED: \n \n ```This server has not been setup with a verify channel. Please use the command: v-setup-channel to setup```")
                message.channel.send(error6)
                message.delete()
            }
            }
        }
    }