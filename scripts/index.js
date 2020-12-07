import Card from './Card.js';
import FormValidator from './FormValidator.js';

const editBtn = document.querySelector(".profile__edit-button");
const addCardBtn = document.querySelector(".profile__add-button");
const editPopup = document.querySelector("#profileEdit");
const addPopup = document.querySelector("#addCardPopup");
const popupOverlays = Array.from(document.querySelectorAll(".popup"));
const imgPopup = document.querySelector("#popupImg");
const imgPopupImg = imgPopup.querySelector(".popup__image");
const imgPopupTitle = imgPopup.querySelector(".popup__title");
const profileName = document.querySelector(".profile__name");
const editForm = document.querySelector("#profile-edit");
const addCardForm = document.querySelector("#addCard");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#about");
const profileDescription = document.querySelector(".profile__description");
const elements = document.querySelector(".elements");
const cardName = document.querySelector('#cardName');
const cardLink = document.querySelector('#cardLink');
const closeEdit = document.querySelector('#closeEditBtn');
const closeAdd = document.querySelector('#closeAddBtn');
const closeBtns = Array.from(document.querySelectorAll('.popup__close'));
const forms = Array.from(document.querySelectorAll('.popup__container'));



const initialCards = [
    {
        name: 'Новенький',
        link: 'https://sun9-35.userapi.com/REXbi8WvqGDWog8ss-jHgdCRNghOyrOZZxq31A/VjHUIQjW73c.jpg'
    },
    {
        name: 'Урал',
        link: 'https://sun9-46.userapi.com/hTqD64_ZxVoCanyFEKhvTbx24mlly7SReoeYnA/jaVucs1xlL0.jpg'
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
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

for (let i = initialCards.length - 1; i >= 0; i--) {
    const card = new Card({ name: initialCards[i].name, link: initialCards[i].link }, '#cardTemplate');
    const post = card.createPost();
    addPost(elements, post);
}

function closeOnOverlayClick(evt) {
    if (evt.target.classList.contains('popup_opened')) {
        closePopupHandler(evt.target.querySelector('.popup__close'));
    }
}

function closeOnOverlayKeyDown(evt) {
    const openedPopup = document.querySelector('.popup_opened');
    if (evt.key === 'Escape' && openedPopup !== null) {
        closePopupHandler(openedPopup.querySelector('.popup__close'));
    }
}

export default function openPopup(popup) {
    popup.classList.add("popup_opened");
}

function closePopupHandler(popup) {
    popup.parentElement.parentElement.classList.remove("popup_opened");
}

function editFormHandler(evt) {
    const name = nameInput.value;
    const job = jobInput.value;
    profileName.textContent = name;
    profileDescription.textContent = job;
    closePopupHandler(closeEdit);
}

function addCardHandler(evt) {
    const card = new Card({ name: cardName.value, link: cardLink.value }, '#cardTemplate')
    const post = card.createPost();
    addPost(elements, post);
    closePopupHandler(closeAdd);
    cardName.value = '';
    cardLink.value = '';
    const buttonElement = evt.target.querySelector('.popup__save');
    buttonElement.classList.add('popup__save_inactive');
    buttonElement.setAttribute('disabled', 'true');
}

function addCardBtnHandler() {
    openPopup(addPopup);
}

function editBtnHandler() {
    openPopup(editPopup);
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
}

function addPost(element, post) {

    element.prepend(post);
}

// Вызовем функцию
// включение валидации вызовом enableValidation
// все настройки передаются при вызове
forms.forEach((e) => {
    console.log(e.id);
    const FormValidation = new FormValidator({
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__save',
        inactiveButtonClass: 'popup__save_inactive',
        inputErrorClass: 'popup__input_type_error',
    }, `#${e.id}`);
    FormValidation.enableValidation();
});

popupOverlays.forEach((popupOverlay) => {
    popupOverlay.addEventListener('click', closeOnOverlayClick);
    document.addEventListener('keydown', closeOnOverlayKeyDown);
})

closeBtns.forEach((e) => {
    e.addEventListener('click', (e) => {
        closePopupHandler(e.target);
    })
})

editBtn.addEventListener('click', editBtnHandler);
editForm.addEventListener('submit', editFormHandler);
addCardForm.addEventListener('submit', addCardHandler);
addCardBtn.addEventListener('click', addCardBtnHandler);
