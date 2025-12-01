export const initAmenities = () => {
  const container = document.getElementById('amenities-list');
  if (!container) return;

  const amenities = [
    { label: 'High-Speed Starlink WiFi', desc: 'Stay connected in the wild' },
    { label: 'Wood-Burning Fireplace', desc: 'Cozy evenings guaranteed' },
    { label: 'Gourmet Coffee Bar', desc: 'Local roasts & espresso machine' },
    { label: 'Cedar Hot Tub', desc: 'Relax under the stars' },
    { label: 'EV Charging Station', desc: 'Level 2 charger available' },
    { label: 'Private Hiking Trails', desc: 'Direct access to nature' },
    { label: 'Chef\'s Kitchen', desc: 'Fully equipped for feasts' },
    { label: 'Smart Home Control', desc: 'Lighting & climate at a touch' },
  ];

  // Generic checkmark icon for now
  const checkIcon = `<svg class="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;

  container.innerHTML = amenities.map(item => `
    <li class="flex items-start space-x-4 p-6 border border-neutral-charcoal/10 dark:border-neutral-cream/10 hover:bg-primary/5 dark:hover:bg-white/5 transition-colors duration-300 group">
      <span class="p-2 bg-primary/10 dark:bg-white/10 rounded-none text-primary dark:text-secondary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
        ${checkIcon}
      </span>
      <div>
        <h4 class="font-serif text-lg text-primary dark:text-neutral-cream mb-1">${item.label}</h4>
        <p class="text-sm text-neutral-charcoal/60 dark:text-neutral-cream/60 font-sans">${item.desc}</p>
      </div>
    </li>
  `).join('');
};
