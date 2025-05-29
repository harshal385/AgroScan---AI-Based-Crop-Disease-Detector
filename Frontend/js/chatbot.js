class ChatBot {
  constructor() {
    this.apiKey = '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';
    this.messageHistory = [];
    this.isProcessing = false;
    this.setupEventListeners();
  }

  setupEventListeners() {
    console.log('Setting up event listeners...');
    const chatbotButton = document.getElementById('chatbotButton');
    const closeChat = document.getElementById('closeChat');
    const sendMessage = document.getElementById('sendMessage');
    const chatInput = document.getElementById('chatInput');

    if (!chatbotButton || !closeChat || !sendMessage || !chatInput) {
      console.error('Some chat elements not found!');
      return;
    }

    chatbotButton.onclick = () => {
      console.log('Chat button clicked');
      const chatWindow = document.getElementById('chatWindow');
      chatWindow.classList.toggle('hidden');
    };

    closeChat.onclick = () => {
      console.log('Close button clicked');
      const chatWindow = document.getElementById('chatWindow');
      chatWindow.classList.add('hidden');
    };

    sendMessage.onclick = () => this.handleSendMessage();

    chatInput.onkeypress = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.handleSendMessage();
      }
    };
  }

  async handleSendMessage() {
    if (this.isProcessing) return;

    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    const typingIndicator = document.getElementById('typingIndicator');
    
    if (message === '') return;

    this.addMessageToChat('user', message);
    chatInput.value = '';

    this.isProcessing = true;
    typingIndicator.classList.remove('hidden');
    typingIndicator.classList.add('visible');

    try {
      const response = await this.getAIResponse(message);
      this.addMessageToChat('bot', response);
    } catch (error) {
      console.error('Error getting AI response:', error);
      this.addMessageToChat('bot', 'I apologize, but I encountered an error. Please try again.');
    }

    typingIndicator.classList.remove('visible');
    setTimeout(() => {
      typingIndicator.classList.add('hidden');
    }, 300);
    this.isProcessing = false;
  }

  addMessageToChat(sender, message) {
    const chatContent = document.getElementById('chatContent');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.className = sender === 'user' ? 'user-message' : 'bot-message';
    chatContent.appendChild(messageElement);
    chatContent.scrollTop = chatContent.scrollHeight;

    this.messageHistory.push({
      role: sender === 'user' ? 'user' : 'assistant',
      content: message
    });
  }

  async getAIResponse(message) {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': window.location.href,
          'X-Title': 'AgroScan Assistant'
        },
        body: JSON.stringify({
          model: 'mistralai/mistral-7b-instruct',
          messages: [
            {
              role: 'system',
              content: 'You are an AI farming assistant for AgroScan. You help farmers with crop disease diagnosis, farming best practices, and general agricultural advice. Be concise, helpful, and friendly.'
            },
            ...this.messageHistory,
            {
              role: 'user',
              content: message
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
}

// Initialize chatbot when the page loads
document.addEventListener('DOMContentLoaded', () => {
  // Create chatbot HTML structure
  const chatbotHTML = `
    <div id="chatbot">
      <button id="chatbotButton">🤖</button>
      <div id="chatWindow" class="hidden">
        <div id="chatHeader">
          <span>AgroScan Assistant</span>
          <button id="closeChat">×</button>
        </div>
        <div id="chatContent">
          <div class="bot-message">Hello! I'm your AI farming assistant. How can I help you today? 🌱</div>
        </div>
        <div id="chatInputArea">
          <input type="text" id="chatInput" placeholder="Type your message here..." />
          <button id="sendMessage">Send</button>
          <div id="typingIndicator" class="hidden">AI is thinking...</div>
        </div>
      </div>
    </div>
  `;

  // Insert chatbot HTML into the page
  document.body.insertAdjacentHTML('beforeend', chatbotHTML);

  // Initialize chatbot
  window.chatbot = new ChatBot();
}); 