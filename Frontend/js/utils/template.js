// Template loader utility

class TemplateLoader {
  static async loadTemplate(templatePath) {
    try {
      const response = await fetch(templatePath);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.text();
    } catch (error) {
      console.error('Error loading template:', error);
      return '';
    }
  }

  static async loadTemplates() {
    // Load head content
    const headTemplate = await this.loadTemplate('/Frontend/templates/head.html');
    const headContent = document.head.innerHTML;
    document.head.innerHTML = headTemplate + headContent;

    // Load header
    const headerTemplate = await this.loadTemplate('/Frontend/templates/header.html');
    const headerContainer = document.getElementById('headerContainer');
    if (headerContainer) {
      headerContainer.innerHTML = headerTemplate;
    }

    // Load footer
    const footerTemplate = await this.loadTemplate('/Frontend/templates/footer.html');
    const footerContainer = document.getElementById('footerContainer');
    if (footerContainer) {
      footerContainer.innerHTML = footerTemplate;
    }

    // Initialize language system after templates are loaded
    if (window.i18n) {
      window.i18n.updatePageContent();
    }

    // Initialize language switcher after templates are loaded
    if (window.LanguageSwitcher) {
      const languageSwitcher = new LanguageSwitcher();
      languageSwitcher.init();
    }
  }
}

// Load templates when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  TemplateLoader.loadTemplates();
}); 