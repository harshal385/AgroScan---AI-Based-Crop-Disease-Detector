/**
 * AgroScan Backend Server
 */

// Import required modules
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const config = require('./config/config');
const geminiService = require('./api/gemini-service');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = config.server.port;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: 'Too many requests from this IP, please try again later.'
});

// Apply rate limiting to API routes
app.use('/api/', apiLimiter);

// Configure file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, config.upload.directory);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'crop-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: config.upload.maxSize
  },
  fileFilter: (req, file, cb) => {
    if (config.upload.allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and WebP images are allowed.'));
    }
  }
});

// Serve static files from Frontend directory
app.use(express.static(path.join(__dirname, '../Frontend')));

// API Routes

// Crop disease analysis endpoint
app.post('/api/crop-analysis', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Here you would typically process the image with your AI model to detect the disease
    // For now, we'll use a mock detection result and then enhance it with Gemini

    // Mock initial detection result (this would come from your image classification model)
    const initialDetection = {
      disease: 'Leaf Blight',
      confidence: 92.5,
      cropType: 'Tomato'
    };

    // Image description (in a real system, this could come from another AI model or be derived from metadata)
    const imageDescription = `A tomato plant leaf showing yellowish-brown spots with concentric rings. 
    The spots are spreading across the leaf surface with some areas turning necrotic. 
    The leaf edges are starting to curl and there's slight wilting visible.`;

    try {
      // Get enhanced analysis from Gemini
      const geminiAnalysis = await geminiService.analyzeCropDisease(
        imageDescription, 
        initialDetection.disease
      );

      // Combine the initial detection with the Gemini analysis
      const enhancedResult = {
        ...initialDetection,
        ...geminiAnalysis
      };

      // Get treatment recommendations
      const treatmentRecommendations = await geminiService.getTreatmentRecommendations(
        initialDetection.cropType,
        initialDetection.disease
      );

      // Add treatment recommendations to the result
      enhancedResult.treatmentRecommendations = treatmentRecommendations;

      res.json(enhancedResult);
    } catch (aiError) {
      console.error('Error getting AI analysis:', aiError);
      
      // Fallback to basic result if AI enhancement fails
      const fallbackResult = {
        ...initialDetection,
        treatment: 'Apply copper-based fungicide and ensure proper spacing between plants for better air circulation.',
        preventionTips: [
          'Rotate crops annually',
          'Use disease-resistant varieties',
          'Avoid overhead irrigation',
          'Remove and destroy infected plant material'
        ],
        aiError: 'Enhanced analysis unavailable'
      };
      
      res.json(fallbackResult);
    }
  } catch (error) {
    console.error('Error processing crop analysis:', error);
    res.status(500).json({ error: 'Failed to process image' });
  }
});

// Crop yield prediction endpoint
app.post('/api/crop-yield-prediction', express.json(), (req, res) => {
  try {
    const { crop, soil, rainfall, temperature, area } = req.body;
    
    if (!crop || !soil || !rainfall || !temperature || !area) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    // Mock yield prediction
    const mockYield = {
      predictedYield: Math.floor(Math.random() * 20) + 10, // 10-30 tons per hectare
      confidence: Math.floor(Math.random() * 10) + 85, // 85-95% confidence
      factors: {
        rainfall: rainfall > 1000 ? 'Optimal' : 'Below optimal',
        temperature: temperature > 25 ? 'High' : 'Moderate',
        soil: 'Compatible with crop'
      },
      recommendations: [
        'Consider drip irrigation to optimize water usage',
        'Apply organic mulch to retain soil moisture',
        'Monitor for early signs of nutrient deficiency'
      ]
    };
    
    res.json(mockYield);
  } catch (error) {
    console.error('Error processing yield prediction:', error);
    res.status(500).json({ error: 'Failed to predict yield' });
  }
});

// Fertilizer recommendation endpoint
app.post('/api/fertilizer-recommendation', express.json(), (req, res) => {
  try {
    const { crop, soil, nitrogen, phosphorus, potassium, ph } = req.body;
    
    if (!crop || !soil || !nitrogen || !phosphorus || !potassium || !ph) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    // Mock fertilizer recommendation
    const mockRecommendation = {
      recommendedFertilizer: 'NPK 14-14-14',
      applicationRate: '250 kg/ha',
      timing: 'Apply in two splits: 50% at planting, 50% at flowering',
      soilAnalysis: {
        nitrogen: nitrogen < 140 ? 'Low' : 'Adequate',
        phosphorus: phosphorus < 10 ? 'Low' : 'Adequate',
        potassium: potassium < 200 ? 'Low' : 'Adequate',
        ph: ph < 6.5 ? 'Acidic' : ph > 7.5 ? 'Alkaline' : 'Neutral'
      },
      additionalRecommendations: [
        'Consider adding organic matter to improve soil structure',
        'Apply lime if soil pH is below 6.0',
        'Use micronutrient supplements if deficiency symptoms appear'
      ]
    };
    
    res.json(mockRecommendation);
  } catch (error) {
    console.error('Error processing fertilizer recommendation:', error);
    res.status(500).json({ error: 'Failed to generate recommendation' });
  }
});

// Catch-all route to serve the frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://${config.server.host}:${PORT}`);
});