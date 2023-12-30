const gotSuccess = {
  status: 200,
};

const successCreated = {
  status: 201,
};

const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})+)(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;

module.exports = {
  gotSuccess,
  successCreated,
  urlRegex,
};
