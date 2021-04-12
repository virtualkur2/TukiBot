const { MessageEmbed } = require("discord.js");

// config of embed
const helpEmbed = new MessageEmbed()
.setColor('#ff8800')
.setTitle('Aquí te rescato, menol')
.setDescription('Comandos disponibles pal malandreo. No quiero comiquita...')
.setThumbnail('https://omnipc.ddns.net/api/tuki/tuki_thumbnail.png')
.addFields(
  { name: '\u200B', value: '\u200B' },
	{ name: '!tuki rescata', value: 'Muestra este beta' },
  { name: '!tuki ping', value: 'Ja weno' },
  { name: '!tuki cachetada *@username_1 @username_2*', value: 'Te sampa tremenda cachetada. Si pones el nombre de un chigüire: le sampas la cachetada al convive. Si pones el nombre de dos convive: el primero le mete una cachetada al segundo. Qué lacreo vale.'},
  { name: '!tuki robar *@username_1 @username_2*', value: 'Quieto menol. Si pones el nombre de un chigüire: le tiro un quieto. Si pones dos chigüires: se malandrean. Bulda \'e boletas'},
  { name: '!tuki', value: 'Saludo boleta'}
)
.setTimestamp();

const cmdDescription = {
  name: 'help',
  description: 'Te rescato',
  execute(message, cmds) {
    message.channel.send(helpEmbed);
  }
}

module.exports = cmdDescription;
