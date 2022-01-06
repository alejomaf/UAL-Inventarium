const env = process.env;

const config = {
  db: {
    host: 'localhost',
    user: 'ualinventarium',
    password: 'uS3rP4ssM0Ord20D1f1CIL3',
    database: 'ualinventarium'
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};


module.exports = config;