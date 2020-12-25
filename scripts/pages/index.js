import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import {
    editBtn,
    addCardBtn,
    editPopup,
    addPopup,
    profileName, 
    editForm, 
    addCardForm,
    profileDescription, 
    elements,
    initialCards
} from '../utils/constants.js';

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card({ name: item.name, link: item.link }, '#cardTemplate', () => {
            const imagePopup = new PopupWithImage('#popupImg', item.name, item.link);
            imagePopup.setEventListeners();
            imagePopup.open();
        });
        const post = card.createPost();
        cardList.addItem(post);
    }
},
'.elements')

const addCardFormClass = new PopupWithForm(
    '#addCardPopup',
    (values) => {
        const card = new Card({ name: values['cardName'], link: values['cardLink'] }, '#cardTemplate', () => {
            const imagePopup = new PopupWithImage('#popupImg', values['cardName'], values['cardLink']);
            imagePopup.setEventListeners();
            imagePopup.open();
        });
        
        const post = card.createPost();
        console.log(post.querySelector('.element'));
        cardList.addItem(post);
        const buttonElement = addPopup.querySelector('.popup__save');
        buttonElement.classList.add('popup__save_inactive');
        buttonElement.setAttribute('disabled', 'true');
        addCardFormClass.close();
    }
)

const editInfoFormClass = new PopupWithForm(
    '#profileEdit',
    (values) => {
        const userInfo = new UserInfo({ nameSelector: '.profile__name', jobSelector: '.profile__description' });
        
        userInfo
        const buttonElement = addPopup.querySelector('.popup__save');
        buttonElement.classList.add('popup__save_inactive');
        buttonElement.setAttribute('disabled', 'true');
        editInfoFormClass.close();
    }
)



function editFormHandler(evt) {
    const name = nameInput.value;
    const job = jobInput.value;
    profileName.textContent = name;
    profileDescription.textContent = job;
    closePopupHandler(closeEdit);
}



function editBtnHandler() {
    openPopup(editPopup);
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
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
addCardBtn.addEventListener('click', addCardFormClass.open.bind(addCardFormClass));


cardList.renderItems();

addCardFormClass.setEventListeners();