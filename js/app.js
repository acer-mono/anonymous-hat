// TODO change host after pull (move to config)
const URL = 'http://192.168.0.41:3000/messages'

/**
 * @param {string} method
 * @param {object} data
 * @returns {Promise<object>}
 */
function http(method, data = null) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, URL);
        xhr.send(data ? JSON.stringify(data) : null);

        xhr.onload = () => {
            if (xhr.status !== 200) {
                reject(`Ошибка ${xhr.status}: ${xhr.statusText}`);
            } else {
                resolve(JSON.parse(xhr.response));
            }
        };

        xhr.onerror = function() {
            reject("Запрос не удался");
        };
    });
}

class App {
    constructor() {
        this.button = document.getElementById('send');
        this.user = document.getElementById('nick');
        this.message = document.getElementById('message');
        this.messages = document.getElementById('messages');
        this.serverMessages = [];

        this.postMessagePromise = this.postMessagePromise.bind(this);
        this.postMessageAsync = this.postMessageAsync.bind(this);
        this.getMessagesPromise = this.getMessagesPromise.bind(this);
        this.getMessagesAsync = this.getMessagesAsync.bind(this);
        this.drawMessages = this.drawMessages.bind(this);

        setInterval(this.getMessagesAsync , 1000);
        this.button.addEventListener('click', this.postMessageAsync);
    }

    postMessagePromise() {
        if (!this.user.value || !this.message.value) {
            console.error("Невозможно отправить сообщение! Пустые обязательные поля!");
            return;
        }

        http('POST', {nick: this.user.value, message: this.message.value})
            .then(() => {
                this.user.value = "";
                this.message.value = "";
            })
            .catch(error => {
                this.messages.innerText = `Ошибка ${xhr.status}: ${xhr.statusText}`;
            });
    }

    async postMessageAsync() {
        if (!this.user.value || !this.message.value) {
            console.error("Невозможно отправить сообщение! Пустые обязательные поля!");
            return;
        }

        try {
            let result = await http('POST', {nick: this.user.value, message: this.message.value});
            this.user.value = "";
            this.message.value = "";
        }
        catch (err) {
            console.error(err);
        }
    }

    getMessagesPromise() {
        http('GET').then(result => this.drawMessages(result)).catch(error => console.log(error));
    }

    async getMessagesAsync() {
        try {
            let result = await http('GET');
            this.drawMessages(result);
        }
        catch (err) {
            console.error(err);
        }

    }

    drawMessages(response) {
        const existingIds = this.serverMessages.map(message => message.id);
        for (let { id, nick, message } of response) {
            if (!existingIds.includes(id)) {
                let messagebox = document.createElement("div");
                messagebox.classList.add("card");
                messagebox.classList.add("mb-3");

                let messageNickLabel = document.createElement("div");
                messageNickLabel.classList.add("card-header");
                messageNickLabel.classList.add("font-weight-bold");

                let messageMessageContent = document.createElement("div");
                messageMessageContent.classList.add("card-body");
                messageNickLabel.innerText = nick;
                messageMessageContent.innerText = message;
                messagebox.appendChild(messageNickLabel);
                messagebox.appendChild(messageMessageContent);

                this.messages.insertAdjacentElement("afterbegin", messagebox);
            }
        }
        this.serverMessages = response;
    }
}
