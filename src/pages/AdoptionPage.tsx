import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart,
  Search,
  MapPin,
  PawPrint,
  ChevronRight,
  SlidersHorizontal,
  X,
  AlertCircle,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingShapes from '@/components/FloatingShapes';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getAdoptionPets } from '@/api/petApi';
import { SPECIES_EMOJI, type PetResponse, type PetSpecies } from '@/types/pet';
import { buildWhatsAppUrl } from '@/utils/phone';
import { useI18n } from '@/i18n/I18nContext';

const SPECIES_LIST: PetSpecies[] = [
  'Dog', 'Cat', 'Bird', 'Rabbit', 'Hamster', 'Reptile', 'Fish', 'Other',
];

export default function AdoptionPage() {
  const { t } = useI18n();
  const [pets, setPets] = useState<PetResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    getAdoptionPets()
      .then((data) => {
        setPets(data);
        setError(null);
      })
      .catch(() => {
        setError('load-error');
      })
      .finally(() => setLoading(false));
  }, []);

  const locations = useMemo(() => {
    const set = new Set<string>();
    pets.forEach((p) => {
      if (p.location) set.add(p.location);
    });
    return Array.from(set).sort();
  }, [pets]);

  const filtered = useMemo(() => {
    return pets.filter((p) => {
      if (search) {
        const q = search.toLowerCase();
        if (
          !p.name.toLowerCase().includes(q) &&
          !(p.breed?.toLowerCase().includes(q) ?? false)
        ) {
          return false;
        }
      }
      if (speciesFilter && p.species !== speciesFilter) return false;
      if (genderFilter && p.gender !== genderFilter) return false;
      if (locationFilter && p.location !== locationFilter) return false;
      return true;
    });
  }, [pets, search, speciesFilter, genderFilter, locationFilter]);

  const hasActiveFilters =
    search || speciesFilter || genderFilter || locationFilter;

  const clearFilters = () => {
    setSearch('');
    setSpeciesFilter('');
    setGenderFilter('');
    setLocationFilter('');
  };

  const resultCount = filtered.length;

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-cream-50 via-cream-100 to-white">
      <FloatingShapes />
      <Navbar />

      <main className="relative z-10 flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-8 sm:px-6 sm:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
              <Heart className="h-4 w-4 fill-primary-500 text-primary-500" />
              <span className="font-body text-sm font-medium text-gray-600">
                {t('adoption.available')}
              </span>
            </div>
            <h1 className="font-display text-3xl font-bold text-gray-800 sm:text-4xl lg:text-5xl">
              {t('adoption.title')}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-gray-500">
              {t('adoption.subtitle')}
            </p>
          </motion.div>
        </section>

        {/* Search + Filters */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-3xl bg-white/80 p-4 shadow-lg backdrop-blur sm:p-5"
          >
            {/* Search bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('adoption.searchPh')}
                className="w-full rounded-2xl border-2 border-gray-200 bg-white py-3 pe-10 ps-11 font-body text-gray-800 placeholder:text-gray-400 transition-all focus:border-primary-400 focus:outline-none focus:ring-4 focus:ring-primary-100"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute end-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Desktop filters */}
            <div className="mt-4 hidden items-center gap-3 md:flex">
              <div className="flex items-center gap-2 text-sm font-display font-semibold text-gray-500">
                <SlidersHorizontal className="h-4 w-4" />
                {t('adoption.filters')}
              </div>
              <select
                value={speciesFilter}
                onChange={(e) => setSpeciesFilter(e.target.value)}
                className="rounded-full border-2 border-gray-200 bg-white px-4 py-2 font-body text-sm text-gray-700 transition-all focus:border-primary-400 focus:outline-none"
              >
                <option value="">{t('adoption.allSpecies')}</option>
                {SPECIES_LIST.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="rounded-full border-2 border-gray-200 bg-white px-4 py-2 font-body text-sm text-gray-700 transition-all focus:border-primary-400 focus:outline-none"
              >
                <option value="">{t('adoption.allGenders')}</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="rounded-full border-2 border-gray-200 bg-white px-4 py-2 font-body text-sm text-gray-700 transition-all focus:border-primary-400 focus:outline-none"
              >
                <option value="">{t('adoption.allLocations')}</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="ms-auto flex items-center gap-1 rounded-full bg-gray-100 px-3 py-2 font-body text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200"
                >
                  <X className="h-3.5 w-3.5" />
                  {t('adoption.clearFilters')}
                </button>
              )}
            </div>

            {/* Mobile filter toggle */}
            <div className="mt-3 flex items-center justify-between md:hidden">
              <button
                onClick={() => setShowFilters((v) => !v)}
                className="flex items-center gap-2 rounded-full border-2 border-gray-200 bg-white px-4 py-2 font-display text-sm font-semibold text-gray-600 transition-all"
              >
                <SlidersHorizontal className="h-4 w-4" />
                {t('adoption.filters')}
              </button>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-2 font-body text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200"
                >
                  <X className="h-3.5 w-3.5" />
                  {t('adoption.clearFilters')}
                </button>
              )}
            </div>

            {/* Mobile filters panel */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 space-y-3 overflow-hidden md:hidden"
              >
                <select
                  value={speciesFilter}
                  onChange={(e) => setSpeciesFilter(e.target.value)}
                  className="w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 font-body text-sm text-gray-700"
                >
                  <option value="">{t('adoption.allSpecies')}</option>
                  {SPECIES_LIST.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <select
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                  className="w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 font-body text-sm text-gray-700"
                >
                  <option value="">{t('adoption.allGenders')}</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 font-body text-sm text-gray-700"
                >
                  <option value="">{t('adoption.allLocations')}</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </motion.div>
            )}
          </motion.div>

          {/* Result count */}
          {!loading && !error && (
            <p className="mt-4 mb-2 font-body text-sm font-medium text-gray-500">
              {resultCount === 1
                ? t('adoption.result', { count: resultCount })
                : t('adoption.results', { count: resultCount })}
            </p>
          )}
        </section>

        {/* Pet grid / states */}
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          {loading && (
            <div className="flex flex-col items-center justify-center py-24">
              <LoadingSpinner size={40} label={t('adoption.loading')} />
            </div>
          )}

          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-error-50">
                <AlertCircle className="h-8 w-8 text-error-400" />
              </div>
              <h2 className="font-display text-xl font-semibold text-gray-700">
                {t('pet.wentWrong')}
              </h2>
              <p className="mt-2 font-body text-gray-500">
                {t('pet.couldNotLoad')}
              </p>
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary-50">
                <PawPrint className="h-10 w-10 text-primary-300" />
              </div>
              <h2 className="font-display text-xl font-semibold text-gray-700">
                {t('adoption.noResults')}
              </h2>
              <p className="mt-2 max-w-sm font-body text-gray-500">
                {t('adoption.noResultsDesc')}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-5 flex items-center gap-1.5 rounded-full bg-primary-50 px-5 py-2.5 font-display text-sm font-semibold text-primary-600 transition-all hover:bg-primary-100"
                >
                  <X className="h-4 w-4" />
                  {t('adoption.clearFilters')}
                </button>
              )}
            </div>
          )}

          {!loading && !error && filtered.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((pet, i) => (
                <AdoptionCard key={pet.id} pet={pet} index={i} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

function AdoptionCard({ pet, index }: { pet: PetResponse; index: number }) {
  const { t } = useI18n();
  const emoji = SPECIES_EMOJI[pet.species] || '✨';
  const hasWhatsapp = pet.owner_whatsapp && pet.owner_whatsapp.trim().length > 0;
  const whatsappUrl = hasWhatsapp ? buildWhatsAppUrl(pet.owner_whatsapp!) : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.08, 0.4) }}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-100 transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <Link to={`/pet/${pet.id}`} className="relative block overflow-hidden bg-gray-50">
        <div className="aspect-[4/3] w-full overflow-hidden">
          <img
            src={pet.image_url}
            alt={pet.name}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        {/* Adoption badge */}
        <div className="absolute top-3 start-3 flex items-center gap-1.5 rounded-full bg-primary-500/90 px-3 py-1.5 font-body text-xs font-semibold text-white shadow-md backdrop-blur">
          <Heart className="h-3.5 w-3.5" fill="white" />
          {t('adoption.available')}
        </div>
        {/* Species badge */}
        <div className="absolute top-3 end-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 font-body text-xs font-semibold text-gray-700 shadow-md backdrop-blur">
          <span>{emoji}</span>
          {pet.species}
        </div>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Name + breed */}
        <div className="mb-3">
          <h3 className="font-display text-xl font-bold text-gray-800">{pet.name}</h3>
          {pet.breed ? (
            <p className="font-body text-sm text-gray-500">{pet.breed}</p>
          ) : (
            <p className="font-body text-sm text-gray-400">
              {t('adoption.breed')}: {t('adoption.unknown')}
            </p>
          )}
        </div>

        {/* Quick info */}
        <div className="mb-4 flex flex-wrap gap-2">
          {pet.age && (
            <span className="rounded-full bg-accent-50 px-3 py-1 font-body text-xs font-medium text-accent-700">
              {t('adoption.age')}: {pet.age}
            </span>
          )}
          {pet.gender && (
            <span className="rounded-full bg-ocean-50 px-3 py-1 font-body text-xs font-medium text-ocean-600">
              {pet.gender === 'Male' ? '♂' : '♀'} {pet.gender}
            </span>
          )}
          {pet.location && (
            <span className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 font-body text-xs font-medium text-gray-600">
              <MapPin className="h-3 w-3" />
              {pet.location}
            </span>
          )}
        </div>

        {/* Description */}
        {pet.description && (
          <p className="mb-4 line-clamp-2 font-body text-sm text-gray-500">
            {pet.description}
          </p>
        )}

        {/* Actions */}
        <div className="mt-auto flex items-center gap-2">
          <Link
            to={`/pet/${pet.id}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-primary-50 px-4 py-2.5 font-display text-sm font-semibold text-primary-600 transition-all hover:bg-primary-100 active:scale-95"
          >
            {t('adoption.viewProfile')}
            <ChevronRight className="h-4 w-4" />
          </Link>
          {hasWhatsapp && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-2xl bg-secondary-500 px-4 py-2.5 font-display text-sm font-semibold text-white shadow-md transition-all hover:bg-secondary-600 active:scale-95"
              aria-label={t('adoption.contactOwner')}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
