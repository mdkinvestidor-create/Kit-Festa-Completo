// Landing page interactivity script
(function() {
  'use strict';

  function initLandingPage() {
    // Top banner dynamic date & automatic midnight rollover ("assim que virar o dia")
    const DAYS_OF_WEEK = [
      'DOMINGO',
      'SEGUNDA-FEIRA',
      'TERÇA-FEIRA',
      'QUARTA-FEIRA',
      'QUINTA-FEIRA',
      'SEXTA-FEIRA',
      'SÁBADO'
    ];

    function updatePromoDate() {
      const headingEl = document.querySelector('.elementor-element-8c727ba .elementor-heading-title');
      if (headingEl) {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const dayOfWeek = DAYS_OF_WEEK[now.getDay()];
        const fullText = `PROMOÇÃO VÁLIDA ATÉ O DIA ${day}/${month}/${year} ${dayOfWeek}`;
        const bannerHtml = `PROMOÇÃO VÁLIDA ATÉ O DIA <span class="data-promo-piscante">${day}/${month}/${year}</span> ${dayOfWeek}`;

        if (headingEl.innerHTML !== bannerHtml) {
          headingEl.innerHTML = bannerHtml;
        }
      }
    }

    updatePromoDate();

    let midnightTimer = null;
    function scheduleMidnightUpdate() {
      if (midnightTimer) clearTimeout(midnightTimer);
      const now = new Date();
      const nextMidnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0, 0, 0, 50
      );
      const msUntilMidnight = Math.max(1000, nextMidnight.getTime() - now.getTime());

      midnightTimer = setTimeout(function() {
        updatePromoDate();
        scheduleMidnightUpdate();
      }, msUntilMidnight);
    }

    scheduleMidnightUpdate();
    setInterval(updatePromoDate, 30000);

    function handleVisibilityOrFocus() {
      if (document.visibilityState === 'visible') {
        updatePromoDate();
        scheduleMidnightUpdate();
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityOrFocus);
    window.addEventListener('focus', handleVisibilityOrFocus);

    // 1. Initialize Swiper 1 (Kits Showcase Carousel)
    try {
      const swiper1El = document.querySelector('.elementor-element-35d0582 .swiper');
      if (swiper1El && window.Swiper) {
        new window.Swiper(swiper1El, {
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
            }
          }
        });
      }
    } catch (e) {
      console.warn('Swiper 1 init error:', e);
    }

    // 2. Initialize Swiper 2 (Social Proof Testimonials Carousel - Slow continuous glide right-to-left)
    try {
      const swiper2El = document.querySelector('.elementor-element-fdf642b .swiper');
      if (swiper2El && window.Swiper) {
        new window.Swiper(swiper2El, {
          slidesPerView: 2,
          spaceBetween: 8,
          loop: true,
          speed: 5500,
          autoplay: {
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          },
          allowTouchMove: true,
          grabCursor: true,
          pagination: {
            el: '.elementor-element-fdf642b .swiper-pagination',
            clickable: true,
          },
          breakpoints: {
            640: {
              slidesPerView: 3,
              spaceBetween: 12,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 14,
            }
          }
        });
      }
    } catch (e) {
      console.warn('Swiper 2 init error:', e);
    }

    // 3. FAQ Accordion Click Handler
    const accordionItems = document.querySelectorAll('.elementor-accordion-item');
    accordionItems.forEach(function(item) {
      const title = item.querySelector('.elementor-tab-title');
      const content = item.querySelector('.elementor-tab-content');
      if (!title || !content) return;

      title.addEventListener('click', function(e) {
        e.preventDefault();
        const isOpen = title.classList.contains('elementor-active');

        // Optional: close siblings if desired, or toggle individually
        if (isOpen) {
          title.classList.remove('elementor-active');
          title.setAttribute('aria-expanded', 'false');
          content.style.display = 'none';
        } else {
          title.classList.add('elementor-active');
          title.setAttribute('aria-expanded', 'true');
          content.style.display = 'block';
        }
      });
    });

    // 4. Modal Popup Handlers ("QUERO SOMENTE O BÁSICO")
    const modalTrigger = document.querySelector('[data-toggle="premium-modal"], [data-target="#premium-modal-2047254"]');
    const modalBox = document.getElementById('premium-modal-2047254');
    const closeBtn = document.querySelector('.custom-modal-close-btn');

    function triggerPopupConfetti() {
      if (typeof window.confetti === 'function') {
        // Stage 1: Big central radial explosion across the popup
        window.confetti({
          particleCount: 85,
          spread: 360,
          startVelocity: 36,
          origin: { x: 0.5, y: 0.45 },
          colors: ['#FFD700', '#FF008A', '#00E676', '#3B82F6', '#FFA500', '#FFFFFF', '#9333EA'],
          ticks: 250,
          gravity: 0.85,
          scalar: 1.2,
          zIndex: 9999999,
          disableForReducedMotion: true
        });

        // Stage 2: Left and right celebratory cannons firing inwards
        setTimeout(function() {
          window.confetti({
            particleCount: 55,
            angle: 60,
            spread: 65,
            startVelocity: 44,
            origin: { x: 0.15, y: 0.7 },
            colors: ['#FFD700', '#FF008A', '#FFA500', '#00E676'],
            ticks: 260,
            zIndex: 9999999,
            disableForReducedMotion: true
          });
          window.confetti({
            particleCount: 55,
            angle: 120,
            spread: 65,
            startVelocity: 44,
            origin: { x: 0.85, y: 0.7 },
            colors: ['#FFD700', '#3B82F6', '#FF008A', '#00E676'],
            ticks: 260,
            zIndex: 9999999,
            disableForReducedMotion: true
          });
        }, 120);

        // Stage 3: Golden star and circle fireworks from top center
        setTimeout(function() {
          window.confetti({
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
            disableForReducedMotion: true
          });
        }, 250);
      }
    }

    function openModal() {
      if (!modalBox) return;
      modalBox.style.display = 'flex';
      modalBox.classList.add('premium-in');
      document.body.style.overflow = 'hidden';

      // Confetti explosion when user enters the popup
      triggerPopupConfetti();
    }

    function closeModal() {
      if (!modalBox) return;
      modalBox.style.display = 'none';
      modalBox.classList.remove('premium-in');
      document.body.style.overflow = '';
    }

    if (modalTrigger) {
      modalTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        openModal();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal();
      });
    }

    if (modalBox) {
      modalBox.addEventListener('click', function(e) {
        // If clicking the backdrop outside of the dialog
        if (e.target === modalBox) {
          closeModal();
        }
      });
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modalBox && modalBox.classList.contains('premium-in')) {
        closeModal();
      }
    });

    // 5. Smooth scroll for anchor links (e.g. #ofertas)
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').slice(1);
        if (!targetId) return;
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // 5.1 Confetti celebration explosion when user reaches "🏆 Mais escolhido" (explodes strictly ONCE)
    var confettiHasExploded = false;
    var confettiObserver = null;

    function handleScrollOrResize() {
      if (maisEscolhidoElement && !confettiHasExploded) {
        checkVisibilityAndTrigger(maisEscolhidoElement);
      }
    }

    function triggerMaisEscolhidoConfetti(el) {
      if (confettiHasExploded) return;
      confettiHasExploded = true;

      // Clean up observers and listeners immediately
      if (confettiObserver) {
        confettiObserver.disconnect();
        confettiObserver = null;
      }
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);

      if (typeof window.confetti === 'function') {
        var rect = el.getBoundingClientRect();
        var originX = Math.max(0.05, Math.min(0.95, (rect.left + rect.width / 2) / window.innerWidth));
        var originY = Math.max(0.05, Math.min(0.95, (rect.top + rect.height / 2) / window.innerHeight));

        // Visual bounce explosion animation on the word itself
        el.classList.remove('mais-escolhido-exploding');
        void el.offsetWidth;
        el.classList.add('mais-escolhido-exploding');
        setTimeout(function() {
          el.classList.remove('mais-escolhido-exploding');
        }, 1200);

        // Burst 1: Immediate 360-degree explosion bursting out from the word center
        window.confetti({
          particleCount: 95,
          spread: 360,
          startVelocity: 38,
          origin: { x: originX, y: originY },
          colors: ['#FFD700', '#FFA500', '#FF008A', '#00E676', '#3B82F6', '#FFFFFF', '#FF3D00', '#A855F7'],
          ticks: 240,
          gravity: 0.85,
          scalar: 1.2,
          zIndex: 999999,
          disableForReducedMotion: true
        });

        // Burst 2: Upward fan celebration burst with stars and circles
        setTimeout(function() {
          var curRect = el.getBoundingClientRect();
          var curX = Math.max(0.05, Math.min(0.95, (curRect.left + curRect.width / 2) / window.innerWidth));
          var curY = Math.max(0.05, Math.min(0.95, (curRect.top + curRect.height / 2) / window.innerHeight));
          window.confetti({
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
            disableForReducedMotion: true
          });
        }, 90);

        // Burst 3: Side sparks
        setTimeout(function() {
          var curRect = el.getBoundingClientRect();
          var leftX = Math.max(0.05, Math.min(0.95, (curRect.left + curRect.width * 0.25) / window.innerWidth));
          var rightX = Math.max(0.05, Math.min(0.95, (curRect.left + curRect.width * 0.75) / window.innerWidth));
          var curY = Math.max(0.05, Math.min(0.95, (curRect.top + curRect.height / 2) / window.innerHeight));
          window.confetti({
            particleCount: 50,
            angle: 60,
            spread: 70,
            startVelocity: 36,
            origin: { x: leftX, y: curY },
            colors: ['#FFD700', '#FF1493', '#22C55E'],
            zIndex: 999999,
            disableForReducedMotion: true
          });
          window.confetti({
            particleCount: 50,
            angle: 120,
            spread: 70,
            startVelocity: 36,
            origin: { x: rightX, y: curY },
            colors: ['#FFD700', '#3B82F6', '#FF008A'],
            zIndex: 999999,
            disableForReducedMotion: true
          });
        }, 190);

        // Burst 4: Sparkles finish
        setTimeout(function() {
          var curRect = el.getBoundingClientRect();
          var curX = Math.max(0.05, Math.min(0.95, (curRect.left + curRect.width / 2) / window.innerWidth));
          var curY = Math.max(0.05, Math.min(0.95, (curRect.top + curRect.height / 2) / window.innerHeight));
          window.confetti({
            particleCount: 40,
            spread: 180,
            startVelocity: 25,
            origin: { x: curX, y: curY },
            colors: ['#FFD700', '#FFFFFF', '#FFA500'],
            ticks: 200,
            gravity: 0.75,
            scalar: 0.95,
            zIndex: 999999,
            disableForReducedMotion: true
          });
        }, 320);
      }
    }

    var maisEscolhidoElement =
      document.getElementById('mais-escolhido-badge') ||
      document.querySelector('[data-confetti-target="true"]') ||
      document.querySelector('.elementor-element-7526f71 .elementor-heading-title') ||
      document.querySelector('.elementor-element-7526f71') ||
      Array.from(document.querySelectorAll('h2, .elementor-heading-title')).find(function(el) {
        return el.textContent && el.textContent.includes('Mais escolhido');
      });

    function checkVisibilityAndTrigger(el) {
      if (confettiHasExploded) return;

      var rect = el.getBoundingClientRect();
      var inViewport =
        rect.top < window.innerHeight * 0.85 &&
        rect.bottom > window.innerHeight * 0.15;

      if (inViewport) {
        triggerMaisEscolhidoConfetti(el);
      }
    }

    if (maisEscolhidoElement) {
      if ('IntersectionObserver' in window) {
        confettiObserver = new IntersectionObserver(
          function(entries) {
            entries.forEach(function(entry) {
              if (entry.isIntersecting && !confettiHasExploded) {
                triggerMaisEscolhidoConfetti(maisEscolhidoElement);
              }
            });
          },
          {
            threshold: [0.1, 0.5],
            rootMargin: '0px 0px -50px 0px'
          }
        );
        confettiObserver.observe(maisEscolhidoElement);
      }

      window.addEventListener('scroll', handleScrollOrResize, { passive: true });
      window.addEventListener('resize', handleScrollOrResize, { passive: true });
    }

    // 6. Real-time Sales Toast Notification (Non-repeating names & cities, 9s delay)
    (function initSalesNotification() {
      const ALL_NAMES = [
        'Sônia', 'Mariana', 'Juliana', 'Aline', 'Camila', 'Fernanda', 'Patrícia', 'Renata',
        'Larissa', 'Carla', 'Bruna', 'Beatriz', 'Débora', 'Luciana', 'Tatiane', 'Vanessa',
        'Daniela', 'Priscila', 'Cláudia', 'Elaine', 'Cristiane', 'Natália', 'Amanda', 'Letícia',
        'Sabrina', 'Rafaela', 'Bianca', 'Gabriela', 'Jéssica', 'Monique', 'Simone', 'Flávia',
        'Rosana', 'Helena', 'Luana', 'Jaqueline', 'Talita', 'Viviane', 'Fabiana', 'Michele',
        'Andréia', 'Raquel', 'Carolina', 'Gisele', 'Marta', 'Ana Paula', 'Silvia', 'Adriana',
        'Roberta', 'Paloma', 'Tânia', 'Kelly', 'Milena', 'Lorena', 'Clarice', 'Cíntia',
        'Thais', 'Suzana', 'Mirian', 'Evelyn'
      ];

      const ALL_CITIES = [
        'São Paulo - SP', 'Rio de Janeiro - RJ', 'Belo Horizonte - MG', 'Curitiba - PR',
        'Porto Alegre - RS', 'Salvador - BA', 'Fortaleza - CE', 'Brasília - DF',
        'Goiânia - GO', 'Campinas - SP', 'Recife - PE', 'Florianópolis - SC',
        'Manaus - AM', 'Vitória - ES', 'Sorocaba - SP', 'Londrina - PR',
        'Ribeirão Preto - SP', 'Caxias do Sul - RS', 'Santos - SP', 'Natal - RN',
        'Joinville - SC', 'São José dos Campos - SP', 'Maringá - PR', 'Uberlândia - MG',
        'Belém - PA', 'Campo Grande - MS', 'João Pessoa - PB', 'Juiz de Fora - MG',
        'Niterói - RJ', 'Cuiabá - MT', 'Blumenau - SC', 'Piracicaba - SP',
        'Bauru - SP', 'São Luís - MA', 'Maceió - AL', 'Jundiaí - SP',
        'Teresina - PI', 'Aracaju - SE', 'Pelotas - RS', 'Volta Redonda - RJ',
        'Franca - SP', 'Ponta Grossa - PR', 'Cascavel - PR', 'Vila Velha - ES',
        'Montes Claros - MG', 'Taubaté - SP', 'Anápolis - GO', 'Petrópolis - RJ',
        'Feira de Santana - BA', 'Foz do Iguaçu - PR', 'Passo Fundo - RS', 'Gramado - RS',
        'Praia Grande - SP', 'Governador Valadares - MG', 'Chapecó - SC', 'Itajaí - SC',
        'Betim - MG', 'Cabo Frio - RJ', 'Limeira - SP', 'Suzano - SP'
      ];

      const TIMES = [
        'há poucos instantes',
        'há 1 minuto',
        'há 2 minutos',
        'há 3 minutos',
        'há 4 minutos'
      ];

      function shuffle(array) {
        const copy = array.slice();
        for (let i = copy.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = copy[i];
          copy[i] = copy[j];
          copy[j] = temp;
        }
        return copy;
      }

      const otherNames = ALL_NAMES.filter(function(n) { return n !== 'Sônia'; });
      const namesQueue = ['Sônia'].concat(shuffle(otherNames));
      const citiesQueue = shuffle(ALL_CITIES);
      let queueIdx = 0;

      // Create container
      const container = document.createElement('div');
      container.id = 'sales-notification-toast';
      container.style.cssText = 'position: fixed; top: 50px; left: 50%; z-index: 99999; max-width: 360px; width: calc(100% - 32px); transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); transform: translate(-50%, -16px); opacity: 0; pointer-events: none; font-family: "Poppins", sans-serif;';

      container.innerHTML = `
        <div style="background: rgba(255, 255, 255, 0.98); backdrop-filter: blur(10px); border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1); padding: 10px 14px; display: flex; align-items: center; gap: 12px; position: relative; user-select: none;">
          <div style="position: relative; flex-shrink: 0; width: 42px; height: 42px; border-radius: 12px; overflow: hidden; background: #fdf2f8; border: 1px solid #fce7f3; display: flex; align-items: center; justify-content: center;">
            <img src="/assets/images/kt-mockups-capa.webp" alt="Kit Completo" style="width: 100%; height: 100%; object-fit: cover;">
            <span style="position: absolute; bottom: -2px; right: -2px; background: #10b981; color: #ffffff; border-radius: 50%; width: 14px; height: 14px; display: flex; align-items: center; justify-content: center; box-shadow: 0 1px 2px rgba(0,0,0,0.1); border: 1.5px solid #ffffff;">
              <svg style="width: 8px; height: 8px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </span>
          </div>
          <div style="flex: 1; min-width: 0; padding-right: 14px;">
            <p id="sales-toast-title" style="margin: 0; font-size: 12.5px; line-height: 1.25; color: #1f2937;">
              <strong id="sales-toast-name" style="color: #111827; font-weight: 700;">Sônia</strong> acabou de comprar o <span style="color: #e91e8c; font-weight: 600;">kit completo</span>
            </p>
            <p style="margin: 3px 0 0; display: flex; align-items: center; gap: 6px; font-size: 11px; color: #6b7280;">
              <span id="sales-toast-city" style="color: #4b5563; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 180px;">📍 São Paulo - SP</span>
              <span style="color: #d1d5db;">•</span>
              <span id="sales-toast-time" style="flex-shrink: 0; color: #9ca3af;">há 2 minutos</span>
            </p>
          </div>
          <button id="sales-toast-close" type="button" aria-label="Fechar notificação" style="position: absolute; top: 8px; right: 8px; border: none; background: transparent; color: #9ca3af; cursor: pointer; padding: 4px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
            <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      `;

      document.body.appendChild(container);

      let dismissTimer = null;
      let nextTimer = null;

      function updateTopPos() {
        const bar = document.querySelector('.elementor-element-2b71f6b');
        if (bar) {
          const rect = bar.getBoundingClientRect();
          const top = Math.max(Math.round(rect.bottom + 8), 46);
          container.style.top = top + 'px';
        }
      }

      window.addEventListener('resize', updateTopPos);
      window.addEventListener('scroll', updateTopPos, { passive: true });

      function hideAndScheduleNext() {
        container.style.transform = 'translate(-50%, -16px)';
        container.style.opacity = '0';
        container.style.pointerEvents = 'none';

        // Wait strictly 9 seconds after disappearing before showing next
        nextTimer = setTimeout(showNext, 9000);
      }

      function showNext() {
        if (queueIdx >= namesQueue.length || queueIdx >= citiesQueue.length) {
          return;
        }

        updateTopPos();

        const name = namesQueue[queueIdx];
        const city = citiesQueue[queueIdx];
        const time = TIMES[queueIdx % TIMES.length];
        queueIdx++;

        const nameEl = document.getElementById('sales-toast-name');
        const cityEl = document.getElementById('sales-toast-city');
        const timeEl = document.getElementById('sales-toast-time');

        if (nameEl) nameEl.textContent = name;
        if (cityEl) cityEl.textContent = '📍 ' + city;
        if (timeEl) timeEl.textContent = time;

        container.style.transform = 'translate(-50%, 0)';
        container.style.opacity = '1';
        container.style.pointerEvents = 'auto';

        // Keep on screen for 4.5 seconds
        dismissTimer = setTimeout(hideAndScheduleNext, 4500);
      }

      const closeBtn = document.getElementById('sales-toast-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          if (dismissTimer) clearTimeout(dismissTimer);
          if (nextTimer) clearTimeout(nextTimer);
          hideAndScheduleNext();
        });
      }

      // First notification appears right after entering (1.2 seconds)
      setTimeout(showNext, 1200);
    })();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLandingPage);
  } else {
    initLandingPage();
  }
})();
