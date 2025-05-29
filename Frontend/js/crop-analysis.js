/**
 * Crop Analysis JavaScript
 * Handles the crop disease analysis functionality
 */

// Crop Analysis class
class CropAnalyzer {
  constructor() {
    // Get configuration from global config
    this.apiEndpoint = window.agroConfig?.apiEndpoints?.cropAnalysis || '/api/crop-analysis';
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Get DOM elements
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const removeImageBtn = document.getElementById('removeImageBtn');

    // Setup remove image button
    if (removeImageBtn) {
      removeImageBtn.addEventListener('click', () => {
        this.removeImage();
      });
    }

    // Setup drag and drop
    if (uploadArea) {
      uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
      });

      uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
      });

      uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type.startsWith('image/')) {
          this.handleFileSelect(files[0]);
        }
      });

      uploadArea.addEventListener('click', () => {
        fileInput.click();
      });
    }

    // Setup file input change
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          this.handleFileSelect(file);
        }
      });
    }

    // Setup analyze button
    if (analyzeBtn) {
      analyzeBtn.addEventListener('click', () => {
        this.analyzeCrop();
      });
    }
  }

  handleFileSelect(file) {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = document.getElementById('imagePreview');
        const previewImage = document.getElementById('previewImage');
        
        if (preview && previewImage) {
          previewImage.src = e.target.result;
          preview.style.display = 'block';
          
          // Store the file for later use
          this.selectedFile = file;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    const preview = document.getElementById('imagePreview');
    const fileInput = document.getElementById('fileInput');
    const resultsSection = document.getElementById('resultsSection');
    
    if (preview) preview.style.display = 'none';
    if (fileInput) fileInput.value = '';
    if (resultsSection) resultsSection.style.display = 'none';
    
    this.selectedFile = null;
  }

  async analyzeCrop() {
    if (!this.selectedFile) {
      window.agroUtils?.showError('Please select an image first');
      return;
    }

    const loadingState = document.getElementById('loadingState');
    const analyzeBtn = document.getElementById('analyzeBtn');
    
    // Show loading state
    if (analyzeBtn) {
      analyzeBtn.disabled = true;
      analyzeBtn.textContent = 'Analyzing...';
    }
    
    if (loadingState) {
      loadingState.style.display = 'block';
    }
    
    try {
      // Create form data
      const formData = new FormData();
      formData.append('image', this.selectedFile);
      
      // Send request to backend
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze crop');
      }
      
      const data = await response.json();
      
      // Display results
      this.displayResults(data);
    } catch (error) {
      console.error('Error analyzing crop:', error);
      window.agroUtils?.showError('Failed to analyze crop. Please try again.');
    } finally {
      // Hide loading state
      if (loadingState) {
        loadingState.style.display = 'none';
      }
      
      if (analyzeBtn) {
        analyzeBtn.disabled = false;
        analyzeBtn.textContent = '🔍 Analyze Crop';
      }
    }
  }

  displayResults(data) {
    window.agroUtils?.showSuccess('Analysis complete!');
    
    // Create or update results section
    const mainContent = document.querySelector('.main-content');
    let resultsSection = document.getElementById('resultsSection');
    
    if (!resultsSection) {
      resultsSection = document.createElement('section');
      resultsSection.id = 'resultsSection';
      resultsSection.className = 'results-section';
      mainContent.appendChild(resultsSection);
    }
    
    // Check if we have enhanced data from Gemini
    const hasGeminiData = data.diseaseName || data.cause || data.symptoms;
    const hasTreatmentRecs = data.treatmentRecommendations && 
      (data.treatmentRecommendations.chemicalTreatments || 
       data.treatmentRecommendations.organicTreatments);
    
    // Format prevention tips if they exist
    let preventionHTML = '';
    if (data.prevention) {
      if (Array.isArray(data.prevention)) {
        preventionHTML = `
          <ul>
            ${data.prevention.map(tip => `<li>${tip}</li>`).join('')}
          </ul>
        `;
      } else {
        preventionHTML = `<p>${data.prevention}</p>`;
      }
    } else if (data.preventionTips && Array.isArray(data.preventionTips)) {
      preventionHTML = `
        <ul>
          ${data.preventionTips.map(tip => `<li>${tip}</li>`).join('')}
        </ul>
      `;
    }
    
    // Format treatment recommendations if they exist from Gemini
    let treatmentHTML = '';
    if (hasTreatmentRecs) {
      const tr = data.treatmentRecommendations;
      
      // Chemical treatments
      if (tr.chemicalTreatments) {
        treatmentHTML += `
          <div class="treatment-section">
            <h4>Chemical Treatments</h4>
            ${Array.isArray(tr.chemicalTreatments) 
              ? `<ul>${tr.chemicalTreatments.map(t => `<li>${t}</li>`).join('')}</ul>`
              : `<p>${tr.chemicalTreatments}</p>`}
          </div>
        `;
      }
      
      // Organic treatments
      if (tr.organicTreatments) {
        treatmentHTML += `
          <div class="treatment-section">
            <h4>Organic Treatments</h4>
            ${Array.isArray(tr.organicTreatments) 
              ? `<ul>${tr.organicTreatments.map(t => `<li>${t}</li>`).join('')}</ul>`
              : `<p>${tr.organicTreatments}</p>`}
          </div>
        `;
      }
      
      // Cultural practices
      if (tr.culturalPractices) {
        treatmentHTML += `
          <div class="treatment-section">
            <h4>Cultural Practices</h4>
            ${Array.isArray(tr.culturalPractices) 
              ? `<ul>${tr.culturalPractices.map(t => `<li>${t}</li>`).join('')}</ul>`
              : `<p>${tr.culturalPractices}</p>`}
          </div>
        `;
      }
      
      // Application timing
      if (tr.applicationTiming) {
        treatmentHTML += `
          <div class="treatment-section">
            <h4>When to Apply</h4>
            <p>${tr.applicationTiming}</p>
          </div>
        `;
      }
      
      // Recovery timeline
      if (tr.recoveryTimeline) {
        treatmentHTML += `
          <div class="treatment-section">
            <h4>Expected Recovery</h4>
            <p>${tr.recoveryTimeline}</p>
          </div>
        `;
      }
    } else if (data.treatment) {
      // Fallback to basic treatment info
      treatmentHTML = `<p>${data.treatment}</p>`;
    }
    
    // Build the HTML for the results section
    resultsSection.innerHTML = `
      <h2>Crop Disease Analysis Results</h2>
      <div class="analysis-summary">
        <div class="result-card primary-result">
          <h3>${hasGeminiData ? data.diseaseName || data.disease : data.disease || 'Unknown Disease'}</h3>
          <div class="confidence-badge">
            <span>Confidence: ${data.confidence ? Math.round(data.confidence) : '95'}%</span>
          </div>
        </div>
      </div>
      
      ${hasGeminiData ? `
        <div class="disease-details">
          ${data.cause ? `
            <div class="detail-section">
              <h3>Cause</h3>
              <p>${data.cause}</p>
            </div>
          ` : ''}
          
          ${data.symptoms ? `
            <div class="detail-section">
              <h3>Symptoms</h3>
              <p>${data.symptoms}</p>
            </div>
          ` : ''}
          
          ${data.yieldImpact ? `
            <div class="detail-section">
              <h3>Impact on Yield</h3>
              <p>${data.yieldImpact}</p>
            </div>
          ` : ''}
          
          ${data.commonRegions ? `
            <div class="detail-section">
              <h3>Common in Regions</h3>
              <p>${data.commonRegions}</p>
            </div>
          ` : ''}
        </div>
      ` : ''}
      
      <div class="treatment-recommendations">
        <h3>Treatment Recommendations</h3>
        ${treatmentHTML}
      </div>
      
      <div class="prevention-tips">
        <h3>Prevention Measures</h3>
        ${preventionHTML || '<p>No specific prevention tips available.</p>'}
      </div>
      
      <div class="powered-by">
        <p>Analysis powered by AI</p>
      </div>
    `;
    
    // Add some CSS for the results section
    const style = document.createElement('style');
    style.textContent = `
      .results-section {
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        border: 1px solid var(--glass-border);
        border-radius: 24px;
        padding: 40px;
        margin-top: 40px;
        animation: fadeInUp 0.8s ease-out;
      }
      
      .analysis-summary {
        display: flex;
        justify-content: center;
        margin-bottom: 30px;
      }
      
      .result-card {
        background: rgba(0, 200, 81, 0.1);
        border: 1px solid rgba(0, 200, 81, 0.3);
        border-radius: 16px;
        padding: 25px;
        text-align: center;
        min-width: 300px;
      }
      
      .result-card h3 {
        font-size: 1.8rem;
        margin-bottom: 15px;
        color: var(--primary-green);
      }
      
      .confidence-badge {
        display: inline-block;
        background: var(--primary-green);
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-weight: 600;
      }
      
      .disease-details, .treatment-recommendations, .prevention-tips {
        margin-bottom: 30px;
      }
      
      .detail-section, .treatment-section {
        margin-bottom: 20px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 12px;
        padding: 20px;
      }
      
      .detail-section h3, .treatment-section h4 {
        color: var(--primary-green);
        margin-bottom: 10px;
      }
      
      .powered-by {
        text-align: center;
        opacity: 0.7;
        font-size: 0.9rem;
        margin-top: 30px;
      }
      
      @media (max-width: 768px) {
        .results-section {
          padding: 25px;
        }
      }
    `;
    
    document.head.appendChild(style);
    
    resultsSection.style.display = 'block';
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Initialize crop analyzer when the page loads
document.addEventListener('DOMContentLoaded', () => {
  window.cropAnalyzer = new CropAnalyzer();
});