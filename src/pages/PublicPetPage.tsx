import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin,
  Calendar,
  PawPrint,
  Heart,
  HeartHandshake,
  ArrowLeft,
  AlertCircle,
  Phone,
  Palette,
  Cake,
  Sparkles,
  User,
  Scale,
  ShieldCheck,
} from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getPet } from '@/api/petApi';
import { SPECIES_EMOJI, type PetResponse } from '@/types/pet';
import { buildWhatsAppUrl } from '@/utils/phone';
import { useI18n } from '@/i18n/I18nContext';

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return '';
  }
}

export default function PublicPetPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useI18n();
  const [pet, setPet] = useState<PetResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Missing pet ID.');
      setLoading(false);
      return;
    }
    getPet(id)
      .then((data) => {
        if (!data) {
          setError('not-found');
        } else {
          setPet(data);
        }
      })
      .catch(() => {
        setError(t('pet.couldNotLoad'));
      })
      .finally(() => setLoading(false));
  }, [id, t]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-cream-50 to-white">
        <LoadingSpinner size={40} label={t('pet.loadingProfile')} />
      </div>
    );
  }

  if (error === 'not-found') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-cream-50 to-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md text-center"
        >
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary-100">
            <AlertCircle className="h-10 w-10 text-primary-400" />
          </div>
          <h1 className="font-display text-2xl font-bold text-gray-800">
            {t('pet.notFound')}
          </h1>
          <p className="mt-2 font-body text-gray-500">
            {t('pet.notFoundDesc')}
          </p>
          <Link to="/" className="btn-primary mt-6">
            <PawPrint className="h-5 w-5" />
            {t('pet.visitQpet')}
          </Link>
        </motion.div>
      </div>
    );
  }

  if (error || !pet) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-cream-50 to-white px-4">
        <div className="max-w-md text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-error-400" />
          <h1 className="font-display text-2xl font-bold text-gray-800">
            {t('pet.wentWrong')}
          </h1>
          <p className="mt-2 font-body text-gray-500">
            {error || t('pet.couldNotLoad')}
          </p>
          <Link to="/" className="btn-primary mt-6">
            <PawPrint className="h-5 w-5" />
            {t('pet.visitQpet')}
          </Link>
        </div>
      </div>
    );
  }

  const emoji = SPECIES_EMOJI[pet.species] || '✨';
  const hasPhone = pet.owner_phone && pet.owner_phone.trim().length > 0;
  const hasWhatsapp = pet.owner_whatsapp && pet.owner_whatsapp.trim().length > 0;
  const hasOwnerContact = hasPhone || hasWhatsapp;

  const whatsappUrl = hasWhatsapp
    ? buildWhatsAppUrl(pet.owner_whatsapp!)
    : '';
  const phoneUrl = hasPhone ? `tel:${pet.owner_phone}` : '';

  const traits = [
    { icon: Cake, label: t('pet.age'), value: pet.age },
    { icon: PawPrint, label: t('pet.gender'), value: pet.gender },
    { icon: Palette, label: t('pet.color'), value: pet.color },
  ].filter((trait) => trait.value);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 via-white to-cream-50">
      <div className="mx-auto max-w-lg">
        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <div className="relative h-72 w-full overflow-hidden rounded-b-[2.5rem] bg-gray-100 sm:h-80">
            <img
              src={pet.image_url}
              alt={pet.name}
              className="h-full w-full object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            <Link
              to="/"
              className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-2 font-body text-xs font-medium text-gray-700 shadow-md backdrop-blur transition-all hover:bg-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Qpet
            </Link>

            <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-2 font-body text-xs font-semibold text-gray-700 shadow-md backdrop-blur">
              <span>{emoji}</span>
              {pet.species}
            </div>

            {pet.is_available_for_adoption && (
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-primary-500/90 px-3 py-2 font-body text-xs font-semibold text-white shadow-md backdrop-blur">
                <Heart className="h-3.5 w-3.5" fill="white" />
                {t('pet.availableForAdoption')}
              </div>
            )}

            {pet.is_available_for_mating && (
              <div className={`absolute bottom-4 ${pet.is_available_for_adoption ? 'left-4 translate-y-12' : 'left-4'} flex items-center gap-1.5 rounded-full bg-ocean-500/90 px-3 py-2 font-body text-xs font-semibold text-white shadow-md backdrop-blur`}>
                <HeartHandshake className="h-3.5 w-3.5" />
                {t('pet.availableForMating')}
              </div>
            )}
          </div>
        </motion.div>

        {/* Pet info card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="-mt-8 rounded-t-[2rem] bg-white px-5 pb-8 pt-6 shadow-2xl sm:px-7"
        >
          {/* Name */}
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 shadow-lg">
              <PawPrint className="h-7 w-7 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold leading-tight text-gray-800">
                {pet.name}
              </h1>
              {pet.breed && (
                <p className="font-body text-sm text-gray-500">{pet.breed}</p>
              )}
            </div>
          </div>

          {/* CONTACT OWNER -- primary action */}
          {hasOwnerContact && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mb-5 overflow-hidden rounded-3xl bg-gradient-to-br from-primary-500 to-primary-600 p-5 shadow-lg shadow-primary-500/30"
            >
              <div className="mb-3 flex items-center gap-2">
                <Heart className="h-5 w-5 text-white" fill="white" />
                <h2 className="font-display text-lg font-semibold text-white">
                  {pet.owner_name ? t('pet.contact', { name: pet.owner_name }) : t('pet.contactOwner')}
                </h2>
              </div>
              <p className="mb-4 font-body text-sm text-white/90">
                {t('pet.foundThisPet')}
              </p>
              <div className="flex flex-col gap-2.5 sm:flex-row">
                {hasPhone && (
                  <a
                    href={phoneUrl}
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3.5 font-display font-semibold text-primary-600 shadow-md transition-all hover:scale-105 active:scale-95"
                  >
                    <Phone className="h-5 w-5" />
                    {t('pet.callOwner')}
                  </a>
                )}
                {hasWhatsapp && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-secondary-500 px-5 py-3.5 font-display font-semibold text-white shadow-md transition-all hover:bg-secondary-600 hover:scale-105 active:scale-95"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {t('pet.whatsapp')}
                  </a>
                )}
              </div>
            </motion.div>
          )}

          {/* Quick traits row */}
          {traits.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {traits.map((t) => (
                <div
                  key={t.label}
                  className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5"
                >
                  <t.icon className="h-4 w-4 text-gray-400" />
                  <span className="font-body text-sm font-medium text-gray-600">
                    {t.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Info rows */}
          <div className="space-y-3">
            {pet.personality && (
              <div className="flex items-start gap-3 rounded-2xl bg-accent-50 p-4">
                <Sparkles className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-600" />
                <div>
                  <p className="font-body text-xs font-semibold uppercase tracking-wide text-accent-700">
                    {t('pet.personality')}
                  </p>
                  <p className="font-body text-gray-700">{pet.personality}</p>
                </div>
              </div>
            )}

            {pet.description && (
              <div className="rounded-2xl bg-primary-50 p-4">
                <p className="mb-1 font-body text-xs font-semibold uppercase tracking-wide text-primary-400">
                  {t('pet.about')}
                </p>
                <p className="font-body leading-relaxed text-gray-700">
                  {pet.description}
                </p>
              </div>
            )}

            {pet.location && (
              <div className="flex items-start gap-3 rounded-2xl bg-ocean-50 p-4">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-ocean-500" />
                <div>
                  <p className="font-body text-xs font-semibold uppercase tracking-wide text-ocean-400">
                    {t('pet.location')}
                  </p>
                  <p className="font-body text-gray-700">{pet.location}</p>
                </div>
              </div>
            )}

            {pet.owner_name && !hasOwnerContact && (
              <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4">
                <User className="h-5 w-5 flex-shrink-0 text-gray-400" />
                <div>
                  <p className="font-body text-xs font-semibold uppercase tracking-wide text-gray-400">
                    {t('pet.owner')}
                  </p>
                  <p className="font-body text-gray-600">{pet.owner_name}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4">
              <Calendar className="h-5 w-5 flex-shrink-0 text-gray-400" />
              <div>
                <p className="font-body text-xs font-semibold uppercase tracking-wide text-gray-400">
                  {t('pet.memberSince')}
                </p>
                <p className="font-body text-gray-600">
                  {formatDate(pet.created_at)}
                </p>
              </div>
            </div>
          </div>

          {/* Footer tagline */}
          <div className="mt-6 flex items-center justify-center gap-2 border-t border-gray-100 pt-5">
            <PawPrint className="h-4 w-4 text-primary-400" />
            <span className="font-body text-xs text-gray-400">
              {t('pet.identityBy')}{' '}
              <Link to="/" className="font-semibold text-primary-500 hover:underline">
                Qpet
              </Link>
            </span>
          </div>
        </motion.div>

        {/* Bottom tagline */}
        <div className="flex items-center justify-center gap-1.5 py-6">
          <Heart className="h-4 w-4 fill-primary-300 text-primary-300" />
          <span className="font-body text-xs text-gray-400">
            {t('pet.keepPetsSafe')}
          </span>
        </div>
      </div>
    </div>
  );
}
