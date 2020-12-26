import './index.css'; // css import

import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';
import FormValidator from '../scripts/components/FormValidator.js';
import {
    editBtn,
    addCardBtn,
    editPopup,
    addPopup,
    editForm,
    addCardForm,
    initialCards,
    jobInput,
    nameInput
} from '../scripts/utils/constants.js';

const imagePopup = new PopupWithImage('#popupImg');
imagePopup.setEventListeners();

const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    jobSelector: '.profile__description'
});

function createCard(item) {
    const card = new Card({ name: item.name, link: item.link }, '#cardTemplate', () => {
        imagePopup.open(item.name, item.link);
    });
    const post = card.createPost();
    return post
}

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const post = createCard(item);
        cardList.addItem(post);
    }
},
    '.elements')

const addCardFormClass = new PopupWithForm(
    '#addCardPopup',
    (values) => {
        const post = createCard({ name: values['cardName'], link: values['cardLink'] })
        cardList.addItem(post);
        addCardFormClass.close();
    }
)

const editInfoFormClass = new PopupWithForm(
    '#profileEdit',
    (values) => {
        userInfo.setUserInfo(values['name'], values['about']);
        editInfoFormClass.close();
    }
)

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

editBtn.addEventListener('click', () => {
    editInfoFormClass.open();
    editProfileValidation.clearErrors();
    const user = userInfo.getUserInfo();
    nameInput.value = user['name'];
    jobInput.value = user['job'];
    editProfileValidation.checkButtonState();
});
addCardBtn.addEventListener('click', () => {
    addCardFormClass.open();
    addCardValidation.checkButtonState();
    addCardValidation.clearErrors();
});

cardList.renderItems();

addCardFormClass.setEventListeners();
editInfoFormClass.setEventListeners();