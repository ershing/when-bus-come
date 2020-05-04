const { Wechaty } = require('wechaty')
const { ScanStatus } = require('wechaty-puppet')
const { PuppetPadplus } = require('wechaty-puppet-padplus')
const QrcodeTerminal = require('qrcode-terminal')

const handler = require('./handler')

// const token = 'puppet_padplus_eee234cc1d3ebc3e'

// const puppet = new PuppetPadplus({
//     token,
// })

// const name = 'when-bus-come'

// const bot = new Wechaty({
//     puppet,
//     name, // generate xxxx.memory-card.json and save login data for the next login
// })

// bot
//     .on('scan', (qrcode, status) => {
//         if (status === ScanStatus.Waiting) {
//             QrcodeTerminal.generate(qrcode, {
//                 small: true
//             })
//         }
//     })
//     .on('message', async msg => {
//         const contact = msg.from()
//         const busStation = msg.text().trim()
//         try {
//             const res = await handler(busStation)
//             botMsger(contact, res)
//         } catch (eMsg) {
//             botMsger(contact, eMsg)
//         }
//     })
//     .start()

// function botMsger(contact, text) {
//     contact.say(text)
// }
async function test(){
    const res = await handler('北京路')
    console.log({res})
}
test()
