document.addEventListener('DOMContentLoaded', () => {
    const speechBox = document.getElementById('mascot-side-speech');
    const speechTag = document.getElementById('speech-side-tag');
    const speechText = document.getElementById('speech-side-text');
    const mascotAvatar = document.querySelector('.mascot-side-avatar');

    if (!speechTag || !speechText) return;

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

    // Page-specific mascot guide descriptions
    const rawPath = window.location.pathname.toLowerCase();
    const path = rawPath.endsWith('/') && rawPath.length > 1 ? rawPath.slice(0, -1) : rawPath;

    const pageGuides = {
        '/workshop': {
            tag: 'WORKSHOPS & SPRINTS',
            text: '"Explore our UAV technology & drone building workshops with hands-on flight dynamics and expert guidance!"'
        },
        '/orientation': {
            tag: 'ORIENTATION 2026-27',
            text: '"Check out our Batch 2026-27 orientation classroom sessions, live microcontroller demos, & drone flight showcases!"'
        },
        '/join': {
            tag: 'JOIN NETWORK',
            text: '"Fill out our official membership registration form to get onboarded into Chandigarh University\'s premier robotics club!"'
        },
        '/projects': {
            tag: 'PROJECTS HUB',
            text: '"Browse student-built robotics projects ranging from autonomous quadcopters to ESP32 IoT microcontrollers!"'
        },
        '/coc': {
            tag: 'CODE OF CONDUCT',
            text: '"Review our club values, community guidelines, and code of conduct to ensure a safe, inclusive workspace for all members."'
        },
        '/hackathon': {
            tag: 'HACKATHONS',
            text: '"Stay tuned for upcoming national robotics competitions, innovation sprints, and hardware hackathons!"'
        }
    };

    if (pageGuides[path]) {
        updateMascotSpeech(pageGuides[path].tag, pageGuides[path].text);
    }

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
    const sections = document.querySelectorAll('section[id]');

    if (sections.length > 0 && (path === '/' || path === '' || path === '/index.html')) {
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
    }

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
