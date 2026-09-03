/* ==========================================================================
   ROBO-X CLUB — Client Interaction Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Dark / Light Theme Controller
    // ----------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = htmlEl.classList.contains('dark');
            if (isDark) {
                htmlEl.classList.remove('dark');
                htmlEl.classList.add('light');
                localStorage.setItem('robox-theme', 'light');
            } else {
                htmlEl.classList.add('dark');
                htmlEl.classList.remove('light');
                localStorage.setItem('robox-theme', 'dark');
            }
        });
    }

    // ----------------------------------------------------------------------
    // 2. Mobile Navigation Drawer
    // ----------------------------------------------------------------------
    const hamburgerBtn = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-open');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-open');
            });
        });
    }

    // ----------------------------------------------------------------------
    // 3. Notification Dropdown Toggle
    // ----------------------------------------------------------------------
    const notificationIcon = document.getElementById('notification-icon');
    const notificationDropdown = document.getElementById('notification-dropdown');

    if (notificationIcon && notificationDropdown) {
        notificationIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationDropdown.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!notificationDropdown.contains(e.target) && e.target !== notificationIcon) {
                notificationDropdown.classList.remove('active');
            }
        });
    }

    // ----------------------------------------------------------------------
    // 4. Team Member Interactive Modal
    // ----------------------------------------------------------------------
    const teamCards = document.querySelectorAll('.team-card-item');
    const modalOverlay = document.getElementById('member-modal');
    const modalCloseBtn = document.getElementById('modal-close');
    
    const modalImg = document.getElementById('modal-img');
    const modalPlaceholder = document.getElementById('modal-placeholder');
    const modalName = document.getElementById('modal-name');
    const modalRole = document.getElementById('modal-role');
    const modalInfo = document.getElementById('modal-info');
    const modalQuote = document.getElementById('modal-quote');

    if (teamCards.length && modalOverlay) {
        teamCards.forEach(card => {
            card.addEventListener('click', () => {
                const name = card.getAttribute('data-name');
                const role = card.getAttribute('data-role');
                const info = card.getAttribute('data-info');
                const quote = card.getAttribute('data-quote');
                const imgSrc = card.getAttribute('data-img');

                if (modalName) modalName.textContent = name || '';
                if (modalRole) modalRole.textContent = role || '';
                if (modalInfo) modalInfo.textContent = info || '';
                if (modalQuote) modalQuote.textContent = quote || '';

                if (imgSrc && modalImg) {
                    modalImg.src = imgSrc;
                    modalImg.style.display = 'block';
                    if (modalPlaceholder) modalPlaceholder.style.display = 'none';
                } else if (modalPlaceholder) {
                    if (modalImg) modalImg.style.display = 'none';
                    modalPlaceholder.style.display = 'flex';
                }

                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', closeModal);
        }

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }

    function closeModal() {
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // ----------------------------------------------------------------------
    // 6. FAQ Accordion Toggle
    // ----------------------------------------------------------------------
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length) {
        faqQuestions.forEach(btn => {
            btn.addEventListener('click', () => {
                const item = btn.closest('.faq-item');
                const isActive = item.classList.contains('active');
                
                // Close all items
                document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
                
                // Toggle clicked item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }
});
