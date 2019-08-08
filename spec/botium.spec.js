const BotiumBindings = require('botium-bindings')
process.env.BOTIUM_CONFIG='./botium.json'
const bb = new BotiumBindings({convodirs: ['./spec/convo/wotnot' ]})
BotiumBindings.helper.mocha().setupMochaTestSuite({timeout:300000, bb })
