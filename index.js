const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

//JSON data
const clientConfig = require("./info.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();

let modules = fs.readdirSync('./commands/').filter(file => fs.statSync(path.join('./commands/', file)).isDirectory());
for (let module of modules) {
    console.log(`============[FOLDER Set: ${module}]============`);

    let commandFiles = fs.readdirSync(path.resolve(`./commands/${module}`))
        .filter(file => !fs.statSync(path.resolve('./commands/', module, file)).isDirectory())
        .filter(file => file.endsWith('.js'));

    commandFiles.forEach((file) => {
        let props = require(`./commands/${module}/${file}`);
        console.log(`Loaded: ${file}`);
        client.commands.set(props.help.name, props);
    });
}

client.on('ready', () => {
    console.log("Hello!");
});

client.on('message', async message => {

    if (message.author.bot) return;

    if (message.content.indexOf(clientConfig.prefix) !== 0) return;

    const prefix = clientConfig.prefix;
    const msgArray = message.content.split(" ");
    const cmd = msgArray[0];
    const args = msgArray.slice(1);

    const commandfile = cmd.slice(prefix.length);
    let exeg;
    if (client.commands.has(commandfile)) {
        exeg = client.commands.get(commandfile);
    };
    if (exeg) exeg.run(client, message, args, clientConfig);

});

client.login(clientConfig.token);