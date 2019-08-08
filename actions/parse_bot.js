const util = require('util')
const vm = require('vm')
const fs = require('fs')
const path = require('path')
const async = require('async')
const mime = require('mime-types')
const webdriverio = require('webdriverio')
const esprima = require('esprima')
const Mustache = require('mustache')
const phantomjs = require('phantomjs-prebuilt')
const selenium = require('selenium-standalone')
const _ = require('lodash')
const debug = require('debug')('botium-connector-webdriverio')


function getMessage(container, browser, elementId, botMsg, cb) {

  browser.elementIdDisplayed(elementId).then((element) => {

    console.log("bot message displayed : " + elementId)
    browser.elementIdElement(elementId, '.bot-message').then((textElement) => {
      if (textElement.value) {
        const textElementId = textElement.value.ELEMENT

        console.log("text element : " + textElementId)
        browser.elementIdText(textElementId).then((message) => {
          const messageText = message.value
          console.log("message : " + messageText)
          if (messageText != "") {
            botMsg.messageText = messageText

          }
          return cb(botMsg)
        })

      } else {
        console.log("no text")
        return cb(botMsg)
      }


    })
  })



}
function getButton(container, browser, elementId, botMsg, cb) {
  browser.elementIdElements(elementId, '.message-options-button')
    .then((buttonElementIds) => {
      if(buttonElementIds.value.length > 0){
        botMsg.buttons = []
        console.log("button length" + buttonElementIds.value.length)
        buttonElementIds.value.forEach(buttonElement => {
          console.log("button element : "+ buttonElement.ELEMENT)
          browser.elementIdText(buttonElement.ELEMENT)
            .then((buttonText) => {
  
              console.log("button text :" + buttonText.value)
              botMsg.buttons.push({ text: buttonText.value })
  
            })
          
        })
        return cb(botMsg)
      }
      else{
        return cb(botMsg)
      }
     
      
      /* Promise.all(buttonElementIds.value.map(buttonElement =>
        browser.elementIdText(buttonElement.ELEMENT)
          .then((buttonText) => {

            console.log("button text :" + buttonText.value)
            botMsg.buttons.push({ text: buttonText.value })

          })
          .catch((err) => debug(`WEBDRIVERIO_GETBOTMESSAGE/messenger_com error getting button text: ${err}`))


      )) */
      })


    
}

function getImage(container, browser, elementId, botMsg, cb) {
  browser.elementIdElement(elementId, './/div[@class="image-message"]/img')
    .then((ImageElementId) => {
      console.log("image value " + ImageElementId)
      if (ImageElementId.value) {
        browser.elementIdAttribute(ImageElementId.value.ELEMENT, 'src').then((ImageElement) => {
          console.log("media url : " + ImageElement.value)
          if (ImageElement.value) {
            botMsg.image = ImageElement.value
            botMsg.messageText = "image"
          }
          return cb(botMsg)
        })
      }
      else {
        return cb(botMsg)
      }



    })

}

module.exports = (container, browser, elementId) => {
  debug(`getBotMessageDefault receiving text for element ${elementId}`)

  var botMsg = { sender: 'bot' }



  
  
    getMessage(container, browser, elementId, botMsg, (messageValue) => {
      //console.log("message found message" + JSON.stringify(messageValue))
      var botMsg1 = messageValue
      getButton(container, browser, elementId, botMsg1, (buttonValue) => {
        //console.log("button found message" + JSON.stringify(buttonValue))
        var botMsg2 = buttonValue
        getImage(container, browser, elementId, botMsg2, (imageValue) => {
          //console.log("image found message" + value1)
          console.log("final bot message" + JSON.stringify(imageValue))
          var botMsg3 = imageValue
           container.BotSays(botMsg3)
      })
    })
  })


  /* getmessage(container, browser, elementId, botMsg, (value) => {
    console.log("found message" + JSON.stringify(value))
    var botMsg1 = value
    if (botMsg1.messageText) {
      //console.log("bot message : " + JSON.stringify(botMsg))
      getButton(container, browser, elementId, botMsg1, (value1) => {
        console.log("image found message" + JSON.stringify(value1))
        var botMsg2 = value1
        return container.BotSays(botMsg2)
      })
    }
    else {
      getImage(container, browser, elementId, botMsg1, (imageValue) => {
        //console.log("image found message" + value1)
        console.log("image found message" + JSON.stringify(imageValue))
        var botMsg2 = imageValue
        return container.BotSays(botMsg2)
      })
    }



  })
 */
  //console.log("new message : " + newbot)





}