import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PawPrint,
  Plus,
  Eye,
  Pencil,
  Trash2,
  AlertCircle,
  Search,
  X,
  MapPin,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingShapes from '@/components/FloatingShapes';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getMyPets, deletePet } from '@/api/petApi';
import { SPECIES_EMOJI, type PetResponse } from '@/types/pet';
import { useAuth } from '@/auth/AuthContext';
import { useI18n } from '@/i18n/I18nContext';

export default function MyPetsPage() {
  const { user } = useAuth();
  const { t } = useI18n();
  const [pets, setPets] = useState<PetResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadPets = () => {
    setLoading(true);
    getMyPets()
      .then((data) => {
        setPets(data);
        setError(null);
      })
      .catch(() => {
        setError('load-error');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPets();
  }, []);

  const filtered = useMemo(() => {
    if (!search) return pets;
    const q = search.toLowerCase();
    return pets.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.breed?.toLowerCase().includes(q) ?? false) ||
        p.species.toLowerCase().includes(q)
    );
  }, [pets, search]);

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      await deletePet(id);
      setPets((prev) => prev.filter((p) => p.id !== id));
      setConfirmId(null);
    } catch {
      setError('delete-error');
    } finally {
      setDeleting(false);
    }
  };

  const greeting = user?.user_metadata?.full_name || user?.email || '';

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-cream-50 via-cream-100 to-white">
      <FloatingShapes />
      <Navbar />

      <main className="relative z-10 flex-1">
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-6 sm:px-6 sm:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
              <PawPrint className="h-4 w-4 text-primary-500" />
              <span className="font-body text-sm font-medium text-gray-600">
                {t('myPets.badge')}
              </span>
            </div>
            <h1 className="font-display text-3xl font-bold text-gray-800 sm:text-4xl lg:text-5xl">
              {t('myPets.title')}
            </h1>
            {greeting && (
              <p className="mt-2 font-body text-lg text-gray-500">
                {t('myPets.welcome', { name: greeting })}
              </p>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative max-w-xs flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t('myPets.searchPh')}
                  className="w-full rounded-2xl border-2 border-gray-200 bg-white py-2.5 pe-10 ps-10 font-body text-sm text-gray-800 placeholder:text-gray-400 transition-all focus:border-primary-400 focus:outline-none focus:ring-4 focus:ring-primary-100"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute end-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100"
                    aria-label="Clear"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <Link to="/create" className="btn-primary text-base">
                <Plus className="h-5 w-5" />
                {t('myPets.addPet')}
              </Link>
            </div>
          </motion.div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          {loading && (
            <div className="flex flex-col items-center justify-center py-24">
              <LoadingSpinner size={40} label={t('myPets.loading')} />
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
              <p className="mt-2 font-body text-gray-500">{t('pet.couldNotLoad')}</p>
              <button onClick={loadPets} className="btn-primary mt-5">
                {t('myPets.retry')}
              </button>
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary-50">
                <PawPrint className="h-10 w-10 text-primary-300" />
              </div>
              <h2 className="font-display text-xl font-semibold text-gray-700">
                {search ? t('myPets.noSearchResults') : t('myPets.empty')}
              </h2>
              <p className="mt-2 max-w-sm font-body text-gray-500">
                {search ? t('myPets.noSearchDesc') : t('myPets.emptyDesc')}
              </p>
              {!search && (
                <Link to="/create" className="btn-primary mt-5">
                  <Plus className="h-5 w-5" />
                  {t('myPets.addPet')}
                </Link>
              )}
            </div>
          )}

          {!loading && !error && filtered.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((pet, i) => (
                <motion.div
                  key={pet.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.08, 0.4) }}
                  className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-100 transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <Link
                    to={`/pet/${pet.id}`}
                    className="relative block overflow-hidden bg-gray-50"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden">
                      <img
                        src={pet.image_url}
                        alt={pet.name}
                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute top-3 start-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 font-body text-xs font-semibold text-gray-700 shadow-md backdrop-blur">
                      <span>{SPECIES_EMOJI[pet.species] ?? '✨'}</span>
                      {pet.species}
                    </div>
                    {pet.is_available_for_adoption && (
                      <div className="absolute top-3 end-3 rounded-full bg-primary-500/90 px-3 py-1 font-body text-[11px] font-semibold text-white shadow-md">
                        {t('pet.availableForAdoption')}
                      </div>
                    )}
                    {pet.is_available_for_mating && (
                      <div className="absolute top-3 end-3 rounded-full bg-ocean-500/90 px-3 py-1 font-body text-[11px] font-semibold text-white shadow-md">
                        {t('pet.availableForMating')}
                      </div>
                    )}
                  </Link>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-xl font-bold text-gray-800">{pet.name}</h3>
                    {pet.breed && (
                      <p className="font-body text-sm text-gray-500">{pet.breed}</p>
                    )}
                    <div className="mt-3 mb-4 flex flex-wrap gap-2">
                      {pet.age && (
                        <span className="rounded-full bg-accent-50 px-3 py-1 font-body text-xs font-medium text-accent-700">
                          {pet.age}
                        </span>
                      )}
                      {pet.gender && (
                        <span className="rounded-full bg-ocean-50 px-3 py-1 font-body text-xs font-medium text-ocean-600">
                          {pet.gender}
                        </span>
                      )}
                      {pet.location && (
                        <span className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 font-body text-xs font-medium text-gray-600">
                          <MapPin className="h-3 w-3" />
                          {pet.location}
                        </span>
                      )}
                    </div>

                    <div className="mt-auto flex items-center gap-2">
                      <Link
                        to={`/pet/${pet.id}`}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-primary-50 px-3 py-2.5 font-display text-sm font-semibold text-primary-600 transition-all hover:bg-primary-100 active:scale-95"
                      >
                        <Eye className="h-4 w-4" />
                        {t('myPets.view')}
                      </Link>
                      <Link
                        to={`/edit/${pet.id}`}
                        className="flex items-center justify-center gap-1.5 rounded-2xl bg-ocean-50 px-3 py-2.5 font-display text-sm font-semibold text-ocean-600 transition-all hover:bg-ocean-100 active:scale-95"
                        aria-label={t('myPets.edit')}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="hidden sm:inline">{t('myPets.edit')}</span>
                      </Link>
                      <button
                        onClick={() => setConfirmId(pet.id)}
                        className="flex items-center justify-center gap-1.5 rounded-2xl bg-error-50 px-3 py-2.5 font-display text-sm font-semibold text-error-500 transition-all hover:bg-error-100 active:scale-95"
                        aria-label={t('myPets.delete')}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="hidden sm:inline">{t('myPets.delete')}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Delete confirmation modal */}
      {confirmId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-error-50">
              <Trash2 className="h-7 w-7 text-error-500" />
            </div>
            <h3 className="font-display text-xl font-bold text-gray-800">
              {t('myPets.deleteTitle')}
            </h3>
            <p className="mt-2 font-body text-sm text-gray-500">
              {t('myPets.deleteConfirm')}
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setConfirmId(null)}
                disabled={deleting}
                className="flex-1 rounded-2xl bg-gray-100 px-4 py-3 font-display text-sm font-semibold text-gray-600 transition-all hover:bg-gray-200"
              >
                {t('myPets.cancel')}
              </button>
              <button
                onClick={() => handleDelete(confirmId)}
                disabled={deleting}
                className="flex-1 rounded-2xl bg-error-500 px-4 py-3 font-display text-sm font-semibold text-white shadow-md transition-all hover:bg-error-600"
              >
                {deleting ? <LoadingSpinner size={18} className="text-white" /> : t('myPets.delete')}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}
