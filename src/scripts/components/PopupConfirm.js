import Popup from '../components/Popup.js';

export default class PopupConfirm extends Popup {
    constructor(popupSelector, deleteCallback) {
        super(popupSelector);
        this._deleteCallback = deleteCallback;
    }

    setCard(card, id) {
        this._card = card;
        this._cardId = id;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.querySelector('.popup__confirm').addEventListener('click', (evt) => {
            this._deleteCallback(this._card, this._cardId);
        })
    }
}