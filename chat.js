document.addEventListener('DOMContentLoaded', () => {


    const chatBody = document.querySelector('.chat-body');
    const chatInput = document.querySelector('.chat-input input');
    const sendChatBtn = document.querySelector('.chat-input button');

    if (chatToggle) {
        chatToggle.addEventListener('click', () => {
            chatWindow.classList.toggle('active');
        });
    }

    if (closeChatBtn) {
        closeChatBtn.addEventListener('click', () => {
            chatWindow.classList.remove('active');
        });
    }

    const addMessage = (message, sender) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', sender);
        if (sender === 'bot' && message === '...') {
            messageElement.classList.add('typing');
            messageElement.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
        } else {
            messageElement.textContent = message;
        }
        chatBody.appendChild(messageElement);
        chatBody.scrollTop = chatBody.scrollHeight;
        return messageElement;
    };

    const handleSendMessage = async () => {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            chatInput.value = '';
            const typingIndicator = addMessage('...', 'bot');

            try {
                const { getGeminiResponse } = await import('./gemini.js');
                const response = await getGeminiResponse(message);
                typingIndicator.remove();
                addMessage(response, 'bot');
            } catch (error) {
                console.error('Error getting Gemini response:', error);
                typingIndicator.remove();
                addMessage('Sorry, something went wrong. Please try again later.', 'bot');
            }
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