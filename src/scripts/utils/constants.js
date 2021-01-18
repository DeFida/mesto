import Api from '../components/Api.js'

export const editBtn = document.querySelector(".profile__edit-button");
export const _id = "9d244734aee233a156002208"
export const addCardBtn = document.querySelector(".profile__add-button");
export const editPopup = document.querySelector("#profileEdit");
export const addPopup = document.querySelector("#addCardPopup");
export const profileName = document.querySelector(".profile__name");
export const nameInput = document.querySelector("#name");
export const jobInput = document.querySelector("#about");
export const profileDescription = document.querySelector(".profile__description");
export const elements = document.querySelector(".elements");
export const cardName = document.querySelector('#cardName');
export const cardLink = document.querySelector('#cardLink');
export const editAvaBtn = document.querySelector('.profile__photo-overlay');
export const dastan = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
    headers: {
        authorization: '8b08d836-44f0-4512-90c9-f96fba78716b',
        'Content-Type': 'application/json'
    }
});