const moment = require('moment-timezone'); // will help us do all the dates math while considering the timezone
const util = require('./util');

module.exports = {
    createBReminder(daysUntilEvent, timezone, locale, message) {
        moment.locale(locale);
        const createdMoment = moment().tz(timezone);
        let triggerMoment = createdMoment.startOf('day').add(daysUntilEvent, 'days');
        if (daysUntilEvent === 0) {
            triggerMoment = createdMoment.startOf('day').add(1, 'years');
        }
        console.log('Reminder schedule: ' + triggerMoment.format('YYYY-MM-DDTHH:mm:00.000'));

        return util.createReminder(createdMoment, triggerMoment, timezone, locale, message);
    }
}
