// script.js
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-btn');

// --- Filtering Logic ---
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 1. Manage Active Class safely
        const currentActive = document.querySelector('.filter-btn.active');
        if (currentActive) {
            currentActive.classList.remove('active');
        }
        btn.classList.add('active');

        // 2. Filter Logic
        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (filterValue === 'all' || itemCategory === filterValue) {
                item.classList.remove('hide');
                // Re-trigger animation by resetting it
                item.style.animation = 'none';
                item.offsetHeight; // trigger reflow
                item.style.animation = null; 
            } else {
                item.classList.add('hide');
            }
        });
    });
});

// --- Lightbox Logic ---
galleryItems.forEach(item => {
    item.querySelector('img').addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = item.querySelector('img').src;
    });
});

closeBtn.addEventListener('click', () => lightbox.style.display = 'none');

lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) lightbox.style.display = 'none';
});