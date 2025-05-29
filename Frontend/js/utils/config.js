/**
 * Frontend configuration
 * This file loads environment variables from the .env file
 * and provides them to the frontend application
 */

// Configuration object
const config = {
  // API Keys
  apiKeys: {
    openRouter: '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',
    weather: '3c7e0ab03365ca4c36da204dcf5baf2e',
    gemini: 'your_gemini_api_key_here'
  },

  // API Endpoints
  apiEndpoints: {
    cropAnalysis: '/api/crop-analysis',
    cropYieldPrediction: '/api/crop-yield-prediction',
    fertilizerRecommendation: '/api/fertilizer-recommendation',
    chatbot: 'https://openrouter.ai/api/v1/chat/completions',
    gemini: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent',
    weather: 'https://api.weatherapi.com/v1',
    marketPrices: 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070'
  },

  // AI Models
  aiModels: {
    chatbot: 'mistralai/mistral-7b-instruct',
    gemini: 'gemini-1.5-pro'
  },

  // Feature flags
  features: {
    enableChatbot: true,
    enableWeatherWidget: true,
    enableMarketPrices: true,
    enableCropAnalysis: true
  }
};

// Export the configuration
window.agroConfig = config;