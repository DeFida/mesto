let editBtn = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let profileName = document.querySelector(".profile__name");
let formElement = document.querySelector(".popup__container"); // Воспользуйтесь методом querySelector()
let closeBtn = document.querySelector(".popup__close");
let nameInput = document.querySelector("#name");
let jobInput = document.querySelector("#about");
let profileDescription = document.querySelector(".profile__description");

function editBtnHandler() {
    popup.classList.add("popup_opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
}

function closeBtnHandler() {
    popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    let name = nameInput.value;
    let job = jobInput.value;
    profileName.textContent = name;
    profileDescription.textContent = job;
    popup.classList.remove("popup_opened");
}
    
closeBtn.addEventListener('click', closeBtnHandler);
editBtn.addEventListener('click', editBtnHandler);
formElement.addEventListener('submit', formSubmitHandler);