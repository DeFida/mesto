const showInputError = (popupElement, inputElement, errorMessage, inputErrorClass) => {
    // Находим элемент ошибки внутри самой функции
    const errorElement = popupElement.querySelector(`#${inputElement.id}-error`);
    // Остальной код такой же
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
};

const hideInputError = (popupElement, inputElement, inputErrorClass) => {
    // Находим элемент ошибки
    const errorElement = popupElement.querySelector(`#${inputElement.id}-error`);
    // Остальной код такой же
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = '';
};

// Функция isValid теперь принимает formElement и inputElement,
// а не берёт их из внешней области видимости

const isValid = (popupElement, inputElement, inputErrorClass) => {
    if (!inputElement.validity.valid) {
        // showInputError теперь получает параметром форму, в которой
        // находится проверяемое поле, и само это поле
        showInputError(popupElement, inputElement, inputElement.validationMessage, inputErrorClass);
    } else {
        // hideInputError теперь получает параметром форму, в которой
        // находится проверяемое поле, и само это поле
        hideInputError(popupElement, inputElement, inputErrorClass);
    }
};

// Функция принимает массив полей

const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
        // Обход массива прекратится и вся фунцкция
        // hasInvalidInput вернёт true

        return !inputElement.validity.valid;
    })
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
        // сделай кнопку неактивной
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.setAttribute('disabled', 'true');
    } else {
        // иначе сделай кнопку активной
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
};

const setEventListeners = (popupElement, settings) => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(popupElement.querySelectorAll(settings.inputSelector));
    const buttonElement = popupElement.querySelector(settings.submitButtonSelector);
    // Обойдём все элементы полученной коллекции
    toggleButtonState(inputList, buttonElement, settings.inactiveButtonClass);
    inputList.forEach((inputElement) => {
        // каждому полю добавим обработчик события input
        inputElement.addEventListener('input', () => {
            // Внутри колбэка вызовем isValid,
            // передав ей форму и проверяемый элемент
            isValid(popupElement, inputElement, settings.inputErrorClass);
            toggleButtonState(inputList, buttonElement, settings.inactiveButtonClass);
        });
    });
};

const enableValidation = (settings) => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const popupList = Array.from(document.querySelectorAll(settings.formSelector));

    // Переберём полученную коллекцию
    popupList.forEach((popupElement) => {
        popupElement.addEventListener('submit', (evt) => {
            // У каждой формы отменим стандартное поведение
            evt.preventDefault();
        });
        
        // Для каждой формы вызовем функцию setEventListeners,
        // передав ей элемент формы
        setEventListeners(popupElement, settings);
    });
};
