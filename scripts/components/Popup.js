export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
    }

    _handleEscClose(evt) {
        
        if (evt.key === 'Escape') {
            this.close();

        }
    }

    _handleOverlayClick(evt) {
        if (evt.target.classList.contains('popup_opened')) {
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
        document.addEventListener('keydown', this._handleEscClose.bind(this));
        this._popupElement.addEventListener('click', this._handleOverlayClick.bind(this));
    }
};