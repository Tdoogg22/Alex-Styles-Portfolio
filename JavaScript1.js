// 1. Toggle navigation menu visibility (hamburger icon)
function toggleMenu() {
    const nav = document.querySelector('nav[role="navigation"] ul');
    nav.classList.toggle('visible');
}

// Example: Attach to hamburger icon
document.getElementById('hamburger').addEventListener('click', toggleMenu);

// 2. Smooth scrolling for navigation links
document.querySelectorAll('nav[role="navigation"] a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// 3. Filter feature for Projects section
function filterProjects(category) {
    document.querySelectorAll('.project-item').forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

// Example: Attach to filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        filterProjects(this.dataset.category);
    });
});

// 4. Lightbox effect for project images
function showLightbox(imgSrc, altText) {
    let modal = document.getElementById('lightbox-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'lightbox-modal';
        modal.style.position = 'fixed';
        modal.style.top = 0;
        modal.style.left = 0;
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.background = 'rgba(0,0,0,0.8)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = 1000;
        modal.innerHTML = `
            <img src="${imgSrc}" alt="${altText}" style="max-width:90vw;max-height:90vh;border-radius:8px;">
            <span style="position:absolute;top:20px;right:40px;font-size:2rem;color:#fff;cursor:pointer;" id="close-lightbox">&times;</span>
        `;
        document.body.appendChild(modal);
        modal.addEventListener('click', function (e) {
            if (e.target.id === 'close-lightbox' || e.target === modal) {
                modal.remove();
            }
        });
    }
}

// Example: Attach to project images
document.querySelectorAll('.project-img').forEach(img => {
    img.addEventListener('click', function () {
        showLightbox(this.src, this.alt);
    });
});

// 5. Contact form validation with real-time feedback
const contactForm = document.querySelector('form[role="form"]');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        let valid = true;
        ['name', 'email', 'message'].forEach(field => {
            const input = contactForm.querySelector(`[name="${field}"]`);
            if (!input.value.trim()) {
                valid = false;
                input.style.borderColor = 'red';
                input.nextElementSibling && (input.nextElementSibling.textContent = 'Required');
            } else {
                input.style.borderColor = '#003366';
                input.nextElementSibling && (input.nextElementSibling.textContent = '');
            }
        });
        if (!valid) e.preventDefault();
    });

    // Real-time feedback
    ['name', 'email', 'message'].forEach(field => {
        const input = contactForm.querySelector(`[name="${field}"]`);
        if (input) {
            input.addEventListener('input', function () {
                if (this.value.trim()) {
                    this.style.borderColor = '#003366';
                    this.nextElementSibling && (this.nextElementSibling.textContent = '');
                } else {
                    this.style.borderColor = 'red';
                    this.nextElementSibling && (this.nextElementSibling.textContent = 'Required');
                }
            });
        }
    });
}