var http = require('http');

var options = {
  timeout: 2000,
  host: 'localhost',
  port: process.env.PORT || 3000,
  path: '/api/status',
};

var request = http.request(options, (res) => {
  console.info('HEALTHCHECK STATUS: ' + res.statusCode);
  process.exitCode = res.statusCode === 200 ? 0 : 1;
  process.exit();
});

request.on('error', function (err) {
  console.error('HEALTHCHECK ERROR', err);
  process.exit(1);
});

request.end();