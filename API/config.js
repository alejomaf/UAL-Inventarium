const env = process.env;

const config = {
  db: {
    host: env.DB_HOST || 'db',
    user: env.DB_USER || 'root',
    password: env.DB_PASSWORD || 'test',
    database: env.DB_NAME || 'freedbtech_LibraryManager'
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};


module.exports = config;