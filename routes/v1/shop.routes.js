// PACKAGES
const router = require('express').Router();

// MIDDLEWARES
const {authenticate} = require('../../middlewares/authenticate');

// CONTROLLERS
const shopController = require('../../controllers/shop.controller');

// VALIDATIONS
const validate = require('../../middlewares/validate');
const schema = require('../../validations/user.schema');

// shop → 
router.get('/details/:id', authenticate, shopController.getShopDetails);
router.patch('/favorite/:id', authenticate, shopController.addShopToFavorites);
router.patch('/remove-favorite/:id', authenticate, shopController.removeShopFromFavorites);
router.post('/services', authenticate, shopController.getServicesByType);
router.post('/search', authenticate, shopController.searchFromShop);
router.get('/coupons/:id', authenticate, shopController.getShopCoupons);
router.post('/coupon', authenticate, shopController.searchCouponCode);
router.post('/rate', authenticate, shopController.rateAShop);
router.post('/type', authenticate, shopController.getShopsByServiceType);

module.exports = router;