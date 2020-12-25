import { nameInput, jobInput } from '../utils/constants.js';

export default class UserInfo {
    constructor({ nameSelector, jobSelector }) {
        this._name = document.querySelector(nameSelector);
        this._job = document.querySelector(jobSelector);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            job: this._job.textContent
        }
    }

    setUserInfo() {
        this._name.textContent = nameInput.value;
        this._job.textContent = jobInput.value;
    }
}