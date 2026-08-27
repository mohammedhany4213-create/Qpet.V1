import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, ArrowRight, PawPrint, AlertCircle, LockKeyhole, UserPlus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingShapes from '@/components/FloatingShapes';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useAuth } from '@/auth/AuthContext';
import { useI18n } from '@/i18n/I18nContext';

export default function LoginPage() {
  const { signIn } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fromState = (location.state as { from?: string } | null)?.from;
  const wasRedirected = Boolean(fromState);
  const from = fromState ?? '/my-pets';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password) {
      setError('auth.fillAllFields');
      return;
    }
    setSubmitting(true);
    const { error: err } = await signIn(email.trim(), password);
    if (err) {
      setError(err);
      setSubmitting(false);
    } else {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-cream-50 via-cream-100 to-white">
      <FloatingShapes />
      <Navbar />

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="rounded-3xl bg-white/90 p-8 shadow-2xl ring-1 ring-gray-100 backdrop-blur sm:p-10">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 shadow-lg shadow-primary-500/30">
                <LogIn className="h-7 w-7 text-white" />
              </div>
              <h1 className="font-display text-2xl font-bold text-gray-800 sm:text-3xl">
                {t('auth.loginTitle')}
              </h1>
              <p className="mt-2 font-body text-sm text-gray-500">
                {t('auth.loginSubtitle')}
              </p>
            </div>

            {wasRedirected && (
              <div className="mb-5 rounded-2xl border-2 border-primary-100 bg-primary-50 p-4">
                <div className="flex items-start gap-2.5">
                  <LockKeyhole className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-500" />
                  <div>
                    <p className="font-display text-sm font-semibold text-primary-700">
                      {t('auth.loginRequiredTitle')}
                    </p>
                    <p className="mt-0.5 font-body text-sm text-primary-600">
                      {t('auth.loginRequired')}
                    </p>
                    <Link
                      to="/register"
                      className="mt-2 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 font-display text-xs font-semibold text-primary-600 shadow-sm transition-all hover:bg-primary-100"
                    >
                      <UserPlus className="h-3.5 w-3.5" />
                      {t('auth.registerButton')}
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-5 flex items-start gap-2 rounded-2xl bg-error-50 p-3.5">
                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-error-500" />
                <p className="font-body text-sm text-error-600">
                  {t(error)}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="label-text">{t('auth.email')}</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('auth.emailPh')}
                    className="input-field pl-11"
                    autoComplete="email"
                    disabled={submitting}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="label-text">{t('auth.password')}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('auth.passwordPh')}
                    className="input-field pl-11"
                    autoComplete="current-password"
                    disabled={submitting}
                  />
                </div>
              </div>

              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-300"
                  disabled={submitting}
                />
                <span className="font-body text-sm text-gray-600">{t('auth.rememberMe')}</span>
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full text-lg"
              >
                {submitting ? (
                  <LoadingSpinner size={20} className="text-white" />
                ) : (
                  <>
                    <LogIn className="h-5 w-5" />
                    {t('auth.loginButton')}
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-center font-body text-sm text-gray-500">
              {t('auth.noAccount')}{' '}
              <Link to="/register" className="font-semibold text-primary-500 hover:underline">
                {t('auth.registerLink')}
                <ArrowRight className="ms-1 inline h-3.5 w-3.5" />
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 font-body text-sm text-gray-500 transition-colors hover:text-primary-500"
            >
              <PawPrint className="h-4 w-4" />
              {t('auth.backHome')}
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
