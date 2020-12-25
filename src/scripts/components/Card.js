
export default class Card {
    constructor(data, selectorTemplate, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
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
        this._elemCard = card.querySelector('.element');
        this._img.src = this._link;
        this._subtitle.textContent = this._name;
        this._setEventListeners();
        return card;
    }

    _setEventListeners() {
        this._elemCard.addEventListener('click', (e) => {
            if (e.target.classList[0] !== 'element__like' && e.target.classList[0] !== 'element__trash') {
                this._handleCardClick();
            }
        });
        this._likeBtn.addEventListener('click', () => this._like());
        this._trashBtn.addEventListener('click', () => this._remove());
    }

    _remove() {
        this._elemCard.remove();
    }

    _like() {
        this._likeBtn.classList.toggle('element__like_active');
    }

}