module.exports = {
    en: {
        translation: {
            POSITIVE_SOUND: `<audio src='soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_positive_response_02'/>`,
            GREETING_SPEECHCON: `<say-as interpret-as="interjection">bravo</say-as>`,
            DOUBT_SPEECHCON: `<say-as interpret-as="interjection">hmm</say-as>`,
            WELCOME_MSG: `Welcome to Neo News {{name}}.`,
            WELCOME_BACK_MSG: 'Welcome back {{name}}! ',
            REJECTED_MSG: 'No problem. Please say the date again so I can get it right.',
            DAYS_LEFT_MSG: `{{name}} There's {{count}} day left `,
            DAYS_LEFT_MSG_plural: '{{name}} There are {{count}} days left ',
            WILL_TURN_MSG: `until you're {{count}} year old. `,
            WILL_TURN_MSG_plural: `until you're {{count}} years old. `,
            GREET_MSG: '$t(POSITIVE_SOUND) $t(GREETING_SPEECHCON) {{name}}. ',
            SUCCESS_MSG: '{{name}}, here are your latest UBS Insights:  {{topicDetails}}. ',
            REMINDER_SUCCESS_MSG: 'You have successfully set up a reminder for {{time}} {{amOrPm}} for company {{company}}.',
            NOW_TURN_MSG: `You're now {{count}} year old! `,
            NOW_TURN_MSG_plural: `You're now {{count}} years old! `,
            MISSING_MSG: `$t(DOUBT_SPEECHCON). It looks like you haven't told me yet. `,
            POST_SAY_HELP_MSG: `If you want to change the date, try saying, register. You can also try to set up a reminder for you. What would you like to do next? `,
            HELP_MSG: 'I can remember if you tell me the date. Or I can tell you the remaining days until your next event. Also, you can create a reminder so you never forget about . Which one would you like to try? ',
            REPROMPT_MSG: `If you're not sure what to do next try asking for help. If you want to leave just say stop. What would you like to do next? `,
            GOODBYE_MSG: ['Ofcourse , have a goodday {{name}}!'],
            REFLECTOR_MSG: 'You just triggered {{intent}}',
            FALLBACK_MSG: `Sorry, I don't know about that. Please try again.`,
            ERROR_MSG: 'Sorry, there was an error. Please try again.',
            NO_TIMEZONE_MSG: `I can't determine your timezone. Please check your device settings and make sure a timezone was selected. After that please reopen the skill and try again!`,
            REMINDER_CREATED_MSG: '{{name}} your reminder has been created successfully. ',
            REMINDER_ERROR_MSG: 'Sorry, there was an error creating the reminder. ',
            UNSUPPORTED_DEVICE_MSG: `This device doesn't support this operation. `,
            CANCEL_MSG: `Ok. Let's cancel that. `,
            MISSING_PERMISSION_MSG: `It looks like you haven't granted permissions for reminders. I have just sent you a card to your Alexa app so you can quickly enable this. `,
            POST_REMINDER_HELP_MSG: `If you want to know when your reminder will trigger, you can say, how many days until the event. What would you like to do next?`
        }
    }
}
