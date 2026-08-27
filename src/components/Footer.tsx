import { PawPrint, Heart } from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="mt-auto border-t border-gray-100 bg-white/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2 font-display font-semibold text-gray-600">
          <PawPrint className="h-5 w-5 text-primary-500" />
          Qpet
        </div>
        <p className="flex items-center gap-1.5 font-body text-sm text-gray-400">
          {t('footer.tagline')}{' '}
          <Heart className="h-4 w-4 fill-primary-400 text-primary-400" />{' '}
          {t('footer.taglineEnd')}
        </p>
      </div>
    </footer>
  );
}
