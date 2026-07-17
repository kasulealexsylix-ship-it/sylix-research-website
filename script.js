(function () {
  'use strict';

  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.getElementById('main-navigation');

  if (menuButton && navigation) {
    menuButton.addEventListener('click', function () {
      const isOpen = navigation.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      const icon = menuButton.querySelector('i');
      if (icon) icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    });

    navigation.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navigation.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation menu');
        const icon = menuButton.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }

  function trackEvent(eventName, parameters) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, parameters || {});
    }
  }

  document.querySelectorAll('[data-event]').forEach(function (element) {
    element.addEventListener('click', function () {
      trackEvent(element.dataset.event, { link_text: element.textContent.trim() });
    });
  });

  document.querySelectorAll('.whatsapp-link').forEach(function (link) {
    link.addEventListener('click', function () {
      trackEvent('whatsapp_click', { link_location: link.closest('section, footer')?.id || link.className });
    });
  });

  document.querySelectorAll('.email-link, a[href^="mailto:"]').forEach(function (link) {
    link.addEventListener('click', function () {
      trackEvent('email_click', { link_location: link.closest('section, footer')?.id || 'website' });
    });
  });

  document.querySelectorAll('.social-links a').forEach(function (link) {
    link.addEventListener('click', function () {
      trackEvent('social_click', { platform: link.getAttribute('aria-label') || 'unknown' });
    });
  });

  document.querySelectorAll('[data-service]').forEach(function (link) {
    link.addEventListener('click', function () {
      const serviceSelect = document.querySelector('select[name="service"]');
      if (serviceSelect) serviceSelect.value = link.dataset.service;
      trackEvent('service_interest', { service_name: link.dataset.service });
    });
  });

  const projectForm = document.getElementById('projectForm');
  const formStatus = document.getElementById('formStatus');

  if (projectForm) {
    projectForm.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!projectForm.checkValidity()) {
        projectForm.reportValidity();
        if (formStatus) formStatus.textContent = 'Please complete all required fields before continuing.';
        trackEvent('lead_form_error', { reason: 'required_fields' });
        return;
      }

      const data = new FormData(projectForm);
      const message = [
        'Hello Sylix Research Consultants, I would like a free consultation about a project.',
        '',
        `Name: ${data.get('name')}`,
        `Phone / WhatsApp: ${data.get('contact')}`,
        `Email: ${data.get('email') || 'Not provided'}`,
        `Country: ${data.get('country') || 'Not provided'}`,
        `Service: ${data.get('service')}`,
        `Current stage: ${data.get('stage') || 'Not specified'}`,
        `Preferred deadline: ${data.get('deadline') || 'Not specified'}`,
        '',
        'Project details:',
        data.get('details') || 'Not specified'
      ].join('\n');

      const whatsappUrl = `https://wa.me/256703336972?text=${encodeURIComponent(message)}`;
      trackEvent('generate_lead', {
        method: 'WhatsApp',
        service: data.get('service'),
        country: data.get('country') || 'Not provided'
      });

      if (formStatus) formStatus.textContent = '';
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  }

  const yearElement = document.getElementById('currentYear');
  if (yearElement) yearElement.textContent = new Date().getFullYear();
})();
