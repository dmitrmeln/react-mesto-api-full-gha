require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const appRouter = require('./routes');
const errorsHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, MONGO_URL } = require('./utils/config');

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('mongodb connected');
  });

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(requestLogger);
app.use('/api/', appRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
