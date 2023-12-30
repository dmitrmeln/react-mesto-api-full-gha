const {
  SALT_ROUNDS = 10,
  PORT = 3000,
  MONGO_URL = 'mongodb://localhost:27017/mestodb',
  JWT_SECRET = 'secret',
} = process.env;

module.exports = {
  SALT_ROUNDS,
  PORT,
  MONGO_URL,
  JWT_SECRET,
};
