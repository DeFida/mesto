let edit_btn = document.querySelector(".profile__edit-button");

function edit_btnHandler() {
    let popup = document.querySelector(".popup");
    popup.classList.add("popup_opened");
    let profile_name = document.querySelector(".profile__name");
    let profile_description = document.querySelector(".profile__description");
    let nameInput = document.querySelector("#name"); // Воспользуйтесь инструментом .querySelector()
    let jobInput = document.querySelector("#about");
    console.log(profile_name.textContent, profile_description.textContent);
    nameInput.value = profile_name.textContent;
    jobInput.value = profile_description.textContent;
}


edit_btn.addEventListener('click', edit_btnHandler);
// Находим форму в DOM
let formElement = document.querySelector(".popup__container"); // Воспользуйтесь методом querySelector()

let close_btn = document.querySelector(".popup__close");

function close_btnHandler() {
    let popup = document.querySelector(".popup");
    popup.classList.remove("popup_opened");
}

close_btn.addEventListener('click', close_btnHandler);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    let nameInput = document.querySelector("#name"); // Воспользуйтесь инструментом .querySelector()
    let jobInput = document.querySelector("#about"); // Воспользуйтесь инструментом .querySelector()

    // Получите значение полей из свойства value
    let name = nameInput.value;
    let job = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    let profile_name = document.querySelector(".profile__name");
    let profile_description = document.querySelector(".profile__description");
    // Вставьте новые значения с помощью textContent
    console.log(name, job);
    profile_name.textContent = name;
    profile_description.textContent = job;
    let popup = document.querySelector(".popup");
    popup.classList.remove("popup_opened");
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);