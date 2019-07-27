const xml2js = require('xml2js');
const http = require('http');
const Discord = require('discord.js');

var parser = xml2js.Parser();

module.exports.run = async (client, message, args, clientConfig) => {

    http.get(clientConfig.realm, (res) => {
        let data = '';
        res.on('data', (stream) => {
            data += stream;
        })
        res.on('end', () => {
            parser.parseString(data, (error, result) => {
                if (error === null) {

                    var serverNamesEurope = [
                        { name: result.Chars.Servers[0].Server[19].Name, status: result.Chars.Servers[0].Server[19].Usage, format: "" },
                        { name: result.Chars.Servers[0].Server[21].Name, status: result.Chars.Servers[0].Server[21].Usage, format: "" },
                        { name: result.Chars.Servers[0].Server[9].Name, status: result.Chars.Servers[0].Server[9].Usage, format: "" },
                        { name: result.Chars.Servers[0].Server[10].Name, status: result.Chars.Servers[0].Server[10].Usage, format: "" },
                        { name: result.Chars.Servers[0].Server[7].Name, status: result.Chars.Servers[0].Server[7].Usage, format: "" },
                        { name: result.Chars.Servers[0].Server[14].Name, status: result.Chars.Servers[0].Server[14].Usage, format: "" },
                        { name: result.Chars.Servers[0].Server[12].Name, status: result.Chars.Servers[0].Server[12].Usage, format: "" }
                    ];

                    var serverNamesUS = [
                        { name: result.Chars.Servers[0].Server[0].Name, status: result.Chars.Servers[0].Server[0].Usage, format: "" },
                        { name: result.Chars.Servers[0].Server[4].Name, status: result.Chars.Servers[0].Server[4].Usage, format: "" },
                        { name: result.Chars.Servers[0].Server[15].Name, status: result.Chars.Servers[0].Server[15].Usage, format: "" },
                        { name: result.Chars.Servers[0].Server[13].Name, status: result.Chars.Servers[0].Server[13].Usage, format: "" },
                        { name: result.Chars.Servers[0].Server[18].Name, status: result.Chars.Servers[0].Server[18].Usage, format: "" },
                        { name: result.Chars.Servers[0].Server[5].Name, status: result.Chars.Servers[0].Server[5].Usage, format: "" },
                        { name: result.Chars.Servers[0].Server[2].Name, status: result.Chars.Servers[0].Server[2].Usage, format: "" },
                        { name: result.Chars.Servers[0].Server[8].Name, status: result.Chars.Servers[0].Server[8].Usage, format: "" },
                        { name: result.Chars.Servers[0].Server[11].Name, status: result.Chars.Servers[0].Server[11].Usage, format: "" },
                        { name: result.Chars.Servers[0].Server[3].Name, status: result.Chars.Servers[0].Server[3].Usage, format: "" },
                        { name: result.Chars.Servers[0].Server[16].Name, status: result.Chars.Servers[0].Server[16].Usage, format: "" },
                        { name: result.Chars.Servers[0].Server[22].Name, status: result.Chars.Servers[0].Server[22].Usage, format: "" },
                        { name: result.Chars.Servers[0].Server[17].Name, status: result.Chars.Servers[0].Server[17].Usage, format: "" }
                    ];

                    let serverArray = [];
                    let serverArrayUsage = [];
                    for (let serverName of serverNamesUS) {
                        if (serverName.status < 0.75) {
                            serverName.format = "✅ Normal";
                        }
                        else if (serverName.status == 0.75) {
                            serverName.format = "🚧 Crowded";
                        }
                        else {
                            serverName.format = "❌ Full";
                        }
                        serverArrayUsage.push(serverName.format + '\n');
                        serverArray.push("[" + serverName.name + "]" + '\n')
                    }

                    if (!args.join(" ")) {
                        let properUsage = new Discord.RichEmbed()
                            .setFooter(`Invalid Syntax\n|server [EU or US or AS or ALL]`)
                            .setColor(0x7289DA);

                        message.channel.send(properUsage);
                    }

                    if (args.join(" ") == "US") {
                        let serverStatus = new Discord.RichEmbed()
                        .setAuthor("Current Server Statistics", client.user.displayAvatarURL)
                        .setColor(0xeeffee)
                        .addField("United States", `\`\`\`ini\n${serverArray.toString().replace(/,/g, "")}\`\`\`\t`, true)
                        .addField("Usage", `\`\`\`${serverArrayUsage.toString().replace(/,/g, "")}\`\`\`\t`, true)

                        message.channel.send(serverStatus)
                    }
                }
                else {
                    console.log(error);
                }

            })

        })
    })
}

module.exports.help = {
    name: "server"
}