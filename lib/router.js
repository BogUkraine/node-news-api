const { Router } = require('express');
const feedsControllers = require('./controllers/feeds');

const router = Router();

router.get('/:page/:limit', feedsControllers.show);

module.exports = router;