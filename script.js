document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const btn = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-menu-link');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('active');
            const icon = btn.querySelector('i');
            if (menu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when a link is clicked
        links.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                const icon = btn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.scroll-fade, .scroll-slide-left, .scroll-slide-right, .scroll-zoom-in, .scroll-rotate');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Typewriter Effect
    const typeWriterElements = document.querySelectorAll('.typewriter-text');
    
    typeWriterElements.forEach((el, index) => {
        const text = el.getAttribute('data-text');
        const delay = parseInt(el.getAttribute('data-delay')) || 0;
        
        setTimeout(() => {
            el.classList.add('typing');
            let i = 0;
            const type = () => {
                if (i < text.length) {
                    el.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, 100); // Typing speed
                } else {
                    el.classList.remove('typing'); // Remove cursor when done
                }
            };
            type();
        }, delay);
    });
});

// Lightbox Functions (Outside DOMContentLoaded to be accessible globally via onclick)
function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const imgSrc = element.querySelector('img').src;
    const captionText = element.querySelector('h3').innerText;

    lightboxImg.src = imgSrc;
    lightboxCaption.innerText = captionText;
    
    lightbox.classList.remove('hidden');
    // Small delay to allow display:block to apply before adding opacity for transition
    setTimeout(() => {
        lightbox.classList.remove('opacity-0');
        lightboxImg.classList.remove('scale-95');
        lightboxImg.classList.add('scale-100');
    }, 10);
    
    document.body.style.overflow = 'hidden'; // Prevent scrolling background
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    lightbox.classList.add('opacity-0');
    lightboxImg.classList.remove('scale-100');
    lightboxImg.classList.add('scale-95');
    
    setTimeout(() => {
        lightbox.classList.add('hidden');
        document.body.style.overflow = ''; // Restore scrolling
    }, 300); // Match transition duration
}

// Close lightbox when clicking outside the image
document.getElementById('lightbox')?.addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') {
        closeLightbox();
    }
});

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !document.getElementById('lightbox').classList.contains('hidden')) {
        closeLightbox();
    }
});
