// 8b08d836-44f0-4512-90c9-f96fba78716b
// cohort-19

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
}