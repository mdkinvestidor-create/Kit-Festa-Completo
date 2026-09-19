/**
 * Helper to dynamically format the promotional banner date and weekday in Portuguese.
 * Ensures the date and day of week always reflect the current date and roll over automatically at midnight.
 */

export const DAYS_OF_WEEK_PT = [
  'DOMINGO',
  'SEGUNDA-FEIRA',
  'TERÇA-FEIRA',
  'QUARTA-FEIRA',
  'QUINTA-FEIRA',
  'SEXTA-FEIRA',
  'SÁBADO'
];

export function getPromoDateDetails(date = new Date()) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const dayOfWeek = DAYS_OF_WEEK_PT[date.getDay()];
  const formattedDate = `${day}/${month}/${year}`;
  const fullText = `PROMOÇÃO VÁLIDA ATÉ O DIA ${formattedDate} ${dayOfWeek}`;

  return {
    day,
    month,
    year,
    dayOfWeek,
    formattedDate,
    fullText,
    bannerHtml: `<img decoding="async" role="img" class="emoji" alt="⏰" src="/assets/images/23f0.svg"> ${fullText}`
  };
}
