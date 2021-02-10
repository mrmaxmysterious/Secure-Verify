const prefix = "v-" // If you change this, you will need to change a lot in the script.
const OnlineMessageChannelID = "your channel that you want the bot to send the online message in here"
const PrivateTOKEN = "your BOT token here"
const Discord = require('discord.js')
const bot = new Discord.Client({ ws: { properties: { $browser: "Discord iOS" }}})

bot.on("ready", () => {
  console.log('online');
  let online = new Discord.MessageEmbed()
    .setTitle(`My Status:  🟢`)
    .addField(`My Ping:`, `**${bot.ws.ping}**ms!`)
    .addField(`My Ram Usage:`, `**${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}**MB!`)

    .addField(`Bots Version:`, `**V1.2**`)

    .addField(`Extra Info:`, `Watching ${bot.guilds.cache.size} Servers!`)
    .setThumbnail(`${bot.user.avatarURL()}`)
    .setColor(`RANDOM`)
    .setFooter(`Im Online!`)
    .setTimestamp()
  bot.channels.cache.get(OnlineMessageChannelID).send(online)

  setStatus('WATCHING', `Self Hosted v1!`, 'online')
  function setStatus(statusType, statusName, statusAppearance) {
    bot.user.setStatus
    bot.user.setPresence({
      status: statusAppearance,
      activity: {
        name: statusName,
        type: statusType
      }
    })
  }
})


bot.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift();

  // The begining of the long script of code:


  // SETUP | CREATES EVERYTHING

  if (command == `setup`) {
    if (message.guild.channels.cache.find(ch => ch.name == "secure-verify") && message.guild.roles.cache.find(r => r.name == "Securely Verified")) {
      message.channel.send
      ("GG! This server has been setup using this command already!")



    } else {
      if (message.member.hasPermission("MANAGE_CHANNELS") && message.member.hasPermission("MANAGE_ROLES")) {
        const loading = new Discord.MessageEmbed()
          .setDescription("Creating the channels and roles... Please give at least 1 minute for complete setup. \n Have I not edited this message in under 10-15 seconds? If this has occured please do this: \n \n - Create a Channel called: `secure-verify` \n - Create a Role called: `Securely Verified`")


        msg = await message.channel.send(loading)
        message.guild.channels.create("secure-verify", { reason: "Setup for Secure Verify Bot" }).then(a => {
          message.guild.roles.create({
            data: {
              name: 'Securely Verified',
              color: 'GREEN',
            },
            reason: 'Setup for Secure Verify Bot',
          }).then(b => {
            const done = new Discord.MessageEmbed()
              .setDescription(`Completed! Info: \n \n **Channel Info:** \n \n Quick Redirect: ${a} \n Channel ID: ${a.id} \n \n **Role Info:** \n \n Role Name: ${b} \n Role ID: ${b.id} \n \n **Want to undo this action?** \n Please react with 🚫 now.`)
            
            msg.edit(done)
            msg.reactions.removeAll()
            msg.react("🚫")
             msg.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '🚫'),
                  { max: 1, time: false }).then(async collected => {
                    if (collected.first().emoji.name == '🚫') {
                      const Deleting = new Discord.MessageEmbed()
                      .setDescription("Undoing your actions...")
                      .setFooter("I am cleaning up your mess, wow...")
                      msg.edit(Deleting)
                      a.delete()
                      b.delete().then(d => {
                        const Cleaned = new Discord.MessageEmbed()
                        .setDescription("I have cleaned your mess up... Try not to do that again!")
                        msg.edit(Cleaned)
                      })
                    }
                  })
          })
        })
      } else {
        const error = new Discord.MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setDescription("ERROR OCCURED: \n \n ```You do not have permissions. Permissions required: MANAGE_CHANNELS, MANAGE_ROLES```")
        message.channel.send(error)
      }
    }
  }
  // VERIFY COMMAND | MAIN COMMAND!
  if (command == `verify`) {
    if (message.channel.name === "secure-verify") {
      if (message.member.roles.cache.find(r => r.name === "Securely Verified")) {
        const yourole = new Discord.MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription("You already have the Verified role, you do not need to verify.")
        msg = await message.channel.send(yourole)
        message.delete()
      } else {
        if (message.member.guild.roles.cache.find(role => role.name === "Securely Verified")) {
          let nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
          let rand = `${nums[Math.floor(Math.random() * nums.length)]}${nums[Math.floor(Math.random() * nums.length)]}${nums[Math.floor(Math.random() * nums.length)]}${nums[Math.floor(Math.random() * nums.length)]}`
          const verif = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .setTitle(`Verification | MyVerify`)
            .setDescription(`With this verification please reply with this code below in under 30 seconds: \n \n **__${rand}__**`)
          msg3 = await message.channel.send(verif)

          const filter = (m) => m.author.id === message.author.id
          message.channel.awaitMessages(filter, { max: 1, time: 30000 })
            .then(async collected => {
              const msg = collected.first()
              var number2 = msg.content.split(' ').slice(0).join(' ');
              if (msg.content.toLowerCase() === `${rand}`) {
                const complete = new Discord.MessageEmbed()
                  .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                  .setDescription("You completed the verification! Please wait a while to get your role...")
                msg3.edit(complete)
                msg.delete()
                message.delete()
                var role = message.member.guild.roles.cache.find(role => role.name === "Securely Verified");
                message.member.roles.add(role).then(a => {
                  const roleAdded = new Discord.MessageEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`Your role has been added! Role added: \n${role}!`)
                    .setColor(`#56ff00`)
                  msg3.edit(roleAdded)

                })
              } else {
                const incorrect = new Discord.MessageEmbed()
                  .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                  .setDescription("You have failed the verification. To try again, please use the command: `v-verify`")
                  .setColor(`#ff0000`)
                msg3.edit(incorrect)
                msg.delete()
                message.delete()
              }
            })
        } else {
          const error = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription("ERROR OCCURED: \n \n ```Your server has not been setup with the Verified Role.```")
          msg4 = await message.channel.send(error)
          message.delete()
        }
      }
    } else {
      if (message.guild.channels.cache.find(c => c.name === "secure-verify")) {
        var ch = message.guild.channels.cache.find(c => c.name === "secure-verify")
        const error5 = new Discord.MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription("ERROR OCCURED: \n \n ```You can only use this command in the setup verify channel. ``` \n Verify channel:" + ` <#${ch.id}>`)
          .setColor(`#ff0000`)
        message.channel.send(error5)
        message.delete()
      } else {
        const error6 = new Discord.MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription("ERROR OCCURED: \n \n ```This server has not been setup with a verify channel. Please use the command: v-setup-channel to setup```")
          .setColor(`#ff0000`)
        message.channel.send(error6)
        message.delete()
      }
    }
  }
  // Verify Check command - (Checks if ur verified)
  if (command == `verifycheck`) {
    if (message.member.roles.cache.find(r => r.name === "Securely Verified")) {
      const Approved = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription("Verify Check Results: \n \n ```True, you are verified.```")
      msg = await message.channel.send(Approved)
      message.delete()
    } else {
      const Denied = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription("Verify Results:\n\n**You are not verified!**")
      msg = await message.channel.send(Denied)
      message.delete()
    }
  }

  // Unverify Command:
  if (command == `unverify`) {
    if (message.member.roles.cache.find(r => r.name === "Securely Verified")) {
      const areyousure = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription("Are you sure you want to unVerify?")
      msg5 = await message.channel.send(areyousure)
      msg5.react('✅').then(e => {
        msg5.react('❌')
      })

      msg5.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '✅' || reaction.emoji.name == '❌'),
        { max: 1, time: false }).then(async collected => {
          if (collected.first().emoji.name == '✅') {
            var ro = message.member.roles.cache.find(r => r.name === "Securely Verified")
            const loading = new Discord.MessageEmbed()
              .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
              .setDescription("Working...")
            msg5.edit(loading)
            message.member.roles.remove(ro).then(() => {
              const success = new Discord.MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription("You have been unVerified! ")
              msg5.edit(success)
              msg5.reactions.removeAll()
              message.delete()
            })
          }
          if (collected.first().emoji.name == '❌') {
            const ok = new Discord.MessageEmbed()
              .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
              .setDescription("You have been kept verified.")
            msg5.edit(ok)
            msg5.reactions.removeAll()
            message.delete()
          }
        }).catch(() => {
          msg.reply('❗ No reaction after 30 seconds, operation canceled');
          msg.reactions.removeAll()
        });
    } else {
      const error4 = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription("ERROR OCCURED: \n \n ```You are not verified.```")
      message.channel.send(error4)
      message.delete()
    }
  }
  // Setup Channel Command
  if (command == `setup-channel`) {
    const loading = new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription("Setting up the channel for you...")
    msg6 = await message.channel.send(loading)
    message.delete()
    message.guild.channels.create("secure-verify", { reason: "Setup for Secure Verify Bot" }).then(channel => {
      const loaded = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setDescription(`I have setup the channel for you: \n\nInfo:\nQuick redirect: ${channel} \n Channel ID: ${channel.id}`)
      msg6.edit(loaded)
    })
  }

  // Server Clean Command:

  if (command == "serverclean") {
    let owner = message.guild.ownerID
    if (message.author.id === owner) {
      message.reply("❗❗ Are you SURE you want to do this? This will wipe the server CLEAN! It will delete channels, categories, people and roles! Type `yes` to continue. PLEASE NOTE: This can take up to 10 minutes to fully delete every channel. Please be patient.")
      const filter = (m) => m.author.id === message.author.id
      message.channel.awaitMessages(filter, { max: 1, time: 30000 })
        .then(async collected => {
          const msg = collected.first()
          if (msg.content.toLowerCase() === `yes`) {
            msg.channel.send("Deleting everything...")
            msg.guild.channels.cache.forEach(ch => {
              ch.delete()
            })
            msg.guild.roles.cache.forEach(r => {
              r.delete()
            })

            msg.guild.members.cache.forEach(mem => {
              mem.kick()
              mem.send("Sadly `" + msg.guild.name + "` had a server clean! This kicked everyone from the server.")
            })
            msg.guild.channels.create("General", { reason: "To reply of course!" }).then(msg2222 => {
              msg2222.send("Deleted all channels, roles and people I was available to delete. There may be some left over due to my rank.\n Don't worry! They will delete in under 24 hours.")
            })

          } else {
            msg.reply("Okay!")
          }
        }).catch(() => {
          const noreply = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription("No response in 30 seconds. Please retry by using the command `v-serverclean`")
          msg3.edit(noreply)
          message.delete()
        })
    } else {
      message.reply("You must be owner to do this!")
    }
  }

  if (command == `serverinfo`) {
    if (message.guild.channels.cache.find(c => c.name === "secure-verify")) {
      var ch = message.guild.channels.cache.find(c => c.name === "secure-verify")
      if (message.guild.roles.cache.find(r => r.name === "Securely Verified")) {
        var rol = message.guild.roles.cache.find(r => r.name === "Securely Verified")
        const info1 = new Discord.MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription("Server Info: \n \n " + "```" + `Verify channel: ${ch} \nVerify Channel ID: ${ch.id} \nVerify Role: ${rol} \nVerify Role ID: ${rol.id} \nVerify Role Position: ${rol.position}` + "```")
        message.channel.send(info1)
        message.delete()
      } else {
        const info3 = new Discord.MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription("Server Info: \n \n " + "```" + `Verify channel: ${ch} \n Verify Channel ID: ${ch.id} \n Verify Role: None \n Verify Role ID: None \n Verified Members: None`)
        message.channel.send(info3)
        message.delete()
      }
    }
  }

  if (command == `setup-role`) {
    const load = new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription("Creating the role...")
    message.guild.roles.create({
      data: {
        name: 'Securely Verified',
        color: 'GREEN',
      },
      reason: 'Setup for Secure Verify Bot',
    }).then(role => {
      const done = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`Created the role! Info: \n \n Role: ${role} \n Role ID: ${role.id}`)
      message.channel.send(done)
      message.delete()
    })
  }

  if (command == `leave`) {
    if (message.author.id === message.guild.ownerID) {
    const EE = new Discord.MessageEmbed()
    .setDescription("Okay! Thats cool, I am leaving now. I will see you around!")
    message.channel.send(EE)
    message.guild.leave()
    } else {
      message.delete()
    }
  }
});

// Ping

bot.on('message', msg => {
  if (msg.content.toLowerCase().startsWith(`${prefix}ping`)) {
    let message = new Discord.MessageEmbed()
      .setTitle(`My Ping:`)
      .setDescription(`Bot: **${bot.ws.ping}**ms\n API: **${Date.now() - msg.createdTimestamp}**ms`)
      .setThumbnail(bot.user.avatarURL())
    msg.channel.send(message);
  }

})

bot.login(PrivateTOKEN)