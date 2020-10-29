const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
	ignoreQueryPrefix: true,
});

const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, room }); // now we will catch this on server side

// Message from server
socket.on('message', (message) => {
	console.log(message);
	outputMessage(message);

	// scroll down
	chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const msg = e.target.elements.msg.value;

	console.log('From main.js file: ' + msg);

	// Emit message to server
	socket.emit('chatMessage', msg); // now we will catch this on server side

	//Clear input and focus again
	e.target.elements.msg.value = '';
	e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
	const div = document.createElement('div');
	div.classList.add('message');
	div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;

	document.querySelector('.chat-messages').appendChild(div);
}
