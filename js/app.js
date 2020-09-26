const URL = 'http://localhost:3000'

class App {
    constructor() {
        this.button = document.getElementById('send');
        this.user = document.getElementById('nick');
        this.message = document.getElementById('message')
        this.messages = document.getElementById('messages')
        this.serverMessages = []

        this.postMessage = this.postMessage.bind(this)
        this.getMessages = this.getMessages.bind(this)
        this.drawMessages = this.drawMessages.bind(this)

        setInterval(this.getMessages, 1000)
        this.button.addEventListener('click', this.postMessage)
    }

    postMessage() {
        if (!this.user.value || !this.message.value)
        {
            console.error("Невозможно отправить сообщение! Пустые обязательные поля");
            return;
        }

        let xhr = new XMLHttpRequest();
        xhr.open('POST', URL);
        xhr.send(JSON.stringify({nick: this.user.value, message: this.message.value}));

        xhr.onload = () => {
            if (xhr.status !== 200) {
                this.messages.innerText = `Ошибка ${xhr.status}: ${xhr.statusText}`;
            } else {
                this.user.value = "";
                this.message.value = "";
            }
        };

        xhr.onerror = function() {
            console.error("Запрос не удался");
        };
    }

    getMessages() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', URL);
        xhr.send();

        xhr.onload = () => {
            if (xhr.status !== 200) {
                console.error(`Ошибка ${xhr.status}: ${xhr.statusText}`);
            } else {
                const serverResult = JSON.parse(xhr.response);
                this.drawMessages(serverResult)
            }
        };
    }

    drawMessages(response) {
        const existingIds = this.serverMessages.map(message => message.id);
        for (let message of response)
        {
            if (!existingIds.includes(message.id))
            {
                let messagebox = document.createElement("div")
                messagebox.classList.add("card");
                messagebox.classList.add("mb-3");
                let messageNickLabel = document.createElement("div")
                messageNickLabel.classList.add("card-header");
                messageNickLabel.classList.add("font-weight-bold");
                let messageMessageContent = document.createElement("div")
                messageMessageContent.classList.add("card-body");
                messageNickLabel.innerText = message.nick
                messageMessageContent.innerText = message.message
                messagebox.appendChild(messageNickLabel)
                messagebox.appendChild(messageMessageContent)
                this.messages.insertAdjacentElement("afterbegin", messagebox)
            }
        }
        this.serverMessages = response
    }
}