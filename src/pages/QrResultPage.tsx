import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import {
  PartyPopper,
  Download,
  Printer,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  PawPrint,
  Home,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingShapes from '@/components/FloatingShapes';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorBanner from '@/components/ErrorBanner';
import { getPet } from '@/api/petApi';
import type { PetResponse } from '@/types/pet';
import { useI18n } from '@/i18n/I18nContext';

export default function QrResultPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useI18n();
  const [pet, setPet] = useState<PetResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const qrWrapperRef = useRef<HTMLDivElement>(null);

  const publicUrl = pet
    ? `${window.location.origin}/pet/${pet.id}`
    : '';

  useEffect(() => {
    if (!id) {
      setError('Missing pet ID.');
      setLoading(false);
      return;
    }
    getPet(id)
      .then((data) => {
        if (!data) {
          setError(t('qr.notFound'));
        } else {
          setPet(data);
        }
      })
      .catch((err) => {
        setError(
          err instanceof Error ? err.message : t('pet.couldNotLoad')
        );
      })
      .finally(() => setLoading(false));
  }, [id, t]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard may be blocked — fall back to selecting the text
    }
  };

  const handleDownload = () => {
    if (!qrWrapperRef.current) return;
    const svg = qrWrapperRef.current.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qpet-${pet?.name?.toLowerCase() || 'pet'}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-cream-50 to-white">
        <FloatingShapes />
        <Navbar />
        <main className="relative z-10 flex flex-1 items-center justify-center">
          <LoadingSpinner size={40} label={t('qr.loading')} />
        </main>
      </div>
    );
  }

  if (error || !pet) {
    return (
      <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-cream-50 to-white">
        <FloatingShapes />
        <Navbar />
        <main className="relative z-10 flex flex-1 items-center justify-center px-4">
          <div className="max-w-md text-center">
            <PawPrint className="mx-auto mb-4 h-12 w-12 text-primary-300" />
            <h1 className="mb-4 font-display text-2xl font-bold text-gray-800">
              {t('qr.wentWrong')}
            </h1>
            <ErrorBanner message={error || t('qr.notFound')} />
            <Link to="/create" className="btn-primary mt-6">
              <PawPrint className="h-5 w-5" />
              {t('qr.newProfile')}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-cream-50 via-cream-100 to-white">
      <FloatingShapes />
      <Navbar />

      <main className="relative z-10 flex-1">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
          {/* Success header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary-400 shadow-lg shadow-secondary-400/40"
            >
              <PartyPopper className="h-8 w-8 text-white" />
            </motion.div>
            <h1 className="font-display text-3xl font-bold text-gray-800 sm:text-4xl">
              {t('qr.ready')}
            </h1>
            <p className="mt-2 font-body text-lg text-gray-500">
              {t('qr.readyDesc', { name: pet.name })}
            </p>
          </motion.div>

          {/* QR + pet card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-8 overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-gray-100"
          >
            <div className="grid md:grid-cols-2">
              {/* QR side */}
              <div className="flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-primary-50 to-ocean-50 p-8">
                <div
                  ref={qrWrapperRef}
                  className="rounded-3xl bg-white p-5 shadow-lg"
                >
                  <QRCodeSVG
                    value={publicUrl}
                    size={220}
                    level="M"
                    includeMargin={false}
                    bgColor="#ffffff"
                    fgColor="#1f2937"
                  />
                </div>
                <p className="text-center font-body text-sm text-gray-500">
                  {t('qr.scanAnyPhone')}
                </p>
              </div>

              {/* Pet info side */}
              <div className="p-6 sm:p-8">
                <div className="mb-4 overflow-hidden rounded-2xl bg-gray-50">
                  <img
                    src={pet.image_url}
                    alt={pet.name}
                    className="h-40 w-full object-contain"
                  />
                </div>
                <h2 className="font-display text-2xl font-bold text-gray-800">
                  {pet.name}
                </h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="rounded-full bg-primary-100 px-3 py-1 font-body text-sm font-medium text-primary-600">
                    {pet.species}
                  </span>
                  {pet.breed && (
                    <span className="rounded-full bg-ocean-100 px-3 py-1 font-body text-sm font-medium text-ocean-600">
                      {pet.breed}
                    </span>
                  )}
                  {pet.gender && (
                    <span className="rounded-full bg-secondary-100 px-3 py-1 font-body text-sm font-medium text-secondary-600">
                      {pet.gender}
                    </span>
                  )}
                  {pet.age && (
                    <span className="rounded-full bg-accent-100 px-3 py-1 font-body text-sm font-medium text-accent-700">
                      {pet.age}
                    </span>
                  )}
                </div>
                {pet.description && (
                  <p className="mt-3 font-body text-sm text-gray-500 line-clamp-3">
                    {pet.description}
                  </p>
                )}
              </div>
            </div>

            {/* URL bar */}
            <div className="border-t border-gray-100 bg-gray-50/80 px-6 py-4 sm:px-8">
              <label className="mb-1 block font-body text-xs font-medium text-gray-400">
                {t('qr.publicUrl')}
              </label>
              <div className="flex items-center gap-2">
                <code className="flex-1 truncate rounded-lg bg-white px-3 py-2 font-body text-sm text-gray-600 ring-1 ring-gray-200">
                  {publicUrl}
                </code>
                <button
                  onClick={handleCopy}
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white text-gray-500 ring-1 ring-gray-200 transition-all hover:bg-primary-50 hover:text-primary-500"
                  aria-label="Copy URL"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-secondary-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-6 flex flex-col gap-3 sm:flex-row"
          >
            <button onClick={handleDownload} className="btn-secondary flex-1">
              <Download className="h-5 w-5" />
              {t('qr.download')}
            </button>
            <button onClick={handlePrint} className="btn-accent flex-1">
              <Printer className="h-5 w-5" />
              {t('qr.print')}
            </button>
            <Link to={`/pet/${pet.id}`} className="btn-primary flex-1">
              <ExternalLink className="h-5 w-5" />
              {t('qr.viewProfile')}
            </Link>
          </motion.div>

          {/* Helper text */}
          <div className="mt-8 rounded-2xl bg-ocean-50 p-5 text-center">
            <p className="font-body text-sm text-ocean-700">
              {t('qr.helper')}
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 font-body text-sm text-gray-500 transition-colors hover:text-primary-500"
            >
              <Home className="h-4 w-4" />
              {t('qr.backHome')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
