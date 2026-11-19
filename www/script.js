// ============================================
// ========== INTRO VIDEO CONTROL =============
// ============================================
const introOverlay = document.getElementById('introOverlay');
const introVideo = document.getElementById('introVideo');
const skipBtn = document.getElementById('skipBtn');
const loaderWrapper = document.querySelector('.loader-wrapper');

// Kunci scroll selama intro
document.body.classList.add('intro-active');

let introDone = false;

function endIntro() {
  if (introDone) return;
  introDone = true;

  // Fade out intro
  introOverlay.classList.add('hide');
  document.body.classList.remove('intro-active');

  // Pause video supaya suara/CPU berhenti
  introVideo.pause();

  // Hapus overlay setelah animasi selesai
  setTimeout(() => {
    introOverlay.remove();
  }, 900);
}

// Saat video selesai → tutup intro
introVideo.addEventListener('ended', endIntro);

// Tombol skip
skipBtn.addEventListener('click', endIntro);

// Tekan ESC untuk skip
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') endIntro();
});

// Mulai video saat halaman siap
window.addEventListener('load', () => {
  const playPromise = introVideo.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      console.warn('Autoplay diblokir, intro dilewati.');
      endIntro();
    });
  }
});

// Fallback jika video gagal dimuat
introVideo.addEventListener('error', () => {
  console.warn('Video intro gagal dimuat, dilewati.');
  endIntro();
});


// ============================================
// ========== THEME TOGGLE ====================
// ============================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');
const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (isDark) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
    themeIcon.classList.replace('fa-sun', 'fa-moon');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
  }
});


// ============================================
// ========== HAMBURGER MENU ==================
// ============================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  const icon = hamburger.querySelector('i');
  if (navLinks.classList.contains('active')) {
    icon.classList.replace('fa-bars', 'fa-times');
  } else {
    icon.classList.replace('fa-times', 'fa-bars');
  }
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.querySelector('i').classList.replace('fa-times', 'fa-bars');
  });
});


// ============================================
// ========== SCROLL TOP ======================
// ============================================
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ============================================
// ========== FORM KONTAK =====================
// ============================================
const kontakForm = document.getElementById('kontakForm');
const formFeedback = document.getElementById('formFeedback');

kontakForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nama = document.getElementById('nama').value.trim();
  const email = document.getElementById('email').value.trim();
  const pesan = document.getElementById('pesan').value.trim();

  if (!nama || !email || !pesan) {
    formFeedback.textContent = '⚠️ Semua field harus diisi!';
    formFeedback.style.color = '#ef4444';
    return;
  }

  formFeedback.textContent = '⏳ Mengirim pesan...';
  formFeedback.style.color = 'var(--accent)';

  setTimeout(() => {
    formFeedback.textContent = '✅ Pesan berhasil terkirim! Terima kasih, ' + nama + '.';
    formFeedback.style.color = '#10b981';
    kontakForm.reset();
  }, 1500);
});


// ============================================
// ========== ACTIVE NAV ON SCROLL ============
// ============================================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === '#' + current) {
      item.classList.add('active');
    }
  });
});