/**
 * Nature Nursery, Indore - Form Validation & Inquiry Handler
 * Provides real-time input validation, error messaging, and clean inquiry routing
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Contact & Inquiry Forms Validation ---
  const formsToValidate = document.querySelectorAll('.nature-validate-form');

  formsToValidate.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Full Name validation
      const nameInput = form.querySelector('[name="full_name"]');
      const nameError = form.querySelector('.feedback-name');
      if (nameInput) {
        if (nameInput.value.trim().length < 2) {
          showError(nameInput, nameError, 'Please enter your full name (minimum 2 characters).');
          isValid = false;
        } else {
          clearError(nameInput, nameError);
        }
      }

      // Phone / Contact No validation (Indian 10-digit number or international with +)
      const phoneInput = form.querySelector('[name="contact_no"]');
      const phoneError = form.querySelector('.feedback-phone');
      if (phoneInput) {
        const phoneClean = phoneInput.value.replace(/[\s-]/g, '');
        const phoneRegex = /^(\+91|0)?[6-9]\d{9}$/;
        if (!phoneRegex.test(phoneClean)) {
          showError(phoneInput, phoneError, 'Please enter a valid 10-digit mobile number.');
          isValid = false;
        } else {
          clearError(phoneInput, phoneError);
        }
      }

      // Email validation (optional or valid format)
      const emailInput = form.querySelector('[name="email"]');
      const emailError = form.querySelector('.feedback-email');
      if (emailInput && emailInput.value.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
          showError(emailInput, emailError, 'Please enter a valid email address.');
          isValid = false;
        } else {
          clearError(emailInput, emailError);
        }
      } else if (emailError) {
        clearError(emailInput, emailError);
      }

      // Message validation
      const msgInput = form.querySelector('[name="message"]');
      const msgError = form.querySelector('.feedback-message');
      if (msgInput) {
        if (msgInput.value.trim().length < 5) {
          showError(msgInput, msgError, 'Please share a brief note about what you are looking for.');
          isValid = false;
        } else {
          clearError(msgInput, msgError);
        }
      }

      // If valid, show success state & offer WhatsApp send
      if (isValid) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send Inquiry';
        
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Sending...';
        }

        setTimeout(() => {
          const successBox = form.querySelector('.form-submission-success');
          if (successBox) {
            successBox.style.display = 'block';
            form.querySelectorAll('.custom-form-group, .form-actions-wrapper').forEach(el => el.style.display = 'none');
          } else {
            alert('Thank you for reaching out to Nature Nursery! Our team will contact you shortly.');
            form.reset();
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalBtnText;
            }
          }

          // Optional: Prompt direct WhatsApp transmission
          const plantItem = form.querySelector('[name="plant_name"]')?.value || '';
          const clientName = nameInput ? nameInput.value.trim() : 'Customer';
          const clientPhone = phoneInput ? phoneInput.value.trim() : '';
          const clientMsg = msgInput ? msgInput.value.trim() : '';
          
          const waMessage = `*New Website Inquiry - Nature Nursery*\n*Name:* ${clientName}\n*Phone:* ${clientPhone}${plantItem ? `\n*Interested In:* ${plantItem}` : ''}\n*Message:* ${clientMsg}`;
          const waUrl = `https://wa.me/919165585858?text=${encodeURIComponent(waMessage)}`;

          const waLinkHolder = form.querySelector('.wa-quick-redirect');
          if (waLinkHolder) {
            waLinkHolder.href = waUrl;
            waLinkHolder.style.display = 'inline-flex';
          }
        }, 600);
      }
    });
  });

  function showError(inputEl, errorEl, message) {
    if (inputEl) {
      inputEl.style.borderColor = '#dc3545';
      inputEl.setAttribute('aria-invalid', 'true');
    }
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('error');
    }
  }

  function clearError(inputEl, errorEl) {
    if (inputEl) {
      inputEl.style.borderColor = '';
      inputEl.removeAttribute('aria-invalid');
    }
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('error');
    }
  }
});
