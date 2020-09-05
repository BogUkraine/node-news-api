const { Router } = require('express');
const feedsControllers = require('./controllers/feeds');

const router = Router();

router.get('/', feedsControllers.show);

module.exports = router;