document.addEventListener('DOMContentLoaded', function() {

    const button = document.getElementById('send');
    const user = document.getElementById('nick');
    const message = document.getElementById('message')
    const messages = document.getElementById('messages')

    //Отправляем при загрузке страницы GET-запрос для получения уже имеющихся сообщений
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000');
    xhr.send();

    xhr.onload = function() {
        if (xhr.status != 200) {
            messages.innerText = `Ошибка ${xhr.status}: ${xhr.statusText}`;
        } else {
            const serverResult = JSON.parse(xhr.response);
            serverResult.forEach((result) => {
                createMessageBox(result, messages);
            })
        }
    };

    //Отправляем сообщение в чат с помощью POST-запроса
    button.addEventListener('click', function() {
        if (user.value && message.value)
        {
            xhr.open('POST', 'http://localhost:3000');
            xhr.send(JSON.stringify({nick: user.value, message: message.value}));

            xhr.onload = function() {
                if (xhr.status != 200) {
                    messages.innerText = `Ошибка ${xhr.status}: ${xhr.statusText}`;
                } else {
                    const serverResult = JSON.parse(xhr.response);
                    createMessageBox(serverResult, messages);
                }
            };

            xhr.onerror = function() {
                console.log("Запрос не удался");
            };
        }
    });
});

//Функция для создания блока с сообщением
function createMessageBox(messageInfo, messageContainer)
{
    let messagebox = document.createElement("div")
    messagebox.classList.add("border-bottom")
    let messageNickLabel = document.createElement("p")
    messageNickLabel.classList.add("text-secondary")
    let messageMessageContent = document.createElement("p")

    messageNickLabel.innerText = messageInfo.nick
    messageMessageContent.innerText = messageInfo.message

    messagebox.appendChild(messageNickLabel)
    messagebox.appendChild(messageMessageContent)
    messageContainer.insertAdjacentElement("afterbegin", messagebox)
}

