// ========================================
    // DATATABLES INITIALIZATION
    // ========================================
    $(document).ready(function() {
      // Initialize DataTable if element exists
      if ($('#datatable-demo').length) {
        $('#datatable-demo').DataTable({
          pageLength: 5,
          lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
          language: {
            search: "🔍 Search:",
            lengthMenu: "Show _MENU_ entries",
            info: "Showing _START_ to _END_ of _TOTAL_ entries",
            infoEmpty: "Showing 0 to 0 of 0 entries",
            infoFiltered: "(filtered from _MAX_ total entries)",
            paginate: {
              first: "First",
              previous: "← Previous",
              next: "Next →",
              last: "Last"
            },
            zeroRecords: "No matching records found",
            emptyTable: "No data available in table"
          },
          responsive: true,
          columnDefs: [
            { orderable: false, targets: [5] } // Disable sorting on Actions column
          ]
        });
      }
    });
    
    // ========================================
    // SIDEBAR FUNCTIONS
    // ========================================
    function toggleSidebar() {
      const sidebar = document.getElementById('sidebar');
      const overlay = document.getElementById('sidebarOverlay');
      sidebar.classList.toggle('active');
      overlay.classList.toggle('active');
    }
    
    function closeSidebar() {
      const sidebar = document.getElementById('sidebar');
      const overlay = document.getElementById('sidebarOverlay');
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
    }
    
    // ========================================
    // FONT SWITCHING
    // ========================================
    function changeFont(font) {
      const root = document.documentElement;
      if (font === 'sut') {
        root.style.setProperty('--font-base', "'SUT', 'Anuphan', sans-serif");
      } else {
        root.style.setProperty('--font-base', "'Anuphan', sans-serif");
      }
      showToast(`Font changed to ${font === 'sut' ? 'SUT' : 'Anuphan'}`, 'success');
    }
    
    // ========================================
    // THEME TOGGLE
    // ========================================
    
    function toggleTheme() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
      
      showToast(`Switched to ${newTheme} mode`, 'success');
    }
    
    function updateThemeIcon(theme) {
      const themeIconEl = document.getElementById('themeIcon');
      if (!themeIconEl) return;
      if (theme === 'dark') {
        themeIconEl.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
      } else {
        themeIconEl.innerHTML = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
      }
    }
    
    // Detect system preference
    if (!localStorage.getItem('theme')) {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
      }
    }
    
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
    // COPY FUNCTIONS
    // ========================================
    async function copyCode(elementId) {
      const code = document.getElementById(elementId).textContent;
      try {
        await navigator.clipboard.writeText(code);
        showToast('Code copied to clipboard!', 'success');
      } catch (err) {
        showToast('Failed to copy code', 'error');
      }
    }
    
    async function copyText(text) {
      try {
        await navigator.clipboard.writeText(text);
        showToast(`Copied ${text}`, 'success');
      } catch (err) {
        showToast('Failed to copy', 'error');
      }
    }
    
    function copyColor(element, color) {
      copyText(color);
      element.classList.add('copied');
      setTimeout(() => element.classList.remove('copied'), 2000);
    }
    
    // ========================================
    // MODAL FUNCTIONS
    // ========================================
    function openModal(id) {
      const modal = document.getElementById(id);
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    
    function closeModal(id) {
      const modal = document.getElementById(id);
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    function closeModalOnOverlay(event, id) {
      if (event.target === event.currentTarget) {
        closeModal(id);
      }
    }
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.demo-modal-overlay.active').forEach(modal => {
          modal.classList.remove('active');
        });
        document.body.style.overflow = '';
      }
    });
    
    // ========================================
    // TAB FUNCTIONS
    // ========================================
    function switchTab(btn, tabId) {
      if (btn.disabled) return;
      
      const tabs = btn.closest('.tabs');
      tabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      tabs.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      
      btn.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    }
    
    // ========================================
    // ACCORDION FUNCTIONS
    // ========================================
    function toggleAccordion(header) {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      
      // Optional: Close all others (accordion behavior)
      // item.parentElement.querySelectorAll('.accordion-item').forEach(i => {
      //   i.classList.remove('active');
      // });
      
      // Toggle current
      item.classList.toggle('active', !isActive);
    }
    
    // ========================================
    // BUTTON GROUP FUNCTIONS
    // ========================================
    function setActiveBtn(btn) {
      const group = btn.closest('.btn-group');
      if (group) {
        group.querySelectorAll('.btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
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
    
    // ========================================
    // PAGINATION FUNCTIONS
    // ========================================
    function changePage(btn, action) {
      const pagination = btn.closest('.pagination');
      const buttons = pagination.querySelectorAll('.pagination-btn:not([disabled])');
      const activeBtn = pagination.querySelector('.pagination-btn.active');
      
      if (action === 'prev' || action === 'next') {
        // Handle prev/next
        showToast(`${action === 'prev' ? 'Previous' : 'Next'} page`, 'info');
      } else {
        // Handle number click
        pagination.querySelectorAll('.pagination-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        showToast(`Page ${action}`, 'info');
      }
    }
    
    // ========================================
    // TABLE FUNCTIONS
    // ========================================
    function toggleAllCheckboxes(master) {
      const checkboxes = document.querySelectorAll('.row-checkbox');
      checkboxes.forEach(cb => cb.checked = master.checked);
      const count = master.checked ? checkboxes.length : 0;
      if (count > 0) {
        showToast(`${count} rows selected`, 'info');
      }
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
        success: { title: 'Success!', message: 'Operation completed successfully.', class: 'alert-success' },
        warning: { title: 'Warning!', message: 'Please review your input before continuing.', class: 'alert-warning' },
        error: { title: 'Error!', message: 'Something went wrong. Please try again.', class: 'alert-error' },
        info: { title: 'Information', message: 'This is an informational message.', class: 'alert-info' }
      };
      
      const iconSvgs = {
        success: '<svg class="alert-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
        warning: '<svg class="alert-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
        error: '<svg class="alert-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
        info: '<svg class="alert-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
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
    // SKELETON TOGGLE
    // ========================================
    function toggleSkeleton(checkbox) {
      const skeletonCard = document.getElementById('skeletonCard');
      const contentCard = document.getElementById('contentCard');
      
      if (checkbox.checked) {
        skeletonCard.classList.remove('hidden');
        contentCard.classList.add('hidden');
      } else {
        skeletonCard.classList.add('hidden');
        contentCard.classList.remove('hidden');
      }
    }
    
    // ========================================
    // SIDEBAR SEARCH
    // ========================================
    function searchComponents() {
      const input = document.getElementById('sidebarSearch');
      const filter = input.value.toLowerCase();
      const links = document.querySelectorAll('.ds-nav-link');
      
      links.forEach(link => {
        const text = link.textContent.toLowerCase();
        const section = link.closest('.ds-nav-section');
        
        if (text.includes(filter)) {
          link.style.display = '';
          section.style.display = '';
        } else {
          link.style.display = 'none';
        }
        
        // Check if section has visible links
        const visibleLinks = section.querySelectorAll('.ds-nav-link:not([style*="none"])');
        if (visibleLinks.length === 0 && filter !== '') {
          section.style.display = 'none';
        } else {
          section.style.display = '';
        }
      });
    }
    
    // ========================================
    // SCROLL FUNCTIONS
    // ========================================
    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
      const scrollTop = document.getElementById('scrollTop');
      if (window.scrollY > 300) {
        scrollTop.classList.add('visible');
      } else {
        scrollTop.classList.remove('visible');
      }
    });
    
    // ========================================
    // ACTIVE NAVIGATION HIGHLIGHTING
    // ========================================
    function highlightActiveSection() {
      const sections = document.querySelectorAll('.ds-section');
      const navLinks = document.querySelectorAll('.ds-nav-link');
      
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    }
    
    window.addEventListener('scroll', highlightActiveSection);
    
    // ========================================
    // SMOOTH SCROLL FOR NAV LINKS
    // ========================================
    function bindNavLinks() {
      document.querySelectorAll('.ds-nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
          if (this.getAttribute('target') === '_blank') {
            return; // External or new-tab links should work normally
          }

          const href = this.getAttribute('href') || '';
          if (!href.startsWith('#')) {
            return;
          }

          e.preventDefault();
          const pageName = href.substring(1);
          const target = document.getElementById(pageName);

          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            closeSidebar();
            return;
          }

          if (pageName) {
            window.location.hash = pageName;
          }
        });
      });
    }

    function getPageFromHash() {
      const hash = window.location.hash.replace(/^#/, '').trim();
      return hash || 'introduction';
    }

    function executePageScripts(doc) {
      const scripts = Array.from(doc.querySelectorAll('script'));

      scripts.forEach(script => {
        if (script.src) {
          const src = script.src;
          if (!document.querySelector(`script[src="${src}"]`)) {
            const newScript = document.createElement('script');
            newScript.src = src;
            newScript.async = false;
            document.body.appendChild(newScript);
          }
        } else {
          const inlineScript = document.createElement('script');
          inlineScript.textContent = script.textContent;
          document.body.appendChild(inlineScript);
          document.body.removeChild(inlineScript);
        }
      });
    }

    function updateActiveNav(pageName) {
      document.querySelectorAll('.ds-nav-link').forEach(link => {
        if (link.getAttribute('href') === `#${pageName}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }

    async function loadLayoutFragment(targetId, path) {
      const container = document.getElementById(targetId);
      if (!container) {
        console.warn(`Layout placeholder missing: ${targetId}`);
        return { targetId, status: 'missing' };
      }

      try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Failed to load ${path} (${response.status})`);
        const html = await response.text();
        container.innerHTML = html;
        return { targetId, status: 'fulfilled', path };
      } catch (error) {
        console.warn(`Failed loading fragment ${path}:`, error);
        container.innerHTML = `<div class="layout-error" style="padding: 18px; border: 1px solid #f0ad4e; background: #fff8e5; color: #6a4d14; border-radius: 8px; margin: 12px 0;">Unable to load layout section: ${targetId}</div>`;
        return { targetId, status: 'rejected', error };
      }
    }

    async function loadPage(pageName) {
      const pageContent = document.getElementById('pageContent');
      if (!pageContent) return;

      const pagePath = `pages/${pageName}.html`;
      pageContent.innerHTML = `
        <div class="ds-section">
          <div class="ds-section-header">
            <div>
              <h2 class="ds-section-title">กำลังโหลด...</h2>
              <p class="ds-section-desc">กำลังดึงหน้า ${pageName} จากโฟลเดอร์ pages</p>
            </div>
          </div>
        </div>
      `;

      try {
        const response = await fetch(pagePath);
        if (!response.ok) throw new Error(`Page not found: ${pagePath}`);

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const titleTag = doc.querySelector('title');
        if (titleTag) {
          document.title = titleTag.textContent;
        }

        const main = doc.querySelector('main.ds-main') || doc.body;
        pageContent.innerHTML = main ? main.innerHTML : doc.body.innerHTML;
        pageContent.querySelectorAll('script').forEach(script => script.remove());
        executePageScripts(doc);
        bindNavLinks();
        updateActiveNav(pageName);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        console.error(error);
        pageContent.innerHTML = `
          <div class="ds-section">
            <div class="ds-section-header">
              <div>
                <h2 class="ds-section-title">ไม่พบหน้าที่ร้องขอ</h2>
                <p class="ds-section-desc">ไม่สามารถโหลดหน้า <strong>${pageName}</strong> จากโฟลเดอร์ pages ได้</p>
              </div>
            </div>
          </div>
        `;
      }
    }

    async function loadLayoutFragments() {
  return [];
}

    function initializeLayout() {
      const savedTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', savedTheme);
      updateThemeIcon(savedTheme);
      bindNavLinks();
      updateActiveNav(getPageFromHash());
    }

    document.addEventListener('DOMContentLoaded', () => {
      if (window.location.protocol === 'file:') {
        console.warn('Local file protocol detected. Use a local HTTP server to load HTML fragments reliably.');
      }

      loadLayoutFragments()
        .then(results => {
          const failures = results.filter(result => result.status === 'rejected');
          if (failures.length > 0) {
            console.warn('Some layout fragments failed to load:', failures);
          }
          initializeLayout();
          bindNavLinks();
          loadPage(getPageFromHash());
        })
        .catch(error => {
          console.error('Unexpected layout initialization error:', error);
          initializeLayout();
          loadPage(getPageFromHash());
        });
    });

    window.addEventListener('hashchange', () => {
      loadPage(getPageFromHash());
    });

//=========================================
// หุบsidebarสำหรับมือถือ ไอแพด
//========================================= 
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  sidebar.classList.toggle('active');
  overlay.classList.toggle('active');
}

function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  
  // ปิดเมนู[cite: 5]
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
}