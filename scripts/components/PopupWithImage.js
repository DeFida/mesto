import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector, title, url) {
        super(popupSelector);
        this._popupElement = document.querySelector(popupSelector);
        this._title = title;
        this._url = url;
    }

    open() {
        this._imgPopupImg = this._popupElement.querySelector(".popup__image");
        this._imgPopupTitle = this._popupElement.querySelector(".popup__title");
        this._imgPopupImg.src = this._url;
        this._imgPopupTitle.textContent = this._title;
        this._popupElement.classList.add("popup_opened");
    }
}