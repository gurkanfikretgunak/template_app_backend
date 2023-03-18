// PACKAGES
const router = require('express').Router();

// MIDDLEWARES
const {authenticate} = require('../../middlewares/authenticate')
const {uploadMedia} = require('../../middlewares/uploadMedia');

// CONTROLLERS
const userController = require('../../controllers/user.controller');

// VALIDATIONS
const validate = require('../../middlewares/validate');
const schema = require('../../validations/user.schema');

// routes → profile
router.patch('/profile', authenticate, uploadMedia('profilePicture'), validate(schema.updateUserInfoSchema), userController.updateUserInfo);
router.patch('/password', authenticate, validate(schema.updatePasswordSchema), userController.updatePassword);
router.get('/notifications', authenticate, userController.getNotifications);
router.get('/favorites', authenticate, userController.getFavoriteShops);

// routes → address
router.post('/address', authenticate, validate(schema.addAddressSchema), userController.addAddress);
router.delete('/address/:id', authenticate, userController.deleteAddress);
router.get('/address', authenticate, userController.getAddresses);

// routes → payment card
router.post('/payment', authenticate, validate(schema.addPaymentCardSchema), userController.addPaymentCard);
router.delete('/payment/:id', authenticate, userController.deletePaymentCard);
router.get('/payments', authenticate, validate(schema.addAddressSchema), userController.getPaymentCards);

router.get('/home', authenticate, userController.getHome);

module.exports = router;