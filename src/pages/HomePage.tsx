import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  QrCode,
  Camera,
  PawPrint,
  ArrowRight,
  ScanLine,
  Heart,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingShapes from '@/components/FloatingShapes';
import { useI18n } from '@/i18n/I18nContext';

const heroDog =
  'https://images.pexels.com/photos/11182173/pexels-photo-11182173.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const heroCat =
  'https://images.pexels.com/photos/29748152/pexels-photo-29748152.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const steps = [
  {
    icon: Camera,
    titleKey: 'home.step1Title',
    descKey: 'home.step1Desc',
    color: 'bg-primary-100 text-primary-600',
    ring: 'ring-primary-200',
  },
  {
    icon: QrCode,
    titleKey: 'home.step2Title',
    descKey: 'home.step2Desc',
    color: 'bg-ocean-100 text-ocean-600',
    ring: 'ring-ocean-200',
  },
  {
    icon: ScanLine,
    titleKey: 'home.step3Title',
    descKey: 'home.step3Desc',
    color: 'bg-accent-100 text-accent-700',
    ring: 'ring-accent-200',
  },
];

const features = [
  {
    icon: ShieldCheck,
    title: 'No accounts, no fuss',
    desc: 'No sign-up, no login, no passwords. Just create a profile and share.',
  },
  {
    icon: Sparkles,
    title: 'A real digital ID',
    desc: 'Every pet gets their own beautiful page that looks great on any phone.',
  },
  {
    icon: Heart,
    title: 'Built for good humans',
    desc: 'If your furry friend ever wanders off, the finder can scan the code and contact you instantly.',
  },
];

export default function HomePage() {
  const { t } = useI18n();
  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-cream-50 via-cream-100 to-white">
      <FloatingShapes />
      <Navbar />

      <main className="relative z-10 flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-12 pb-16 sm:px-6 sm:pt-20 lg:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center lg:text-left"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
                <PawPrint className="h-4 w-4 text-primary-500" />
                <span className="font-body text-sm font-medium text-gray-600">
                  {t('home.badge')}
                </span>
              </div>

              <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-gray-800 sm:text-5xl lg:text-6xl">
                {t('home.heroTitle')}{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-primary-500">{t('home.heroHighlight')}</span>
                  <span className="absolute bottom-1 left-0 right-0 z-0 h-3 -rotate-1 rounded-full bg-accent-300/60" />
                </span>
              </h1>

              <p className="mx-auto mt-5 max-w-md font-body text-lg text-gray-500 lg:mx-0">
                {t('home.heroDesc')}
              </p>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                <Link to="/create" className="btn-primary text-lg">
                  <PawPrint className="h-5 w-5" />
                  {t('home.createProfile')}
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a href="#how-it-works" className="btn-ghost text-lg">
                  {t('home.howItWorks')}
                </a>
              </div>
            </motion.div>

            {/* Hero collage */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mx-auto w-full max-w-md"
            >
              <div className="relative">
                {/* Decorative QR badge */}
                <motion.div
                  animate={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="absolute -top-4 -left-4 z-20 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-xl"
                >
                  <QrCode className="h-12 w-12 text-gray-800" strokeWidth={1.5} />
                </motion.div>

                {/* Decorative paw badge */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-4 -right-4 z-20 flex h-16 w-16 items-center justify-center rounded-full bg-secondary-400 shadow-xl"
                >
                  <PawPrint className="h-8 w-8 text-white" strokeWidth={2.5} />
                </motion.div>

                {/* Main image */}
                <div className="overflow-hidden rounded-[2.5rem] border-4 border-white bg-white shadow-2xl">
                  <img
                    src={heroDog}
                    alt="Cute golden retriever puppy with tongue out"
                    className="aspect-[4/5] w-full bg-gray-50 object-contain"
                  />
                </div>

                {/* Floating smaller image */}
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                  className="absolute -bottom-8 -left-8 z-10 hidden w-36 overflow-hidden rounded-3xl border-4 border-white shadow-xl sm:block"
                >
                  <img
                    src={heroCat}
                    alt="Cute tabby cat"
                    className="aspect-square w-full object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="bg-white/70 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <h2 className="font-display text-3xl font-bold text-gray-800 sm:text-4xl">
                {t('home.stepsTitle')}
              </h2>
              <p className="mt-3 font-body text-lg text-gray-500">
                {t('home.stepsDesc')}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {steps.map((step, i) => (
                <motion.div
                  key={step.titleKey}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  className="group relative rounded-3xl bg-white p-8 shadow-lg ring-1 transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${step.color} ring-4 ${step.ring} transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                    <step.icon className="h-7 w-7" strokeWidth={2.2} />
                  </div>
                  <div className="mb-1 font-display text-sm font-bold text-gray-300">
                    {t('home.step')} {i + 1}
                  </div>
                  <h3 className="mb-2 font-display text-xl font-semibold text-gray-800">
                    {t(step.titleKey)}
                  </h3>
                  <p className="font-body text-gray-500">{t(step.descKey)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features strip */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="grid gap-6 sm:grid-cols-3">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-ocean-100 text-primary-500">
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-1.5 font-display text-lg font-semibold text-gray-800">
                    {t(f.titleKey)}
                  </h3>
                  <p className="font-body text-sm text-gray-500">{t(f.descKey)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 pb-20 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary-500 via-primary-400 to-ocean-500 p-10 text-center shadow-2xl sm:p-16"
          >
            <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/10" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-white/10" />

            <div className="relative">
              <PawPrint className="mx-auto mb-4 h-12 w-12 text-white animate-bounce-slow" />
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                {t('home.ctaTitle')}
              </h2>
              <p className="mx-auto mt-3 max-w-md font-body text-lg text-white/90">
                {t('home.ctaDesc')}
              </p>
              <Link
                to="/create"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-display text-lg font-bold text-primary-600 shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                <PawPrint className="h-5 w-5" />
                {t('home.createProfile')}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
