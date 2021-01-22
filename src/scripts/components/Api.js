
export default class Api {
    constructor(options) {
        this.baseUrl = options['baseUrl'];
        this.headers = options['headers'];
    }

    _handleOriginalResponse(res) {
        if (!res.ok) {
            return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
    }
    
    getInitialCards() {
        return fetch(this.baseUrl + '/cards', {
            headers: this.headers
        }).then(this._handleOriginalResponse);
    }

    like(id) {
        return fetch(this.baseUrl + `/cards/likes/${id}`, {
            headers: this.headers,
            method: 'PUT',
        }).then(this._handleOriginalResponse);
    }

    unlike(id) {
        return fetch(this.baseUrl + `/cards/likes/${id}`, {
            headers: this.headers,
            method: 'DELETE',
        }).then(this._handleOriginalResponse);
    }

    createCard(name, link) {
        return fetch(this.baseUrl + `/cards`, {
            headers: this.headers,
            method: 'POST',
            body: JSON.stringify({
                name: name,
                link: link
            })
        }).then(this._handleOriginalResponse);
    }

    deleteCard(id) {
        return fetch(this.baseUrl + `/cards/${id}`, {
            headers: this.headers,
            method: 'DELETE',
        }).then(this._handleOriginalResponse);
    }

    getProfile() {
        return fetch(this.baseUrl + '/users/me', {
            headers: this.headers,
            method: 'GET',
        }).then(this._handleOriginalResponse);
    }

    setProfile(name, about) {
        return fetch(this.baseUrl + '/users/me', {
            headers: this.headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: name,
                about: about
            })
        }).then(this._handleOriginalResponse);
    }

    setAvatar(url) {
        return fetch(this.baseUrl + '/users/me/avatar', {
            headers: this.headers,
            method: 'PATCH',
            body: JSON.stringify({
                avatar: url
            })
        }).then(this._handleOriginalResponse);
    }
}