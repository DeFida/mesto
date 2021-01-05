import Popup from '../components/Popup.js';

export default class PopupConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(card) {
        super.open()
        this._card = card;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.querySelector('.popup__confirm').addEventListener('click', (evt) => {
            this._card.delete();
            super.close()
        })
    }
}