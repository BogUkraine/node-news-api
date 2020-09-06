const { Router } = require('express');
const feedsControllers = require('./controllers/feeds');

const router = Router();

router.get('/feed/:page/:limit', feedsControllers.show);
router.post('/feed', feedsControllers.create);
router.delete('/feed/:id', feedsControllers.delete);

module.exports = router;