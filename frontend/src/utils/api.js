const { REACT_APP_API_URL } = require('./config');

class Api {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl;
  }

  _handleRequest(url, options) {
    return fetch(url, options).then((response) => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(`Ошибка: ${response.status}`);
    });
  }

  getUserInfo() {
    return this._handleRequest(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
    });
  }

  setUserInfo(info) {
    return this._handleRequest(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
  }

  getCardList() {
    return this._handleRequest(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
    });
  }

  createNewCard(data) {
    return this._handleRequest(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  deleteCard(id) {
    return this._handleRequest(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
    });
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this._handleRequest(`${this._baseUrl}/cards/${id}/likes`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          "Content-Type": "application/json",
        },
      });
    } else {
      return this._handleRequest(`${this._baseUrl}/cards/${id}/likes`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          "Content-Type": "application/json",
        },
      });
    }
  }

  setUserAvatar(avatar) {
    return this._handleRequest(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(avatar),
    });
  }
}

export const api = new Api({
  baseUrl: REACT_APP_API_URL,
});
