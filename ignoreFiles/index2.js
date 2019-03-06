// // Hello, welcome to Etkas Name Analysis. What is your name ?

// /* eslint-disable  func-names */
// /* eslint-disable  no-console */

// const Alexa = require('ask-sdk-core');
// // const questions = require('./questions');
// const i18n = require('i18next');
// const sprintf = require('i18next-sprintf-postprocessor');
// const steps = require('./steps');
// const analysis = require('./analysis');
// const nameAnalysisTexts = require('./nameAnalysisTexts');


// function startGame(newGame, handlerInput) {
//   const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

// //   if(requestAttributes.steps === steps[1])

//   let speechOutput = newGame
//     ? requestAttributes.t('NEW_GAME_MESSAGE', requestAttributes.t('GAME_NAME'))
//       + requestAttributes.t('WELCOME_MESSAGE')
//     : requestAttributes.t('Please tell me your first name…');

    
// //   speechOutput += repromptText;
// // // // //   const sessionAttributes = {};

// // // // //   Object.assign(sessionAttributes, {
// // // // //     // speechOutput: repromptText,
// // // // //     // repromptText,
// // // // //     // currentQuestionIndex,
// // // // //     // step: steps[1],
// // // // //     // correctAnswerIndex: correctAnswerIndex + 1,
// // // // //     // questions: gameQuestions,
// // // // //     // score: 0,
// // // // //   });

// // // // //   handlerInput.attributesManager.setSessionAttributes(sessionAttributes);


//   const sessionAttributes = {};

//   Object.assign(sessionAttributes, {
//     step: steps[1]
//   });

//   handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
  
//   return handlerInput.responseBuilder
//     .speak(speechOutput)
//     .reprompt(speechOutput)
//     .withSimpleCard(requestAttributes.t('GAME_NAME'))
//     .withShouldEndSession(false)
//     .getResponse();
// }

// /* jshint -W101 */
// const languageString = {
//   en: {
//     translation: {
//     //   QUESTIONS: questions.QUESTIONS_EN_US,
//       GAME_NAME: 'Etka\'s Name Analysis',
//       HELP_MESSAGE: 'I can help you understand whether your first name is helping or hurting you… ',
//       FIRST_NAME: 'Please tell me your first name…',
//       HELP_REPROMPT: 'To give an answer to a question, respond with the number of the answer. ',
//       STOP_MESSAGE: 'Would you like to keep playing?',
//       CANCEL_MESSAGE: 'Ok, let\'s play again soon.',
//       NO_MESSAGE: 'Thank you for trying Etka\'s Name Analysis.Don\'t forget, your name can both help you or hurt you!',
//       NEW_GAME_MESSAGE: 'Hello, Welcome to %s. ',
//       WELCOME_MESSAGE: 'I can help you understand whether your first name is helping or hurting you… Please tell me your first name…',
//     },
//   },
//   'en-US': {
//     translation: {
//       GAME_NAME: 'Etka\'s Name Analysis'
//     },
//   },
// };


// const LocalizationInterceptor = {
//   process(handlerInput) {
//     const localizationClient = i18n.use(sprintf).init({
//       lng: handlerInput.requestEnvelope.request.locale,
//       overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
//       resources: languageString,
//       returnObjects: true
//     });

//     const attributes = handlerInput.attributesManager.getRequestAttributes();
//     attributes.t = function (...args) {
//       return localizationClient.t(...args);
//     };
//   },
// };

// const LaunchRequest = {
//   canHandle(handlerInput) {
//     const { request } = handlerInput.requestEnvelope;

//     return request.type === 'LaunchRequest'
//       || (request.type === 'IntentRequest'
//         && request.intent.name === 'AMAZON.StartOverIntent');
//   },
//   handle(handlerInput) {
//     return startGame(true, handlerInput);
//   },
// };


// const HelpIntent = {
//   canHandle(handlerInput) {
//     const { request } = handlerInput.requestEnvelope;

//     return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
//   },
//   handle(handlerInput) {
//     const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

//     const newGame = !(sessionAttributes.questions);
//     return helpTheUser(newGame, handlerInput);
//   },
// };

// const SessionEndedRequest = {
//   canHandle(handlerInput) {
//     return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
//   },
//   handle(handlerInput) {
//     console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

//     return ErrorHandler.handle(handlerInput,null);
//     // return handlerInput.responseBuilder.getResponse();
//   },
// };

// const AnswerIntent = {
//   canHandle(handlerInput) {
//     return handlerInput.requestEnvelope.request.type === 'IntentRequest'
//         && (handlerInput.requestEnvelope.request.intent.name === 'AnswerIntent'
//         || handlerInput.requestEnvelope.request.intent.name === 'DontKnowIntent');
//   },
//   handle(handlerInput) {
//     if (handlerInput.requestEnvelope.request.intent.name === 'AnswerIntent') {
//       return handleUserGuess(false, handlerInput);
//     }
//     return handleUserGuess(true, handlerInput);
//   },
// };

// const RepeatIntent = {
//   canHandle(handlerInput) {
//     return handlerInput.requestEnvelope.request.type === 'IntentRequest'
//         && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.RepeatIntent';
//   },
//   handle(handlerInput) {
//     const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
//     return handlerInput.responseBuilder.speak(sessionAttributes.speechOutput)
//       .reprompt(sessionAttributes.repromptText)
//       .getResponse();
//   },
// };

// const YesIntent = {
//   canHandle(handlerInput) {
//     return handlerInput.requestEnvelope.request.type === 'IntentRequest'
//         && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent';
//   },
//   handle(handlerInput) {
//     return startGame(false, handlerInput);
//   },
// };


// const StopIntent = {
//   canHandle(handlerInput) {
//     return handlerInput.requestEnvelope.request.type === 'IntentRequest'
//         && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent';
//   },
//   handle(handlerInput) {
//     const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
//     const speechOutput = requestAttributes.t('STOP_MESSAGE');

//     return handlerInput.responseBuilder.speak(speechOutput)
//       .reprompt(speechOutput)
//       .getResponse();
//   },
// };

// const CancelIntent = {
//   canHandle(handlerInput) {
//     return handlerInput.requestEnvelope.request.type === 'IntentRequest'
//       && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent';
//   },
//   handle(handlerInput) {
//     const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
//     const speechOutput = requestAttributes.t('CANCEL_MESSAGE');

//     return handlerInput.responseBuilder.speak(speechOutput)
//       .getResponse();
//   },
// };

// const NoIntent = {
//   canHandle(handlerInput) {
//     return handlerInput.requestEnvelope.request.type === 'IntentRequest'
//       && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NoIntent';
//   },
//   handle(handlerInput) {
//     const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
//     const speechOutput = requestAttributes.t('NO_MESSAGE');
//     return handlerInput.responseBuilder.speak(speechOutput).getResponse();
//   },
// };

// const ErrorHandler = {
//   canHandle() {
//     return true;
//   },
//   handle(handlerInput, error) {
//     console.log(`Error handled: ${error.message}`);

//     return handlerInput.responseBuilder
//       .speak('Sorry, I can\'t understand the command. Please say again.')
//       .reprompt('Sorry, I can\'t understand the command. Please say again.')
//       .getResponse();
//   },
// };

// const ResponseToGenderIntent = {
//     canHandle(handlerInput) {
//         return handlerInput.requestEnvelope.request.type === 'IntentRequest'
//         && handlerInput.requestEnvelope.request.intent.name === 'ResponseToGenderIntent';
//         // const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
//         // return sessionAttributes.step === steps[2];
//       },
//     handle(handlerInput) {
//         return handleGender(handlerInput);
//     }
// };

// const firstNameResponse = {
//     canHandle(handlerInput) {
       
//         return handlerInput.requestEnvelope.request.type === 'IntentRequest'
//         && handlerInput.requestEnvelope.request.intent.name === 'FirstName';
//         // const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
//         // return sessionAttributes.step === steps[1];

//         // return handlerInput.requestEnvelope.request.intent.name === 'FirstName';
//       },
//     handle(handlerInput) {
//         return handleFirstName(handlerInput);
//     }
// };

// function handleFirstName(handlerInput) {

//   let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

//   if(sessionAttributes.step === steps[2] && sessionAttributes.firstName !== null) {
//     return handleGender(handlerInput);
//   }

//   const name = handlerInput.requestEnvelope.request.intent.slots.firstNames.value;

//    sessionAttributes = {};

//   Object.assign(sessionAttributes, {
//      firstName: name,
//      step: steps[2]
//   });

//   handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

//   let speechOutput = `Hi ${name}, May I learn your gender ?`;

//   return handlerInput.responseBuilder
//   .speak(speechOutput)
//   .reprompt(speechOutput)
// //   .withSimpleCard(requestAttributes.t('GAME_NAME'))
//   .getResponse();
    
// }

// function handleGender(handlerInput) {

//     try {
//         let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

//         if(sessionAttributes.step === steps[1]) {
//           return startGame(false,handlerInput);
//         }
//         let textNums = analysis.hash(sessionAttributes.firstName, handlerInput.requestEnvelope.request.intent.slots.gender.name);
    
//         console.log(textNums)

//         let speechOutput = `As ${sessionAttributes.firstName} ` 
//                             + nameAnalysisTexts.Phrases[textNums[0]] 
//                             + nameAnalysisTexts.Phrases2[textNums[1]];
        
//         console.log(textNums[0].toString() + textNums[1].toString())

//         speechOutput += '\n\nWould you like to try another name ?'
    
//         return handlerInput.responseBuilder
//         .speak(speechOutput)
//         .reprompt(speechOutput)
//         // .withSimpleCard(requestAttributes.t('GAME_NAME'))
//         .getResponse();
//     } catch (error) {
//         console.log(error);
//     }
   
// }



// const skillBuilder = Alexa.SkillBuilders.custom();
// exports.handler = skillBuilder
//   .addRequestHandlers(
//     LaunchRequest,
//     HelpIntent,
//     AnswerIntent,
//     RepeatIntent,
//     YesIntent,
//     StopIntent,
//     CancelIntent,
//     NoIntent,
//     SessionEndedRequest,
//     // UnhandledIntent,
//     firstNameResponse,
//     ResponseToGenderIntent
//   )
//   .addRequestInterceptors(LocalizationInterceptor)
//   .addErrorHandlers(ErrorHandler)
//   .lambda();


