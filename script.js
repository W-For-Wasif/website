// Portfolio JavaScript
document.addEventListener('DOMContentLoaded', () => {
  [initThemeToggle, initSmoothScroll, initProgressBars, initSkillsAnimation, 
   initTableSorting, initSearchFunction, initCVViewer, initContactForm, 
   initSocialIconUpdate, initSkillIconUpdate].forEach(fn => fn());
});

function initThemeToggle() {
  const btn = document.getElementById('themeToggle'),
        icon = btn?.querySelector('i');
  if (!btn) return;
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    icon.className = 'fas fa-sun';
  }
  btn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) window.scrollTo({top: target.offsetTop - 80, behavior: 'smooth'});
    });
  });
}

function initProgressBars() {
  document.querySelectorAll('.progress-bar').forEach(bar => {
    bar.style.width = bar.getAttribute('data-percent') + '%';
  });
}

function initSkillsAnimation() {
  document.querySelectorAll('.skill-percent').forEach(skill => {
    const target = parseInt(skill.textContent);
    skill.textContent = '0%';
    let current = 0;
    const timer = setInterval(() => {
      current += 5;
      skill.textContent = current + '%';
      if (current >= target) {
        skill.textContent = target + '%';
        clearInterval(timer);
      }
    }, 50);
  });
}

function initTableSorting() {
  let sortDir = true;
  window.sortTable = col => {
    const table = document.getElementById('academicTable'),
          rows = Array.from(table.querySelectorAll('tr'));
    rows.sort((a, b) => sortDir ? 
      a.children[col].textContent.localeCompare(b.children[col].textContent) : 
      b.children[col].textContent.localeCompare(a.children[col].textContent));
    rows.forEach(row => table.appendChild(row));
    sortDir = !sortDir;
  };
}

function initSearchFunction() {
  document.getElementById('search')?.addEventListener('input', function() {
    const filter = this.value.toLowerCase();
    document.querySelectorAll('#academicTable tr').forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(filter) ? '' : 'none';
    });
  });
}

function initCVViewer() {
  const viewCVBtn = document.getElementById("viewCVBtn");
  const cvViewer = document.getElementById("cvViewer");
  if (!viewCVBtn || !cvViewer) return;
  
  viewCVBtn.addEventListener("click", function() {
    cvViewer.innerHTML = `<iframe src="cv.pdf" width="100%" height="600px" style="border: none;"></iframe>`;
  });
}

function initContactForm() {
  document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert(`✅ Message Sent!\nDear ${this.querySelector('#name').value}, your message has been submitted.\nI'll contact you soon.`);
    this.reset();
  });
}

function initSocialIconUpdate() {
  document.querySelectorAll('.social-link').forEach(link => {
    const icon = link.querySelector('i');
    if (icon?.classList.contains('fa-tiktok')) {
      icon.className = 'fab fa-instagram';
      const txt = link.querySelector('span') || link.lastChild;
      if (txt?.nodeType === Node.TEXT_NODE && txt.textContent.includes('TikTok')) {
        txt.textContent = ' Instagram';
      }
    }
  });
}

function initSkillIconUpdate() {
  document.querySelectorAll('.skill-item').forEach(item => {
    const skillName = item.querySelector('.skill-name');
    if (skillName?.textContent.includes('Spoken English')) {
      const icon = skillName.querySelector('i');
      if (icon) icon.className = 'fas fa-language';
    }
  });
}