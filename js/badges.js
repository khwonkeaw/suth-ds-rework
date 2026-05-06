/* ========================================
   BADGES & DYNAMIC TAGS INTERACTION
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ดึง Element จากหน้า HTML
  const tagsContainer = document.getElementById('tags-container');
  const newTagBtn = document.getElementById('new-tag-btn');
  const newTagInput = document.getElementById('new-tag-input');

  // ตรวจสอบว่าในหน้านี้มี Component Dynamic Tags หรือไม่
  if (!tagsContainer || !newTagBtn || !newTagInput) return;

  // ข้อมูล Tag เริ่มต้น
  let tags = ['Tag 1', 'Tag 2', 'Tag 3'];

  // ฟังก์ชันวาดแท็กบนหน้าจอ
  function renderTags() {
    tagsContainer.innerHTML = '';
    tags.forEach(tag => {
      const tagEl = document.createElement('span');
      // ใช้คลาส badge ร่วมกับ badge-default
      tagEl.className = 'badge badge-default';
      tagEl.innerHTML = `
        ${tag}
        <span class="badge-close" onclick="removeDynamicTag('${tag}')">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </span>
      `;
      tagsContainer.appendChild(tagEl);
    });
  }

  // ฟังก์ชันลบแท็ก (Global)
  window.removeDynamicTag = function(tagToRemove) {
    tags = tags.filter(t => t !== tagToRemove);
    renderTags();
  };

  // เมื่อกดปุ่ม + New Tag
  newTagBtn.addEventListener('click', () => {
    newTagBtn.style.display = 'none';
    newTagInput.style.display = 'inline-block';
    newTagInput.focus();
  });

  // ฟังก์ชันยืนยันการพิมพ์ Tag ใหม่
  function confirmInput() {
    const val = newTagInput.value.trim();
    if (val && !tags.includes(val)) {
      tags.push(val);
    }
    newTagInput.value = '';
    newTagInput.style.display = 'none';
    newTagBtn.style.display = 'inline-flex';
    renderTags();
  }

  // ดักจับ Event เมื่อพิมพ์เสร็จ
  newTagInput.addEventListener('blur', confirmInput);
  newTagInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') confirmInput();
  });

  // รันครั้งแรก
  renderTags();
});

// Add event listener for badge toggle button
document.addEventListener('DOMContentLoaded', () => {
  const badgeToggleBtn = document.getElementById('badgeToggle');
  if (badgeToggleBtn) {
    badgeToggleBtn.addEventListener('click', toggleBadgeValues);
  }
});

function toggleBadgeValues() {
  const switchBtn = document.getElementById('badgeToggle');
  if (!switchBtn) return;

  const isChecked = switchBtn.classList.toggle('ant-switch-checked');
  const warning = document.getElementById('count-warning');
  const error = document.getElementById('count-error');
  const icon = document.getElementById('count-icon');
  const success = document.getElementById('count-success');

  if (isChecked) {
    if (warning) warning.textContent = '11';
    if (error) error.style.display = 'inline-flex';
    if (icon) icon.style.display = 'inline-flex';
    if (success) success.style.display = 'inline-flex';
  } else {
    if (warning) warning.textContent = '0'; 
    if (error) error.style.display = 'none';
    if (icon) icon.style.display = 'none';
    if (success) success.style.display = 'none';
  }
}

// Make function globally available
window.toggleBadgeValues = toggleBadgeValues;