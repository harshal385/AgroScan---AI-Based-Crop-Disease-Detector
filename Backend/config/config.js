// Backend configuration

require('dotenv').config();

const config = {
  // API Keys
  openRouter: {
    apiKey: process.env.OPENROUTER_API_KEY || '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',
    model: 'mistralai/mistral-7b-instruct'
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || 'your_gemini_api_key_here',
    model: 'gemini-1.5-pro'
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || 'your_gemini_api_key_here',
    model: 'gemini-1.5-pro'
  },

  // Server configuration
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost'
  },

  // Database configuration (if needed)
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || 'agroscan',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD
  },

  // File upload configuration
  upload: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    directory: 'uploads/'
  },

  // AI Model configuration
  ai: {
    diseaseDetection: {
      modelPath: 'models/disease_detection/',
      confidenceThreshold: 0.85
    },
    yieldPrediction: {
      modelPath: 'models/yield_prediction/',
      features: ['temperature', 'rainfall', 'soil_type', 'crop_type']
    }
  },

  // Security configuration
  security: {
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    jwtExpiration: '24h',
    bcryptSaltRounds: 10
  },

  // API Rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  },

  // Supported languages
  languages: ['en', 'hi', 'mr', 'gu', 'te'],

  // External API endpoints
  apis: {
    weather: 'https://api.weatherapi.com/v1',
    marketPrices: 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070'
  }
};

module.exports = config; 