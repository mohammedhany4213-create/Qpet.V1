import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  PawPrint,
  Menu,
  X,
  Heart,
  HeartHandshake,
  Languages,
  LogIn,
  UserPlus,
  LogOut,
  LayoutGrid,
  Plus,
  User,
} from 'lucide-react';
import Logo from './Logo';
import { useI18n } from '@/i18n/I18nContext';
import { useAuth } from '@/auth/AuthContext';

export default function Navbar() {
  const { t, lang, toggleLang } = useI18n();
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await signOut();
    setMobileOpen(false);
    navigate('/');
  };

  const langToggle = (size: 'sm' | 'md') => (
    <button
      onClick={toggleLang}
      className={`flex items-center gap-1.5 rounded-full border-2 border-gray-200 bg-white font-display font-semibold text-gray-600 transition-all hover:border-primary-300 hover:text-primary-500 ${
        size === 'sm' ? 'px-2.5 py-2 text-xs' : 'px-3 py-2.5 text-sm'
      }`}
      aria-label="Toggle language"
    >
      <Languages className={size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
      <span className={lang === 'en' ? 'text-primary-500' : 'text-gray-400'}>EN</span>
      <span className="text-gray-300">|</span>
      <span className={lang === 'ar' ? 'text-primary-500' : 'text-gray-400'}>AR</span>
    </button>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100/60 bg-cream-50/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Logo />

        {/* Desktop nav */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            to="/adoption"
            className={`flex items-center gap-1.5 rounded-full px-4 py-2.5 font-display text-sm font-semibold transition-all ${
              isActive('/adoption')
                ? 'bg-primary-50 text-primary-600'
                : 'text-gray-600 hover:bg-gray-100 hover:text-primary-500'
            }`}
          >
            <Heart className="h-4 w-4" />
            {t('nav.adoption')}
          </Link>

          <Link
            to="/mating"
            className={`flex items-center gap-1.5 rounded-full px-4 py-2.5 font-display text-sm font-semibold transition-all ${
              isActive('/mating')
                ? 'bg-ocean-50 text-ocean-600'
                : 'text-gray-600 hover:bg-gray-100 hover:text-ocean-500'
            }`}
          >
            <HeartHandshake className="h-4 w-4" />
            {t('nav.mating')}
          </Link>

          {langToggle('md')}

          {user ? (
            <>
              <Link
                to="/my-pets"
                className={`flex items-center gap-1.5 rounded-full px-4 py-2.5 font-display text-sm font-semibold transition-all ${
                  isActive('/my-pets')
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-primary-500'
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
                {t('myPets.title')}
              </Link>
              <Link
                to="/create"
                className="flex items-center gap-2 rounded-full bg-primary-500 px-5 py-2.5 font-display text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition-all hover:bg-primary-600 hover:shadow-xl active:scale-95"
              >
                <Plus className="h-4 w-4" />
                {t('myPets.addPet')}
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-full border-2 border-gray-200 bg-white px-4 py-2.5 font-display text-sm font-semibold text-gray-600 transition-all hover:border-error-300 hover:bg-error-50 hover:text-error-500"
              >
                <LogOut className="h-4 w-4" />
                {t('auth.logout')}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`flex items-center gap-1.5 rounded-full px-4 py-2.5 font-display text-sm font-semibold transition-all ${
                  isActive('/login')
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-primary-500'
                }`}
              >
                <LogIn className="h-4 w-4" />
                {t('auth.loginButton')}
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-2 rounded-full bg-primary-500 px-5 py-2.5 font-display text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition-all hover:bg-primary-600 hover:shadow-xl active:scale-95"
              >
                <UserPlus className="h-4 w-4" />
                {t('auth.registerButton')}
              </Link>
            </>
          )}
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          {langToggle('sm')}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg shadow-primary-500/30 transition-all hover:bg-primary-600 active:scale-95"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-gray-100 bg-cream-50/95 backdrop-blur-md md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2 rounded-2xl px-4 py-3 font-display text-sm font-semibold transition-all ${
                isActive('/') ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <PawPrint className="h-4 w-4" />
              {t('nav.home')}
            </Link>
            <Link
              to="/adoption"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2 rounded-2xl px-4 py-3 font-display text-sm font-semibold transition-all ${
                isActive('/adoption') ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Heart className="h-4 w-4" />
              {t('nav.adoption')}
            </Link>
            <Link
              to="/mating"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2 rounded-2xl px-4 py-3 font-display text-sm font-semibold transition-all ${
                isActive('/mating') ? 'bg-ocean-50 text-ocean-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <HeartHandshake className="h-4 w-4" />
              {t('nav.mating')}
            </Link>

            {user ? (
              <>
                <Link
                  to="/my-pets"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 rounded-2xl px-4 py-3 font-display text-sm font-semibold transition-all ${
                    isActive('/my-pets') ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                  {t('myPets.title')}
                </Link>
                <Link
                  to="/create"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-2xl bg-primary-500 px-4 py-3 font-display text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition-all hover:bg-primary-600"
                >
                  <Plus className="h-4 w-4" />
                  {t('myPets.addPet')}
                </Link>
                <div className="mt-1 flex items-center gap-2 rounded-2xl bg-gray-50 px-4 py-2.5">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="truncate font-body text-xs text-gray-500">
                    {user.user_metadata?.full_name || user.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-2xl border-2 border-gray-200 px-4 py-3 font-display text-sm font-semibold text-gray-600 transition-all hover:border-error-300 hover:bg-error-50 hover:text-error-500"
                >
                  <LogOut className="h-4 w-4" />
                  {t('auth.logout')}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 rounded-2xl px-4 py-3 font-display text-sm font-semibold transition-all ${
                    isActive('/login') ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <LogIn className="h-4 w-4" />
                  {t('auth.loginButton')}
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-2xl bg-primary-500 px-4 py-3 font-display text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition-all hover:bg-primary-600"
                >
                  <UserPlus className="h-4 w-4" />
                  {t('auth.registerButton')}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
