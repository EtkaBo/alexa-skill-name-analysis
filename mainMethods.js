
const steps = require('./steps');
const analysis = require('./analysis');
const nameAnalysisTexts = require('./nameAnalysisTexts');



const mainMethods = {


handleFirstName(handlerInput) {

    const name = handlerInput.requestEnvelope.request.intent.slots.firstNames.value;
  
      const sessionAttributes = {};
  
    Object.assign(sessionAttributes, {
       firstName: name,
       step: steps[2]
    });
  
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
  
    let speechOutput = `Hi ${name}, May I learn your gender ?`;
  
    return handlerInput.responseBuilder
    .speak(speechOutput)
    // .reprompt(repromptText)
  //   .withSimpleCard(requestAttributes.t('GAME_NAME'))
    .getResponse();
      
  },
  
   handleGender(handlerInput) {
  
      try {
          let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
  
          let textNums = analysis.hash(sessionAttributes.firstName, handlerInput.requestEnvelope.request.intent.slots.gender.value);
      
          console.log(textNums)
  
          let speechOutput = `As ${sessionAttributes.firstName} ` 
                              + nameAnalysisTexts.Phrases[textNums[0]] 
                              + ' ' + nameAnalysisTexts.Phrases2[textNums[1]];
          
          console.log(textNums[0].toString() + textNums[1].toString())
  
          speechOutput += '\n\nWould you like to try another name ?'
      
          return handlerInput.responseBuilder
          .speak(speechOutput)
          // .reprompt(repromptText)
          // .withSimpleCard(requestAttributes.t('GAME_NAME'))
          .getResponse();
      } catch (error) {
          console.log(error);
      }
     
  },
  
  
 startGame(newGame, handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
  
  
    let speechOutput = newGame
      ? requestAttributes.t('NEW_GAME_MESSAGE', requestAttributes.t('GAME_NAME'))
        + requestAttributes.t('WELCOME_MESSAGE')
      : requestAttributes.t('Please tell me your first name…');
  
    const sessionAttributes = {};
  
    Object.assign(sessionAttributes, {
      step: steps[1]
    });
  
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
    
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withSimpleCard(requestAttributes.t('GAME_NAME'))
      .withShouldEndSession(false)
      .getResponse();
  }
}

module.exports = mainMethods;