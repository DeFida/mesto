import Card from './Card.js';
import FormValidator from '../components/FormValidator.js';
import {
    editBtn,
    addCardBtn,
    editPopup,
    addPopup,
    profileName, 
    editForm, 
    addCardForm, 
    nameInput, 
    jobInput, 
    profileDescription, 
    elements, 
    cardName, 
    cardLink, 
    closeEdit, 
    closeAdd,
    initialCards
} from '../utils/constants.js';

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

const editProfileValidation = new FormValidator({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_inactive',
    inputErrorClass: 'popup__input_type_error',
}, `#${editForm.id}`);

const addCardValidation = new FormValidator({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_inactive',
    inputErrorClass: 'popup__input_type_error',
}, `#${addCardForm.id}`);

editProfileValidation.enableValidation();
addCardValidation.enableValidation();

editBtn.addEventListener('click', editBtnHandler);
editForm.addEventListener('submit', editFormHandler);
addCardForm.addEventListener('submit', addCardHandler);
addCardBtn.addEventListener('click', addCardBtnHandler);
