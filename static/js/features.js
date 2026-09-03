/**
 * Features JS — Dark Mode, Countdown, Terminal Easter Egg, Roadmap Animations
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==================== #8: DARK / LIGHT MODE ====================
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Load saved theme
    const savedTheme = localStorage.getItem('robox-theme') || 'light';
    html.setAttribute('data-theme', savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = html.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            localStorage.setItem('robox-theme', next);

            // Subtle animation
            themeToggle.style.transform = 'rotate(360deg) scale(1.2)';
            setTimeout(() => themeToggle.style.transform = '', 400);
        });
    }

    // ==================== #10: EVENT COMPLETED (No countdown needed) ====================
    // The event on Feb 13 has been completed successfully.
    // Countdown timer removed — section now shows a static "Completed" state.


    // ==================== #4: ROADMAP SCROLL ANIMATIONS ====================
    const roadmapNodes = document.querySelectorAll('.roadmap-node');
    if (roadmapNodes.length > 0) {
        const roadmapObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.2 });

        roadmapNodes.forEach(node => {
            node.style.opacity = '0';
            node.style.transform = 'translateY(30px)';
            node.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            roadmapObserver.observe(node);
        });
    }

    // ==================== 3D PROPELLER SCROLL ROTATION & DYNAMIC SCROLL ACTIVE COLOR STATE ====================
    const floatingAssetsContainer = document.querySelector('.gnb-floating-3d-assets');
    const propellerImg = document.getElementById('propeller-img');
    let scrollTimeout;

    window.addEventListener('scroll', () => {
        // 1. Spin propeller on scroll
        if (propellerImg) {
            const scrollRotation = window.scrollY * 0.75;
            propellerImg.style.transform = `rotate(${scrollRotation}deg)`;
        }

        // 2. Active full color & opacity mode while moving down the site!
        if (floatingAssetsContainer) {
            floatingAssetsContainer.classList.add('is-scrolling');
        }

        // 3. Take a smooth little pause (300ms) before fading back down to watermark position when scrolling stops
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (floatingAssetsContainer) {
                floatingAssetsContainer.classList.remove('is-scrolling');
            }
        }, 300);
    }, { passive: true });



});


