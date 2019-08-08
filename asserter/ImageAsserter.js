const fetch = require('node-fetch')

module.exports = class ImageAsserter {
  constructor(context, caps = {}) {
    this.context = context
    this.caps = caps
  }

   assertConvoStep({ convo, convoStep, args, botMsg }) {

    if (args.length != 1) {
      return Promise.reject(new Error(`${convoStep.stepTag}: Media Assertion can have only one Argument but found "${args.length}" `))
    }
    else {
      const mediaNotFound = []
      const brokenMedia = []

      if (botMsg.image) {
        if (botMsg.image === args[0]) {
          /* const response = await fetch(botMsg.image);
          const status = response.status;
          console.log(" image status :" + status)
          if (status == 200) {
          }
          else {
            brokenMedia.push(args[0])
          }*/
        } 
        else {
          mediaNotFound.push(args[0])
        }
      }
      else
      mediaNotFound.push(args[0])
      if (mediaNotFound.length > 0) return Promise.reject(new Error(`${convoStep.stepTag}: Expected media with uri "${mediaNotFound}" but found "${JSON.stringify(botMsg.image)}`))
      /* if (brokenMedia.length > 0) {
        return Promise.reject(new Error(`${convoStep.stepTag}: Media files are not available for  "${brokenMedia}"`))
      } */
      return Promise.resolve()
    }
  }

}