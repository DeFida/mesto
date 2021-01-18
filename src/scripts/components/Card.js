// import dastan from '../utils/constants.js';
import Api from './Api.js'

const dastan = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
    headers: {
        authorization: '8b08d836-44f0-4512-90c9-f96fba78716b',
        'Content-Type': 'application/json'
    }
});

export default class Card {
    constructor(data, selectorTemplate, handleCardClick, handleTrashClick) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes.length;
        this._id = data.id;
        this._handleCardClick = handleCardClick;
        this._handleTrashClick = handleTrashClick;
        this._selectorTemplate = selectorTemplate;
    }

    _getTemplate() {
        return document.querySelector(this._selectorTemplate).content.cloneNode(true);
    }

    createPost() {
        const card = this._getTemplate();
        this._trashBtn = card.querySelector(".element__trash");
        this._likeBtn = card.querySelector(".element__like");
        this._img = card.querySelector(".element__image");
        this._subtitle = card.querySelector('.element__subtitle');
        this._likeElement = card.querySelector('.element__like-counter');
        this._elemCard = card.querySelector('.element');
        this._img.src = this._link;
        this._img.alt = this._name;
        this._subtitle.textContent = this._name;
        this._likeElement.textContent = this._likes;
        this._setEventListeners();
        return card;
    }

    _setEventListeners() {
        this._img.addEventListener('click', (e) => {
            if (e.target.classList[0] !== 'element__like' && e.target.classList[0] !== 'element__trash') {
                this._handleCardClick();
            }
        });
        this._likeBtn.addEventListener('click', () => this._like());
        this._trashBtn.addEventListener('click', this._handleTrashClick);
    }

    delete() {
        this._elemCard.remove();
    }

    _like() {
        // this._likeBtn.classList.toggle('element__like_active');
        if (this._likeBtn.classList.contains('element__like_active')) {
            dastan.unlike(this._id).then((res) => {
                this._likeElement.textContent = res.likes.length;
            });
            this._likeBtn.classList.remove('element__like_active');
        }

        else {
            dastan.like(this._id).then((res) => {
                this._likeElement.textContent = res.likes.length;
            });
            this._likeBtn.classList.add('element__like_active');
        }
    }

}