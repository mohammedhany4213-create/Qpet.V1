import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, ArrowRight, PawPrint, AlertCircle, Check, LogIn } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingShapes from '@/components/FloatingShapes';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useAuth } from '@/auth/AuthContext';
import { useI18n } from '@/i18n/I18nContext';

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function RegisterPage() {
  const { signUp } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!fullName.trim()) next.fullName = 'auth.fullNameRequired';
    else if (fullName.trim().length < 2) next.fullName = 'auth.fullNameTooShort';

    if (!email.trim()) next.email = 'auth.emailRequired';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = 'auth.invalidEmail';

    if (!password) next.password = 'auth.passwordRequired';
    else if (password.length < 6) next.password = 'auth.passwordTooShort';

    if (!confirmPassword) next.confirmPassword = 'auth.confirmRequired';
    else if (password !== confirmPassword) next.confirmPassword = 'auth.passwordMismatch';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    if (!validate()) return;

    setSubmitting(true);
    const { error } = await signUp(email.trim(), password, fullName.trim());
    if (error) {
      setServerError(error);
      setSubmitting(false);
    } else {
      // Email confirmation is OFF in this project, but some projects enable it.
      // If a session was created, go to login. Otherwise show a success state
      // directing the user to login.
      setSuccess(true);
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-cream-50 via-cream-100 to-white">
        <FloatingShapes />
        <Navbar />
        <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md rounded-3xl bg-white/90 p-8 text-center shadow-2xl ring-1 ring-gray-100 backdrop-blur sm:p-10"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary-100 shadow-lg">
              <Check className="h-7 w-7 text-secondary-600" />
            </div>
            <h1 className="font-display text-2xl font-bold text-gray-800">
              {t('auth.registerSuccess')}
            </h1>
            <p className="mt-2 font-body text-sm text-gray-500">
              {t('auth.registerSuccessDesc')}
            </p>
            <button
              onClick={() => navigate('/login')}
              className="btn-primary mt-6 w-full text-lg"
            >
              <LogIn className="h-5 w-5" />
              {t('auth.goToLogin')}
            </button>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

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
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-ocean-400 to-ocean-600 shadow-lg shadow-ocean-500/30">
                <UserPlus className="h-7 w-7 text-white" />
              </div>
              <h1 className="font-display text-2xl font-bold text-gray-800 sm:text-3xl">
                {t('auth.registerTitle')}
              </h1>
              <p className="mt-2 font-body text-sm text-gray-500">
                {t('auth.registerSubtitle')}
              </p>
            </div>

            {serverError && (
              <div className="mb-5 flex items-start gap-2 rounded-2xl bg-error-50 p-3.5">
                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-error-500" />
                <p className="font-body text-sm text-error-600">{t(serverError)}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="fullName" className="label-text">{t('auth.fullName')}</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors((p) => ({ ...p, fullName: undefined }));
                    }}
                    placeholder={t('auth.fullNamePh')}
                    className={`input-field pl-11 ${errors.fullName ? 'error' : ''}`}
                    autoComplete="name"
                    disabled={submitting}
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1.5 font-body text-sm text-error-500">{t(errors.fullName)}</p>
                )}
              </div>

              <div>
                <label htmlFor="reg-email" className="label-text">{t('auth.email')}</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="reg-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                    }}
                    placeholder={t('auth.emailPh')}
                    className={`input-field pl-11 ${errors.email ? 'error' : ''}`}
                    autoComplete="email"
                    disabled={submitting}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 font-body text-sm text-error-500">{t(errors.email)}</p>
                )}
              </div>

              <div>
                <label htmlFor="reg-password" className="label-text">{t('auth.password')}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="reg-password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors((p) => ({ ...p, password: undefined }));
                    }}
                    placeholder={t('auth.passwordPh')}
                    className={`input-field pl-11 ${errors.password ? 'error' : ''}`}
                    autoComplete="new-password"
                    disabled={submitting}
                  />
                </div>
                {errors.password && (
                  <p className="mt-1.5 font-body text-sm text-error-500">{t(errors.password)}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirm-password" className="label-text">{t('auth.confirmPassword')}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword) setErrors((p) => ({ ...p, confirmPassword: undefined }));
                    }}
                    placeholder={t('auth.confirmPasswordPh')}
                    className={`input-field pl-11 ${errors.confirmPassword ? 'error' : ''}`}
                    autoComplete="new-password"
                    disabled={submitting}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1.5 font-body text-sm text-error-500">{t(errors.confirmPassword)}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full text-lg"
              >
                {submitting ? (
                  <LoadingSpinner size={20} className="text-white" />
                ) : (
                  <>
                    <UserPlus className="h-5 w-5" />
                    {t('auth.registerButton')}
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-center font-body text-sm text-gray-500">
              {t('auth.haveAccount')}{' '}
              <Link to="/login" className="font-semibold text-primary-500 hover:underline">
                {t('auth.loginLink')}
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

