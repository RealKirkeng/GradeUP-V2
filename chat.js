document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    const chatToggle = document.getElementById('chat-toggle');
    console.log('chatToggle:', chatToggle);

    const chatWindow = document.getElementById('chat-window');
    console.log('chatWindow:', chatWindow);

    const closeChatBtn = document.getElementById('close-chat-btn');
    console.log('closeChatBtn:', closeChatBtn);

    const chatBody = document.querySelector('.chat-body');
    const chatInput = document.querySelector('.chat-input input');
    const sendChatBtn = document.querySelector('.chat-input button');

    if (chatToggle) {
        chatToggle.addEventListener('click', () => {
            console.log('chatToggle clicked');
            chatWindow.classList.toggle('active');
        });
    }

    if (closeChatBtn) {
        closeChatBtn.addEventListener('click', () => {
            console.log('closeChatBtn clicked');
            chatWindow.classList.remove('active');
        });
    }

    const addMessage = (message, sender) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', sender);
        messageElement.textContent = message;
        chatBody.appendChild(messageElement);
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    const handleSendMessage = () => {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            chatInput.value = '';
            setTimeout(() => {
                addMessage('Thanks for your message! A support agent will be with you shortly.', 'bot');
            }, 1000);
        }
    };

    if (sendChatBtn) {
        sendChatBtn.addEventListener('click', handleSendMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSendMessage();
            }
        });
    }
});