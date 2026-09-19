/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { pageHtml } from './pageHtml';
import SalesNotification from './components/SalesNotification';
import { getPromoDateDetails } from './utils/promoDate';
import './types';

export default function App() {
  useEffect(() => {
    // Dynamic top promo banner date & automatic midnight rollover ("assim que virar o dia")
    const updatePromoDate = () => {
      const headingEl = document.querySelector('.elementor-element-8c727ba .elementor-heading-title');
      if (headingEl) {
        const { bannerHtml } = getPromoDateDetails();
        if (headingEl.innerHTML !== bannerHtml) {
          headingEl.innerHTML = bannerHtml;
        }
      }
    };

    updatePromoDate();

    let midnightTimer: NodeJS.Timeout | null = null;
    const scheduleMidnightUpdate = () => {
      if (midnightTimer) clearTimeout(midnightTimer);
      const now = new Date();
      const nextMidnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0, 0, 0, 50
      );
      const msUntilMidnight = Math.max(1000, nextMidnight.getTime() - now.getTime());

      midnightTimer = setTimeout(() => {
        updatePromoDate();
        scheduleMidnightUpdate();
      }, msUntilMidnight);
    };

    scheduleMidnightUpdate();

    const promoCheckInterval = setInterval(updatePromoDate, 30000);

    const handleVisibilityOrFocus = () => {
      if (document.visibilityState === 'visible') {
        updatePromoDate();
        scheduleMidnightUpdate();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityOrFocus);
    window.addEventListener('focus', handleVisibilityOrFocus);

    // 1. Initialize Swiper 1 (Kits Carousel)
    const swiper1El = document.querySelector('.elementor-element-35d0582 .swiper');
    let swiper1Instance: any = null;
    let swiper2Instance: any = null;

    const initSwipers = () => {
      if (window.Swiper) {
        if (swiper1El && !swiper1Instance) {
          try {
            swiper1Instance = new window.Swiper(swiper1El, {
              slidesPerView: 2,
              spaceBetween: 6,
              loop: true,
              grabCursor: true,
              autoplay: {
                delay: 2500,
                disableOnInteraction: false,
              },
              pagination: {
                el: '.elementor-element-35d0582 .swiper-pagination',
                clickable: true,
              },
              breakpoints: {
                640: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 14,
                },
              },
            });
          } catch (e) {
            console.warn('Swiper 1 init failed:', e);
          }
        }

        // 2. Initialize Swiper 2 (Testimonials Carousel)
        const swiper2El = document.querySelector('.elementor-element-fdf642b .swiper');
        if (swiper2El && !swiper2Instance) {
          try {
            swiper2Instance = new window.Swiper(swiper2El, {
              slidesPerView: 2,
              spaceBetween: 6,
              loop: true,
              grabCursor: true,
              autoplay: {
                delay: 3500,
                disableOnInteraction: false,
              },
              pagination: {
                el: '.elementor-element-fdf642b .swiper-pagination',
                clickable: true,
              },
              breakpoints: {
                640: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 14,
                },
              },
            });
          } catch (e) {
            console.warn('Swiper 2 init failed:', e);
          }
        }
      }
    };

    // Retry swiper initialization in case script loads asynchronously
    initSwipers();
    const interval = setInterval(() => {
      if (window.Swiper && (!swiper1Instance || !swiper2Instance)) {
        initSwipers();
      } else {
        clearInterval(interval);
      }
    }, 200);

    // 3. FAQ Accordion Click Handler
    const handleAccordionClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const tabTitle = target.closest('.elementor-tab-title') as HTMLElement | null;
      if (!tabTitle) return;

      e.preventDefault();
      const item = tabTitle.closest('.elementor-accordion-item');
      if (!item) return;

      const content = item.querySelector('.elementor-tab-content') as HTMLElement | null;
      if (!content) return;

      const isOpen = tabTitle.classList.contains('elementor-active');
      if (isOpen) {
        tabTitle.classList.remove('elementor-active');
        tabTitle.setAttribute('aria-expanded', 'false');
        content.style.display = 'none';
      } else {
        tabTitle.classList.add('elementor-active');
        tabTitle.setAttribute('aria-expanded', 'true');
        content.style.display = 'block';
      }
    };

    // 4. Modal Popup Handlers
    const modalBox = document.getElementById('premium-modal-2047254');

    const triggerPopupConfetti = () => {
      // Stage 1: Big central radial explosion across the popup
      confetti({
        particleCount: 85,
        spread: 360,
        startVelocity: 36,
        origin: { x: 0.5, y: 0.45 },
        colors: ['#FFD700', '#FF008A', '#00E676', '#3B82F6', '#FFA500', '#FFFFFF', '#9333EA'],
        ticks: 250,
        gravity: 0.85,
        scalar: 1.2,
        zIndex: 9999999,
        disableForReducedMotion: true,
      });

      // Stage 2: Left and right celebratory cannons firing inwards
      setTimeout(() => {
        confetti({
          particleCount: 55,
          angle: 60,
          spread: 65,
          startVelocity: 44,
          origin: { x: 0.15, y: 0.7 },
          colors: ['#FFD700', '#FF008A', '#FFA500', '#00E676'],
          ticks: 260,
          zIndex: 9999999,
          disableForReducedMotion: true,
        });
        confetti({
          particleCount: 55,
          angle: 120,
          spread: 65,
          startVelocity: 44,
          origin: { x: 0.85, y: 0.7 },
          colors: ['#FFD700', '#3B82F6', '#FF008A', '#00E676'],
          ticks: 260,
          zIndex: 9999999,
          disableForReducedMotion: true,
        });
      }, 120);

      // Stage 3: Golden star and circle fireworks from top center
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 90,
          spread: 120,
          startVelocity: 40,
          origin: { x: 0.5, y: 0.3 },
          colors: ['#FFD700', '#FFB300', '#FF008A', '#FFFFFF'],
          shapes: ['star', 'circle'],
          ticks: 280,
          gravity: 0.9,
          scalar: 1.3,
          zIndex: 9999999,
          disableForReducedMotion: true,
        });
      }, 250);
    };

    const openModal = () => {
      if (!modalBox) return;
      modalBox.style.display = 'flex';
      modalBox.classList.add('premium-in');
      document.body.style.overflow = 'hidden';

      // Confetti explosion when user enters the popup
      triggerPopupConfetti();
    };

    const closeModal = () => {
      if (!modalBox) return;
      modalBox.style.display = 'none';
      modalBox.classList.remove('premium-in');
      document.body.style.overflow = '';
    };

    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check if clicking modal trigger button
      if (
        target.closest('[data-toggle="premium-modal"]') ||
        target.closest('[data-target="#premium-modal-2047254"]') ||
        target.closest('.elementor-element-b87332c button')
      ) {
        e.preventDefault();
        openModal();
        return;
      }

      // Check if clicking modal close button
      if (target.closest('.custom-modal-close-btn') || target.closest('.premium-modal-box-modal-close')) {
        e.preventDefault();
        closeModal();
        return;
      }

      // Check if clicking modal backdrop
      if (modalBox && target === modalBox) {
        closeModal();
        return;
      }

      // Smooth scroll for anchor links
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.length > 1) {
          const targetEl = document.getElementById(href.slice(1));
          if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalBox && modalBox.classList.contains('premium-in')) {
        closeModal();
      }
    };

    // 5. Confetti explosion effect bursting out of "🏆 Mais escolhido" (explodes strictly ONCE)
    let confettiHasExploded = false;

    const triggerMaisEscolhidoConfetti = (el: HTMLElement) => {
      if (confettiHasExploded) return;
      confettiHasExploded = true;

      // Remove observer and scroll listeners immediately to guarantee it never fires more than once
      if (confettiObserver) {
        confettiObserver.disconnect();
        confettiObserver = null;
      }
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);

      // Calculate exact origin of the word in viewport coordinates
      const rect = el.getBoundingClientRect();
      const originX = Math.max(0.05, Math.min(0.95, (rect.left + rect.width / 2) / window.innerWidth));
      const originY = Math.max(0.05, Math.min(0.95, (rect.top + rect.height / 2) / window.innerHeight));

      // Visual explosion pop on the word itself
      el.classList.remove('mais-escolhido-exploding');
      void el.offsetWidth; // force DOM reflow
      el.classList.add('mais-escolhido-exploding');
      setTimeout(() => {
        el.classList.remove('mais-escolhido-exploding');
      }, 1200);

      // Burst 1: Immediate 360-degree radial explosion bursting out from the word center
      confetti({
        particleCount: 95,
        spread: 360,
        startVelocity: 38,
        origin: { x: originX, y: originY },
        colors: ['#FFD700', '#FFA500', '#FF008A', '#00E676', '#3B82F6', '#FFFFFF', '#FF3D00', '#A855F7'],
        ticks: 240,
        gravity: 0.85,
        scalar: 1.2,
        zIndex: 999999,
        disableForReducedMotion: true,
      });

      // Burst 2: Upward fan celebration burst with stars & circles
      setTimeout(() => {
        const curRect = el.getBoundingClientRect();
        const curX = Math.max(0.05, Math.min(0.95, (curRect.left + curRect.width / 2) / window.innerWidth));
        const curY = Math.max(0.05, Math.min(0.95, (curRect.top + curRect.height / 2) / window.innerHeight));
        confetti({
          particleCount: 75,
          angle: 90,
          spread: 120,
          startVelocity: 44,
          origin: { x: curX, y: curY },
          colors: ['#FFD700', '#FF008A', '#00E676', '#FFB300', '#7C4DFF'],
          shapes: ['star', 'circle'],
          ticks: 260,
          gravity: 0.9,
          scalar: 1.3,
          zIndex: 999999,
          disableForReducedMotion: true,
        });
      }, 90);

      // Burst 3: Angled side bursts shooting from word flanks
      setTimeout(() => {
        const curRect = el.getBoundingClientRect();
        const leftX = Math.max(0.05, Math.min(0.95, (curRect.left + curRect.width * 0.25) / window.innerWidth));
        const rightX = Math.max(0.05, Math.min(0.95, (curRect.left + curRect.width * 0.75) / window.innerWidth));
        const curY = Math.max(0.05, Math.min(0.95, (curRect.top + curRect.height / 2) / window.innerHeight));
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 70,
          startVelocity: 36,
          origin: { x: leftX, y: curY },
          colors: ['#FFD700', '#FF1493', '#22C55E'],
          zIndex: 999999,
          disableForReducedMotion: true,
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 70,
          startVelocity: 36,
          origin: { x: rightX, y: curY },
          colors: ['#FFD700', '#3B82F6', '#FF008A'],
          zIndex: 999999,
          disableForReducedMotion: true,
        });
      }, 190);

      // Burst 4: Sparkles finish
      setTimeout(() => {
        const curRect = el.getBoundingClientRect();
        const curX = Math.max(0.05, Math.min(0.95, (curRect.left + curRect.width / 2) / window.innerWidth));
        const curY = Math.max(0.05, Math.min(0.95, (curRect.top + curRect.height / 2) / window.innerHeight));
        confetti({
          particleCount: 40,
          spread: 180,
          startVelocity: 25,
          origin: { x: curX, y: curY },
          colors: ['#FFD700', '#FFFFFF', '#FFA500'],
          ticks: 200,
          gravity: 0.75,
          scalar: 0.95,
          zIndex: 999999,
          disableForReducedMotion: true,
        });
      }, 320);
    };

    let targetElement: HTMLElement | null = null;
    let confettiObserver: IntersectionObserver | null = null;

    const checkVisibilityAndTrigger = (el: HTMLElement) => {
      if (confettiHasExploded) return;

      const rect = el.getBoundingClientRect();
      const inViewport =
        rect.top < window.innerHeight * 0.85 &&
        rect.bottom > window.innerHeight * 0.15;

      if (inViewport) {
        triggerMaisEscolhidoConfetti(el);
      }
    };

    const handleScrollOrResize = () => {
      if (targetElement && !confettiHasExploded) {
        checkVisibilityAndTrigger(targetElement);
      }
    };

    const setupMaisEscolhidoObserver = () => {
      const el =
        (document.getElementById('mais-escolhido-badge') as HTMLElement | null) ||
        (document.querySelector('[data-confetti-target="true"]') as HTMLElement | null) ||
        (document.querySelector('.elementor-element-7526f71 .elementor-heading-title') as HTMLElement | null) ||
        (document.querySelector('.elementor-element-7526f71') as HTMLElement | null) ||
        (Array.from(document.querySelectorAll('h2, .elementor-heading-title')).find(
          (node) => node.textContent && node.textContent.includes('Mais escolhido')
        ) as HTMLElement | null);

      if (el && !targetElement) {
        targetElement = el;

        if ('IntersectionObserver' in window) {
          confettiObserver = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting && !confettiHasExploded) {
                  triggerMaisEscolhidoConfetti(el);
                }
              });
            },
            {
              threshold: [0.1, 0.5],
              rootMargin: '0px 0px -50px 0px',
            }
          );
          confettiObserver.observe(el);
        }

        window.addEventListener('scroll', handleScrollOrResize, { passive: true });
        window.addEventListener('resize', handleScrollOrResize, { passive: true });
        checkVisibilityAndTrigger(el);
        return true;
      }
      return !!targetElement;
    };

    if (!setupMaisEscolhidoObserver()) {
      const observerRetry = setInterval(() => {
        if (confettiHasExploded) {
          clearInterval(observerRetry);
          return;
        }
        if (setupMaisEscolhidoObserver()) {
          clearInterval(observerRetry);
        }
      }, 150);
      setTimeout(() => clearInterval(observerRetry), 4000);
    }

    document.addEventListener('click', handleAccordionClick);
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      if (confettiObserver) confettiObserver.disconnect();
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
      if (midnightTimer) clearTimeout(midnightTimer);
      clearInterval(promoCheckInterval);
      document.removeEventListener('visibilitychange', handleVisibilityOrFocus);
      window.removeEventListener('focus', handleVisibilityOrFocus);
      clearInterval(interval);
      document.removeEventListener('click', handleAccordionClick);
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('keydown', handleKeyDown);
      if (swiper1Instance && swiper1Instance.destroy) swiper1Instance.destroy(true, true);
      if (swiper2Instance && swiper2Instance.destroy) swiper2Instance.destroy(true, true);
    };
  }, []);

  return (
    <>
      <div
        id="landing-page-root"
        dangerouslySetInnerHTML={{ __html: pageHtml }}
      />
      <SalesNotification />
    </>
  );
}

