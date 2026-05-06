// ========================================
// TOAST NOTIFICATIONS
// ========================================
function showToast(message, type = 'success', title = '') {
  // Toast notifications disabled
  return;

  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const iconSvgs = {
    success: '<svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--success-600)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    error: '<svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--error-600)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
    warning: '<svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--warning-600)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    info: '<svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--info-600)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
  };

  const titles = {
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    info: 'Information'
  };

  toast.innerHTML = `
        ${iconSvgs[type]}
        <div class="toast-content">
          ${title || titles[type] ? `<div class="toast-title">${title || titles[type]}</div>` : ''}
          <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">×</button>
      `;

  container.appendChild(toast);

  // Auto remove after 4 seconds
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ========================================
// ALERT FUNCTIONS
// ========================================
function dismissAlert(id) {
  const alert = document.getElementById(id);
  alert.style.opacity = '0';
  alert.style.transform = 'translateX(20px)';
  setTimeout(() => alert.style.display = 'none', 300);
}

function showLiveAlert(type) {
  const container = document.getElementById('liveAlertContainer');
  const id = 'liveAlert' + Date.now();

  const alerts = {
    success: { title: 'Success', message: 'Operation completed successfully.', class: 'alert-success' },
    warning: { title: 'Warning', message: 'Please review your input before continuing.', class: 'alert-warning' },
    error: { title: 'Error', message: 'Something went wrong. Please try again.', class: 'alert-error' },
    info: { title: 'Information', message: 'This is an informational message.', class: 'alert-info' }
  };

  const iconSvgs = {
    success: '<svg class="alert-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>',
    warning: '<svg class="alert-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>',
    error: '<svg class="alert-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" /></svg>',
    info: '<svg class="alert-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg>'
  };

  const alert = alerts[type];
  const div = document.createElement('div');
  div.className = `alert ${alert.class}`;
  div.id = id;
  div.innerHTML = `
        ${iconSvgs[type]}
        <div class="alert-content">
          <div class="alert-title">${alert.title}</div>
          ${alert.message}
        </div>
        <button class="alert-close" onclick="dismissAlert('${id}')">×</button>
      `;

  container.appendChild(div);

  // Auto dismiss
  setTimeout(() => dismissAlert(id), 5000);
}