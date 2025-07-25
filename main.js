// ====== GABUNGAN JS index.html & portofolio.html ======

// --- AUTO PLAY AUDIO ON PORTOFOLIO REDIRECT ---
document.querySelectorAll('a[href$="portofolio.html"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // Jika audio sedang play, set flag agar portofolio.html auto play
        const audio = document.getElementById('lagu') || document.getElementById('lagu-porto');
        if (audio && !audio.paused) {
            localStorage.setItem('playAudioOnPorto', '1');
        } else {
            localStorage.removeItem('playAudioOnPorto');
        }
    });
});
// Smooth scroll for anchor links
// (Juga handle mobile menu close)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if(href.length > 1 && document.querySelector(href)) {
            e.preventDefault();
            // Tutup mobile menu jika aktif
            const navbar = document.getElementById('navbar');
            const mobileMenu = document.getElementById('mobile-menu');
            if(navbar && mobileMenu && navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
            }
            document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
    });
});
document.body.style.cursor = 'none';
// Custom cursor: bulat transparan blur, tanpa animasi gambar/trail
const cursor = document.createElement('div');
cursor.id = 'custom-cursor';
document.body.appendChild(cursor);
cursor.style.position = 'fixed';
cursor.style.pointerEvents = 'none';
cursor.style.zIndex = '9999';
cursor.style.width = '22px';
cursor.style.height = '22px';
cursor.style.transform = 'translate(-50%, -50%)';
cursor.style.borderRadius = '50%';
cursor.style.background = 'rgba(255,255,255,0.18)';
cursor.style.backdropFilter = 'blur(6px)';
cursor.style.boxShadow = '0 0 16px 8px rgba(255,255,255,0.18)';
cursor.style.display = 'block';
document.body.style.cursor = 'none';
let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.25;
    cursorY += (mouseY - cursorY) * 0.25;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
}
document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});
document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; });
requestAnimationFrame(animateCursor);
// Sticky Navbar shadow
document.addEventListener('scroll', () => {
    const nav = document.querySelector('header');
    if(nav) nav.style.boxShadow = window.scrollY > 0 ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none';
});
// Mobile Menu Toggle (index.html)
const mobileMenu = document.getElementById('mobile-menu');
const navbar = document.getElementById('navbar');
if(mobileMenu && navbar) {
    mobileMenu.addEventListener('click', () => {
        navbar.classList.toggle('active');
        mobileMenu.innerHTML = navbar.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}
// Show More Students (index.html)
const showMoreStudentsBtn = document.getElementById('show-more-students');
const hiddenStudents = document.querySelectorAll('.student-card.hidden');
if(showMoreStudentsBtn) {
    showMoreStudentsBtn.addEventListener('click', () => {
        hiddenStudents.forEach(student => {
            student.classList.toggle('hidden');
        });
        if (showMoreStudentsBtn.textContent === 'Lihat Lainnya') {
            showMoreStudentsBtn.textContent = 'Sembunyikan';
        } else {
            showMoreStudentsBtn.textContent = 'Lihat Lainnya';
            document.getElementById('students').scrollIntoView({ behavior: 'smooth' });
        }
    });
}
// Show More Gallery (index.html)
const showMoreGalleryBtn = document.getElementById('show-more-gallery');
const hiddenGalleryItems = document.querySelectorAll('.gallery-item.hidden');
if(showMoreGalleryBtn) {
    showMoreGalleryBtn.addEventListener('click', () => {
        hiddenGalleryItems.forEach(item => {
            item.classList.toggle('hidden');
        });
        if (showMoreGalleryBtn.textContent === 'Lihat Lainnya') {
            showMoreGalleryBtn.textContent = 'Sembunyikan';
        } else {
            showMoreGalleryBtn.textContent = 'Lihat Lainnya';
            document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
        }
    });
}
// Play Audio (index.html)
window.playAudio = function() {
    const audio = document.getElementById("lagu");
    if(audio) audio.play().catch((err) => {
        alert("Gagal memutar lagu: " + err.message);
    });
};
// === AUDIO SYNC BETWEEN PAGES ===
const AUDIO_KEY = 'kelas_audio_playing';
const AUDIO_TIME_KEY = 'kelas_audio_time';

function setAudioStatus(isPlaying, currentTime) {
    localStorage.setItem(AUDIO_KEY, isPlaying ? '1' : '0');
    if (typeof currentTime === 'number') {
        localStorage.setItem(AUDIO_TIME_KEY, currentTime);
    }
}

function getAudioStatus() {
    return localStorage.getItem(AUDIO_KEY) === '1';
}
function getAudioTime() {
    return parseFloat(localStorage.getItem(AUDIO_TIME_KEY) || '0');
}


// === UNIVERSAL AUDIO BUTTON (index.html & portofolio.html) ===
const audio = document.getElementById('lagu') || document.getElementById('lagu-porto');
const btn = document.getElementById('btn-lagu-index') || document.getElementById('btn-lagu-porto');
const icon = document.getElementById('icon-lagu-index') || document.getElementById('icon-lagu-porto');
const text = document.getElementById('text-lagu-index');

if (audio && btn && icon) {
    if (!audio.src || audio.src === window.location.href) {
        audio.src = 'g/kelas.mp3';
    }
    function updateIcon() {
        if (!audio.paused) {
            icon.classList.remove('fa-music');
            icon.classList.add('fa-pause');
            if (text) text.textContent = 'Pause';
        } else {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-music');
            if (text) text.textContent = 'Putar Lagu';
        }
    }
    btn.addEventListener('click', function() {
        audio.muted = false;
        audio.removeAttribute('muted');
        if (audio.paused) {
            audio.play().catch((err) => {
                alert('Browser memblokir pemutaran otomatis. Silakan izinkan audio di browser Anda.');
                console.error('Audio play error:', err);
            });
        } else {
            audio.pause();
        }
        updateIcon();
    });
    audio.addEventListener('play', () => {
        setAudioStatus(true, audio.currentTime);
        updateIcon();
    });
    audio.addEventListener('pause', () => {
        setAudioStatus(false, audio.currentTime);
        updateIcon();
    });
    audio.addEventListener('timeupdate', () => setAudioStatus(!audio.paused, audio.currentTime));
    // Autoplay jika reload dan sebelumnya play, atau jika flag playAudioOnPorto ada
    window.addEventListener('DOMContentLoaded', () => {
        audio.currentTime = getAudioTime();
        if (getAudioStatus() || localStorage.getItem('playAudioOnPorto') === '1') {
            audio.muted = false;
            audio.removeAttribute('muted');
            audio.play().catch(() => {});
            localStorage.removeItem('playAudioOnPorto');
        }
        updateIcon();
    });
    // Sync jika tab lain mengubah status
    window.addEventListener('storage', (e) => {
        if (e.key === AUDIO_KEY || e.key === AUDIO_TIME_KEY) {
            if (getAudioStatus()) {
                audio.currentTime = getAudioTime();
                audio.muted = false;
                audio.removeAttribute('muted');
                audio.play().catch(() => {});
            } else {
                audio.pause();
            }
            updateIcon();
        }
    });
}
