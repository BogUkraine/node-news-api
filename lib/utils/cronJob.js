const CronJob = require('cron').CronJob;
const config  = require('../../config');
const feedsControllers = require('../controllers/feeds');

const startCronJob = () => {
    const job = new CronJob(config.cronTimeout, () => {
        feedsControllers.postFromApi();
    }, null, true, config.cronTimezone);
    job.start();
}
module.exports = startCronJob;