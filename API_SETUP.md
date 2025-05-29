# AgroScan API Setup Guide

This guide explains how to set up the necessary API keys for AgroScan to function properly.

## Required API Keys

AgroScan uses the following external APIs:

1. **OpenRouter API** - For the chatbot functionality
2. **Google Gemini API** - For enhanced crop disease analysis
3. **Weather API** - For weather data integration

## Setting Up API Keys

### Step 1: Create a .env file

The project uses a `.env` file to store sensitive API keys. This file should be located in the root directory of the project.

```
# API Keys
OPENROUTER_API_KEY=your_openrouter_api_key_here
WEATHER_API_KEY=your_weather_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here

# Server Configuration
PORT=3000
HOST=localhost

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=agroscan
DB_USER=postgres
DB_PASSWORD=your_db_password_here

# Security
JWT_SECRET=your_jwt_secret_key_here

# Frontend Configuration
FRONTEND_URL=http://localhost:5500
```

### Step 2: Obtain API Keys

#### OpenRouter API
1. Go to [OpenRouter](https://openrouter.ai/)
2. Create an account and subscribe to a plan
3. Generate an API key
4. Replace `your_openrouter_api_key_here` in the `.env` file with your actual API key

#### Google Gemini API
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create an account if you don't have one
3. Generate an API key
4. Replace `your_gemini_api_key_here` in the `.env` file with your actual API key

#### Weather API
1. Go to [WeatherAPI](https://www.weatherapi.com/)
2. Create a free account
3. Generate an API key
4. Replace `your_weather_api_key_here` in the `.env` file with your actual API key

### Step 3: Update Frontend Configuration

The frontend also needs access to these API keys. They are stored in:

```
Frontend/js/utils/config.js
```

Update this file with your API keys:

```javascript
// Configuration object
const config = {
  // API Keys
  apiKeys: {
    openRouter: 'your_openrouter_api_key_here',
    weather: 'your_weather_api_key_here',
    gemini: 'your_gemini_api_key_here'
  },
  // ... rest of the config
};
```

## Security Considerations

- **NEVER** commit your `.env` file to version control
- The `.env` file is already added to `.gitignore`
- For production, use environment variables set on your hosting platform
- Consider using a secrets management service for production environments

## Testing Your API Keys

After setting up your API keys, you can test if they're working:

1. Start the server: `npm start`
2. Open the application in your browser
3. Try using the chatbot feature (tests OpenRouter API)
4. Upload an image for crop disease analysis (tests Gemini API)
5. Check weather data (tests Weather API)

If any feature doesn't work, check the browser console and server logs for error messages related to API keys.

## Troubleshooting

- **"API key not valid" errors**: Double-check that you've copied the full API key correctly
- **CORS errors**: Make sure your API keys have the correct permissions and allowed domains
- **Rate limiting**: Free tier API keys often have usage limits. Check if you've exceeded them

For any other issues, refer to the documentation of the respective API providers.