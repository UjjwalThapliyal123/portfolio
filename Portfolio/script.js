// --- Preloader ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hidden');
    }
});

// --- Navbar Scroll Effect ---
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// --- Typewriter Effect ---
const lines = [
  "Hi, I’m Ujjwal Thapliyal.",
  "Turning data into actionable insights.",
  "I’m a Data Scientist passionate about building human-centric AI systems and solving real-world problems with data science and machine learning.",
];
let lineIndex = 0;

function typeLine() {
  if (lineIndex < lines.length) {
    const p = document.createElement("p");
    p.classList.add("typed-line", "active-line"); 
    document.getElementById("typewriter").appendChild(p);

    const prev = document.querySelectorAll(".active-line");
    if (prev.length > 1) prev[0].classList.remove("active-line");

    let charIndex = 0;
    function typeChar() {
      if (charIndex < lines[lineIndex].length) {
        p.textContent += lines[lineIndex][charIndex];
        charIndex++;
        setTimeout(typeChar, 50);
      } else {
        lineIndex++;
        typeLine();
      }
    }
    typeChar();
  }
}
typeLine();

// --- Lottie Animation for About Section ---
if (window.lottie) {
    lottie.loadAnimation({
        container: document.getElementById('lottie-about-animation'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://assets2.lottiefiles.com/packages/lf20_tno6cg2w.json'
    });
}

// --- Intersection Observer for Reveal on Scroll ---
const revealObserverOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            if (entry.target.classList.contains('skills-grid')) {
                const skillCategories = entry.target.querySelectorAll('.skill-category');
                skillCategories.forEach((card, index) => {
                    let colCount = window.innerWidth > 992 ? 3 : window.innerWidth > 768 ? 2 : 1;
                    const row = Math.floor(index / colCount);
                    const col = index % colCount;
                    const delay = (row * 0.1) + (col * 0.05);
                    card.style.transitionDelay = `${delay}s`;
                    card.classList.add('active');
                });
            } else if (entry.target.classList.contains('projects-grid')) {
                const projectCards = entry.target.querySelectorAll('.project-card');
                projectCards.forEach((card, index) => {
                    let colCount = window.innerWidth > 992 ? 3 : window.innerWidth > 768 ? 2 : 1;
                    const row = Math.floor(index / colCount);
                    const col = index % colCount;
                    const delay = (row * 0.1) + (col * 0.05);
                    card.style.transitionDelay = `${delay}s`;
                    card.classList.add('active');
                });
            }
            if (!entry.target.classList.contains('skills-grid') && !entry.target.classList.contains('projects-grid')) {
                observer.unobserve(entry.target);
            }
        }
    });
}, revealObserverOptions);
document.querySelectorAll('.reveal-on-scroll').forEach(el => revealObserver.observe(el));

// --- Hero Section Mouse Parallax ---
const heroSection = document.querySelector('.hero-section');
const heroImageElement = document.querySelector('.hero-image img');
const heroContentElement = document.querySelector('.hero-content');
const floatingElements = document.querySelectorAll('.hero-floating-element');

if (heroSection && heroImageElement && heroContentElement && !/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const offsetX = (x - centerX) / centerX;
        const offsetY = (y - centerY) / centerY;
        const imageDepth = 15, contentDepth = 8, floatingDepth = 25;
        const rotateY = offsetX * imageDepth;
        const rotateX = -offsetY * imageDepth;
        heroImageElement.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        heroContentElement.style.transform = `translateX(${offsetX * contentDepth}px) translateY(${offsetY * contentDepth}px)`;
        floatingElements.forEach((el, index) => {
            const elOffsetX = offsetX * floatingDepth * (1 + index * 0.1);
            const elOffsetY = offsetY * floatingDepth * (1 + index * 0.1);
            el.style.transform = `translate(${elOffsetX}px, ${elOffsetY}px) ${el.dataset.initialRotate ? `rotate(${el.dataset.initialRotate})` : ''}`;
        });
    });
    heroSection.addEventListener('mouseleave', () => {
        heroImageElement.style.transform = `rotate(5deg)`;
        heroContentElement.style.transform = `translate(0,0)`;
        floatingElements.forEach(el => {
            el.style.transform = `translate(0,0) ${el.dataset.initialRotate ? `rotate(${el.dataset.initialRotate})` : ''}`;
        });
    });
    floatingElements.forEach(el => {
        const computedTransform = window.getComputedStyle(el).transform;
        const rotationMatch = computedTransform.match(/rotate\(([^)]+)\)/);
        el.dataset.initialRotate = rotationMatch ? rotationMatch[1] : '0deg';
    });
}

// --- 3D Tilt Effects ---
const highlightItems = document.querySelectorAll('.highlight-item');
if (!/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    highlightItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateY = (x - rect.width / 2) / (rect.width / 2) * 10;
            const rotateX = -(y - rect.height / 2) / (rect.height / 2) * 10;
            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });
}

// --- Project Card Hover ---
const projectCards = document.querySelectorAll('.project-card');
if (!/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateY = (x - rect.width / 2) / (rect.width / 2) * 15;
            const rotateX = -(y - rect.height / 2) / (rect.height / 2) * 15;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
        });
    });
}

// --- Project Filtering ---
const filterButtons = document.querySelectorAll('.filter-btn');
const allProjectCards = document.querySelectorAll('.project-card');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filter = button.dataset.filter;
        allProjectCards.forEach(card => {
            const categories = card.dataset.category.split(' ');
            const shouldShow = filter === 'all' || categories.includes(filter);
            card.style.display = shouldShow ? 'flex' : 'none';
        });
    });
});

// --- Project Modal ---
const modal = document.querySelector('.project-detail-modal');
const modalCloseBtn = document.querySelector('.modal-close-btn');
const modalBackdrop = document.querySelector('.modal-backdrop');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalTechStack = document.getElementById('modal-tech-stack');
const modalGithubLink = document.getElementById('modal-github-link');
const modalLiveLink = document.getElementById('modal-live-link');

allProjectCards.forEach(card => {
    card.addEventListener('click', () => {
        if (!modal) return;
        modalImage.src = card.dataset.imageLarge;
        modalTitle.textContent = card.dataset.title;
        modalDescription.textContent = card.dataset.fullDesc;
        modalTechStack.innerHTML = card.querySelector('.tech-stack') ? card.querySelector('.tech-stack').innerHTML : '';
        modalGithubLink.href = card.dataset.githubLink;
        modalLiveLink.href = card.dataset.liveLink;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});
if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
});

// --- Custom Cursor ---
if (!/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    const customCursor = document.createElement('div');
    customCursor.classList.add('custom-cursor');
    document.body.appendChild(customCursor);
    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = `${e.clientX}px`;
        customCursor.style.top = `${e.clientY}px`;
    });
    document.querySelectorAll('a, button, .project-card, .skill-category, input, textarea, .social-icon').forEach(el => {
        el.addEventListener('mouseenter', () => customCursor.classList.add('active'));
        el.addEventListener('mouseleave', () => customCursor.classList.remove('active'));
    });
}

// --- Contact Form Submission ---
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formStatusMessage = document.createElement('div');
        formStatusMessage.style.cssText = `
            margin-top: 20px;
            padding: 15px;
            border-radius: 8px;
            font-weight: 600;
            text-align: center;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.3s ease, transform 0.3s ease;
        `;
        const existingStatus = contactForm.querySelector('.form-status-message');
        if (existingStatus) existingStatus.remove();
        contactForm.appendChild(formStatusMessage);
        formStatusMessage.classList.add('form-status-message');
        formStatusMessage.textContent = '⏳ Sending message...';
        formStatusMessage.style.backgroundColor = 'rgba(0, 255, 255, 0.1)';
        formStatusMessage.style.color = '#00FFFF';
        setTimeout(() => {
            formStatusMessage.style.opacity = '1';
            formStatusMessage.style.transform = 'translateY(0)';
        }, 10);

        const formData = new FormData(this);
        const object = {};
        formData.forEach((value, key) => { object[key] = value; });
        const json = JSON.stringify(object);

        try {
            const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_FORM_ID', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: json
            });

            if (response.ok) {
                formStatusMessage.textContent = '✅ Message sent successfully! Thank you.';
                formStatusMessage.style.backgroundColor = 'rgba(0, 255, 0, 0.1)';
                formStatusMessage.style.color = '#00FF00';
                contactForm.reset();
            } else {
                const data = await response.json();
                formStatusMessage.textContent = data.errors ? `❌ ${data.errors.map(err => err.message).join(', ')}` : '❌ Oops! There was a problem.';
                formStatusMessage.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
                formStatusMessage.style.color = '#FF0000';
            }
        } catch (error) {
            formStatusMessage.textContent = '⚠️ Network error. Please try again later.';
            formStatusMessage.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
            formStatusMessage.style.color = '#FF0000';
        } finally {
            setTimeout(() => {
                formStatusMessage.style.opacity = '0';
                formStatusMessage.style.transform = 'translateY(20px)';
                setTimeout(() => formStatusMessage.remove(), 300);
            }, 5000);
        }
    });
}

// --- Hamburger Menu ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// --- Accessibility Enhancements ---
allProjectCards.forEach(card => {
    card.setAttribute("tabindex", "0");
    card.addEventListener('keypress', (e) => { if (e.key === 'Enter') card.click(); });
});
document.querySelectorAll('a, button').forEach(el => {
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); }
    });
});



// --- Flip toggle on project cards ---
function toggleFlip(card) {
  if (!card) return;
  card.classList.toggle('flipped');
}

document.querySelectorAll('[data-action="flip"], .flip-btn, .flip-toggle').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();          // don't trigger card click
    e.preventDefault();           // if it's an <a>, prevent navigation
    toggleFlip(btn.closest('.project-card'));
  });

  // keyboard access
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFlip(btn.closest('.project-card'));
    }
  });
});

// close any flipped card with ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.project-card.flipped')
      .forEach(c => c.classList.remove('flipped'));
  }
});




// --- Project Modal Logic (fixed) ---
allProjectCards.forEach(card => {
  card.addEventListener('click', (e) => {
    // if clicked on flip button, don't open modal
    if (e.target.closest('[data-action="flip"], .flip-btn, .flip-toggle')) {
      return;
    }

    // if clicked on Live/GitHub links, allow default navigation
    if (e.target.closest('a')) {
      return;
    }

    if (!modal) return;

    const title = card.dataset.title;
    const fullDesc = card.dataset.fullDesc;
    const imageLarge = card.dataset.imageLarge;
    const githubLink = card.dataset.githubLink;
    const liveLink = card.dataset.liveLink;
    const techIcons = card.querySelector('.tech-stack')
      ? card.querySelector('.tech-stack').innerHTML
      : '';

    if (modalImage) modalImage.src = imageLarge;
    if (modalTitle) modalTitle.textContent = title;
    if (modalDescription) modalDescription.textContent = fullDesc;
    if (modalTechStack) modalTechStack.innerHTML = techIcons;
    if (modalGithubLink) modalGithubLink.href = githubLink;
    if (modalLiveLink) {
      modalLiveLink.href = liveLink;
      modalLiveLink.style.display = (liveLink && liveLink !== '#') ? 'inline-flex' : 'none';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    modalCloseBtn && modalCloseBtn.focus();
  });
});




// --- Accessibility Enhancements (safer) ---
allProjectCards.forEach(card => {
  card.setAttribute("tabindex", "0");
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') card.click();
  });
});

// Only add button role/keypress to non-anchor controls that need it (e.g., custom divs)
// Leave real <a> and <button> alone; they already work with keyboard.
document.querySelectorAll('[data-action="flip"], .flip-btn, .flip-toggle').forEach(el => {
  if (!['A','BUTTON'].includes(el.tagName)) {
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
  }
});


// --- SEO Meta Tags ---
const keywordsMeta = document.createElement('meta');
keywordsMeta.name = 'keywords';
keywordsMeta.content = 'Data Scientist, Machine Learning, AI, Portfolio, Ujjwal Thapliyal';
document.head.appendChild(keywordsMeta);

const twitterCardMeta = document.createElement('meta');
twitterCardMeta.name = 'twitter:card';
twitterCardMeta.content = 'summary_large_image';
document.head.appendChild(twitterCardMeta);

const ogTitleMeta = document.createElement('meta');
ogTitleMeta.property = 'og:title';
ogTitleMeta.content = 'Ujjwal Thapliyal - Data Scientist Portfolio';
document.head.appendChild(ogTitleMeta);

const ogDescriptionMeta = document.createElement('meta');
ogDescriptionMeta.property = 'og:description';
ogDescriptionMeta.content = 'Explore Ujjwal\'s projects, skills, and journey as a Data Scientist.';
document.head.appendChild(ogDescriptionMeta);

const ogImageMeta = document.createElement('meta');
ogImageMeta.property = 'og:image';
ogImageMeta.content = 'Ujjwalimage.png';
document.head.appendChild(ogImageMeta);

const ogUrlMeta = document.createElement('meta');
ogUrlMeta.property = 'og:url';
ogUrlMeta.content = 'https://yourdomain.com';
document.head.appendChild(ogUrlMeta);
