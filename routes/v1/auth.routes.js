const router = require('express').Router();
const passport = require('../../config/passport');
const {authenticate} = require('../../middlewares/authenticate');

// CONTROLLERS
const authController = require('../../controllers/auth.controller');

// VALIDATIONS
const validate = require('../../middlewares/validate');
const schema = require('../../validations/auth.schema');

router.post('/register', validate(schema.registerSchema), authController.register);
router.post('/verify', validate(schema.verifyAccountSchema), authController.verifyAccount);
router.post('/login', validate(schema.loginSchema), authController.login);
router.patch('/refresh', authController.refreshToken);
router.patch('/logout', authenticate, authController.logout);

// Facebook authentication
router.get('/facebook', passport.authenticate('facebook'));
router.get('/callback/s=facebook', authController.socialMediaLogin);

// Google authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/callback/s=google', authController.socialMediaLogin);

// Twitter authentication
router.get('/twitter', passport.authenticate('twitter'));
router.get('/callback/s=twitter', authController.socialMediaLogin);

module.exports = router;