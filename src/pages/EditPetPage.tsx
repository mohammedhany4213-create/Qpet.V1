import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  PawPrint,
  Save,
  Phone,
  User,
  Info,
  Heart,
  HeartHandshake,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingShapes from '@/components/FloatingShapes';
import ImageUpload from '@/components/ImageUpload';
import ErrorBanner from '@/components/ErrorBanner';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getPet, updatePet } from '@/api/petApi';
import {
  PET_SPECIES,
  PET_GENDERS,
  SPECIES_EMOJI,
  type PetSpecies,
  type PetGender,
  type PetResponse,
} from '@/types/pet';

interface FormState {
  name: string;
  species: PetSpecies | '';
  breed: string;
  gender: PetGender | '';
  age: string;
  color: string;
  description: string;
  personality: string;
  location: string;
  ownerName: string;
  ownerPhone: string;
  ownerWhatsapp: string;
  isAvailableForAdoption: boolean;
  isAvailableForMating: boolean;
  weight: string;
  vaccinationStatus: string;
}

interface FormErrors {
  name?: string;
  species?: string;
  image?: string;
  ownerName?: string;
  ownerPhone?: string;
}

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

function normalizePhone(phone: string): string {
  return phone.replace(/[^0-9+]/g, '');
}

function petToForm(p: PetResponse): FormState {
  return {
    name: p.name,
    species: p.species,
    breed: p.breed ?? '',
    gender: p.gender ?? '',
    age: p.age ?? '',
    color: p.color ?? '',
    description: p.description ?? '',
    personality: p.personality ?? '',
    location: p.location ?? '',
    ownerName: p.owner_name ?? '',
    ownerPhone: p.owner_phone ?? '',
    ownerWhatsapp: p.owner_whatsapp ?? '',
    isAvailableForAdoption: p.is_available_for_adoption,
    isAvailableForMating: p.is_available_for_mating,
    weight: p.weight ?? '',
    vaccinationStatus: p.vaccination_status ?? '',
  };
}

export default function EditPetPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useI18n();

  const [loading, setLoading] = useState(true);
  const [notOwner, setNotOwner] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [form, setForm] = useState<FormState | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [savedNotice, setSavedNotice] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    getPet(id)
      .then((data) => {
        if (!data) {
          setNotFound(true);
        } else if (data.owner_id === null) {
          // Legacy pet without an owner cannot be edited by anyone.
          setNotOwner(true);
        } else {
          setForm(petToForm(data));
          setImagePreview(data.image_url || null);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  // Note: ownership is enforced by RLS at the database level. The frontend
  // only shows the edit form for pets the user owns; any direct API call
  // for another user's pet is rejected by the UPDATE policy (owner_id = auth.uid()).

  const updateField = (field: keyof FormState, value: string | boolean) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleImageSelect = (file: File) => {
    if (file.size > MAX_IMAGE_SIZE) {
      setErrors((prev) => ({ ...prev, image: t('create.photoLarge') }));
      return;
    }
    setErrors((prev) => ({ ...prev, image: undefined }));
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleImageClear = () => {
    setImageFile(null);
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
  };

  const validate = (): boolean => {
    if (!form) return false;
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = t('create.nameError');
    else if (form.name.trim().length > 60) next.name = t('create.nameLong');
    if (!form.species) next.species = t('create.speciesError');

    const hasPhone = form.ownerPhone.trim().length > 0;
    const hasWhatsapp = form.ownerWhatsapp.trim().length > 0;
    const hasContact = hasPhone || hasWhatsapp;
    if (form.ownerName.trim() && !hasContact) next.ownerPhone = t('create.phoneRequired');
    if (hasContact && !form.ownerName.trim()) next.ownerName = t('create.nameRequired');

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!form || !id) return;
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await updatePet(id, {
        name: form.name.trim(),
        species: form.species as PetSpecies,
        breed: form.breed.trim(),
        gender: form.gender,
        age: form.age.trim(),
        color: form.color.trim(),
        description: form.description.trim(),
        personality: form.personality.trim(),
        location: form.location.trim(),
        ownerName: form.ownerName.trim(),
        ownerPhone: normalizePhone(form.ownerPhone),
        ownerWhatsapp: normalizePhone(form.ownerWhatsapp),
        isAvailableForAdoption: form.isAvailableForAdoption,
        isAvailableForMating: form.isAvailableForMating,
        weight: form.weight.trim(),
        vaccinationStatus: form.vaccinationStatus.trim(),
        imageFile,
      });
      setSavedNotice(true);
      setSubmitError(null);
      setTimeout(() => navigate('/my-pets'), 900);
    } catch (err) {
      // RLS rejection surfaces as a generic error; map to a friendly message.
      setSubmitError(
        err instanceof Error && /row-level security|owner/i.test(err.message)
          ? t('edit.notOwner')
          : err instanceof Error
            ? err.message
            : t('auth.genericError')
      );
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-cream-50 via-cream-100 to-white">
        <FloatingShapes />
        <Navbar />
        <main className="relative z-10 flex flex-1 items-center justify-center">
          <LoadingSpinner size={40} label={t('edit.loading')} />
        </main>
        <Footer />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-cream-50 via-cream-100 to-white">
        <FloatingShapes />
        <Navbar />
        <main className="relative z-10 flex flex-1 items-center justify-center px-4">
          <div className="max-w-md text-center">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary-100">
              <AlertCircle className="h-10 w-10 text-primary-400" />
            </div>
            <h1 className="font-display text-2xl font-bold text-gray-800">{t('edit.notFound')}</h1>
            <Link to="/my-pets" className="btn-primary mt-6">
              <PawPrint className="h-5 w-5" />
              {t('edit.backToMyPets')}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (notOwner) {
    return (
      <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-cream-50 via-cream-100 to-white">
        <FloatingShapes />
        <Navbar />
        <main className="relative z-10 flex flex-1 items-center justify-center px-4">
          <div className="max-w-md text-center">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-error-50">
              <AlertCircle className="h-10 w-10 text-error-400" />
            </div>
            <h1 className="font-display text-2xl font-bold text-gray-800">{t('edit.notOwner')}</h1>
            <Link to="/my-pets" className="btn-primary mt-6">
              <PawPrint className="h-5 w-5" />
              {t('edit.backToMyPets')}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!form) return null;

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-cream-50 via-cream-100 to-white">
      <FloatingShapes />
      <Navbar />

      <main className="relative z-10 flex-1">
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
          <Link
            to="/my-pets"
            className="mb-6 inline-flex items-center gap-1.5 font-body text-sm text-gray-500 transition-colors hover:text-primary-500"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('edit.backToMyPets')}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-2 flex items-center gap-2">
              <PawPrint className="h-6 w-6 text-primary-500" />
              <span className="font-display text-sm font-semibold uppercase tracking-wide text-primary-500">
                {t('edit.title')}
              </span>
            </div>
            <h1 className="font-display text-3xl font-bold text-gray-800 sm:text-4xl">
              {t('edit.title')}
            </h1>
            <p className="mt-2 font-body text-gray-500">{t('edit.desc')}</p>
          </motion.div>

          {savedNotice && (
            <div className="mt-6 flex items-center gap-2 rounded-2xl bg-secondary-50 p-4">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-secondary-600" />
              <p className="font-body text-sm font-medium text-secondary-700">{t('edit.updated')}</p>
            </div>
          )}

          {submitError && (
            <div className="mt-6">
              <ErrorBanner message={submitError} onDismiss={() => setSubmitError(null)} />
            </div>
          )}

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-8 space-y-5"
          >
            {/* Image upload */}
            <div>
              <label className="label-text">{t('create.petPhoto')}</label>
              <ImageUpload
                preview={imagePreview}
                onSelect={handleImageSelect}
                onClear={handleImageClear}
                error={errors.image}
              />
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="label-text">
                {t('create.petName')} <span className="text-primary-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder={t('create.petNamePh')}
                className={`input-field ${errors.name ? 'error' : ''}`}
                maxLength={60}
                disabled={isSubmitting}
              />
              {errors.name && <p className="mt-1.5 font-body text-sm text-error-500">{errors.name}</p>}
            </div>

            {/* Species */}
            <div>
              <label className="label-text">
                {t('create.species')} <span className="text-primary-500">*</span>
              </label>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
                {PET_SPECIES.map((sp) => (
                  <button
                    key={sp}
                    type="button"
                    onClick={() => updateField('species', sp)}
                    disabled={isSubmitting}
                    className={`flex flex-col items-center gap-1 rounded-2xl border-2 py-3 transition-all ${
                      form.species === sp
                        ? 'border-primary-500 bg-primary-50 shadow-md scale-105'
                        : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-50/50'
                    } ${errors.species && !form.species ? 'border-error-300' : ''}`}
                  >
                    <span className="text-xl">{SPECIES_EMOJI[sp]}</span>
                    <span className="font-body text-xs font-medium text-gray-600">{sp}</span>
                  </button>
                ))}
              </div>
              {errors.species && <p className="mt-1.5 font-body text-sm text-error-500">{errors.species}</p>}
            </div>

            {/* Breed + Age */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="breed" className="label-text">{t('create.breed')}</label>
                <input
                  id="breed"
                  type="text"
                  value={form.breed}
                  onChange={(e) => updateField('breed', e.target.value)}
                  placeholder={t('create.breedPh')}
                  className="input-field"
                  maxLength={80}
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor="age" className="label-text">{t('create.age')}</label>
                <input
                  id="age"
                  type="text"
                  value={form.age}
                  onChange={(e) => updateField('age', e.target.value)}
                  placeholder={t('create.agePh')}
                  className="input-field"
                  maxLength={40}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Gender + Color */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label-text">{t('create.gender')}</label>
                <div className="flex gap-2">
                  {PET_GENDERS.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => updateField('gender', g)}
                      disabled={isSubmitting}
                      className={`flex-1 rounded-2xl border-2 py-3 font-body text-sm font-medium transition-all ${
                        form.gender === g
                          ? 'border-primary-500 bg-primary-50 text-primary-600 shadow-md'
                          : 'border-gray-200 bg-white text-gray-500 hover:border-primary-300'
                      }`}
                    >
                      {g === 'Male' ? '♂' : '♀'} {g}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="color" className="label-text">{t('create.color')}</label>
                <input
                  id="color"
                  type="text"
                  value={form.color}
                  onChange={(e) => updateField('color', e.target.value)}
                  placeholder={t('create.colorPh')}
                  className="input-field"
                  maxLength={60}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Personality */}
            <div>
              <label htmlFor="personality" className="label-text">{t('create.personality')}</label>
              <input
                id="personality"
                type="text"
                value={form.personality}
                onChange={(e) => updateField('personality', e.target.value)}
                placeholder={t('create.personalityPh')}
                className="input-field"
                maxLength={120}
                disabled={isSubmitting}
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="label-text">{t('create.description')}</label>
              <textarea
                id="description"
                value={form.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder={t('create.descPh')}
                className="input-field min-h-[100px] resize-y"
                maxLength={500}
                rows={4}
                disabled={isSubmitting}
              />
              <p className="mt-1 text-right font-body text-xs text-gray-400">
                {form.description.length}/500
              </p>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="label-text">{t('create.location')}</label>
              <input
                id="location"
                type="text"
                value={form.location}
                onChange={(e) => updateField('location', e.target.value)}
                placeholder={t('create.locationPh')}
                className="input-field"
                maxLength={120}
                disabled={isSubmitting}
              />
            </div>

            {/* Owner Contact Section */}
            <div className="rounded-3xl border-2 border-ocean-100 bg-ocean-50/50 p-5">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ocean-500 text-white">
                  <Heart className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-gray-800">
                    {t('create.ownerContact')}
                  </h3>
                  <p className="font-body text-xs text-gray-500">{t('create.ownerContactDesc')}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="ownerName" className="label-text">{t('create.yourName')}</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      id="ownerName"
                      type="text"
                      value={form.ownerName}
                      onChange={(e) => updateField('ownerName', e.target.value)}
                      placeholder={t('create.yourNamePh')}
                      className={`input-field pl-11 ${errors.ownerName ? 'error' : ''}`}
                      maxLength={80}
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.ownerName && <p className="mt-1.5 font-body text-sm text-error-500">{errors.ownerName}</p>}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="ownerPhone" className="label-text">{t('create.phoneNumber')}</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        id="ownerPhone"
                        type="tel"
                        value={form.ownerPhone}
                        onChange={(e) => updateField('ownerPhone', e.target.value)}
                        placeholder={t('create.phonePh')}
                        className={`input-field pl-11 ${errors.ownerPhone ? 'error' : ''}`}
                        maxLength={30}
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.ownerPhone && <p className="mt-1.5 font-body text-sm text-error-500">{errors.ownerPhone}</p>}
                  </div>
                  <div>
                    <label htmlFor="ownerWhatsapp" className="label-text">{t('create.whatsapp')}</label>
                    <div className="relative">
                      <svg className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      <input
                        id="ownerWhatsapp"
                        type="tel"
                        value={form.ownerWhatsapp}
                        onChange={(e) => updateField('ownerWhatsapp', e.target.value)}
                        placeholder={t('create.phonePh')}
                        className="input-field pl-11"
                        maxLength={30}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2 rounded-xl bg-white/60 p-3">
                  <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-ocean-400" />
                  <p className="font-body text-xs text-gray-500">{t('create.contactInfo')}</p>
                </div>
              </div>
            </div>

            {/* Adoption toggle */}
            <div className="rounded-3xl border-2 border-primary-100 bg-primary-50/40 p-5">
              <label className="flex cursor-pointer items-start gap-3">
                <div className="relative flex-shrink-0 pt-0.5">
                  <input
                    type="checkbox"
                    checked={form.isAvailableForAdoption}
                    onChange={(e) => updateField('isAvailableForAdoption', e.target.checked)}
                    disabled={isSubmitting}
                    className="peer sr-only"
                  />
                  <div className="h-6 w-11 rounded-full bg-gray-300 transition-colors peer-checked:bg-primary-500" />
                  <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-5" />
                </div>
                <div>
                  <span className="flex items-center gap-1.5 font-display text-base font-semibold text-gray-800">
                    <Heart className="h-4 w-4 text-primary-500" />
                    {t('create.adoptionToggle')}
                  </span>
                  <p className="mt-0.5 font-body text-xs text-gray-500">{t('create.adoptionToggleDesc')}</p>
                </div>
              </label>
            </div>

            {/* Mating toggle + extra fields */}
            <div className="space-y-4 rounded-3xl border-2 border-ocean-100 bg-ocean-50/30 p-5">
              <label className="flex cursor-pointer items-start gap-3">
                <div className="relative flex-shrink-0 pt-0.5">
                  <input
                    type="checkbox"
                    checked={form.isAvailableForMating}
                    onChange={(e) => updateField('isAvailableForMating', e.target.checked)}
                    disabled={isSubmitting}
                    className="peer sr-only"
                  />
                  <div className="h-6 w-11 rounded-full bg-gray-300 transition-colors peer-checked:bg-ocean-500" />
                  <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-5" />
                </div>
                <div>
                  <span className="flex items-center gap-1.5 font-display text-base font-semibold text-gray-800">
                    <HeartHandshake className="h-4 w-4 text-ocean-500" />
                    {t('create.matingToggle')}
                  </span>
                  <p className="mt-0.5 font-body text-xs text-gray-500">{t('create.matingToggleDesc')}</p>
                </div>
              </label>

              {form.isAvailableForMating && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="grid gap-4 overflow-hidden sm:grid-cols-2"
                >
                  <div>
                    <label htmlFor="weight" className="label-text">{t('create.weight')}</label>
                    <input
                      id="weight"
                      type="text"
                      value={form.weight}
                      onChange={(e) => updateField('weight', e.target.value)}
                      placeholder={t('create.weightPh')}
                      className="input-field"
                      maxLength={40}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="vaccinationStatus" className="label-text">{t('create.vaccination')}</label>
                    <input
                      id="vaccinationStatus"
                      type="text"
                      value={form.vaccinationStatus}
                      onChange={(e) => updateField('vaccinationStatus', e.target.value)}
                      placeholder={t('create.vaccinationPh')}
                      className="input-field"
                      maxLength={80}
                      disabled={isSubmitting}
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button type="submit" disabled={isSubmitting} className="btn-primary w-full text-lg">
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size={20} className="text-white" />
                    <span>{t('edit.saving')}</span>
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    {t('edit.save')}
                  </>
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
