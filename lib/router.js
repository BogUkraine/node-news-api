const { Router } = require('express');
const feedsControllers = require('./controllers/feeds');
const favoritesControllers = require('./controllers/favorites');
const userControllers = require('./controllers/users');

const router = Router();

router.post('/user/login', userControllers.login);
router.post('/user/register', userControllers.register);

router.get('/feed/:page/:limit', feedsControllers.show);
router.post('/feed', feedsControllers.create);
router.delete('/feed/:id', feedsControllers.delete);

router.get('/favorites', favoritesControllers.show);
router.post('/favorites/save/:id', favoritesControllers.create);
router.delete('/favorites/:id', favoritesControllers.delete);

module.exports = router;