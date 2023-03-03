// CURRENT API VERSION
const version = process.env.VERSION

const routes = require(`./${version}`);
const express = require('express');
const router = express.Router();

router.get('/status', (req, res) => { res.send({status: 'OK'}) }) // api status

router.use(`/${version}`, routes);

module.exports = router;