var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});

logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        var date = new Date();
        date = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();

        var emojis = ['', ':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ':nine:', ':keycap_ten:', ':pause_button:']
        var players = [];
        
        args.forEach(function(player, index) {
            if( index != 0){
                players.push(emojis[index] + ' ' + player + '\n');
            }
        });

        var election = date + "\nVotez avec la réaction correspondant au chiffre\nPS: Le numéro 11 est en réalité la réaction \"Pause\".\n\n**Vous pouvez votez pour 3 personnes maximum ou moins hormis vous  et seulement si vous avez joué ou vu le match en streaming !**\n\n";

        args = args.splice(1);

        if ( players.length > 0) {
            switch(cmd) {
                case 'e':
                    bot.sendMessage({
                        to: channelID,
                        message: election + players.join(""),
                    });
                break;
            }
        } 
        
        
     }
});