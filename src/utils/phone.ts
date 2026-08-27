const EGYPT_COUNTRY_CODE = '20';

export function normalizeEgyptianPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');

  if (!digits) return '';

  if (digits.startsWith('0')) {
    return EGYPT_COUNTRY_CODE + digits.slice(1);
  }

  if (digits.startsWith(EGYPT_COUNTRY_CODE)) {
    return digits;
  }

  return EGYPT_COUNTRY_CODE + digits;
}

export function buildWhatsAppUrl(phone: string): string {
  const normalized = normalizeEgyptianPhone(phone);
  if (!normalized) return '';
  return `https://wa.me/${normalized}`;
}
