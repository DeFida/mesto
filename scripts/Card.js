export default class Card {
    constructor(data, selectorTemplate) {
        this._name = data.name;
        this._link = data.link;
        this._selectorTemplate = selectorTemplate;
    }

    _getTemplate() {
        return document.querySelector(this._selectorTemplate).content.cloneNode(true);
    }

    createPost() {
        const card = this._getTemplate();
        this.trashBtn = card.querySelector(".element__trash");
        this.likeBtn = card.querySelector(".element__like");
        this.img = card.querySelector(".element__image");
        this.subtitle = card.querySelector('.element__subtitle');
        this.elemCard = card.querySelector('.element');
        this.img.src = this._link;
        this.subtitle.textContent = this._name;
        this._setEventListeners();
        return card;
    }

    _setEventListeners() {
        this.elemCard.addEventListener('click', (e) => {
            if (e.target.classList[0] !== 'element__like' && e.target.classList[0] !== 'element__trash') {
                imgPopupImg.src = this.img.src;
                imgPopupTitle.textContent = this.subtitle.textContent;
                openPopup(imgPopup);
            }
        });
        this.likeBtn.addEventListener('click', (e) => {
            e.target.classList.toggle('element__like_active');
        });
        this.trashBtn.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        });
    }
    
}