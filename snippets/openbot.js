/* module.exports = (container, browser) => {
  return browser
    .waitForVisible('#home-send-url-button', 30000).then(() => console.log('cc-btn visible'))
	.frame("frame")
.waitForVisible('#wot-bubble', 30000).then(() => console.log('wot bubble is visible'))
    .click('#wot-bubble')
    .pause(2000)
    .waitForVisible('#message-screen', 20000).then(() => console.log('chat window visible'))
    .waitForVisible('.message-box', 10000).then(() => console.log('wotnot textInput visible'))
    .waitForVisible('.bot-message', 10000).then(() => console.log('wotnot welcome visible'))
 */
module.exports = (container, browser) => {
  return browser
    .waitForVisible('iframe[class="new-design-bot"]', 30000).then(() => console.log('iframe visible'))
    .element('iframe[class="new-design-bot"]')
    .then((e) => {
      browser.frame(e.value)
    })
    .waitForVisible('#wot-bubble', 30000).then(() => console.log('wot bubble is visible'))
    .pause(5000)
    .click('#wot-bubble').then(() => console.log('wot-bubble is clicked'))
    .pause(2000)
    .waitForVisible('#message-screen', 20000).then(() => console.log('chat window visible'))
    .waitForVisible('.message-box', 10000).then(() => console.log('wotnot textInput visible'))
    .waitForVisible('.bot-message', 10000).then(() => console.log('wotnot welcome visible'))
    .pause(10000)
    
    
}
