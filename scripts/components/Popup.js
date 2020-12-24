export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
            console.log('esc pressed');
        }
    }

    _handleOverlayClick(evt) {
        if (evt.classList.contains('popup_opened')) {
            this.close();
        }
    }

    open() {
        this._popupElement.classList.add("popup_opened");
    }

    close() {
        this._popupElement.classList.remove("popup_opened");
    }

    setEventListeners() {
        this._popupCloseBtn = this._popupElement.querySelector('.popup__close');
        this._popupCloseBtn.addEventListener('click', () => {
            this.close();
        });
        this._popupElement.addEventListener('keydown', this._handleEscClose);
        this._popupElement.addEventListener('click', this._handleOverlayClick);
    }
};