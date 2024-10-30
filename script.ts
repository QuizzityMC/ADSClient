// WebSocket connection
const socket = new WebSocket('wss://adschat.michaelfoody.com/');

// DOM elements
const messagesContainer = document.querySelector('.chat-messages') as HTMLElement;
const messageInput = document.getElementById('message-input') as HTMLInputElement;
const sendButton = document.getElementById('send-button') as HTMLButtonElement;

// Send message function
const sendMessage = (message: string) => {
  const data = JSON.stringify({ message: message });
  socket.send(data);
  messageInput.value = ''; // Clear input field
};

// Handle message received
socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', 'other'); // 'other' for messages from the server
  messageElement.textContent = data.message;
  messagesContainer.appendChild(messageElement);
};

// Event listeners for sending messages
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

// (Optional) Scroll to the bottom when new messages arrive
messagesContainer.scrollTop = messagesContainer.scrollHeight; 
