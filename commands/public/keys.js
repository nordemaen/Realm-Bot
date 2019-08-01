const request = require('request');
const Discord = require('discord.js');

module.exports.run = async (client, message, args, clientConfig) => {

    request(clientConfig.key, function(error, rep, body) {
        if(!error && rep.statusCode == 200) {
            let parseInformation = JSON.parse(body);
            let key = parseInformation.item;
            console.log(parseInformation)

            let keyEmbed = new Discord.RichEmbed() 
                .setAuthor("Nexus Keys Information", "https://i.imgur.com/iEvhbNY.png")
                .setColor(0xffffff)
                .addField(key[0].name, `[${key[0].cheapest_on}]` + "\n<:coin:604841744462249984> " + key[0].price + " Gold", true)
                .addField(key[1].name, `[${key[1].cheapest_on}]` + "\n<:coin:604841744462249984> " + key[1].price + " Gold", true)
                .addField(key[2].name, `[${key[2].cheapest_on}]` + "\n<:coin:604841744462249984> " + key[2].price + " Gold", true)
                .addField(key[3].name, `[${key[3].cheapest_on}]` + "\n<:coin:604841744462249984> " + key[3].price + " Gold", true)
                .addField(key[4].name, `[${key[4].cheapest_on}]` + "\n<:coin:604841744462249984> " + key[4].price + " Gold", true)
                .addField(key[5].name, `[${key[5].cheapest_on}]` + "\n<:coin:604841744462249984> " + key[5].price + " Gold", true)
                .addField(key[6].name, `[${key[6].cheapest_on}]` + "\n<:coin:604841744462249984> " + key[6].price + " Gold", true)
                .addField(key[7].name, `[${key[7].cheapest_on}]` + "\n<:coin:604841744462249984> " + key[7].price + " Gold", true)
                .addField(key[8].name, `[${key[8].cheapest_on}]` + "\n<:coin:604841744462249984> " + key[8].price + " Gold", true)
                .addField(key[9].name, `[${key[9].cheapest_on}]` + "\n<:coin:604841744462249984> " + key[9].price + " Gold", true)
                .addField(key[10].name, `[${key[10].cheapest_on}]` + "\n<:coin:604841744462249984> " + key[10].price + " Gold", true)
                .addField(key[5].name, `[${key[11].cheapest_on}]` + "\n<:coin:604841744462249984> " + key[5].price + " Gold", true)
                .addField(key[5].name, `[${key[5].cheapest_on}]` + "\n<:coin:604841744462249984> " + key[5].price + " Gold", true)
                .addField(key[5].name, `[${key[5].cheapest_on}]` + "\n<:coin:604841744462249984> " + key[5].price + " Gold", true)
                .addField(key[5].name, `[${key[5].cheapest_on}]` + "\n<:coin:604841744462249984> " + key[5].price + " Gold", true)
                .addField(key[5].name, `[${key[5].cheapest_on}]` + "\n<:coin:604841744462249984> " + key[5].price + " Gold", true)
                .addField(key[5].name, `[${key[5].cheapest_on}]` + "\n<:coin:604841744462249984> " + key[5].price + " Gold", true)
                .setFooter("Requested by: " + message.author.username, message.author.displayAvatarURL)
                .setTimestamp()

            message.channel.send(keyEmbed);
        }
        else {
            console.log(error);
        }
    })

}

module.exports.help = {
    name: "keys"
}