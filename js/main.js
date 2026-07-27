/* ================= MOBILE NAV MENU ================= */
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('show');
}

/* Close mobile menu when a link inside it is tapped */
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('show');
            });
        });
    }

    initVideoShowcase();
});

/* ================= PROJECT VIDEOS SHOWCASE ================= */
function initVideoShowcase() {
    const videoCards = document.querySelectorAll('.video-showcase .video-card');
    if (!videoCards.length) return;

    /* Fade-up on scroll */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    videoCards.forEach(card => revealObserver.observe(card));

    /* Play icon overlay + play/pause on click, pause others when one plays */
    const videos = document.querySelectorAll('.video-showcase video');

    videos.forEach(video => {
        const wrapper = video.closest('.video-wrapper');

        video.addEventListener('play', () => {
            wrapper.classList.add('is-playing');
            videos.forEach(other => {
                if (other !== video && !other.paused) {
                    other.pause();
                }
            });
        });

        video.addEventListener('pause', () => {
            wrapper.classList.remove('is-playing');
        });

        wrapper.addEventListener('click', (e) => {
            if (e.target.closest('.play-overlay')) {
                video.paused ? video.play() : video.pause();
            }
        });
    });
}
