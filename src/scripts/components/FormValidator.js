export default class FormValidator {
    constructor(settings, formSelector) {
        this._settings = settings;
        this._formSelector = formSelector;
    }

    checkButtonState() {
        this._toggleButtonState();

        // this._inputList.forEach((inputElement) => {
        //     this._isValid(inputElement);
        // });
    }

    clearErrors() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    }

    enableValidation() {
        this._form = document.querySelector(this._formSelector);

        // Переберём полученную коллекцию
        this._form.addEventListener('submit', (evt) => {
            // У каждой формы отменим стандартное поведение
            evt.preventDefault();
        });

        // Для каждой формы вызовем функцию setEventListeners,
        // передав ей элемент формы
        this._setEventListeners();
    };

    _setEventListeners() {
        // Находим все поля внутри формы,
        // сделаем из них массив методом Array.from
        this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
        this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
        // Обойдём все элементы полученной коллекции
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            // каждому полю добавим обработчик события input
            inputElement.addEventListener('input', () => {
                // Внутри колбэка вызовем isValid,
                // передав ей форму и проверяемый элемент
                this._isValid(inputElement);
                this._toggleButtonState();
            });
        });
    };

    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            // showInputError теперь получает параметром форму, в которой
            // находится проверяемое поле, и само это поле
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            // hideInputError теперь получает параметром форму, в которой
            // находится проверяемое поле, и само это поле
            this._hideInputError(inputElement);
        }
    };

    _showInputError(inputElement, errorMessage) {
        // Находим элемент ошибки внутри самой функции
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        // Остальной код такой же
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.textContent = errorMessage;
    };

    _hideInputError(inputElement) {
        // Находим элемент ошибки
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        // Остальной код такой же
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.textContent = '';
    };

    _toggleButtonState() {
        // Если есть хотя бы один невалидный инпут
        if (this._hasInvalidInput()) {
            // сделай кнопку неактивной
            this._buttonElement.classList.add(this._settings.inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', 'true');
        } else {
            // иначе сделай кнопку активной
            this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        }
    };

    _hasInvalidInput() {
        // проходим по этому массиву методом some
        return this._inputList.some((inputElement) => {
            // Если поле не валидно, колбэк вернёт true
            // Обход массива прекратится и вся фунцкция
            // hasInvalidInput вернёт true

            return !inputElement.validity.valid;
        })
    };
}