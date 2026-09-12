/**
 * Nature Nursery, Indore - Main JavaScript
 * Handling navigation, interactive plant filters, dynamic WhatsApp links, and modals
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Constants & Config ---
  const WHATSAPP_NUMBER = '919165585858';
  const NURSERY_NAME = 'Nature Nursery, Indore';

  // --- Sticky Header Shadow on Scroll ---
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  });

  // --- Mobile Navigation Drawer Toggle ---
  const mobileToggles = document.querySelectorAll('.mobile-nav-toggle');
  const navDrawer = document.querySelector('.site-nav-menu');
  const navBackdrop = document.querySelector('.nav-backdrop');
  const drawerCloses = document.querySelectorAll('.nav-drawer-close');

  function openMobileMenu() {
    navDrawer?.classList.add('active');
    navBackdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    navDrawer?.classList.remove('active');
    navBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      openMobileMenu();
    });
  });

  drawerCloses.forEach(closeBtn => {
    closeBtn.addEventListener('click', closeMobileMenu);
  });

  navBackdrop?.addEventListener('click', closeMobileMenu);

  document.querySelectorAll('.site-nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
      closeModal();
      closeLightbox();
    }
  });

  // --- Back to Top Button ---
  const backToTopBtn = document.getElementById('backToTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTopBtn?.classList.add('show');
    } else {
      backToTopBtn?.classList.remove('show');
    }
  });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- Category & Gallery Filter Tabs ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const filterableItems = document.querySelectorAll('[data-category]');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const targetFilter = button.getAttribute('data-filter');

      filterableItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (targetFilter === 'all' || itemCategory === targetFilter || (itemCategory && itemCategory.includes(targetFilter))) {
          item.style.display = '';
          item.classList.add('fade-in-item');
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // --- Quick Enquiry Modal ---
  const enquiryModal = document.getElementById('enquiryModal');
  const enquiryItemInput = document.getElementById('modalPlantName');
  const enquiryModalClose = document.getElementById('closeModalBtn');
  const modalTriggers = document.querySelectorAll('.trigger-enquiry-modal');

  function openModal(itemName) {
    if (enquiryModal) {
      if (enquiryItemInput) {
        enquiryItemInput.value = itemName || 'General Nursery Enquiry';
      }
      enquiryModal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (enquiryModal) {
      enquiryModal.classList.remove('show');
      document.body.style.overflow = '';
    }
  }

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const itemName = trigger.getAttribute('data-plant-name') || trigger.getAttribute('data-service-name') || '';
      openModal(itemName);
    });
  });

  enquiryModalClose?.addEventListener('click', closeModal);
  enquiryModal?.addEventListener('click', (e) => {
    if (e.target === enquiryModal) {
      closeModal();
    }
  });

  // --- Direct WhatsApp Order/Inquiry Helper ---
  document.querySelectorAll('.btn-whatsapp-direct').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const plantName = btn.getAttribute('data-plant-name') || 'Plants';
      const plantPrice = btn.getAttribute('data-plant-price') ? ` (Price: ${btn.getAttribute('data-plant-price')})` : '';
      const message = `Hello Nature Nursery Indore, I am interested in ordering/inquiring about: *${plantName}*${plantPrice}. Please share current availability and delivery details.`;
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');
    });
  });

  // --- Image Lightbox Modal (for gallery) ---
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('closeLightboxBtn');

  function openLightbox(src, title) {
    if (lightboxModal && lightboxImg) {
      lightboxImg.src = src;
      lightboxImg.alt = title || 'Nature Nursery Gallery';
      if (lightboxCaption) {
        lightboxCaption.textContent = title || 'Nature Nursery Grounds & Plant Collection';
      }
      lightboxModal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('show');
      document.body.style.overflow = '';
    }
  }

  document.querySelectorAll('.gallery-grid-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-overlay-title')?.textContent || img?.alt;
      if (img) {
        openLightbox(img.src, title);
      }
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });
});
