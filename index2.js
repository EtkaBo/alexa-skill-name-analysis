// Hello, welcome to Etkas Name Analysis. What is your name ?

/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
// const questions = require('./questions');
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');
const steps = require('./steps');
const analysis = require('./analysis');
const nameAnalysisTexts = require('./nameAnalysisTexts');

const ANSWER_COUNT = 4;
const GAME_LENGTH = 5;


function isAnswerSlotValid(intent) {
  const answerSlotFilled = intent
    && intent.slots
    && intent.slots.Answer
    && intent.slots.Answer.value;
  const answerSlotIsInt = answerSlotFilled
    && !Number.isNaN(parseInt(intent.slots.Answer.value, 10));
  return answerSlotIsInt
    && parseInt(intent.slots.Answer.value, 10) < (ANSWER_COUNT + 1)
    && parseInt(intent.slots.Answer.value, 10) > 0;
}

function handleUserGuess(userGaveUp, handlerInput) {
  const { requestEnvelope, attributesManager, responseBuilder } = handlerInput;
  const { intent } = requestEnvelope.request;

  const answerSlotValid = isAnswerSlotValid(intent);

  let speechOutput = '';
  let speechOutputAnalysis = '';

  const sessionAttributes = attributesManager.getSessionAttributes();
  const gameQuestions = sessionAttributes.questions;
  let correctAnswerIndex = parseInt(sessionAttributes.correctAnswerIndex, 10);
  let currentScore = parseInt(sessionAttributes.score, 10);
  let currentQuestionIndex = parseInt(sessionAttributes.currentQuestionIndex, 10);
  const { correctAnswerText } = sessionAttributes;
  const requestAttributes = attributesManager.getRequestAttributes();
  const translatedQuestions = requestAttributes.t('QUESTIONS');


  if (answerSlotValid
    && parseInt(intent.slots.Answer.value, 10) === sessionAttributes.correctAnswerIndex) {
    currentScore += 1;
    speechOutputAnalysis = requestAttributes.t('ANSWER_CORRECT_MESSAGE');
  } else {
    if (!userGaveUp) {
      speechOutputAnalysis = requestAttributes.t('ANSWER_WRONG_MESSAGE');
    }

    speechOutputAnalysis += requestAttributes.t(
      'CORRECT_ANSWER_MESSAGE',
      correctAnswerIndex,
      correctAnswerText
    );
  }

  // Check if we can exit the game session after GAME_LENGTH questions (zero-indexed)
  if (sessionAttributes.currentQuestionIndex === GAME_LENGTH - 1) {
    speechOutput = userGaveUp ? '' : requestAttributes.t('ANSWER_IS_MESSAGE');
    speechOutput += speechOutputAnalysis + requestAttributes.t(
      'GAME_OVER_MESSAGE',
      currentScore.toString(),
      GAME_LENGTH.toString()
    );

    return responseBuilder
      .speak(speechOutput)
      .getResponse();
  }
  currentQuestionIndex += 1;
  correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT));
  const spokenQuestion = Object.keys(translatedQuestions[gameQuestions[currentQuestionIndex]])[0];
  const roundAnswers = populateRoundAnswers(
    gameQuestions,
    currentQuestionIndex,
    correctAnswerIndex,
    translatedQuestions
  );
  const questionIndexForSpeech = currentQuestionIndex + 1;
  let repromptText = requestAttributes.t(
    'TELL_QUESTION_MESSAGE',
    questionIndexForSpeech.toString(),
    spokenQuestion
  );

  for (let i = 0; i < ANSWER_COUNT; i += 1) {
    repromptText += `${i + 1}. ${roundAnswers[i]}. `;
  }

  speechOutput += userGaveUp ? '' : requestAttributes.t('ANSWER_IS_MESSAGE');
  speechOutput += speechOutputAnalysis
    + requestAttributes.t('SCORE_IS_MESSAGE', currentScore.toString())
    + repromptText;

  const translatedQuestion = translatedQuestions[gameQuestions[currentQuestionIndex]];

  Object.assign(sessionAttributes, {
    speechOutput: repromptText,
    repromptText,
    currentQuestionIndex,
    correctAnswerIndex: correctAnswerIndex + 1,
    questions: gameQuestions,
    score: currentScore,
    correctAnswerText: translatedQuestion[Object.keys(translatedQuestion)[0]][0]
  });

  return responseBuilder.speak(speechOutput)
    .reprompt(repromptText)
    .withSimpleCard(requestAttributes.t('GAME_NAME'), repromptText)
    .getResponse();
}



function startGame(newGame, handlerInput) {
  const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

//   if(requestAttributes.steps === steps[1])

  let speechOutput = newGame
    ? requestAttributes.t('NEW_GAME_MESSAGE', requestAttributes.t('GAME_NAME'))
      + requestAttributes.t('WELCOME_MESSAGE')
    : requestAttributes.t('Please tell me your first name…');

//   const translatedQuestions = requestAttributes.t('QUESTIONS');

//   const gameQuestions = populateGameQuestions(translatedQuestions);
//   const correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT));

//   const roundAnswers = populateRoundAnswers(
//     gameQuestions,
//     0,
//     correctAnswerIndex,
//     translatedQuestions
//   );
//   const currentQuestionIndex = 0;
//   const spokenQuestion = Object.keys(translatedQuestions[gameQuestions[currentQuestionIndex]])[0];
//   let repromptText = requestAttributes.t('TELL_QUESTION_MESSAGE', '1', spokenQuestion);
//   for (let i = 0; i < ANSWER_COUNT; i += 1) {
//     repromptText += `${i + 1}. ${roundAnswers[i]}. `;
//   }

    // let repromptText = requestAttributes.t()

    
//   speechOutput += repromptText;
// // // //   const sessionAttributes = {};

// // // //   Object.assign(sessionAttributes, {
// // // //     // speechOutput: repromptText,
// // // //     // repromptText,
// // // //     // currentQuestionIndex,
// // // //     // step: steps[1],
// // // //     // correctAnswerIndex: correctAnswerIndex + 1,
// // // //     // questions: gameQuestions,
// // // //     // score: 0,
// // // //   });

// // // //   handlerInput.attributesManager.setSessionAttributes(sessionAttributes);


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

function helpTheUser(newGame, handlerInput) {
  const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
  const askMessage = newGame
    ? requestAttributes.t('ASK_MESSAGE_START')
    : requestAttributes.t('REPEAT_QUESTION_MESSAGE') + requestAttributes.t('STOP_MESSAGE');
  const speechOutput = requestAttributes.t('HELP_MESSAGE', GAME_LENGTH) + askMessage;
  const repromptText = requestAttributes.t('HELP_REPROMPT') + askMessage;

  return handlerInput.responseBuilder.speak(speechOutput).reprompt(repromptText).getResponse();
}




/* jshint -W101 */
const languageString = {
  en: {
    translation: {
    //   QUESTIONS: questions.QUESTIONS_EN_US,
      GAME_NAME: 'Etka\'s Name Analysis',
      HELP_MESSAGE: 'I can help you understand whether your first name is helping or hurting you… ',
      FIRST_NAME: 'Please tell me your first name…',
      HELP_REPROMPT: 'To give an answer to a question, respond with the number of the answer. ',
      STOP_MESSAGE: 'Would you like to keep playing?',
      CANCEL_MESSAGE: 'Ok, let\'s play again soon.',
      NO_MESSAGE: 'Thank you for trying Etka\'s Name Analysis.Don\'t forget,',
      NEW_GAME_MESSAGE: 'Hello, Welcome to %s. ',
      WELCOME_MESSAGE: 'I can help you understand whether your first name is helping or hurting you… Please tell me your first name…',
    },
  },
  'en-US': {
    translation: {
      GAME_NAME: 'Etka\'s Name Analysis'
    },
  },
};


const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: languageString,
      returnObjects: true
    });

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function (...args) {
      return localizationClient.t(...args);
    };
  },
};

const LaunchRequest = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;

    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'AMAZON.StartOverIntent');
  },
  handle(handlerInput) {
    return startGame(true, handlerInput);
  },
};


const HelpIntent = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;

    return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    const newGame = !(sessionAttributes.questions);
    return helpTheUser(newGame, handlerInput);
  },
};

const SessionEndedRequest = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const AnswerIntent = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && (handlerInput.requestEnvelope.request.intent.name === 'AnswerIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'DontKnowIntent');
  },
  handle(handlerInput) {
    if (handlerInput.requestEnvelope.request.intent.name === 'AnswerIntent') {
      return handleUserGuess(false, handlerInput);
    }
    return handleUserGuess(true, handlerInput);
  },
};

const RepeatIntent = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.RepeatIntent';
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    return handlerInput.responseBuilder.speak(sessionAttributes.speechOutput)
      .reprompt(sessionAttributes.repromptText)
      .getResponse();
  },
};

const YesIntent = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent';
  },
  handle(handlerInput) {
    return startGame(false, handlerInput);
  },
};


const StopIntent = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent';
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const speechOutput = requestAttributes.t('STOP_MESSAGE');

    return handlerInput.responseBuilder.speak(speechOutput)
      .reprompt(speechOutput)
      .getResponse();
  },
};

const CancelIntent = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent';
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const speechOutput = requestAttributes.t('CANCEL_MESSAGE');

    return handlerInput.responseBuilder.speak(speechOutput)
      .getResponse();
  },
};

const NoIntent = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NoIntent';
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const speechOutput = requestAttributes.t('NO_MESSAGE');
    return handlerInput.responseBuilder.speak(speechOutput).getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const ResponseToGenderIntent = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'ResponseToGenderIntent';
        // const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        // return sessionAttributes.step === steps[2];
      },
    handle(handlerInput) {
        return handleGender(handlerInput);
    }
};

const firstNameResponse = {
    canHandle(handlerInput) {
       
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'FirstName';
        // const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        // return sessionAttributes.step === steps[1];

        // return handlerInput.requestEnvelope.request.intent.name === 'FirstName';
      },
    handle(handlerInput) {
        return handleFirstName(handlerInput);
    }
};

function handleFirstName(handlerInput) {

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
    
}

function handleGender(handlerInput) {

    try {
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let textNums = analysis.hash(sessionAttributes.name, handlerInput.requestEnvelope.request.intent.slots.gender.value);
    
        console.log(textNums)

        let speechOutput = `As ${sessionAttributes.firstName} ` 
                            + nameAnalysisTexts.Phrases[textNums[0]] 
                            + nameAnalysisTexts.Phrases2[textNums[1]];
        

        speechOutput += '\n\nWould you like to try another name ?'
    
        return handlerInput.responseBuilder
        .speak(speechOutput)
        // .reprompt(repromptText)
        // .withSimpleCard(requestAttributes.t('GAME_NAME'))
        .getResponse();
    } catch (error) {
        console.log(error);
    }
   
}



const skillBuilder = Alexa.SkillBuilders.custom();
exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequest,
    HelpIntent,
    AnswerIntent,
    RepeatIntent,
    YesIntent,
    StopIntent,
    CancelIntent,
    NoIntent,
    SessionEndedRequest,
    // UnhandledIntent,
    firstNameResponse,
    ResponseToGenderIntent
  )
  .addRequestInterceptors(LocalizationInterceptor)
  .addErrorHandlers(ErrorHandler)
  .lambda();


