/* ═══════════════════════════════════════════════════
   SH4D0W_X — Interactive Scripts
   Security: Uses only safe DOM APIs (textContent,
   createElement, appendChild). No innerHTML usage.
   ═══════════════════════════════════════════════════ */

(function () {
    'use strict';

    // ─── Matrix Rain Background ───
    function initMatrixRain() {
        var canvas = document.getElementById('matrix-canvas');
        if (!canvas) return;
        var ctx = canvas.getContext('2d');

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        var chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>/{}[]|\\;:=+-*&^%$#@!~';
        var charArray = chars.split('');
        var fontSize = 14;
        var columns = Math.floor(canvas.width / fontSize);
        var drops = [];

        for (var i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100;
        }

        function draw() {
            ctx.fillStyle = 'rgba(10, 10, 15, 0.06)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#00ff41';
            ctx.font = fontSize + 'px JetBrains Mono, monospace';

            for (var i = 0; i < drops.length; i++) {
                var text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(draw, 50);
    }

    // ─── Typing Effect ───
    function initTypingEffect() {
        var element = document.getElementById('typed-role');
        if (!element) return;

        var roles = [
            'Ethical Hacker & Penetration Tester',
            'Red Team Operator',
            'Security Researcher',
            'Bug Bounty Hunter',
            'Exploit Developer',
            'Digital Ghost'
        ];

        var roleIndex = 0;
        var charIndex = 0;
        var isDeleting = false;
        var typingSpeed = 80;

        // Create cursor element safely
        var cursor = document.createElement('span');
        cursor.className = 'cursor';
        element.appendChild(cursor);

        // Create text node for the typed text
        var textNode = document.createTextNode('');
        element.insertBefore(textNode, cursor);

        function type() {
            var currentRole = roles[roleIndex];

            if (isDeleting) {
                charIndex--;
                textNode.textContent = currentRole.substring(0, charIndex);
                typingSpeed = 40;
            } else {
                charIndex++;
                textNode.textContent = currentRole.substring(0, charIndex);
                typingSpeed = 80;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 500;
            }

            setTimeout(type, typingSpeed);
        }

        type();
    }

    // ─── Counter Animation ───
    function initCounters() {
        var counters = document.querySelectorAll('.stat-number');
        var observed = new Set();

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !observed.has(entry.target)) {
                    observed.add(entry.target);
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(function (counter) {
            observer.observe(counter);
        });
    }

    function animateCounter(element) {
        var target = parseInt(element.getAttribute('data-target'), 10);
        var duration = 2000;
        var startTime = null;

        function update(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);

            // easeOutQuart
            var eased = 1 - Math.pow(1 - progress, 4);
            var current = Math.floor(eased * target);
            element.textContent = current + (target === 99 ? '%' : '+');

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target + (target === 99 ? '%' : '+');
            }
        }

        requestAnimationFrame(update);
    }

    // ─── Skill Bars Animation ───
    function initSkillBars() {
        var fills = document.querySelectorAll('.skill-fill');

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var width = entry.target.getAttribute('data-width');
                    entry.target.style.width = width + '%';
                }
            });
        }, { threshold: 0.3 });

        fills.forEach(function (fill) {
            observer.observe(fill);
        });
    }

    // ─── Fade In Animation ───
    function initFadeIn() {
        var elements = document.querySelectorAll(
            '.skill-card, .project-card, .contact-terminal, .contact-pgp, .about-terminal, .avatar-frame, .tools-section'
        );

        elements.forEach(function (el) {
            el.classList.add('fade-in');
        });

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(function (el) {
            observer.observe(el);
        });
    }

    // ─── Navigation ───
    function initNavigation() {
        var nav = document.getElementById('nav');
        var toggle = document.getElementById('nav-toggle');
        var mobileNav = document.getElementById('mobile-nav');
        var navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

        // Scroll effect
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // Mobile toggle
        if (toggle && mobileNav) {
            toggle.addEventListener('click', function () {
                mobileNav.classList.toggle('open');
            });
        }

        // Active link tracking
        var sections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', function () {
            var scrollPos = window.scrollY + 100;

            sections.forEach(function (section) {
                var top = section.offsetTop;
                var height = section.offsetHeight;
                var id = section.getAttribute('id');

                if (scrollPos >= top && scrollPos < top + height) {
                    navLinks.forEach(function (link) {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });

        // Close mobile nav on link click
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                if (mobileNav) {
                    mobileNav.classList.remove('open');
                }
            });
        });
    }

    // ─── Smooth Scroll ───
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                var targetId = this.getAttribute('href').substring(1);
                var targetEl = document.getElementById(targetId);
                if (targetEl) {
                    targetEl.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ─── Parallax on mouse (subtle) ───
    function initParallax() {
        var hero = document.querySelector('.hero');
        if (!hero) return;

        hero.addEventListener('mousemove', function (e) {
            var rect = hero.getBoundingClientRect();
            var x = (e.clientX - rect.left) / rect.width - 0.5;
            var y = (e.clientY - rect.top) / rect.height - 0.5;

            var terminal = hero.querySelector('.hero-terminal');
            if (terminal) {
                terminal.style.transform =
                    'perspective(1000px) rotateY(' + (x * 2) + 'deg) rotateX(' + (-y * 2) + 'deg)';
            }
        });

        hero.addEventListener('mouseleave', function () {
            var terminal = hero.querySelector('.hero-terminal');
            if (terminal) {
                terminal.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
                terminal.style.transition = 'transform 0.5s ease';
            }
        });
    }

    // ─── Initialize Everything ───
    document.addEventListener('DOMContentLoaded', function () {
        initMatrixRain();
        initTypingEffect();
        initCounters();
        initSkillBars();
        initFadeIn();
        initNavigation();
        initSmoothScroll();
        initParallax();
    });
})();
