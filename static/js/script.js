document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const settingsForm = document.getElementById('settings-form');
    const endpointInput = document.getElementById('endpoint');
    const apiKeyInput = document.getElementById('api-key');

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userMessage = userInput.value.trim();
        if (!userMessage) return;

        const endpoint = endpointInput.value;
        const apiKey = apiKeyInput.value;

        userInput.value = '';
        appendMessage('You: ' + userMessage);

        const eventSource = new EventSource(`/chat?user_input=${encodeURIComponent(userMessage)}&endpoint=${encodeURIComponent(endpoint)}&api_key=${encodeURIComponent(apiKey)}`);

        eventSource.onmessage = function(event) {
            const data = JSON.parse(event.data);
            if (data.error) {
                appendMessage('Error: ' + data.error);
                eventSource.close();
                return;
            }
            const message = data.choices[0].delta.content || '';
            appendMessage(message, true);
        };

        eventSource.onerror = function() {
            appendMessage('Connection error');
            eventSource.close();
        };
    });

    function appendMessage(message, isResponse = false) {
        const chatBoxContent = document.createElement('div');
        if (isResponse) {
            chatBoxContent.innerHTML = marked.parse(message);
        } else {
            chatBoxContent.textContent = message;
        }
        chatBox.appendChild(chatBoxContent);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Initialize marked.js for Markdown rendering
    window.marked = require('marked');
});