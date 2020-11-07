const editBtn = document.querySelector(".profile__edit-button");
const addCardBtn = document.querySelector(".profile__add-button");
const editPopup = document.querySelector("#profileEdit");
const addPopup = document.querySelector("#addCardPopup");
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
const cardTemplate = document.querySelector("#cardTemplate").content;
const cardName = document.querySelector('#cardName');
const cardLink = document.querySelector('#cardLink');
const closeEdit = document.querySelector('#closeEditBtn');
const closeAdd = document.querySelector('#closeAddBtn');

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
    const post = createPost(initialCards[i].link, initialCards[i].name);
    addPost(elements, post);
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
}

function closePopupHandler(popup) {
    popup.parentElement.parentElement.classList.remove("popup_opened");
}

function editFormHandler(evt) {
    evt.preventDefault();
    const name = nameInput.value;
    const job = jobInput.value;
    profileName.textContent = name;
    profileDescription.textContent = job;
    closePopupHandler(closeEdit);
}

function addCardHandler(evt) {
    evt.preventDefault();
    const name = cardName.value;
    const link = cardLink.value;
    const post = createPost(link, name);
    addPost(elements, post);
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

function createPost(link, name) {
    const card = cardTemplate.cloneNode(true);
    const trashBtn = card.querySelector(".element__trash");
    const likeBtn = card.querySelector(".element__like");
    const img = card.querySelector(".element__image");
    const subtitle = card.querySelector('.element__subtitle');
    const elemCard = card.querySelector('.element');
    img.src = link;
    subtitle.textContent = name;
    elemCard.addEventListener('click', (e) => {
        if (e.target.classList[0] !== 'element__like' && e.target.classList[0] !== 'element__trash') {
            imgPopupImg.src = link;
            imgPopupTitle.textContent = name;
            openPopup(imgPopup);
        }
    });
    likeBtn.addEventListener('click', (e) => {
        e.target.classList.toggle('element__like_active');
    });
    trashBtn.addEventListener('click', (e) => {
        e.target.parentElement.remove();
    });
    return card;
}

function addPost(element, post) {
    element.prepend(post);
}

editBtn.addEventListener('click', editBtnHandler);
addCardBtn.addEventListener('click', addCardBtnHandler);
editForm.addEventListener('submit', editFormHandler);
addCardForm.addEventListener('submit', addCardHandler);
