/* ============================================================
   TYRANT CROWN — site script
   Mobile menu toggle, hero video graceful fallback,
   button cursor-tracking, smooth nav state.
   No frameworks. No build step.
   ============================================================ */

(() => {
    'use strict';

    /* ---------------------------------------
       Mobile nav toggle
       --------------------------------------- */
    const navToggle = document.getElementById('nav-toggle');
    const navLinks  = document.getElementById('nav-links');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const open = navLinks.classList.toggle('active');
            navToggle.classList.toggle('active', open);
            navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        // Close menu when a nav link is clicked (mobile)
        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                if (window.innerWidth < 920) {
                    navLinks.classList.remove('active');
                    navToggle.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    /* ---------------------------------------
       Hero video graceful fallback
       --------------------------------------- */
    const heroVideo = document.getElementById('hero-video');
    const heroImage = document.getElementById('hero-image');
    if (heroVideo && heroImage) {
        let videoPlayedSuccessfully = false;

        // If video fails to load (404 sources, decode error), keep image visible
        heroVideo.addEventListener('error', () => {
            heroVideo.dataset.failed = 'true';
            heroImage.style.opacity = '1';
        });

        // If no source has a working URL, the network state stalls
        heroVideo.addEventListener('loadeddata', () => {
            videoPlayedSuccessfully = true;
            heroImage.style.transition = 'opacity .8s ease';
            // Crossfade the still image away once video is decoding
            heroImage.style.opacity = '0';
        });

        // Respect reduced motion — pause and show poster image
        const reduce = matchMedia('(prefers-reduced-motion: reduce)');
        const applyReduce = () => {
            if (reduce.matches) {
                heroVideo.pause();
                heroVideo.dataset.failed = 'true';
                heroImage.style.opacity = '1';
            }
        };
        applyReduce();
        reduce.addEventListener?.('change', applyReduce);

        // Safety: if 4 seconds pass with no source loading, treat as failed
        setTimeout(() => {
            if (!videoPlayedSuccessfully) {
                heroVideo.dataset.failed = 'true';
                heroImage.style.opacity = '1';
            }
        }, 4000);
    }

    /* ---------------------------------------
       Button cursor-tracking glow
       --------------------------------------- */
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('pointermove', e => {
            const r = btn.getBoundingClientRect();
            btn.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
            btn.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
        });
    });

    /* ---------------------------------------
       Reveal active nav section on scroll (lightweight)
       --------------------------------------- */
    if ('IntersectionObserver' in window) {
        const sections = document.querySelectorAll('main section, .section');
        const links = document.querySelectorAll('.nav-links a[href^="#"]');
        const linkMap = new Map();
        links.forEach(l => linkMap.set(l.getAttribute('href').slice(1), l));

        const obs = new IntersectionObserver(entries => {
            entries.forEach(en => {
                if (!en.isIntersecting) return;
                const id = en.target.id;
                if (!linkMap.has(id)) return;
                links.forEach(l => l.removeAttribute('aria-current'));
                linkMap.get(id).setAttribute('aria-current', 'true');
            });
        }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

        document.querySelectorAll('section[id]').forEach(s => obs.observe(s));
    }

    /* ---------------------------------------
       Year stamp (if anywhere uses [data-year])
       --------------------------------------- */
    document.querySelectorAll('[data-year]').forEach(el => {
        el.textContent = new Date().getFullYear();
    });
})();
