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
    link.addEventListener('click', function (e) {
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
    // Skip scripts with src (external scripts are already loaded in main HTML)
    if (script.src) {
      return;
    }
    // Only execute inline scripts
    const inlineScript = document.createElement('script');
    inlineScript.textContent = script.textContent;
    document.body.appendChild(inlineScript);
    document.body.removeChild(inlineScript);
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