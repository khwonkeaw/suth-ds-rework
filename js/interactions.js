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
