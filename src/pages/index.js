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
    '#popupConfirm', 
    (card, id) => {
        dastan.deleteCard(id).then(data => {
            card.delete();
            confirmFormClass.close();
        }).catch((err) => {
            console.log(err);
        })
    }
);

const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    jobSelector: '.profile__description',
    avaSelector: '.profile__photo'
});

Promise.all([
    dastan.getProfile(),
    dastan.getInitialCards()
])
.then(([userdata, initialCards]) => {
    userInfo.setUserInfo(userdata['name'], userdata['about'], userdata['_id']);
    userInfo.setAvatar(userdata['avatar']);
    cardList.renderItems(initialCards.reverse());

})
.catch((err) => {
    console.log(err);
})


function createCard(item) {
    const card = new Card({
        name: item.name,
        link: item.link,
        likes: item.likes,
        id: item._id,
        ownerId: item.owner._id,
        userId: userInfo.getUserInfo().id
    }, '#cardTemplate', () => {
        imagePopup.open(item.name, item.link);
    }, () => {
        confirmFormClass.open();
        confirmFormClass.setCard(card, item._id);
    }, (id, isliked) => {
        if (isliked) {
            dastan.like(id).then((res) => {
                card.updateLikeCount(res.likes.length)
            }).catch((err) => {
                console.log(err);
            });
        }
        else {
            dastan.unlike(id).then((res) => {
                card.updateLikeCount(res.likes.length)
            }).catch((err) => {
                console.log(err);
            });
        }
    });
    const post = card.createPost();
    return post
}


const cardList = new Section({
    renderer: (item) => {
        const post = createCard(item);
        cardList.addItem(post);
    }
},
    '.elements');



const addCardFormClass = new PopupWithForm(
    '#addCardPopup',
    (values) => {
        addCardFormClass.loaderRenderer(true);
        dastan.createCard(values['cardName'], values['cardLink']).then(data => {
            const post = createCard({ name: data.name, link: data.link, likes: data.likes, id: data._id, owner: data.owner })
            cardList.addItem(post);
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
            editInfoFormClass.close();
        }).catch((err) => {
            console.log(err);
        });
        
    }
)

const editAvaFormClass = new PopupWithForm(
    '#avatarEdit',
    (value) => {
        editAvaFormClass.loaderRenderer(true);
        dastan.setAvatar(value['avatarUrl']).then(data => {
            userInfo.setAvatar(data['avatar'])
            editAvaFormClass.loaderRenderer(false);
            editAvaFormClass.close();
        }).catch((err) => {
            console.log(err);
        });
        
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