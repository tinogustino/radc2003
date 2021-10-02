const { WAConnection, Browsers } = require('@adiwajshing/baileys')
const  { Functions } = require('./lib/functions.js');
const { color, bgcolor } = require('./lib/color')
const fs = require("fs-extra")

const figlet = require('figlet')
const { uncache, nocache } = require('./lib/loader')
const setting = JSON.parse(fs.readFileSync('./setting.json'))
const welcome = require('./message/group')
baterai = 'unknown'
charging = 'unknown'

//nocache
global.media = require('./src/json/media.json');
global.functions = new Functions();
global.logo = { buffer:functions.fs.readFileSync('./src/images/logo.jpg'),message:media.logo };
require('./iky.js')
nocache('../iky.js', module => console.log(color('[WATCH]', 'yellow'), color(`'${module}'`, 'cyan'), 'File is updated!'))
require('./message/group.js')
nocache('../message/group.js', module => console.log(color('[WATCH]', 'yellow'), color(`'${module}'`, 'yellow'), 'File is updated!'))

const starts = async (ikyy = new WAConnection()) => {
	ikyy.logger.level = 'warn'
	console.log(color(figlet.textSync('FATHER-BOT', {
		font: 'Standard',
		horizontalLayout: 'default',
		vertivalLayout: 'default',
		width: 80,
		whitespaceBreak: false
	}), 'green'))
	console.log(color('[ Tino ]', 'red'), color('Owner is online now!', 'pink'))
	console.log(color('[Injection Data]', 'red'), color('1200 Data Inject.... Complete', 'pink'))
	console.log(color('[ Tino ]', 'red'), color('Welcome back!! Admin', 'pink'))
	ikyy.browserDescription = ["Father - BOT", "Firefox", "3.0.0"];

	// Menunggu QR
	ikyy.on('qr', () => {
		console.log(color('[', 'white'), color('!', 'red'), color(']', 'white'), color('Please scan qr code'))
	})

	// Menghubungkan
	fs.existsSync(`./${setting.sessionName}.json`) && ikyy.loadAuthInfo(`./${setting.sessionName}.json`)
	ikyy.on('connecting', () => {
		console.log(color('[ Warning Server Read Files]', 'red'), color('Waiting....'));
	})

	//connect
	ikyy.on('open', () => {
		console.log(color('[ Server Done ]', 'red'), color('Admin Is Login'));
	})
	//Admins
	ikyy.on('open', () => {
		console.log(color('[ Linux V99 Beta]', 'red'), color('Bot dipantau oleh Tino'));
	})

	// session
	await ikyy.connect({
		timeoutMs: 30 * 1000
	})
	fs.writeFileSync(`./${setting.sessionName}.json`, JSON.stringify(ikyy.base64EncodedAuthInfo(), null, '\t'))

	// Baterai
	ikyy.on('CB:action,,battery', json => {
		global.batteryLevelStr = json[2][0][1].value
		global.batterylevel = parseInt(batteryLevelStr)
		baterai = batterylevel
		if (json[2][0][1].live == 'true') charging = true
		if (json[2][0][1].live == 'false') charging = false
		console.log(json[2][0][1])
		console.log('Baterai : ' + batterylevel + '%')
	})
	global.batrei = global.batrei ? global.batrei : []
	ikyy.on('CB:action,,battery', json => {
		const batteryLevelStr = json[2][0][1].value
		const batterylevel = parseInt(batteryLevelStr)
		global.batrei.push(batterylevel)
	})

	// welcome
	ikyy.on('group-participants-update', async (anu) => {
		await welcome(ikyy, anu)
	})

	ikyy.on('chat-update', async (message) => {
		require('./iky.js')(ikyy, message)
	})
}

starts()