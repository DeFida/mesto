export default class FormValidator {
    constructor(settings, formSelector) {
        this._settings = settings;
        this._formSelector = formSelector;
    }

    enableValidation = () => {
        // Найдём все формы с указанным классом в DOM,
        // сделаем из них массив методом Array.from
        const popupElement = document.querySelector(this._formSelector);

        // Переберём полученную коллекцию
        popupElement.addEventListener('submit', (evt) => {
            // У каждой формы отменим стандартное поведение
            evt.preventDefault();
        });

        // Для каждой формы вызовем функцию setEventListeners,
        // передав ей элемент формы
        this._setEventListeners(popupElement, this._settings);
    };

    _setEventListeners = (popupElement, settings) => {
        // Находим все поля внутри формы,
        // сделаем из них массив методом Array.from
        const inputList = Array.from(popupElement.querySelectorAll(settings.inputSelector));
        const buttonElement = popupElement.querySelector(settings.submitButtonSelector);
        // Обойдём все элементы полученной коллекции
        this._toggleButtonState(inputList, buttonElement, settings.inactiveButtonClass);
        inputList.forEach((inputElement) => {
            // каждому полю добавим обработчик события input
            inputElement.addEventListener('input', () => {
                // Внутри колбэка вызовем isValid,
                // передав ей форму и проверяемый элемент
                this._isValid(popupElement, inputElement, settings.inputErrorClass);
                this._toggleButtonState(inputList, buttonElement, settings.inactiveButtonClass);
            });
        });
    };

    _isValid = (popupElement, inputElement, inputErrorClass) => {
        if (!inputElement.validity.valid) {
            // showInputError теперь получает параметром форму, в которой
            // находится проверяемое поле, и само это поле
            this._showInputError(popupElement, inputElement, inputElement.validationMessage, inputErrorClass);
        } else {
            // hideInputError теперь получает параметром форму, в которой
            // находится проверяемое поле, и само это поле
            this._hideInputError(popupElement, inputElement, inputErrorClass);
        }
    };

    _showInputError = (popupElement, inputElement, errorMessage, inputErrorClass) => {
        // Находим элемент ошибки внутри самой функции
        const errorElement = popupElement.querySelector(`#${inputElement.id}-error`);
        // Остальной код такой же
        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = errorMessage;
    };

    _hideInputError = (popupElement, inputElement, inputErrorClass) => {
        // Находим элемент ошибки
        const errorElement = popupElement.querySelector(`#${inputElement.id}-error`);
        // Остальной код такой же
        inputElement.classList.remove(inputErrorClass);
        errorElement.textContent = '';
    };

    _toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
        // Если есть хотя бы один невалидный инпут
        if (this._hasInvalidInput(inputList)) {
            // сделай кнопку неактивной
            buttonElement.classList.add(inactiveButtonClass);
            buttonElement.setAttribute('disabled', 'true');
        } else {
            // иначе сделай кнопку активной
            buttonElement.classList.remove(inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        }
    };

    _hasInvalidInput = (inputList) => {
        // проходим по этому массиву методом some
        return inputList.some((inputElement) => {
            // Если поле не валидно, колбэк вернёт true
            // Обход массива прекратится и вся фунцкция
            // hasInvalidInput вернёт true

            return !inputElement.validity.valid;
        })
    };
}