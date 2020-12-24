export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._popupElement = document.querySelector(popupSelector);
        this._submitCallback = submitCallback;
    }

    _getInputValues() {
        this._nameInput = this._popupElement.querySelector('#name');
        this._jobInput = this._popupElement.querySelector('#about');
        const name = this._nameInput.value;
        const job = this._nameInput.value;
        profileName.textContent = name;
        profileDescription.textContent = job;
    }

    close() {
        // this._nameInput = '';
        // this._jobInput = '';
        this._popupElement.children[0].reset();
        this._popupElement.classList.remove("popup_opened");
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener('submit', this._submitCallback.bind(this));
    }
}