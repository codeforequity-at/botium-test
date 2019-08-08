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

module.exports = (container, browser, msg) => {
const inputElementVisibleTimeout = 10000
const inputElement = '.message-box'
const inputElementSendButton = '.custom-attachment-button'
  if (msg.buttons && msg.buttons.length > 0) {
    const btnSelector = "//div[contains(text(),'" + msg.buttons[0].text + "')]"
    console.log("xpath 1 : "+ btnSelector)
    debug(`Waiting for button element to be visible: ${btnSelector}`)
    return browser
      .waitForVisible(btnSelector, inputElementVisibleTimeout)
      .click(btnSelector)

  }
  /* else{
    return browser
    .waitForVisible('.calender-button')
    .click('.calender-button')
    .pause(10000)
    .click('.//')

  } */
  if (inputElementSendButton) {
    return browser
      .waitForEnabled(inputElement, inputElementVisibleTimeout)
      .setValue(inputElement, msg.messageText)
      .waitForVisible(inputElementSendButton, inputElementVisibleTimeout)
      .click(inputElementSendButton)
  } else {
    return browser
      .waitForEnabled(inputElement, inputElementVisibleTimeout)
      .setValue(inputElement, msg.messageText)
      .keys('Enter')
  }


}