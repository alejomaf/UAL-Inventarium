const env = process.env;

const config = {
  db: {
    host: env.DB_HOST || 'localhost',
    user: env.DB_USER || 'ualinventarium',
    password: env.DB_PASSWORD || 'uS3rP4ssM0Ord20D1f1CIL3',
    database: env.DB_NAME || 'ualinventarium'
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};


module.exports = config;