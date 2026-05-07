/* ========================================
   SUTH Design System - Badges JavaScript
   (รองรับ Dynamic Loading / Event Delegation)
   ======================================== */

// 1. ดักจับการ "คลิก" ทุกอย่างในหน้าเว็บ
document.addEventListener('click', function(e) {

  // --- ส่วนที่ 1: Toggle Standalone Badges ---
  const toggleBtn = e.target.closest('#badgeToggle');
  if (toggleBtn) {
    e.preventDefault(); 
    const isChecked = toggleBtn.classList.toggle('ant-switch-checked');
    
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
    return; 
  }

  // --- ส่วนที่ 2: กดลบ Tag (x) ---
  const closeIcon = e.target.closest('.badge-close-icon');
  if (closeIcon) {
    const tagToRemove = closeIcon.closest('.badge');
    if (tagToRemove) tagToRemove.remove();
    return;
  }

  // --- ส่วนที่ 3: กดปุ่ม + New Tag ---
  const btnNewTag = e.target.closest('#btn-new-tag');
  if (btnNewTag) {
    const inputNewTag = document.getElementById('input-new-tag');
    if (inputNewTag) {
      btnNewTag.style.display = 'none';
      inputNewTag.style.display = 'inline-block';
      inputNewTag.focus();
    }
    return;
  }
});


// 2. ดักจับการกดปุ่ม "Enter" ที่ช่องกรอกข้อความ
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && e.target.id === 'input-new-tag') {
    const input = e.target;
    const value = input.value.trim();
    const container = document.getElementById('tags-container');
    const btnNewTag = document.getElementById('btn-new-tag');

    // ถ้าพิมพ์ข้อความมา ให้สร้างแท็กใหม่
    if (value !== '' && container && btnNewTag) {
      const newTag = document.createElement('span');
      newTag.className = 'badge badge-default d-inline-flex align-items-center';
      newTag.innerHTML = `
        ${value}
        <span class="badge-close-icon">
          <svg viewBox="64 64 896 896" width="10" height="10" fill="currentColor"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>
        </span>
      `;
      container.insertBefore(newTag, btnNewTag);
    }

    // ซ่อนช่อง Input หลังจากพิมพ์เสร็จ
    input.style.display = 'none';
    input.value = '';
    if (btnNewTag) btnNewTag.style.display = 'inline-flex';
  }
});


// 3. ดักจับเมื่อคลิกออกนอกช่อง (Blur)
document.addEventListener('blur', function(e) {
  if (e.target.id === 'input-new-tag') {
    const input = e.target;
    const btnNewTag = document.getElementById('btn-new-tag');
    
    input.style.display = 'none';
    input.value = '';
    if (btnNewTag) btnNewTag.style.display = 'inline-flex';
  }
}, true); 


// ==========================================
// 4. Fallback (ตัวป้องกัน Error)
// ป้องกันการแจ้งเตือน Error ใน Console หากไฟล์ HTML ที่ถูกดึงมายังมี onclick ค้างอยู่
// ==========================================
window.toggleBadgeValues = function() {};
window.showTagInput = function() {};