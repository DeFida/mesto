import './index.css'; // css import

import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupConfirm from '../scripts/components/PopupConfirm';
import UserInfo from '../scripts/components/UserInfo.js';
import FormValidator from '../scripts/components/FormValidator.js';
import {
    editBtn,
    addCardBtn,
    editAvaBtn,
    jobInput,
    nameInput,
    dastan,
    _id,
    avatar
} from '../scripts/utils/constants.js';



const imagePopup = new PopupWithImage('#popupImg');

const confirmFormClass = new PopupConfirm(
    '#popupConfirm'
);

const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    jobSelector: '.profile__description',
    avaSelector: '.profile__photo'
});

dastan.getProfile().then(data => {
    userInfo.setUserInfo(data['name'], data['about']);
    userInfo.setAvatar(data['avatar']);
}).catch((err) => {
    console.log(err);
});
function createCard(item) {
    const card = new Card({
        name: item.name,
        link: item.link,
        likes: item.likes,
        id: item._id,
        owner: item.owner
    }, '#cardTemplate', () => {
        imagePopup.open(item.name, item.link);
    }, () => {
        confirmFormClass.open(card);
    });
    const post = card.createPost();
    return post
}


dastan.getInitialCards().then((data) => {
    const cardList = new Section({
        items: data,
        renderer: (item) => {
            const post = createCard(item);
            cardList.addItem(post);
        }
    },
        '.elements')
    cardList.renderItems();
}).catch((err) => {
    console.log(err);
});


const addCardFormClass = new PopupWithForm(
    '#addCardPopup',
    (values) => {
        addCardFormClass.loaderRenderer(true);
        dastan.createCard(values['cardName'], values['cardLink']).then(data => {
            const post = createCard({ name: data.name, link: data.link, likes: data.likes, id: data._id, owner: data.owner })
            console.log(document.querySelector('.elements'))
            document.querySelector('.elements').prepend(post);
            addCardFormClass.loaderRenderer(false);
            addCardFormClass.close();
        }
        ).catch((err) => {
            console.log(err);
        });
    }
)

const editInfoFormClass = new PopupWithForm(
    '#profileEdit',
    (values) => {
        editInfoFormClass.loaderRenderer(true);
        dastan.setProfile(values['name'], values['about']).then(values => {
            userInfo.setUserInfo(values['name'], values['about']);
            editInfoFormClass.loaderRenderer(false);
        }).catch((err) => {
            console.log(err);
        });
        editInfoFormClass.close();
    }
)

const editAvaFormClass = new PopupWithForm(
    '#avatarEdit',
    (value) => {
        editAvaFormClass.loaderRenderer(true);
        dastan.setAvatar(value['avatarUrl']).then(data => {
            userInfo.setAvatar(data['avatar'])
            editAvaFormClass.loaderRenderer(false);
        }).catch((err) => {
            console.log(err);
        });
        editAvaFormClass.close();
    }
)

const editProfileValidation = new FormValidator({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_inactive',
    inputErrorClass: 'popup__input_type_error',
}, `#profile-edit`);

const addCardValidation = new FormValidator({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_inactive',
    inputErrorClass: 'popup__input_type_error',
}, `#addCard`);

const editAvaValidation = new FormValidator({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_inactive',
    inputErrorClass: 'popup__input_type_error',
}, `#avatar-edit`);

editProfileValidation.enableValidation();
addCardValidation.enableValidation();
editAvaValidation.enableValidation();

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
editAvaBtn.addEventListener('click', () => {
    editAvaFormClass.open();
    editAvaValidation.checkButtonState();
    editAvaValidation.clearErrors();
});

imagePopup.setEventListeners();
confirmFormClass.setEventListeners();
editAvaFormClass.setEventListeners();
addCardFormClass.setEventListeners();
editInfoFormClass.setEventListeners();