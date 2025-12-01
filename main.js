import './style.css';
import { initTheme, toggleTheme } from './src/core/theme/theme-toggle.js';
import { initHero } from './src/modules/hero/hero.js';
import { initBooking } from './src/modules/booking/booking.js';
import { initGallery } from './src/modules/showcase/gallery.js';
import { initAmenities } from './src/modules/amenities/amenities.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Core
  initTheme();

  // Theme Toggle Listener
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }

  // Initialize Modules
  initHero();
  initGallery();
  initAmenities();
  initBooking();
});
