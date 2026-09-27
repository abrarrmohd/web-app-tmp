export function validatePhone(value: string, prefix: string) {
  const digits = value.replace(/\D/g, '');

  if (prefix === '+1' || prefix === '+91') {
    return /^\d{10}$/.test(digits);
  }

  return false;
}
