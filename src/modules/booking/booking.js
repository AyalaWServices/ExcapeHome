import { validateBookingForm } from '../../core/security/validation.js';
import { createButton } from '../../shared/ui/components.js';

export const initBooking = () => {
  const container = document.getElementById('booking-container');
  if (!container) return;

  // Render the booking form with custom UI
  container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      <div class="space-y-8">
        <h2 class="text-3xl md:text-4xl font-serif text-primary dark:text-secondary">Secure Your Dates</h2>
        <p class="text-neutral-charcoal/80 dark:text-neutral-cream/80">Select your check-in and check-out dates to begin your journey.</p>
        
        <form id="booking-form" class="space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <div class="relative group">
              <label class="block text-xs uppercase tracking-widest mb-2 font-bold text-primary dark:text-secondary">Check-In</label>
              <input type="text" id="check-in-display" readonly placeholder="Select Date" 
                class="w-full bg-transparent border-b-2 border-neutral-charcoal/20 dark:border-neutral-cream/20 py-3 text-lg focus:outline-none focus:border-secondary transition-colors cursor-pointer font-serif">
              <input type="date" id="check-in" name="checkIn" class="absolute inset-0 opacity-0 cursor-pointer">
            </div>
            <div class="relative group">
              <label class="block text-xs uppercase tracking-widest mb-2 font-bold text-primary dark:text-secondary">Check-Out</label>
              <input type="text" id="check-out-display" readonly placeholder="Select Date" 
                class="w-full bg-transparent border-b-2 border-neutral-charcoal/20 dark:border-neutral-cream/20 py-3 text-lg focus:outline-none focus:border-secondary transition-colors cursor-pointer font-serif">
              <input type="date" id="check-out" name="checkOut" class="absolute inset-0 opacity-0 cursor-pointer">
            </div>
          </div>
          
          <div>
            <label class="block text-xs uppercase tracking-widest mb-2 font-bold text-primary dark:text-secondary">Guests</label>
            <div class="relative">
              <select name="guests" class="w-full bg-transparent border-b-2 border-neutral-charcoal/20 dark:border-neutral-cream/20 py-3 text-lg focus:outline-none focus:border-secondary transition-colors appearance-none font-serif cursor-pointer">
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
              </select>
              <div class="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-primary dark:text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div id="form-errors" class="text-red-500 text-sm hidden bg-red-50 p-4 border-l-4 border-red-500"></div>
          
          <div class="pt-4" id="submit-btn-container">
            <!-- Button injected here -->
          </div>
        </form>
      </div>

      <div class="bg-primary/5 dark:bg-white/5 p-8 border border-primary/10 backdrop-blur-sm sticky top-8">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-serif text-primary dark:text-secondary">Reservation Summary</h3>
          <span class="text-xs uppercase tracking-widest opacity-60 bg-primary/10 px-2 py-1">Pending</span>
        </div>
        <div class="space-y-4 text-sm font-sans">
          <div class="flex justify-between py-3 border-b border-dashed border-neutral-charcoal/20 dark:border-neutral-cream/20">
            <span>Nightly Rate</span>
            <span class="font-bold">$450.00</span>
          </div>
           <div class="flex justify-between py-3 border-b border-dashed border-neutral-charcoal/20 dark:border-neutral-cream/20">
            <span>Nights</span>
            <span id="summary-nights">0</span>
          </div>
          <div class="flex justify-between py-3 text-xl font-serif font-bold text-primary dark:text-secondary mt-4">
            <span>Total</span>
            <span id="summary-total">$0.00</span>
          </div>
        </div>
        <div class="mt-6 text-xs text-center opacity-60">
          *Taxes and fees calculated at checkout
        </div>
      </div>
    </div>
  `;

  // Logic to sync custom display with hidden date input
  const setupDateInput = (id, displayId) => {
    const input = document.getElementById(id);
    const display = document.getElementById(displayId);

    input.addEventListener('change', (e) => {
      if (e.target.value) {
        const date = new Date(e.target.value + 'T00:00:00'); // Fix timezone issue
        display.value = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        updateSummary();
      }
    });

    // Trigger calendar on text click
    // Note: showPicker is supported in modern browsers (Chrome 99+, Safari 16+, Firefox 101+)
    // Fallback is handled by the absolute positioning of the date input over the text input
    if ('showPicker' in HTMLInputElement.prototype) {
      display.addEventListener('click', () => {
        try {
          input.showPicker();
        } catch (err) {
          // Fallback handled by CSS overlay
        }
      });
    }
  };

  setupDateInput('check-in', 'check-in-display');
  setupDateInput('check-out', 'check-out-display');

  const updateSummary = () => {
    const checkIn = document.getElementById('check-in').value;
    const checkOut = document.getElementById('check-out').value;

    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);

      // Calculate difference in time
      const diffTime = end - start;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 0) {
        document.getElementById('summary-nights').textContent = diffDays;
        document.getElementById('summary-total').textContent = `$${(diffDays * 450).toLocaleString()}.00`;
      } else {
        document.getElementById('summary-nights').textContent = '0';
        document.getElementById('summary-total').textContent = '$0.00';
      }
    }
  };

  // Submit Button
  const submitContainer = document.getElementById('submit-btn-container');
  const submitBtn = createButton({
    text: 'Request Reservation',
    type: 'submit',
    variant: 'primary',
    className: 'w-full shadow-lg hover:shadow-xl'
  });
  submitContainer.appendChild(submitBtn);

  // Form Validation
  const form = document.getElementById('booking-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(form));
    const validation = validateBookingForm(formData);

    const errorDiv = document.getElementById('form-errors');
    if (!validation.isValid) {
      errorDiv.innerHTML = Object.values(validation.errors).join('<br>');
      errorDiv.classList.remove('hidden');
    } else {
      errorDiv.classList.add('hidden');
      // Mock submission
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Processing...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = 'Request Sent!';
        submitBtn.classList.remove('bg-primary');
        submitBtn.classList.add('bg-green-600');
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.classList.add('bg-primary');
          submitBtn.classList.remove('bg-green-600');
          form.reset();
          document.getElementById('check-in-display').value = '';
          document.getElementById('check-out-display').value = '';
          document.getElementById('summary-nights').textContent = '0';
          document.getElementById('summary-total').textContent = '$0.00';
        }, 2000);
      }, 1000);
    }
  });
};
