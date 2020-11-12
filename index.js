const Discord = require('discord.js')
const bot = new Discord.Client()
const prefix = "v-"

bot.on("ready", () => {
    console.log("Online...")
    bot.user.setActivity(`v-help`, { type: "STREAMING", url: "https://www.twitch.tv/shocolatee"}).catch(console.error)
    const embed = new Discord.MessageEmbed()
    .setDescription(`I have restarted and I am feeling great! I am online in: ${bot.guilds.cache.size} guilds!`)
    bot.channels.cache.get("767040653905231902").send(embed)
})


// Maybe :)

// DONT LEAK THE FUCKING COMMAND!!!!!!!!!!!!!! THING SCRIPT BUT ITS .setthumb


bot.on("message", async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift();

    if (command == `help`) {
        const helpEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL({dynamic: true})) // that will work :)
        .setTitle("Help Embed!")
        .setColor("#211d1d")
        .setDescription("**Setup Commands:** \n \n v-setup | Sets up the channel, role and also the bot! \n v-setup-channel | Sets up the channel only! \n v-setup-role | Sets up the role only! \n \n **Verify Commands:** \n \n v-verify | Go through the verify procedure. (**ONLY WORKS IN VERIFY CHANNEL**) \n v-verifycheck | Checks if you are verified. \n v-unverify | unVerify (**YOU HAVE TO REDO THE VERIFY COMMAND TO REVERIFY**)")
        message.channel.send(helpEmbed)
    }

    if (command == `setup`) {
        if(message.member.hasPermission("MANAGE_CHANNELS")) {
        const loading = new Discord.MessageEmbed()
        .setDescription("Creating the channels and roles... Please give at least 1 minute for complete setup.")
        msg = await message.channel.send(loading)
        message.guild.channels.create("secure-verify", { reason: "Setup for Secure Verify Bot"}).then(a => {
            message.guild.roles.create({
                data: {
                    name: 'Securely Verified',
                    color: 'GREEN',
                  },
                  reason: 'Setup for Secure Verify Bot',
            }).then(b => {
                const done = new Discord.MessageEmbed()
                .setDescription(`Completed! Info: \n \n **Channel Info:** \n \n Quick Redirect: ${a} \n Channel ID: ${a.id} \n \n **Role Info:** \n \n Role Name: ${b} \n Role ID: ${b.id}`)
                msg.edit(done)
            })
        })
    } else {
        const error = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
        .setDescription("ERROR OCCURED: \n \n ```You do not have permissions. Permissions required: ADMINISTRATOR```")
        message.channel.send(error)
    }
    }

    if (command == `verify`) {
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
    
    if (command == `verifycheck`) {
        if(message.member.roles.cache.find(r => r.name === "Securely Verified")) {
            const Approved = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
            .setDescription("Verify Check Results: \n \n ```True, you are verified.```")
            msg = await message.channel.send(Approved)
            message.delete()
        } else {
            const Denied = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
            .setDescription("Verify Check Results: \n \n ```False, you are not verified.```")
            msg = await message.channel.send(Denied)
            message.delete()
        }
    }

    if (command == `unverify`) {
        if(message.member.roles.cache.find(r => r.name === "Securely Verified")) {
        const areyousure = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
        .setDescription("Are you sure you want to unVerify?")
        msg5 = await message.channel.send(areyousure)
        msg5.react('✅').then(e => {
            msg5.react('❌')
        })

        msg5.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '✅' || reaction.emoji.name == '❌'),
            { max: 1, time: false }).then(async collected => {
                    if (collected.first().emoji.name == '✅') {
                        var ro = message.member.roles.cache.find(r => r.name === "Securely Verified")
                        message.member.roles.remove(ro)
                        const success = new Discord.MessageEmbed()
                        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
                        .setDescription("You have been unVerified.")
                        msg5.edit(success)
                        msg5.reactions.removeAll()
                        message.delete()
                    }
                    if (collected.first().emoji.name == '❌') {
                        const ok = new Discord.MessageEmbed()
                        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
                        .setDescription("You have been kept verified.")
                        msg5.edit(ok)
                        msg5.reactions.removeAll()
                        message.delete()
                    }
            }).catch(() => {
                    msg.reply('No reaction after 30 seconds, operation canceled');
                    msg.reactions.removeAll()
            });
    } else {
        const error4 = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
        .setDescription("ERROR OCCURED: \n \n ```You are not verified.```")
        message.channel.send(error4)
        message.delete()
    }
}
    if(command == `setup-channel`) {
        const loading = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
        .setDescription("Setting up the channel for you...")
        msg6 = await message.channel.send(loading)
        message.delete()
        message.guild.channels.create("secure-verify", { reason: "Setup for Secure Verify Bot"}).then(channel => {
            const loaded = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
            .setDescription(`I have setup the channel for you: \n \n Quick redirect: ${channel} \n Channel ID: ${channel.id}`)
            msg6.edit(loaded)
        })
    }

    if(command == "serverclean") {
        let owner = message.guild.ownerID
        if(message.author.id === owner) {
        message.reply("are you SURE you want to do this? This will wipe the server CLEAN! It will delete channels, categories, people and roles! Type `yes` to continue.")
        const filter = (m) => m.author.id === message.author.id
      message.channel.awaitMessages(filter, {max: 1, time: 30000})
          .then(async collected => {
              const msg = collected.first()
              if(msg.content.toLowerCase() === `yes`) {
                msg.channel.send("Deleting everything...")
                msg.guild.channels.cache.forEach(ch => {
                    ch.delete()
                })
                msg.guild.roles.cache.forEach(ava => {
                    ava.delete()
                })
            
                        msg.guild.members.cache.forEach(mem => {
                            mem.kick()
                            mem.send("Sadly " + msg.guild.name + " had a server clean! This kicked everyone from the server.")
                        })
                    msg.guild.channels.create("done", {reason: "To reply of course!"}).then(msg2222 => {
                        msg2222.send("Deleted all channels, roles and people I was available to delete.")
                    })

              } else {
                msg.reply("Okay!")
              }
          }).catch(() => {
              const noreply = new Discord.MessageEmbed()
              .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
              .setDescription("No response in 30 seconds. Please retry by using the command `v-verify`")
              msg3.edit(noreply)
              message.delete()
          })
        } else {
            message.reply("You must be owner to do this!")
        }
    }

    if(command == `membercount`) {
        message.reply("This server has: " + message.guild.memberCount + " members.")
    }

    if(command == `serverinfo`) {
        if(message.guild.channels.cache.find(c => c.name === "secure-verify")) {
            var ch = message.guild.channels.cache.find(c => c.name === "secure-verify")
            if(message.guild.roles.cache.find(r => r.name === "Securely Verified")) {
            var rol = message.guild.roles.cache.find(r => r.name === "Securely Verified")
            const info1 = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
            .setDescription("Server Info: \n \n " + "```" + `Verify channel: ${ch} \nVerify Channel ID: ${ch.id} \nVerify Role: ${rol} \nVerify Role ID: ${rol.id} \nVerify Role Position: ${rol.position}` + "```")
            message.channel.send(info1)
            message.delete()
            } else {
            const info3 = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
            .setDescription("Server Info: \n \n " + "```" + `Verify channel: ${ch} \n Verify Channel ID: ${ch.id} \n Verify Role: None \n Verify Role ID: None \n Verified Members: None`)
            message.channel.send(info3)
            message.delete()
            }
        } else {
            const info2 = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
            .setDescription("Test")
            message.channel.send(info2)
            message.delete()
        }
    }

    if(command == `setup-role`) {
        const load = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
        .setDescription("Creating the role...")
        message.guild.roles.create({
            data: {
                name: 'Securely Verified',
                color: 'GREEN',
              },
              reason: 'Setup for Secure Verify Bot',
        }).then(role => {
            const done = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
            .setDescription(`Created the role! Info: \n \n Role: ${role} \n Role ID: ${role.id}`)
            message.channel.send(done)
            message.delete()
        })
    }
});

bot.on("guildMemberAdd", member => {
    if(member.guild.id === "767033981828464670") {
        const welc = new Discord.MessageEmbed()
        .setAuthor(member.user.username, member.user.displayAvatarURL({dynamic: true}))
        .setDescription("Hello! Welcome to " + member.guild.name + "! \n Please verify in <#767070737445814322>! \n Have a great time here!")
        .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
        const welc2 = new Discord.MessageEmbed()
        .setAuthor(member.user.username, member.user.displayAvatarURL({dynamic: true}))
        .setTitle("You are the chosen one!")
        .setDescription(":o you are the chosen one! You have a 1 in __**15**__ chance of getting this embed! Congrats! \n \n Please verify in <#767070737445814322>! \n Have a great time here!")
        .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
        .setColor("#ff00ee")
        let chance = [welc, welc, welc, welc, welc, welc, welc, welc, welc, welc, welc, welc, welc, welc, welc2]
        member.guild.channels.cache.find(c => c.name === "welcome-x-goodbye").send(member, {embed: chance[Math.floor(Math.random() * chance.length)]})
    }
})

bot.on("guildMemberRemove", member => {
    if(member.guild.id === "767033981828464670") {
        const gud = new Discord.MessageEmbed()
        .setAuthor(member.user.username, member.user.displayAvatarURL({dynamic: true}))
        .setDescription(`${member.user.username} just left our server!`)
        .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
        member.guild.channels.cache.find(c => c.name === "welcome-x-goodbye").send(member, {embed: gud})
    }
})

bot.on('message', msg =>{
    if(msg.content.startsWith(`${prefix}kick`)) {
        if(msg.guild.id === "767033981828464670") {
        var reason = msg.content.split(" ").slice(2).join(" ")
        const member3 = msg.mentions.members.first()
        let kickembed = new Discord.MessageEmbed()
        .setTitle(`You have been kicked from ***${msg.guild.name}***`)
        .setDescription(`The reason for the kick is: ***${reason}***`)
        .setColor("RED")
        if(msg.member.hasPermission('KICK_MEMBERS')) return(member3.kick(), msg.channel.send(`Successfully kicked ${member3} for reason: ${reason}`), member3.send(`${member3}`, {embed: kickembed}))
        else {
            msg.reply('You cannot use this command!')
        }
    }
}})

bot.on('message', msg =>{
    if(msg.content.startsWith(`${prefix}ban`)) {
        if(msg.guild.id === "767033981828464670") {
        var reason = msg.content.split(" ").slice(2).join(" ")
        const user = msg.mentions.members.first()
        const guild = msg.guild
        let kickembed = new Discord.MessageEmbed()
        .setTitle(`You have been banned from ***${msg.guild.name}***`)
        .setDescription(`The reason for the ban is: ***${reason}***`)
        .setColor("RED")
        if(msg.member.hasPermission('BAN_MEMBERS')) return(guild.members.ban(user), msg.channel.send(`Successfully banned ${user} for reason: ${reason}`), user.send(`${user}`, {embed: kickembed}))
        else {
            msg.reply('You cannot use this command!')
        }
    }
}}) 

bot.login(process.env.token)