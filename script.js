/* ═══════════════════════════════════════════════════
   Nguyễn Ngọc Khánh — CTO CV Scripts
   Security: Uses only safe DOM APIs (textContent,
   createElement, appendChild). No innerHTML usage.
   ═══════════════════════════════════════════════════ */

(function () {
    'use strict';

    // ─── Navigation Scroll Effect ───
    function initNav() {
        var nav = document.getElementById('nav');
        var toggle = document.getElementById('nav-toggle');
        var links = document.getElementById('nav-links');
        var allLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', function () {
            if (window.scrollY > 60) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // Mobile toggle
        if (toggle && links) {
            toggle.addEventListener('click', function () {
                links.classList.toggle('open');
            });
        }

        // Active link tracking
        var sections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', function () {
            var scrollPos = window.scrollY + 120;
            sections.forEach(function (section) {
                var top = section.offsetTop;
                var height = section.offsetHeight;
                var id = section.getAttribute('id');
                if (scrollPos >= top && scrollPos < top + height) {
                    allLinks.forEach(function (link) {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });

        // Close mobile nav on link click
        allLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                if (links) links.classList.remove('open');
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
                    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // ─── Counter Animation ───
    function initCounters() {
        var counters = document.querySelectorAll('.highlight-number');
        var observed = new Set();

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !observed.has(entry.target)) {
                    observed.add(entry.target);
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(function (c) { observer.observe(c); });
    }

    function animateCounter(el) {
        var target = parseInt(el.getAttribute('data-target'), 10);
        var duration = 2000;
        var startTime = null;

        function step(ts) {
            if (!startTime) startTime = ts;
            var progress = Math.min((ts - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 4);
            el.textContent = Math.floor(eased * target) + '+';
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target + '+';
            }
        }

        requestAnimationFrame(step);
    }

    // ─── Skill Bars Animation ───
    function initSkillBars() {
        var fills = document.querySelectorAll('.skill-fill');
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var w = entry.target.getAttribute('data-width');
                    entry.target.style.width = w + '%';
                }
            });
        }, { threshold: 0.2 });

        fills.forEach(function (f) { observer.observe(f); });
    }

    // ─── Reveal on Scroll ───
    function initReveal() {
        var elements = document.querySelectorAll(
            '.timeline-item, .highlight-card, .skill-item, .edu-card, ' +
            '.achievement-card, .contact-card, .tech-stack, .about-text, .about-highlights'
        );

        elements.forEach(function (el) { el.classList.add('reveal'); });

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry, i) {
                if (entry.isIntersecting) {
                    // Stagger animation
                    var siblings = entry.target.parentElement.querySelectorAll('.reveal');
                    var index = Array.prototype.indexOf.call(siblings, entry.target);
                    var delay = Math.min(index * 80, 400);
                    setTimeout(function () {
                        entry.target.classList.add('visible');
                    }, delay);
                }
            });
        }, { threshold: 0.08 });

        elements.forEach(function (el) { observer.observe(el); });
    }

    // ─── Initialize ───
    document.addEventListener('DOMContentLoaded', function () {
        initNav();
        initSmoothScroll();
        initCounters();
        initSkillBars();
        initReveal();
    });
})();
