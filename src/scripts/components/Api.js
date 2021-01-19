// 8b08d836-44f0-4512-90c9-f96fba78716b
// cohort-19
// 

export default class Api {
    constructor(options) {
        this.baseUrl = options['baseUrl'];
        this.headers = options['headers'];
    }

    getInitialCards() {
        return fetch(this.baseUrl + '/cards', {
            headers: this.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
    }

    like(id) {
        return fetch(this.baseUrl + `/cards/likes/${id}`, {
            headers: this.headers,
            method: 'PUT',
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
    }

    unlike(id) {
        return fetch(this.baseUrl + `/cards/likes/${id}`, {
            headers: this.headers,
            method: 'DELETE',
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
    }

    createCard(name, link) {
        return fetch(this.baseUrl + `/cards`, {
            headers: this.headers,
            method: 'POST',
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
    }

    deleteCard(id) {
        return fetch(this.baseUrl + `/cards/${id}`, {
            headers: this.headers,
            method: 'DELETE',
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
    }

    getProfile() {
        return fetch(this.baseUrl + '/users/me', {
            headers: this.headers,
            method: 'GET',
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
    }

    setProfile(name, about) {
        return fetch(this.baseUrl + '/users/me', {
            headers: this.headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
    }

    setAvatar(url) {
        return fetch(this.baseUrl + '/users/me/avatar', {
            headers: this.headers,
            method: 'PATCH',
            body: JSON.stringify({
                avatar: url
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
    }
}