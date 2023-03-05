const router = require('express').Router();
const {authenticate} = require('../../middlewares/authenticate')

// CONTROLLERS
const authController = require('../../controllers/auth.controller');

// VALIDATIONS
const validate = require('../../middlewares/validate');
const schema = require('../../validations/auth.schema');

router.post('/register', validate(schema.registerSchema), authController.register);
router.post('/login', validate(schema.loginSchema), authController.login);
router.patch('/refresh', authController.refreshToken);
router.patch('/logout', authenticate, authController.logout);

module.exports = router;