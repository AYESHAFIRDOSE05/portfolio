// Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                // Close mobile menu
                document.getElementById('mobile-menu').classList.add('hidden');
                document.getElementById('mobile-toggle').querySelector('i').classList.replace('fa-times', 'fa-bars');
            });
        });

        // Mobile menu toggle
       // Mobile menu toggle - FIXED VERSION
const mobileToggle = document.getElementById('mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const toggleIcon = mobileToggle.querySelector('i');

mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    
    if (mobileMenu.classList.contains('hidden')) {
        // Menu closed - show bars
        toggleIcon.classList.remove('fa-times');
        toggleIcon.classList.add('fa-bars');
        toggleIcon.classList.remove('text-blue-600');
        toggleIcon.classList.add('text-slate-700');
    } else {
        // Menu opened - show X
        toggleIcon.classList.remove('fa-bars');
        toggleIcon.classList.add('fa-times');
        toggleIcon.classList.remove('text-slate-700');
        toggleIcon.classList.add('text-blue-600');
    }
});

// Close menu when clicking outside (mobile only)
document.addEventListener('click', (e) => {
    if (!mobileToggle.contains(e.target) && !mobileMenu.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        toggleIcon.classList.remove('fa-times', 'text-blue-600');
        toggleIcon.classList.add('fa-bars', 'text-slate-700');
    }
});

        // Navbar scroll effect
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(20px)';
                header.style.boxShadow = '0 10px 40px rgba(0,0,0,0.05)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.8)';
                header.style.backdropFilter = 'blur(10px)';
                header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
            }
            });

        // Intersection Observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        // Observe elements for scroll animations
        document.querySelectorAll('.animate-fadeInUp, .animate-fadeIn').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            observer.observe(el);
        });

        // Smooth marquee animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes marquee-smooth {
                0% { transform: translateX(0); }
                100% { transform: translateX(calc(-100% - 48px)); }
            }
            .animate-marquee-smooth {
                animation: marquee-smooth 20s linear infinite;
            }
        `;
        document.head.appendChild(style);

        // Form submission with loading state
        document.getElementById('contact-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = e.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Reset form and show success
            e.target.reset();
            submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Message Sent!';
            submitBtn.style.background = 'linear-gradient(to right, #10b981, #059669)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2000);
        });

        // Floating label enhancement
        document.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            input.addEventListener('blur', () => {
                if (input.value === '') {
                    input.parentElement.classList.remove('focused');
                }
            });
        });

        // Project card hover enhancements
        document.querySelectorAll('.group').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-12px) scale(1.02)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Cursor follow effect (subtle)
        document.addEventListener('mousemove', (e) => {
            const cursor = document.querySelector('.cursor');
            if (!cursor) {
                const newCursor = document.createElement('div');
                newCursor.className = 'cursor fixed w-2 h-2 bg-blue-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-300 opacity-60 blur-sm';
                newCursor.style.left = e.clientX + 'px';
                newCursor.style.top = e.clientY + 'px';
                document.body.appendChild(newCursor);
            } else {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            }
        });

        // Performance optimization - Lazy load images (if any)
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('opacity-0');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    