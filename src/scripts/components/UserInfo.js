export default class UserInfo {
    constructor({ nameSelector, jobSelector, avaSelector}) {
        this._name = document.querySelector(nameSelector);
        this._job = document.querySelector(jobSelector);
        this._avatar = document.querySelector(avaSelector);

    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            job: this._job.textContent
        }
    }

    setUserInfo(name, job) {
        this._name.textContent = name;
        this._job.textContent = job;
    }

    setAvatar(url) {
        this._avatar.src = url;
    }
}