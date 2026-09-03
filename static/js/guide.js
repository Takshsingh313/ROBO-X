/* ==========================================================================
   ROBO-X CLUB — Floating Section Instructor Buddy (Scroll-Driven Mascot)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const speechBox = document.getElementById('mascot-side-speech');
    const speechTag = document.getElementById('speech-side-tag');
    const speechText = document.getElementById('speech-side-text');
    const mascotAvatar = document.querySelector('.mascot-side-avatar');

    if (!speechTag || !speechText) return;

    // Section Content Dictionary
    const sectionGuides = {
        'home': {
            tag: 'WELCOME',
            text: '"One click closer to building something that moves."'
        },
        'about': {
            tag: 'WHO WE ARE',
            text: '"We empower engineering minds to Learn, Innovate, and Grow!"'
        },
        'countdown': {
            tag: 'FEATURED EVENT',
            text: '"Join our Batch 2026-27 Orientation on July 29 & 30 across CU classrooms!"'
        },
        'activities': {
            tag: 'WHAT WE DO',
            text: '"Explore our hands-on Workshops, Hackathons, & Open-Source Projects!"'
        },
        'roadmap': {
            tag: 'CURRICULUM',
            text: '"Follow our 4-level roadmap: from Arduino basics to AI, Drones & ROS!"'
        },
        'team': {
            tag: 'LEADERSHIP',
            text: '"Meet the faculty mentors and student leaders driving ROBO-X innovation!"'
        },
        'contact': {
            tag: 'GET IN TOUCH',
            text: '"Got questions or want to collaborate? Email our team anytime!"'
        }
    };

    let currentSectionId = 'home';

    // IntersectionObserver to detect current active section on scroll
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -40% 0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                if (id && sectionGuides[id] && id !== currentSectionId) {
                    currentSectionId = id;
                    updateMascotSpeech(sectionGuides[id].tag, sectionGuides[id].text);
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    function updateMascotSpeech(tag, text) {
        if (!speechBox) return;
        speechBox.style.opacity = '0';
        speechBox.style.transform = 'translateY(6px)';

        setTimeout(() => {
            speechTag.textContent = tag;
            speechText.textContent = text;
            speechBox.style.opacity = '1';
            speechBox.style.transform = 'translateY(0px)';
        }, 150);
    }

    // Mascot Click Interaction
    const bonusQuotes = [
        "\"Hardware + Code = Pure Magic 🤖\"",
        "\"Tip: Click on any skill pill in the roadmap to watch video tutorials!\"",
        "\"Curiosity drives our deepest engineering breakthroughs.\"",
        "\"Building real-world bots at Chandigarh University!\""
    ];
    let quoteIdx = 0;

    if (mascotAvatar) {
        mascotAvatar.addEventListener('click', () => {
            quoteIdx = (quoteIdx + 1) % bonusQuotes.length;
            updateMascotSpeech('ROBO-BOT TIP', bonusQuotes[quoteIdx]);
        });
    }
});
