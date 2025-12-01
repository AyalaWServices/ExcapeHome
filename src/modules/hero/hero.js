import { createButton } from '../../shared/ui/components.js';

export const initHero = () => {
  const heroSection = document.getElementById('hero');
  if (!heroSection) return;

  const ctaContainer = heroSection.querySelector('.js-hero-cta');
  if (ctaContainer) {
    // Clear existing content just in case
    ctaContainer.innerHTML = '';

    const bookBtn = createButton({
      text: 'Plan Your Adventure',
      variant: 'primary', // Using primary as per design, could be outline if on dark bg
      className: 'shadow-lg hover:shadow-xl transform hover:-translate-y-1',
      onClick: () => {
        const bookingSection = document.getElementById('booking');
        if (bookingSection) {
          bookingSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });

    ctaContainer.appendChild(bookBtn);
  }
};
