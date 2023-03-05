// CURRENT API VERSION
const version = process.env.VERSION

const routes = require(`./${version}`);
const express = require('express');
const router = express.Router();
const {errorHandler} = require('../middlewares/errorHandler');

router.get('/status', (req, res) => { res.send({status: 'OK'}) }) // api status

router.use(`/${version}`, routes);
routes.use(errorHandler);

module.exports = router;