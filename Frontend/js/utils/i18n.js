// Language utility module

// Default language
let currentLanguage = localStorage.getItem('language') || 'en';

// Language data
const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      about: 'About Us',
      contact: 'Contact Us',
      services: 'Services',
      marketplace: 'Marketplace',
      language: 'Language'
    },
    // Common sections
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      success: 'Success!',
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      view: 'View',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      back: 'Back',
      getStarted: 'Get Started'
    },
    // Home page
    home: {
      hero: {
        title: 'Empowering Farmers with AI',
        subtitle: 'Upload crop images and receive instant disease diagnoses and treatment guidance using cutting-edge artificial intelligence technology.'
      },
      features: {
        disease: {
          title: 'Smart Image Diagnosis',
          description: 'Detect crop diseases in seconds using advanced AI'
        },
        mapping: {
          title: 'GPS Disease Mapping',
          description: 'Track disease patterns and enable community monitoring'
        },
        language: {
          title: 'Multi-Language Support',
          description: 'Access the platform in English, Hindi, and Gujarati, making technology accessible to all farmers.'
        },
        realtime: {
          title: 'Real-time Notifications',
          description: 'Get instant alerts about potential disease outbreaks'
        }
      }
    },
    // Marketplace
    marketplace: {
      title: 'Agricultural Marketplace',
      subtitle: 'Connect directly with farmers and buyers',
      categories: {
        all: 'All Products',
        crops: 'Crops',
        seeds: 'Seeds',
        equipment: 'Equipment',
        fertilizers: 'Fertilizers'
      },
      product: {
        price: 'Price',
        seller: 'Seller',
        location: 'Location',
        contact: 'Contact',
        buy: 'Buy Now'
      }
    },
    // Chatbot
    chatbot: {
      title: 'AgroScan Assistant',
      placeholder: 'Type your message here...',
      welcome: 'Hello! I\'m your AI farming assistant. How can I help you today? 🌱',
      send: 'Send',
      thinking: 'AI is thinking...'
    },
    // Analyzer page
    analyzer: {
      title: 'Crop Disease Diagnosis',
      subtitle: 'Upload your crop images for instant AI-powered disease detection and treatment recommendations.',
      upload: {
        title: 'Upload Image',
        description: 'Drag and drop your image here or click to select',
        button: 'Select Image'
      },
      results: {
        title: 'Analysis Results',
        disease: 'Disease Detected',
        confidence: 'Confidence Level'
      },
      treatment: {
        title: 'Recommended Treatment',
        loading: 'Analyzing image and generating recommendations...'
      },
      errors: {
        invalidFile: 'Please select a valid image file.'
      },
      mockResults: {
        disease: 'Leaf Blight',
        treatment: 'Apply copper-based fungicide every 7-10 days. Ensure proper spacing between plants for good air circulation.'
      }
    },
    // Contact page
    contact: {
      title: 'Contact Us',
      subtitle: 'Get in touch with our team for any questions or support',
      form: {
        title: 'Send us a Message',
        name: 'Name',
        namePlaceholder: 'Enter your name',
        email: 'Email',
        emailPlaceholder: 'Enter your email',
        subject: 'Subject',
        subjectPlaceholder: 'Enter subject',
        message: 'Message',
        messagePlaceholder: 'Enter your message',
        submit: 'Send Message',
        success: 'Thank you for your message! We will get back to you soon.'
      },
      info: {
        title: 'Contact Information',
        address: 'Address',
        email: 'Email',
        phone: 'Phone'
      }
    }
  },
  hi: {
    nav: {
      home: 'होम',
      about: 'हमारे बारे में',
      contact: 'संपर्क करें',
      services: 'सेवाएं',
      marketplace: 'मार्केटप्लेस',
      language: 'भाषा'
    },
    common: {
      loading: 'लोड हो रहा है...',
      error: 'एक त्रुटि हुई',
      success: 'सफल!',
      submit: 'जमा करें',
      cancel: 'रद्द करें',
      save: 'सहेजें',
      delete: 'हटाएं',
      edit: 'संपादित करें',
      view: 'देखें',
      search: 'खोजें',
      filter: 'फ़िल्टर',
      sort: 'क्रमबद्ध करें',
      back: 'वापस',
      getStarted: 'शुरू करें'
    },
    home: {
      hero: {
        title: 'एआई के साथ किसानों को सशक्त बनाना',
        subtitle: 'फसल की छवियां अपलोड करें और उन्नत कृत्रिम बुद्धिमत्ता तकनीक का उपयोग करके तत्काल रोग निदान और उपचार मार्गदर्शन प्राप्त करें।'
      },
      features: {
        disease: {
          title: 'स्मार्ट इमेज डायग्नोसिस',
          description: 'उन्नत एआई का उपयोग करके सेकंडों में फसल रोगों का पता लगाएं'
        },
        mapping: {
          title: 'जीपीएस रोग मैपिंग',
          description: 'रोग पैटर्न को ट्रैक करें और समुदाय निगरानी सक्षम करें'
        },
        language: {
          title: 'बहुभाषी समर्थन',
          description: 'अंग्रेजी, हिंदी और गुजराती में प्लेटफ़ॉर्म का उपयोग करें, सभी किसानों के लिए प्रौद्योगिकी सुलभ बनाएं।'
        },
        realtime: {
          title: 'रीयल-टाइम नोटिफिकेशन',
          description: 'संभावित रोग प्रकोप के बारे में तत्काल अलर्ट प्राप्त करें'
        }
      }
    },
    marketplace: {
      title: 'कृषि मार्केटप्लेस',
      subtitle: 'किसानों और खरीदारों से सीधे जुड़ें',
      categories: {
        all: 'सभी उत्पाद',
        crops: 'फसलें',
        seeds: 'बीज',
        equipment: 'उपकरण',
        fertilizers: 'उर्वरक'
      },
      product: {
        price: 'मूल्य',
        seller: 'विक्रेता',
        location: 'स्थान',
        contact: 'संपर्क',
        buy: 'अभी खरीदें'
      }
    },
    chatbot: {
      title: 'एग्रोस्कैन सहायक',
      placeholder: 'अपना संदेश यहां टाइप करें...',
      welcome: 'नमस्ते! मैं आपका एआई कृषि सहायक हूं। मैं आपकी कैसे मदद कर सकता हूं? 🌱',
      send: 'भेजें',
      thinking: 'एआई सोच रहा है...'
    },
    // Analyzer page
    analyzer: {
      title: 'फसल रोग निदान',
      subtitle: 'तत्काल एआई-संचालित रोग पहचान और उपचार सिफारिशों के लिए अपनी फसल की छवियां अपलोड करें।',
      upload: {
        title: 'छवि अपलोड करें',
        description: 'अपनी छवि यहां खींचें और छोड़ें या चयन करने के लिए क्लिक करें',
        button: 'छवि चुनें'
      },
      results: {
        title: 'विश्लेषण परिणाम',
        disease: 'पहचाना गया रोग',
        confidence: 'विश्वास स्तर'
      },
      treatment: {
        title: 'अनुशंसित उपचार',
        loading: 'छवि का विश्लेषण और सिफारिशें तैयार की जा रही हैं...'
      },
      errors: {
        invalidFile: 'कृपया एक वैध छवि फ़ाइल चुनें।'
      },
      mockResults: {
        disease: 'पत्ती झुलसा',
        treatment: 'हर 7-10 दिनों में कॉपर-आधारित फफूंदनाशक का प्रयोग करें। अच्छे वायु संचार के लिए पौधों के बीच उचित दूरी सुनिश्चित करें।'
      }
    },
    // Contact page
    contact: {
      title: 'संपर्क करें',
      subtitle: 'किसी भी प्रश्न या सहायता के लिए हमारी टीम से संपर्क करें',
      form: {
        title: 'हमें संदेश भेजें',
        name: 'नाम',
        namePlaceholder: 'अपना नाम दर्ज करें',
        email: 'ईमेल',
        emailPlaceholder: 'अपना ईमेल दर्ज करें',
        subject: 'विषय',
        subjectPlaceholder: 'विषय दर्ज करें',
        message: 'संदेश',
        messagePlaceholder: 'अपना संदेश दर्ज करें',
        submit: 'संदेश भेजें',
        success: 'आपके संदेश के लिए धन्यवाद! हम जल्द ही आपसे संपर्क करेंगे।'
      },
      info: {
        title: 'संपर्क जानकारी',
        address: 'पता',
        email: 'ईमेल',
        phone: 'फोन'
      }
    }
  },
  gu: {
    nav: {
      home: 'હોમ',
      about: 'અમારા વિશે',
      contact: 'સંપર્ક કરો',
      services: 'સેવાઓ',
      marketplace: 'માર્કેટપ્લેસ',
      language: 'ભાષા'
    },
    common: {
      loading: 'લોડ થઈ રહ્યું છે...',
      error: 'એક ભૂલ આવી',
      success: 'સફળ!',
      submit: 'સબમિટ કરો',
      cancel: 'રદ કરો',
      save: 'સાચવો',
      delete: 'કાઢી નાખો',
      edit: 'સંપાદિત કરો',
      view: 'જુઓ',
      search: 'શોધો',
      filter: 'ફિલ્ટર',
      sort: 'સૉર્ટ કરો',
      back: 'પાછા',
      getStarted: 'શરૂ કરો'
    },
    home: {
      hero: {
        title: 'AI સાથે ખેડૂતોને સશક્ત બનાવવા',
        subtitle: 'પાક રોગોનું નિદાન અને સારવાર માર્ગદર્શન મેળવવા માટે પાકની છબીઓ અપલોડ કરો.'
      },
      features: {
        disease: {
          title: 'સ્માર્ટ ઈમેજ ડાયગ્નોસિસ',
          description: 'એડવાન્સ્ડ AI નો ઉપયોગ કરીને સેકન્ડોમાં પાક રોગોનું નિદાન કરો'
        },
        mapping: {
          title: 'GPS રોગ મેપિંગ',
          description: 'રોગ પેટર્ન ટ્રેક કરો અને સમુદાય દેખરેખ સક્ષમ કરો'
        },
        language: {
          title: 'બહુભાષી સપોર્ટ',
          description: 'અંગ્રેજી, હિન્દી અને ગુજરાતીમાં પ્લેટફોર્મનો ઉપયોગ કરો, બધા ખેડૂતો માટે ટેકનોલોજી સુલભ બનાવો.'
        },
        realtime: {
          title: 'રીયલ-ટાઈમ નોટિફિકેશન',
          description: 'સંભવિત રોગ ફાટી નીકળવા વિશે તાત્કાલિક એલર્ટ મેળવો'
        }
      }
    },
    marketplace: {
      title: 'કૃષિ માર્કેટપ્લેસ',
      subtitle: 'ખેડૂતો અને ખરીદદારો સાથે સીધો સંપર્ક કરો',
      categories: {
        all: 'બધા ઉત્પાદનો',
        crops: 'પાકો',
        seeds: 'બીજ',
        equipment: 'સાધનો',
        fertilizers: 'ખાતર'
      },
      product: {
        price: 'કિંમત',
        seller: 'વિક્રેતા',
        location: 'સ્થળ',
        contact: 'સંપર્ક',
        buy: 'હમણાં ખરીદો'
      }
    },
    chatbot: {
      title: 'એગ્રોસ્કેન સહાયક',
      placeholder: 'અહીં તમારો સંદેશ ટાઈપ કરો...',
      welcome: 'નમસ્તે! હું તમારો AI કૃષિ સહાયક છું. હું તમારી કેવી રીતે મદદ કરી શકું? 🌱',
      send: 'મોકલો',
      thinking: 'AI વિચારી રહ્યું છે...'
    },
    // Analyzer page
    analyzer: {
      title: 'પાક રોગ નિદાન',
      subtitle: 'તત્કાલ AI-સંચાલિત રોગ શોધ અને સારવાર ભલામણો માટે તમારા પાકની છબીઓ અપલોડ કરો.',
      upload: {
        title: 'છબી અપલોડ કરો',
        description: 'તમારી છબી અહીં ખેંચો અને છોડો અથવા પસંદ કરવા માટે ક્લિક કરો',
        button: 'છબી પસંદ કરો'
      },
      results: {
        title: 'વિશ્લેષણ પરિણામો',
        disease: 'શોધાયેલ રોગ',
        confidence: 'વિશ્વાસ સ્તર'
      },
      treatment: {
        title: 'ભલામણ કરેલ સારવાર',
        loading: 'છબીનું વિશ્લેષણ અને ભલામણો તૈયાર કરી રહ્યા છીએ...'
      },
      errors: {
        invalidFile: 'કૃપા કરી માન્ય છબી ફાઇલ પસંદ કરો.'
      },
      mockResults: {
        disease: 'પાંદડા બ્લાઇટ',
        treatment: 'દર 7-10 દિવસે કોપર-આધારિત ફૂગનાશક લગાવો. સારી હવાની અવરજવર માટે છોડ વચ્ચે યોગ્ય અંતર રાખો.'
      }
    },
    // Contact page
    contact: {
      title: 'સંપર્ક કરો',
      subtitle: 'કોઈપણ પ્રશ્નો અથવા સહાય માટે અમારી ટીમનો સંપર્ક કરો',
      form: {
        title: 'અમને સંદેશ મોકલો',
        name: 'નામ',
        namePlaceholder: 'તમારું નામ દાખલ કરો',
        email: 'ઈમેલ',
        emailPlaceholder: 'તમારો ઈમેલ દાખલ કરો',
        subject: 'વિષય',
        subjectPlaceholder: 'વિષય દાખલ કરો',
        message: 'સંદેશ',
        messagePlaceholder: 'તમારો સંદેશ દાખલ કરો',
        submit: 'સંદેશ મોકલો',
        success: 'તમારા સંદેશ માટે આભાર! અમે ટૂંક સમયમાં તમારો સંપર્ક કરીશું.'
      },
      info: {
        title: 'સંપર્ક માહિતી',
        address: 'સરનામું',
        email: 'ઈમેલ',
        phone: 'ફોન'
      }
    }
  }
};

// Language utility functions
const i18n = {
  // Get current language
  getCurrentLanguage: () => currentLanguage,

  // Set language
  setLanguage: (lang) => {
    if (translations[lang]) {
      currentLanguage = lang;
      localStorage.setItem('language', lang);
      document.documentElement.setAttribute('lang', lang);
      i18n.updatePageContent();
      return true;
    }
    return false;
  },

  // Get translation
  t: (key) => {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || translations.en[keys[0]]?.[keys[1]] || key;
  },

  // Update all translatable elements on the page
  updatePageContent: () => {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = i18n.t(key);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      element.placeholder = i18n.t(key);
    });
  },

  // Initialize language system
  init: () => {
    // Set initial language
    const savedLang = localStorage.getItem('language');
    if (savedLang && translations[savedLang]) {
      currentLanguage = savedLang;
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (translations[browserLang]) {
        currentLanguage = browserLang;
      }
    }

    document.documentElement.setAttribute('lang', currentLanguage);
    i18n.updatePageContent();
  }
};

// Export for use in other files
window.i18n = i18n;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', i18n.init); 