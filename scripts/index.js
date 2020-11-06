let editBtn = document.querySelector(".profile__edit-button");
let addCardBtn = document.querySelector(".profile__add-button");
let editPopup = document.querySelector("#profileEdit");
let addPopup = document.querySelector("#addCard");
let imgPopup = document.querySelector("#popupImg");
let profileName = document.querySelector(".profile__name");
let editForm = document.querySelector("#profile-edit");
let addCardForm = document.querySelector("#addCard");
let nameInput = document.querySelector("#name");
let jobInput = document.querySelector("#about");
let profileDescription = document.querySelector(".profile__description");
let elements = document.querySelector(".elements");
let cardTemplate = document.querySelector("#cardTemplate").content;
let cardName = document.querySelector('#cardName');
let cardLink = document.querySelector('#cardLink');
let closeEdit = document.querySelector('#closeEditBtn');
let closeAdd = document.querySelector('#closeAddBtn');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

for (let i = 0; i < initialCards.length; i++) {
    const card = cardTemplate.cloneNode(true);
    card.querySelector('.element__image').src = initialCards[i].link;
    card.querySelector('.element__subtitle').textContent = initialCards[i].name;
    postBtnsHandler(card);
    elements.append(card);
}

function openPopup(arg) {
    arg.classList.add("popup_opened");
}

function closePopupHandler(arg) {
    arg.parentElement.parentElement.classList.remove("popup_opened");
}

function editFormHandler(evt) {
    evt.preventDefault();
    let name = nameInput.value;
    let job = jobInput.value;
    profileName.textContent = name;
    profileDescription.textContent = job;
    closePopupHandler(closeEdit);
}

function addCardHandler(evt) {
    evt.preventDefault();
    let name = cardName.value;
    let link = cardLink.value;
    let newCard = cardTemplate.cloneNode(true);
    newCard.querySelector('.element__image').src = link;
    newCard.querySelector('.element__subtitle').textContent = name;
    postBtnsHandler(newCard);
    elements.prepend(newCard);
    closePopupHandler(closeAdd);
    cardName.value = '';
    cardLink.value = '';
}

function addCardBtnHandler() {
    openPopup(addPopup);
}

function editBtnHandler() {
    openPopup(editPopup);
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
}

function postBtnsHandler(card) {
    const trashBtn = card.querySelector(".element__trash");
    const likeBtn = card.querySelector(".element__like");
    const img = card.querySelector(".element__image");
    img.addEventListener('click', (e) => {
        imgPopup.querySelector(".popup__image").src = e.target.src;
        imgPopup.querySelector(".popup__title").textContent = e.target.parentElement.querySelector(".element__subtitle").textContent;
        openPopup(imgPopup);
    });
    likeBtn.addEventListener('click', (e) => {
        e.target.classList.toggle('element__like_active');
    });
    trashBtn.addEventListener('click', (e) => {
        e.target.parentElement.remove();
    })
}


editBtn.addEventListener('click', editBtnHandler);
addCardBtn.addEventListener('click', addCardBtnHandler);
editForm.addEventListener('submit', editFormHandler);
addCardForm.addEventListener('submit', addCardHandler);
