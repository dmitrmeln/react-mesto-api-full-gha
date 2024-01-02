import { request } from "./requestHandler";
const { REACT_APP_API_URL } = require('./config');

export const register = (email, password) => {
  return request(`${REACT_APP_API_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({password, email}),
  });
};

export const authorize = (email, password) => {
  return request(`${REACT_APP_API_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({password, email}),
  });
};

export const tokenCheck = (token) => {
  return request(`${REACT_APP_API_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
