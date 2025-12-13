// Form validation and formatting utilities

/**
 * Formats phone number as user types: (555) 123-4567
 */
export function formatPhoneNumber(value: string): string {
  // Remove all non-digits
  const cleaned = value.replace(/\D/g, '');
  
  // Format based on length
  if (cleaned.length <= 3) {
    return cleaned;
  } else if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  } else {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  }
}

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates phone number (requires at least 10 digits)
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10;
}

/**
 * Formats currency input: adds $ and thousand separators
 */
export function formatCurrency(value: string): string {
  // Remove everything except digits
  const cleaned = value.replace(/\D/g, '');
  
  if (!cleaned) return '';
  
  // Convert to number and format with commas
  const number = parseInt(cleaned, 10);
  return `$${number.toLocaleString()}`;
}

/**
 * Parses currency value back to number
 */
export function parseCurrency(value: string): number {
  const cleaned = value.replace(/[$,]/g, '');
  return parseInt(cleaned, 10) || 0;
}