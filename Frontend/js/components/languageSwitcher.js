// Language Switcher Component

class LanguageSwitcher {
  constructor(containerId = 'languageSwitcher') {
    this.container = document.getElementById(containerId);
    this.languages = [
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
      { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' }
    ];
  }

  init() {
    if (!this.container) {
      console.error('Language switcher container not found!');
      return;
    }

    // Wait for i18n to be available
    if (!window.i18n) {
      console.error('i18n not initialized!');
      return;
    }

    this.render();
    this.attachEventListeners();
    this.updateActiveLanguage();
  }

  render() {
    const currentLang = window.i18n.getCurrentLanguage();
    const currentLangData = this.languages.find(l => l.code === currentLang);
    
    // Create the language menu button
    const button = document.createElement('button');
    button.className = 'language-btn';
    button.innerHTML = `
      <span class="current-lang">
        ${currentLangData?.flag || '🌐'}
        ${currentLangData?.name || 'Language'}
      </span>
      <span class="arrow">▼</span>
    `;

    // Create the dropdown menu
    const dropdown = document.createElement('div');
    dropdown.className = 'language-dropdown';
    
    dropdown.innerHTML = this.languages.map(lang => `
      <button class="lang-option ${lang.code === currentLang ? 'active' : ''}" data-lang="${lang.code}">
        <span class="flag">${lang.flag}</span>
        <span class="lang-name">${lang.name}</span>
      </button>
    `).join('');

    // Clear and update container
    this.container.innerHTML = '';
    this.container.appendChild(button);
    this.container.appendChild(dropdown);
  }

  attachEventListeners() {
    // Toggle dropdown
    const button = this.container.querySelector('.language-btn');
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      this.container.classList.toggle('active');
    });

    // Language selection
    const options = this.container.querySelectorAll('.lang-option');
    options.forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const lang = e.currentTarget.dataset.lang;
        window.i18n.setLanguage(lang);
        this.updateActiveLanguage();
        this.container.classList.remove('active');
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.container.contains(e.target)) {
        this.container.classList.remove('active');
      }
    });
  }

  updateActiveLanguage() {
    const currentLang = window.i18n.getCurrentLanguage();
    const currentLangData = this.languages.find(l => l.code === currentLang);
    
    // Update button text
    const button = this.container.querySelector('.current-lang');
    if (button && currentLangData) {
      button.innerHTML = `${currentLangData.flag} ${currentLangData.name}`;
    }

    // Update active state in dropdown
    const options = this.container.querySelectorAll('.lang-option');
    options.forEach(option => {
      option.classList.toggle('active', option.dataset.lang === currentLang);
    });
  }
}

// Export for use in other files
window.LanguageSwitcher = LanguageSwitcher;

// Initialize when DOM is loaded and after i18n is initialized
document.addEventListener('DOMContentLoaded', () => {
  // Wait for i18n to be initialized
  const initLanguageSwitcher = () => {
    if (window.i18n) {
      const languageSwitcher = new LanguageSwitcher();
      languageSwitcher.init();
    } else {
      // Retry after a short delay if i18n is not yet available
      setTimeout(initLanguageSwitcher, 100);
    }
  };
  
  initLanguageSwitcher();
}); 