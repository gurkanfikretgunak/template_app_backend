// PACKAGES
const router = require('express').Router();

// MIDDLEWARES
const {authenticate} = require('../../middlewares/authenticate');

// CONTROLLERS
const shopController = require('../../controllers/shop.controller');

// VALIDATIONS
const validate = require('../../middlewares/validate');
const schema = require('../../validations/shop.schema');

// shop → 
router.get('/details/:id', authenticate, shopController.getShopDetails);
router.patch('/favorite/:id', authenticate, validate(schema.addShopToFavorites), shopController.addShopToFavorites);
router.patch('/remove-favorite/:id', authenticate, validate(schema.removeShopFromFavorites), shopController.removeShopFromFavorites);
router.post('/services', authenticate, validate(schema.getServicesByType), shopController.getServicesByType);
router.get('/coupons/:id', authenticate, shopController.getShopCoupons);

// shop → search
router.post('/search', authenticate, validate(schema.searchFromShop), shopController.searchFromShop);
router.post('/search/all', authenticate, validate(schema.searchAll), shopController.searchAll);
router.post('/coupon', authenticate, validate(schema.searchCouponCode), shopController.searchCouponCode);
router.post('/type', authenticate, validate(schema.getShopsByServiceType), shopController.getShopsByServiceType);
router.post('/filter', authenticate, validate(schema.searchWithFilter), shopController.searchWithFilter);

// shop → rating
router.post('/rate', authenticate, validate(schema.rateAShop), shopController.rateAShop);
router.patch('/rate', authenticate, validate(schema.updateARating), shopController.updateARating);
router.delete('/rate/:id', authenticate, validate(schema.removeARating), shopController.removeARating);

module.exports = router;