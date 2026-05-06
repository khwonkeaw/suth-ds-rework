// ========================================
// PASSWORD TOGGLE
// ========================================
function togglePassword(inputId, iconEl) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
    iconEl.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
  } else {
    input.type = 'password';
    iconEl.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
  }
}

// ========================================
// FORM INTERACTIONS
// ========================================
function validateInput(input) {
  const value = input.value.toLowerCase().trim();
  input.classList.remove('is-success', 'is-error');

  if (value === 'success') {
    input.classList.add('is-success');
  } else if (value === 'error') {
    input.classList.add('is-error');
  }
}

function checkPasswordStrength(password) {
  const seg1 = document.getElementById('seg1');
  const seg2 = document.getElementById('seg2');
  const seg3 = document.getElementById('seg3');
  const text = document.getElementById('strengthText');

  // Reset
  [seg1, seg2, seg3].forEach(seg => {
    seg.className = 'password-strength-segment';
  });
  text.className = 'password-strength-text';

  if (!password) {
    text.textContent = 'Enter password';
    return;
  }

  let strength = 0;
  if (password.length >= 6) strength++;
  if (password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password)) strength++;
  if (password.length >= 10 && /[^a-zA-Z0-9]/.test(password)) strength++;

  if (strength === 0) {
    seg1.classList.add('active');
    text.textContent = 'Weak password';
    text.classList.add('weak');
  } else if (strength === 1) {
    seg1.classList.add('active', 'medium');
    seg2.classList.add('active', 'medium');
    text.textContent = 'Medium strength';
    text.classList.add('medium');
  } else {
    seg1.classList.add('active', 'strong');
    seg2.classList.add('active', 'strong');
    seg3.classList.add('active', 'strong');
    text.textContent = 'Strong password';
    text.classList.add('strong');
  }
}

function toggleClearBtn(input) {
  const clearBtn = input.parentElement.querySelector('.input-clear-btn');
  if (clearBtn) {
    clearBtn.style.opacity = input.value ? '1' : '0';
    clearBtn.style.visibility = input.value ? 'visible' : 'hidden';
  }
}

function clearInput(inputId) {
  const input = document.getElementById(inputId);
  if (input) {
    input.value = '';
    input.focus();
    toggleClearBtn(input);
  }
}

function updateCharCounter(textarea, counterId) {
  const counter = document.getElementById(counterId);
  const max = textarea.getAttribute('maxlength');
  const current = textarea.value.length;

  if (counter) {
    counter.textContent = `${current} / ${max}`;
    counter.classList.remove('is-warning', 'is-error');

    const percentage = current / max;
    if (percentage >= 1) {
      counter.classList.add('is-error');
    } else if (percentage >= 0.8) {
      counter.classList.add('is-warning');
    }
  }
}

// ========================================
// NAVBAR FUNCTIONS
// ========================================
function setActiveNav(link) {
  const nav = link.closest('.navbar-nav');
  nav.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  link.classList.add('active');
  showToast(`Navigated to: ${link.textContent}`, 'info');
}