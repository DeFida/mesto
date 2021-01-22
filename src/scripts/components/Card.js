// import dastan from '../utils/constants.js';

export default class Card {
    constructor(data, selectorTemplate, handleCardClick, handleTrashClick, handleLikeClick) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._ownerId = data.ownerId;
        this._userId = data.userId;
        this._id = data.id;
        this._handleCardClick = handleCardClick;
        this._handleTrashClick = handleTrashClick;
        this._handleLikeClick = handleLikeClick;
        this._selectorTemplate = selectorTemplate;
        this._isLiked = false;
    }

    _getTemplate() {
        return document.querySelector(this._selectorTemplate).content.cloneNode(true);
    }

    createPost() {
        const card = this._getTemplate();
        if (this._ownerId === this._userId){
            this._trashBtn = card.querySelector(".element__trash");
        }
        else {
            card.querySelector(".element__trash").remove();
        }
        
        this._likeBtn = card.querySelector(".element__like");
        this._img = card.querySelector(".element__image");
        this._subtitle = card.querySelector('.element__subtitle');
        this._likeElement = card.querySelector('.element__like-counter');
        this._elemCard = card.querySelector('.element');
        this._img.src = this._link;
        this._img.alt = this._name;
        this._subtitle.textContent = this._name;
        this._likeElement.textContent = this._likes.length;
        Array.from(this._likes).forEach(element => {
            if (element._id === this._userId){
                this._likeBtn.classList.add('element__like_active');
            }
            
        });
        this._setEventListeners();
        return card;
    }

    _setEventListeners() {
        this._img.addEventListener('click', (e) => {
            if (e.target.classList[0] !== 'element__like' && e.target.classList[0] !== 'element__trash') {
                this._handleCardClick();
            }
        });
        this._likeBtn.addEventListener('click', () => {
            this._likeBtn.classList.toggle('element__like_active');
            this._handleLikeClick(this._id, this._likeBtn.classList.contains('element__like_active'));
        })

        if (this._ownerId === this._userId){
            this._trashBtn.addEventListener('click', this._handleTrashClick);
        }
        
    }

    delete() {
        this._elemCard.remove();
    }

    updateLikeCount(likeCount) {
        this._likeElement.textContent = likeCount;
    }

}