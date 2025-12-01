/**
 * Creates a reusable button component.
 * @param {Object} props - Button properties.
 * @returns {HTMLElement} - The button element.
 */
export const createButton = ({ text, onClick, variant = 'primary', className = '', type = 'button' }) => {
  const btn = document.createElement('button');
  btn.textContent = text;
  btn.type = type;

  const baseClasses = 'px-8 py-4 rounded-none font-sans font-bold transition-all duration-300 uppercase tracking-widest text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary';
  const variants = {
    primary: 'bg-primary text-neutral-cream hover:bg-secondary hover:text-primary',
    secondary: 'bg-secondary text-primary hover:bg-primary hover:text-neutral-cream',
    outline: 'border-2 border-neutral-cream text-neutral-cream hover:bg-neutral-cream hover:text-primary',
    ghost: 'text-primary dark:text-neutral-cream hover:text-secondary'
  };

  btn.className = `${baseClasses} ${variants[variant] || variants.primary} ${className}`;

  if (onClick) {
    btn.addEventListener('click', onClick);
  }

  return btn;
};

/**
 * Creates a reusable card component.
 * @param {Object} props - Card properties.
 * @returns {HTMLElement} - The card element.
 */
export const createCard = ({ title, content, image, className = '' }) => {
  const card = document.createElement('article');
  card.className = `bg-white dark:bg-neutral-charcoal shadow-xl overflow-hidden group hover:shadow-2xl transition-shadow duration-300 ${className}`;

  let imageHtml = '';
  if (image) {
    imageHtml = `
      <div class="relative overflow-hidden aspect-[4/3]">
        <img src="${image}" alt="${title}" class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" loading="lazy">
        <div class="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-300"></div>
      </div>
    `;
  }

  card.innerHTML = `
    ${imageHtml}
    <div class="p-8">
      <h3 class="text-2xl mb-4 font-serif text-primary dark:text-secondary">${title}</h3>
      <div class="text-neutral-charcoal/80 dark:text-neutral-cream/80 leading-relaxed font-sans text-sm">
        ${content}
      </div>
    </div>
  `;

  return card;
};
