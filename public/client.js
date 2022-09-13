const socket = io();

let name1;
let textArea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message_area")

do {
   name1 =  prompt('Please enter your name: ');
 } while(!name1);

textArea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
});

function sendMessage(message) {
    let sendButtonMessage = document.getElementById('textarea').value;
    let msg = {
        user: name1,
        message: message?.trim() || sendButtonMessage?.trim()
    }
    //append
    appendMessage(msg, 'outgoing');
    textArea.value = '';
    scrollToBottom();

    //send to Server
    socket.emit('message',msg)
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `;
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}


/// Receive message
socket.on('message', (msg) => {
    appendMessage(msg , 'incoming');
    scrollToBottom();
})

function scrollToBottom () {
    messageArea.scrollTop = messageArea.scrollHeight;
}