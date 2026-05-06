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