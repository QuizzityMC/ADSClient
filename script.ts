// Import Socket.IO client library
import io from 'socket.io-client';

// DOM elements
const messagesContainer = document.querySelector('.chat-messages') as HTMLElement;
const messageInput = document.getElementById('message-input') as HTMLInputElement;
const sendButton = document.getElementById('send-button') as HTMLButtonElement;

// Connect to the server
const socket = io('https://adschat.michaelfoody.com/', {
  transports: ['websocket'] // Ensure WebSocket is used
});

// Send message function
const sendMessage = (message: string) => {
  socket.emit('chat message', message); // Use 'chat message' event 
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
