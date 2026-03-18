/* ============================================
   RESTAURANTE BARRIO DE JALATLACO
   Bilingual Toggle, Scroll Effects, Mobile Menu
   ============================================ */

(function () {
  'use strict';

  // ---- State ----
  let currentLang = 'es';
  let lastScrollY = 0;

  // ---- DOM refs ----
  const header = document.getElementById('header');
  const langToggle = document.getElementById('langToggle');
  const langToggleMobile = document.getElementById('langToggleMobile');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const htmlEl = document.documentElement;

  // ---- Bilingual Toggle ----
  function setLanguage(lang) {
    currentLang = lang;
    htmlEl.setAttribute('lang', lang);

    // Update all elements with data-es / data-en
    document.querySelectorAll('[data-es][data-en]').forEach(function (el) {
      el.textContent = el.getAttribute('data-' + lang);
    });

    // Update toggle buttons
    if (langToggle) {
      langToggle.textContent = lang === 'es' ? 'EN' : 'ES';
      langToggle.setAttribute('aria-label', lang === 'es' ? 'Switch to English' : 'Cambiar a Español');
    }
    if (langToggleMobile) {
      langToggleMobile.textContent = lang === 'es' ? 'English' : 'Español';
    }
  }

  function toggleLanguage() {
    setLanguage(currentLang === 'es' ? 'en' : 'es');
  }

  if (langToggle) langToggle.addEventListener('click', toggleLanguage);
  if (langToggleMobile) langToggleMobile.addEventListener('click', function () {
    toggleLanguage();
    closeMobileMenu();
  });

  // ---- Mobile Menu ----
  function openMobileMenu() {
    mobileMenu.classList.add('active');
    mobileMenu.setAttribute('aria-hidden', 'false');
    mobileMenuBtn.classList.add('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenuBtn.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.contains('active');
      if (isOpen) closeMobileMenu();
      else openMobileMenu();
    });
  }

  // Close mobile menu on nav link click
  document.querySelectorAll('.mobile-menu__link').forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  // ---- Scroll: Header show/hide ----
  function onScroll() {
    var scrollY = window.scrollY;

    // Show/hide header
    if (scrollY > 80) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }

    if (scrollY > lastScrollY && scrollY > 400) {
      header.classList.add('header--hidden');
    } else {
      header.classList.remove('header--hidden');
    }

    lastScrollY = scrollY;
  }

  var scrollTicking = false;
  window.addEventListener('scroll', function () {
    if (!scrollTicking) {
      requestAnimationFrame(function () {
        onScroll();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  // ---- Scroll Reveal ----
  function initScrollReveal() {
    var revealEls = document.querySelectorAll(
      '.about__label, .about__heading, .about__body, .about__accent-block, ' +
      '.menu-section__label, .menu-section__title, .menu-card, ' +
      '.reservar__title, .reservar__text, ' +
      '.location__label, .location__title, .location__address, .hours, .location__map'
    );

    revealEls.forEach(function (el) {
      el.classList.add('reveal');
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -20px 0px'
    });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ---- Stagger menu cards ----
  function staggerMenuCards() {
    var cards = document.querySelectorAll('.menu-card');
    cards.forEach(function (card, i) {
      card.style.transitionDelay = (i * 0.08) + 's';
    });
  }

  // ---- Init ----
  document.addEventListener('DOMContentLoaded', function () {
    initScrollReveal();
    staggerMenuCards();
  });

  // Close mobile menu on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMobileMenu();
      mobileMenuBtn.focus();
    }
  });

})();
