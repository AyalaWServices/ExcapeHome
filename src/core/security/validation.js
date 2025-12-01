/**
 * Simple client-side sanitization to prevent basic XSS.
 * @param {string} str - The input string to sanitize.
 * @returns {string} - The sanitized string.
 */
export const sanitizeInput = (str) => {
  if (typeof str !== 'string') return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};

/**
 * Validates the booking form data.
 * @param {Object} data - The form data.
 * @returns {Object} - Result object with isValid boolean and errors object.
 */
export const validateBookingForm = (data) => {
  const errors = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!data.checkIn) {
    errors.checkIn = "Check-in date is required";
  } else if (new Date(data.checkIn) < today) {
    errors.checkIn = "Check-in cannot be in the past";
  }

  if (!data.checkOut) {
    errors.checkOut = "Check-out date is required";
  }

  if (data.checkIn && data.checkOut) {
    const checkInDate = new Date(data.checkIn);
    const checkOutDate = new Date(data.checkOut);

    if (checkOutDate <= checkInDate) {
      errors.checkOut = "Check-out must be after check-in";
    }
  }

  if (!data.guests || parseInt(data.guests) < 1) {
    errors.guests = "At least 1 guest is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
