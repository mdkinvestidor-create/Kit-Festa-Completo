import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface NotificationData {
  name: string;
  city: string;
  timeAgo: string;
}

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
  'há 4 minutos',
];

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function SalesNotification() {
  const [currentNotification, setCurrentNotification] = useState<NotificationData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [topOffset, setTopOffset] = useState<number>(50);

  // Lists of unique, non-repeating names and cities
  const namesQueueRef = useRef<string[]>([]);
  const citiesQueueRef = useRef<string[]>([]);
  const queueIndexRef = useRef<number>(0);

  const dismissTimerRef = useRef<NodeJS.Timeout | null>(null);
  const nextTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Measure the exact position of the top banner to sit right beneath it
    const updateTopOffset = () => {
      const banner = document.querySelector('.elementor-element-2b71f6b');
      if (banner) {
        const rect = banner.getBoundingClientRect();
        // Place toast 8px below the banner bottom edge (min 46px)
        setTopOffset(Math.max(Math.round(rect.bottom + 8), 46));
      }
    };

    updateTopOffset();
    window.addEventListener('resize', updateTopOffset);
    window.addEventListener('scroll', updateTopOffset, { passive: true });

    // 1. Prepare shuffled queues with Sônia as the opening example requested
    const otherNames = ALL_NAMES.filter((n) => n !== 'Sônia');
    const shuffledOthers = shuffleArray(otherNames);
    namesQueueRef.current = ['Sônia', ...shuffledOthers];

    const shuffledCities = shuffleArray(ALL_CITIES);
    citiesQueueRef.current = shuffledCities;
    queueIndexRef.current = 0;

    const showNext = () => {
      updateTopOffset();
      const names = namesQueueRef.current;
      const cities = citiesQueueRef.current;
      const idx = queueIndexRef.current;

      // Stop if all unique names/cities have been displayed
      if (idx >= names.length || idx >= cities.length) {
        return;
      }

      const name = names[idx];
      const city = cities[idx];
      const timeAgo = TIMES[idx % TIMES.length];

      queueIndexRef.current = idx + 1;
      setCurrentNotification({ name, city, timeAgo });
      setIsVisible(true);

      // Keep notification visible for 4.5 seconds
      dismissTimerRef.current = setTimeout(() => {
        hideAndScheduleNext();
      }, 4500);
    };

    const hideAndScheduleNext = () => {
      setIsVisible(false);

      // Once it disappears, the next one appears strictly after 9 seconds
      nextTimerRef.current = setTimeout(() => {
        showNext();
      }, 9000);
    };

    // The first notification appears shortly after user enters (1.2s)
    const initialDelayTimer = setTimeout(() => {
      showNext();
    }, 1200);

    return () => {
      window.removeEventListener('resize', updateTopOffset);
      window.removeEventListener('scroll', updateTopOffset);
      clearTimeout(initialDelayTimer);
      if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
      if (nextTimerRef.current) clearTimeout(nextTimerRef.current);
    };
  }, []);

  const handleManualClose = () => {
    if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
    if (nextTimerRef.current) clearTimeout(nextTimerRef.current);

    setIsVisible(false);

    // When closed manually, the next one still waits exactly 9 seconds
    nextTimerRef.current = setTimeout(() => {
      const names = namesQueueRef.current;
      const cities = citiesQueueRef.current;
      const idx = queueIndexRef.current;

      if (idx < names.length && idx < cities.length) {
        const name = names[idx];
        const city = cities[idx];
        const timeAgo = TIMES[idx % TIMES.length];
        queueIndexRef.current = idx + 1;
        setCurrentNotification({ name, city, timeAgo });
        setIsVisible(true);

        dismissTimerRef.current = setTimeout(() => {
          setIsVisible(false);
          nextTimerRef.current = setTimeout(() => {
            handleManualClose();
          }, 9000);
        }, 4500);
      }
    }, 9000);
  };

  if (!currentNotification) return null;

  return (
    <aside
      id="sales-notification-toast"
      aria-live="polite"
      aria-atomic="true"
      style={{ top: `${topOffset}px` }}
      className={`fixed left-1/2 -translate-x-1/2 z-50 max-w-[324px] w-[calc(100%-2.5rem)] sm:w-auto transition-all duration-500 ease-out transform ${
        isVisible
          ? 'translate-y-0 opacity-100 scale-90 pointer-events-auto'
          : '-translate-y-4 opacity-0 scale-[0.85] pointer-events-none'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md border border-neutral-200/90 rounded-2xl shadow-xl shadow-neutral-900/15 p-2 sm:p-2.5 flex items-center gap-2.5 relative text-left select-none">
        {/* Thumbnail with verification badge */}
        <div className="relative shrink-0 w-10 h-10 rounded-xl overflow-hidden bg-pink-50 border border-pink-100 flex items-center justify-center">
          <img
            src="/assets/images/kt-mockups-capa.webp"
            alt="Kit Completo"
            className="w-full h-full object-cover"
          />
          <span className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 text-white rounded-full p-0.5 shadow-sm ring-1 ring-white">
            <CheckCircle2 className="w-2.5 h-2.5" />
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-3.5">
          <p className="text-[11.5px] sm:text-[12px] leading-tight text-neutral-800">
            <strong className="font-bold text-neutral-950">{currentNotification.name}</strong> acabou de comprar o{' '}
            <span className="text-[#e91e8c] font-semibold">kit completo</span>
          </p>
          <p className="flex items-center gap-1 mt-0.5 text-[10px] text-neutral-500">
            <span className="truncate max-w-[160px] text-neutral-600 font-medium">
              📍 {currentNotification.city}
            </span>
            <span className="text-neutral-300">•</span>
            <span className="shrink-0 text-neutral-400">{currentNotification.timeAgo}</span>
          </p>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={handleManualClose}
          aria-label="Fechar notificação de compra"
          className="absolute top-1.5 right-1.5 text-neutral-400 hover:text-neutral-700 transition-colors p-1 rounded-full hover:bg-neutral-100"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </aside>
  );
}
