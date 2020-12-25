import Popup from './Popup.js';
import {
    cardName, 
    cardLink
} from '../utils/constants.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._popupElement = document.querySelector(popupSelector);
        this._submitCallback = submitCallback;
    }

    _getInputValues() {
        this._inputList = this._popupElement.querySelectorAll('.popup__input');

        // создаём пустой объект
        this._formValues = {};
      
        // добавляем в этот объект значения всех полей
        this._inputList.forEach(input => {
          this._formValues[input.name] = input.value;
        });
      
        // возвращаем объект значений
        return this._formValues;
    }

    close() {
        // this._nameInput = '';
        // this._jobInput = '';
        this._popupElement.children[0].reset();
        this._popupElement.classList.remove("popup_opened");
    }

    setEventListeners() {
        super.setEventListeners();
        // this._popupElement.addEventListener('submit', this._submitCallback(this._getInputValues()));
        this._popupElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitCallback(this._getInputValues());
            })
    }
}

