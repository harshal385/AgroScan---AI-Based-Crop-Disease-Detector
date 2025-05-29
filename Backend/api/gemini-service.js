/**
 * Gemini API Service
 * Handles interactions with Google's Gemini API
 */

const fetch = require('node-fetch');
const config = require('../config/config');

class GeminiService {
  constructor() {
    this.apiKey = config.gemini.apiKey;
    this.model = config.gemini.model;
    this.baseUrl = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent`;
  }

  /**
   * Analyze crop disease from image description and detected disease
   * @param {string} imageDescription - Description of the image
   * @param {string} detectedDisease - The detected disease
   * @returns {Promise<Object>} - Detailed analysis from Gemini
   */
  async analyzeCropDisease(imageDescription, detectedDisease) {
    try {
      const prompt = `
You are an agricultural expert specializing in crop diseases. 
Based on the following information about a crop image, provide a detailed analysis:

Image Description: ${imageDescription}
Detected Disease: ${detectedDisease}

Please provide the following information in JSON format:
1. Full disease name
2. Cause of the disease (pathogen type, scientific name)
3. Symptoms (detailed description)
4. Treatment recommendations (chemical and organic options)
5. Prevention measures
6. Expected crop yield impact if untreated
7. Regions where this disease is common

Format your response as valid JSON with these keys: diseaseName, cause, symptoms, treatment, prevention, yieldImpact, commonRegions
`;

      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Gemini API error:', errorData);
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      
      // Extract the text response
      const textResponse = data.candidates[0].content.parts[0].text;
      
      // Parse the JSON from the text response
      // Find JSON content between ```json and ``` if it exists
      let jsonMatch = textResponse.match(/```json\n([\s\S]*?)\n```/);
      
      if (jsonMatch && jsonMatch[1]) {
        return JSON.parse(jsonMatch[1]);
      }
      
      // If no JSON block with markers, try to parse the entire response as JSON
      try {
        return JSON.parse(textResponse);
      } catch (e) {
        // If parsing fails, extract information using regex or return a formatted error
        console.error('Failed to parse Gemini response as JSON:', e);
        return {
          error: 'Could not parse AI response',
          rawResponse: textResponse
        };
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw error;
    }
  }

  /**
   * Generate treatment recommendations for a crop disease
   * @param {string} crop - The crop type
   * @param {string} disease - The disease name
   * @returns {Promise<Object>} - Treatment recommendations
   */
  async getTreatmentRecommendations(crop, disease) {
    try {
      const prompt = `
You are an agricultural expert specializing in crop disease treatment.
Provide detailed treatment recommendations for the following:

Crop: ${crop}
Disease: ${disease}

Please provide the following information in JSON format:
1. Chemical treatments (list with application rates and frequency)
2. Organic/biological treatments (list with application methods)
3. Cultural practices to manage the disease
4. Preventive measures for future crops
5. Expected recovery timeline
6. When to apply treatments (growth stage, conditions)

Format your response as valid JSON with these keys: chemicalTreatments, organicTreatments, culturalPractices, preventiveMeasures, recoveryTimeline, applicationTiming
`;

      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Gemini API error:', errorData);
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      
      // Extract the text response
      const textResponse = data.candidates[0].content.parts[0].text;
      
      // Parse the JSON from the text response
      // Find JSON content between ```json and ``` if it exists
      let jsonMatch = textResponse.match(/```json\n([\s\S]*?)\n```/);
      
      if (jsonMatch && jsonMatch[1]) {
        return JSON.parse(jsonMatch[1]);
      }
      
      // If no JSON block with markers, try to parse the entire response as JSON
      try {
        return JSON.parse(textResponse);
      } catch (e) {
        // If parsing fails, extract information using regex or return a formatted error
        console.error('Failed to parse Gemini response as JSON:', e);
        return {
          error: 'Could not parse AI response',
          rawResponse: textResponse
        };
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw error;
    }
  }
}

module.exports = new GeminiService();