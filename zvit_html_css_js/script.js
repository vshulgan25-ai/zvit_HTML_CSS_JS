const savedTheme = localStorage.getItem('theme') || 'light';
document.body.setAttribute('data-theme', savedTheme);
themeBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

themeBtn.addEventListener('click', () => {
    const current = document.body.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

document.addEventListener('DOMContentLoaded', () => {
    
    const burgerBtn = document.querySelector('#burgerBtn');
    const mobileMenu = document.querySelector('#mobileMenu');
    const closeMenuBtn = document.querySelector('#closeMenuBtn');

    function closeMenu() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (burgerBtn) {
        burgerBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
    document.querySelector('.mobile-menu__overlay')?.addEventListener('click', closeMenu);
    document.querySelectorAll('.mobile-menu__content a').forEach(link => link.addEventListener('click', closeMenu));

    const modal = document.querySelector('#modal');
    const openBtns = document.querySelectorAll('#openModalBtn, .order-btn');
    const closeBtn = document.querySelector('#closeModalBtn');
    const form = document.querySelector('#orderForm');
    const modalContent = document.querySelector('.modal__content');

    const originalModalHTML = modalContent ? modalContent.innerHTML : '';

    function openModal() {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            attachFormEvents(); 
        }
    }

    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';

            if (modalContent && originalModalHTML) {
                modalContent.innerHTML = originalModalHTML;
                attachFormEvents(); 
            }
        }
    }

    openBtns.forEach(btn => btn.addEventListener('click', openModal));
    
    modal?.addEventListener('click', (e) => {
        if (e.target.closest('#closeModalBtn') || e.target.classList.contains('modal__overlay')) {
            closeModal();
        }
    });

    document.querySelectorAll('.order-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const product = btn.getAttribute('data-product');
            const select = document.querySelector('#productSelect');
            if (select && product) {
                for (let option of select.options) {
                    if (option.value === product) {
                        option.selected = true;
                        break;
                    }
                }
            }
        });
    });

    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    }

    function attachFormEvents() {
        const currentForm = document.querySelector('#orderForm');
        const emailInput = document.querySelector('#emailInput');
        const emailError = document.querySelector('#emailError');
        const nameInput = document.querySelector('#userName');

        if (!currentForm) return;

        emailInput?.addEventListener('input', () => {
            const email = emailInput.value.trim();
            if (email !== '' && !validateEmail(email)) {
                emailError.textContent = 'Введіть коректний email (example@domain.com)';
                emailInput.style.borderColor = '#c43a3a';
            } else {
                emailError.textContent = '';
                emailInput.style.borderColor = '#ddd';
            }
        });

        currentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = nameInput?.value.trim() || '';
            const email = emailInput?.value.trim() || '';
            const product = document.querySelector('#productSelect')?.value || 'Аромат';

            if (!name) {
                alert("Будь ласка, введіть ваше ім'я");
                return;
            }

            if (!validateEmail(email)) {
                if (emailError) emailError.textContent = 'Введіть коректний email (example@domain.com)';
                if (emailInput) emailInput.style.borderColor = '#c43a3a';
                return;
            }

            if (modalContent) {
                modalContent.innerHTML = `
                    <button class="modal__close" id="closeModalBtn" aria-label="Закрити">×</button>
                    <div style="text-align: center; padding: 20px 0;">
                        <div style="font-size: 50px; color: #c43a3a; margin-bottom: 15px;">✓</div>
                        <h2 style="margin-bottom: 10px;">Дякуємо, ${name}!</h2>
                        <p style="color: #666; margin-bottom: 20px;">Ваше замовлення на парфуми <strong>"${product}"</strong> успішно оформлено.</p>
                        <p style="font-size: 0.9rem; color: #999;">Наш менеджер зв'яжеться з вами найближчим часом.</p>
                        <button class="btn" id="successCloseBtn" style="margin-top: 20px; width: 100%;">Чудово</button>
                    </div>
                `;

                document.querySelector('#successCloseBtn')?.addEventListener('click', closeModal);
            }
        });
    }

    attachFormEvents();


    const goTopBtn = document.querySelector('#goTopBtn');
    window.addEventListener('scroll', () => {
        if (goTopBtn) {
            goTopBtn.classList.toggle('visible', window.scrollY > 300);
        }
    });
    goTopBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

});

const cookieBar = document.querySelector('#cookieBar');
if (!localStorage.getItem('cookieAccepted')) {
    cookieBar?.classList.remove('hidden');
}
document.querySelector('#acceptCookie')?.addEventListener('click', () => {
    localStorage.setItem('cookieAccepted', 'true');
    cookieBar.classList.add('hidden');
});