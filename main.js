// ====== GABUNGAN JS index.html & portofolio.html ======
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
// Custom Cursor & Trail & Animal/Student Image
const animalImgs = [
    'ft/putih.png', 'ft/atas.jpg', 'ft/ARDINI.JPG', 'ft/ASTITIN.JPG', 'ft/AULIA.JPG', 'ft/BASBA.JPG',
    'ft/CAHAYA.JPG', 'ft/DANDI.JPG', 'ft/DINI.JPG', 'ft/EMSIT.JPG', 'ft/FAIT.JPG', 'ft/FAIZ.JPG',
    'ft/FITRI.JPG', 'ft/HABIB.JPG', 'ft/HANIF.JPG', 'ft/ILYANI.JPG', 'ft/IRHAM.JPG', 'ft/IYAAS.JPG',
    'ft/KIKAN.JPG', 'ft/MAHYA.JPG', 'ft/MEISYA.JPG', 'ft/NABILA.JPG', 'ft/SUBANDRIO.JPG', 'ft/SUBHAN.JPG',
    'ft/UMI.JPG', 'ft/ZEE.JPG', 'ft/syafik.png'
];
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
function createTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.position = 'fixed';
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';
    trail.style.width = '18px';
    trail.style.height = '18px';
    trail.style.borderRadius = '50%';
    trail.style.background = 'rgba(30,136,229,0.15)';
    trail.style.pointerEvents = 'none';
    trail.style.zIndex = '9998';
    trail.style.transition = 'opacity 0.7s linear';
    document.body.appendChild(trail);
    setTimeout(() => { trail.style.opacity = '0'; }, 10);
    setTimeout(() => { trail.remove(); }, 700);
}
function createAnimal(x, y) {
    const img = document.createElement('img');
    img.src = animalImgs[Math.floor(Math.random() * animalImgs.length)];
    img.style.position = 'fixed';
    img.style.left = (x + Math.random()*30-15) + 'px';
    img.style.top = (y + Math.random()*30-15) + 'px';
    img.style.width = '28px';
    img.style.height = '28px';
    img.style.borderRadius = '50%';
    img.style.objectFit = 'cover';
    img.style.pointerEvents = 'none';
    img.style.zIndex = '9998';
    img.style.opacity = '0.85';
    img.style.transition = 'opacity 0.8s linear, transform 0.8s linear';
    document.body.appendChild(img);
    setTimeout(() => {
        img.style.opacity = '0';
        img.style.transform = 'scale(1.3) translateY(-10px)';
    }, 10);
    setTimeout(() => { img.remove(); }, 800);
}
let lastAnimalTime = 0;
const animalDelay = 350;
document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    createTrail(e.clientX, e.clientY);
    const now = Date.now();
    if (now - lastAnimalTime > animalDelay) {
        createAnimal(e.clientX, e.clientY);
        lastAnimalTime = now;
    }
});
document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; });
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
