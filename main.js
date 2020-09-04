document.addEventListener('DOMContentLoaded', function() {

    const button = document.getElementById('send');
    const user = document.getElementById('nick');
    const message = document.getElementById('message')
    const messages = document.getElementById('messages')

    button.addEventListener('click', function() {
        if (user.value && message.value)
        {
            let xhr = new XMLHttpRequest();

            xhr.open('POST', 'http://localhost:3000');

            xhr.send(JSON.stringify({nick: user.value, message: message.value}));

            xhr.onload = function() {
                if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
                    messages.innerText = `Ошибка ${xhr.status}: ${xhr.statusText}`; // Например, 404: Not Found
                } else { // если всё прошло гладко, выводим результат

                    const serverResult = JSON.parse(xhr.response);

                    let messagebox = document.createElement("div")
                    messagebox.classList.add("border-bottom")
                    let messageNickLabel = document.createElement("p")
                    messageNickLabel.classList.add("text-secondary")
                    let messageMessageContent = document.createElement("p")

                    messageNickLabel.innerText = serverResult.nick
                    messageMessageContent.innerText = serverResult.message

                    messagebox.appendChild(messageNickLabel)
                    messagebox.appendChild(messageMessageContent)
                    messages.insertAdjacentElement("afterbegin", messagebox)
                }
            };

            xhr.onprogress = function(event) {
                if (event.lengthComputable) {
                    console.log(`Получено ${event.loaded} из ${event.total} байт`);
                } else {
                    console.log(`Получено ${event.loaded} байт`); // если в ответе нет заголовка Content-Length
                }

            };

            xhr.onerror = function() {
                results.innerText = "Запрос не удался";
            };
        }
    });

});

