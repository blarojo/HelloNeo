const Alexa = require('ask-sdk-core');
const util = require('./util'); // utility functions
const interceptors = require('./interceptors');
const logic = require('./logic'); // this file encapsulates all "business" logic
const constants = require('./constants'); // constants such as specific service permissions go here

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const {attributesManager, requestEnvelope} = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes();
        
        const name = sessionAttributes['name'] || 'Allan';
        
        const audioUrl = util.getS3PreSignedUrl("Media/ubs-intro.mp3").replace(/&/g,'&amp;');
        return handlerInput.responseBuilder
                .speak(` Hello ${name}`)
                .reprompt('If you\'re not sure what to do next try asking for help. If you want to leave just say stop. What would you like to do next?')
                .getResponse();
    }
};



const GetResearchIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetNeoResearchIntent';
    },
    handle(handlerInput) {
        const {attributesManager, requestEnvelope} = handlerInput;
        // the attributes manager allows us to access session attributes
        const sessionAttributes = attributesManager.getSessionAttributes();
        const {intent} = requestEnvelope.request;
        const name = sessionAttributes['name'] || 'Allan';
        const topic = Alexa.getSlotValue(requestEnvelope, 'topic') || 'amazon';
        const audioUrl = util.getS3PreSignedUrl("Media/ubs-intro.mp3").replace(/&/g,'&amp;');
        
        //const speakOutput = 'There is a research paper on Tesla with UBS. Do you want to hear about it ?';

        const topicDetails = sessionAttributes[topic];
        
        let speechText = '';
        
        if(topicDetails) {
            speechText = handlerInput.t('SUCCESS_MSG', {name:name, topicDetails: topicDetails});  
            speechText += 'Would you like to hear more?';
            
        } else {
            
            sessionAttributes[topic] = 'Amazon Bullish on smart speakers.';
            const topicDetails = sessionAttributes[topic];
            
            speechText = handlerInput.t('SUCCESS_MSG', {name:name, topicDetails: topicDetails});  
            speechText += 'Would you like to hear more ?';
            /*handlerInput.responseBuilder.addDelegateDirective({
                name: 'AddResearchIntent',
                confirmationStatus: 'NONE',
                slots: {}
            });*/
        }
        
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(`Ofcourse ${name}, have a good day !! <audio src="${audioUrl}"/>`)
            .getResponse();
    }
};

const AddResearchIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AddResearchIntent';
    },
    handle(handlerInput) {
        const {attributesManager, requestEnvelope} = handlerInput;
        // the attributes manager allows us to access session attributes
        const sessionAttributes = attributesManager.getSessionAttributes();
        const {intent} = requestEnvelope.request;
        
        
            const topicDetails = Alexa.getSlotValue(requestEnvelope, 'topicDetails');
            const topic = Alexa.getSlotValue(requestEnvelope, 'topic');
            
            //const speakOutput = 'There is a research paper on Tesla with UBS. Do you want to hear about it ?';
    
            sessionAttributes[topic] = topicDetails;
       
        
            let speechText = 'topic has been added successfully';
            
            return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt('If you\'re not sure what to do next try asking for help. If you want to leave just say stop. What would you like to do next?')
                .getResponse();
    }
};


const CreateReminderWithParametersIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ReminderIntent';
    },
    async handle(handlerInput) {
        
        const reminderApiClient = handlerInput.serviceClientFactory.getReminderManagementServiceClient();
        
        const {requestEnvelope, responseBuilder} = handlerInput;
        const {intent} = requestEnvelope.request;
        
        const time = Alexa.getSlotValue(requestEnvelope, 'time');
        const amOrPm = Alexa.getSlotValue(requestEnvelope, 'amOrPm');
        const company = Alexa.getSlotValue(requestEnvelope, 'company');

            
        /* 
        Uncomment this bit and test on Alexa
        ,{ permissions } = handlerInput.requestEnvelope.context.System.user
        
        // This bit doesn't work on the computer
        if(!permissions){
            return handlerInput.respondBuilder.speak("Please go to the Alexa mobile app to grant reminders permissions")
                .withAskForPermissionsConsentCard(['alexa::alerts:reminders:skill:readwrite'])
                .getResponse()
        }
        
        const currentDateTime = moment().tz('Europe/London'),
            reminderRequest = {
                   requestTime : currentDateTime.format('YYYY-MM-DDTHH:mm:ss'),
                   trigger: {
                        type : "SCHEDULED_ABSOLUTE",
                        scheduledTime : currentDateTime.set({
                            hour: '10',
                            minute: '00',
                            second: '00'
                        }).format('YYYY-MM-DDTHH:mm:ss'),
                        timeZoneId : "Europe/London"
                   },
                   alertInfo: {
                        spokenInfo: {
                            content: [{
                                locale: "en-GB",
                                text: "The titles of relevant articles about blah are blah",
                                ssml: "<speak>The titles of relevant articles about blah are blah</speak>"  
                            }]
                        }
                    },
                    pushNotification : {                            
                         status : "ENABLED"
                    }
                  }
            
            
        try {
            await reminderApiClient.createReminder(reminderRequest)
        } catch (error){
            console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);
            return handlerInput.responseBuilder
                .speak("There was an error setting up your reminder, please try again later")
                .getResponse();
        }*/
        

        const speechText = handlerInput.t('REMINDER_SUCCESS_MSG', {time: time, amOrPm: amOrPm, company: company});

        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = handlerInput.t('HELP_MSG');

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const name = sessionAttributes['name'] || ' Allan';
        let speechText = handlerInput.t('GOODBYE_MSG', {name: name});
        
        const audioUrl = util.getS3PreSignedUrl("Media/ubs-intro.mp3").replace(/&/g,'&amp;');
        
        speechText += `<audio src="${audioUrl}"/>`;

        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speechText = handlerInput.t('FALLBACK_MSG');

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speechText = handlerInput.t('REFLECTOR_MSG', {intent: intentName});

        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speechText = handlerInput.t('ERROR_MSG');
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse();
    }
};
/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        GetResearchIntentHandler,
        AddResearchIntentHandler,
        CreateReminderWithParametersIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(
        interceptors.LoadAttributesRequestInterceptor,
        interceptors.LocalisationRequestInterceptor,
        interceptors.LoggingRequestInterceptor,
        interceptors.LoadNameRequestInterceptor,
        interceptors.LoadTimezoneRequestInterceptor)
    .addResponseInterceptors(
        interceptors.LoggingResponseInterceptor,
        interceptors.SaveAttributesResponseInterceptor)
    .withPersistenceAdapter(util.getPersistenceAdapter())
    .withApiClient(new Alexa.DefaultApiClient())
    .withCustomUserAgent('sample/happy-birthday/mod6')
    .lambda();
