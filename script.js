// Connect to the server using Socket.IO
const socket = io('https://adschat.michaelfoody.com/', {
  transports: ['websocket'] 
});

// DOM elements
const messagesContainer = document.querySelector('.chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Send message function
const sendMessage = (message) => {
  socket.emit('chat message', message); 
  messageInput.value = ''; 
};

// Handle message received
socket.on('chat message', (message) => {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', 'other');
  messageElement.textContent = message;
  messagesContainer.appendChild(messageElement);
});

// Event listeners
sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  if (message.trim() !== '') {
    sendMessage(message);
  }
});

messageInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    sendMessage(messageInput.value);
  }
});
