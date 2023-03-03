const config = {
  development: {
    database: process.env.DATABASE_DEV
  },
  test: {
    database: process.env.DATABASE_TEST
  },
  production: {
    database: process.env.DATABASE_PROD
  }
};
  
module.exports = config;