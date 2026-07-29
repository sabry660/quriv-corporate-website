import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, UserPlus, Shield, KeyRound, Mail, Lock, CheckCircle, ArrowRight } from 'lucide-react';
import { soundManager } from '../utils/sound';
import { useI18n } from '../utils/i18n.tsx';

interface CreateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateAccountModal: React.FC<CreateAccountModalProps> = ({ isOpen, onClose }) => {
  const { t, dir } = useI18n();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tier, setTier] = useState<'enterprise' | 'architect' | 'developer'>('enterprise');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playChime();
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleResetAndClose}
          className="fixed inset-0 bg-[#050505]/85 backdrop-blur-xl"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl bg-[#101010] border border-[#D4AF37]/30 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden z-10 p-6 sm:p-10"
          dir={dir}
        >
          {/* Close button */}
          <button
            onClick={handleResetAndClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/[0.05] border border-white/10 hover:border-[#D4AF37] text-[#A7A7A7] hover:text-white transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#D4AF37]/30">
              <img
                src="/logo.jpg"
                alt="Quriv Technologies Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#D4AF37]">
              <Shield className="w-4 h-4" />
              <span>Client Portal Access</span>
            </div>
          </div>

          {!submitted ? (
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-2">
                {t('forms.createAccount.title')}
              </h2>
              <p className="text-sm text-[#A7A7A7] mb-6">
                {t('forms.createAccount.subtitle')}
              </p>

              {/* Access Tier Picker */}
              <div className="mb-6">
                <label className="block text-xs font-mono uppercase text-[#A7A7A7] mb-2">
                  {t('forms.createAccount.accessLevel')}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'enterprise', label: t('forms.createAccount.tiers.enterprise') },
                    { id: 'architect', label: t('forms.createAccount.tiers.architect') },
                    { id: 'developer', label: t('forms.createAccount.tiers.developer') },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setTier(item.id as 'enterprise' | 'architect' | 'developer');
                      }}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-medium uppercase font-display transition-all ${
                        tier === item.id
                          ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#E6C766]'
                          : 'bg-white/[0.02] border-white/10 text-[#A7A7A7] hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#A7A7A7] mb-1.5">
                    {t('forms.createAccount.email')}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-[#A7A7A7]" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/10 focus:border-[#D4AF37] rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#A7A7A7] mb-1.5">
                    {t('forms.createAccount.password')}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-[#A7A7A7]" />
                    <input
                      type="password"
                      required
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/10 focus:border-[#D4AF37] rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E6C766] text-[#050505] font-bold text-sm uppercase tracking-wider font-display hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{t('forms.createAccount.submit')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            <div className="py-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center mb-6 gold-glow">
                <CheckCircle className="w-8 h-8 text-[#E6C766]" />
              </div>
              <h3 className="text-2xl font-bold font-display text-white mb-2">
                Provisioning Complete
              </h3>
              <p className="text-sm text-[#A7A7A7] max-w-md mb-6 leading-relaxed">
                Your <span className="text-[#E6C766] uppercase font-mono">{tier}</span> access token for{' '}
                <span className="text-white font-mono">{email}</span> has been created. Activation instructions have been dispatched.
              </p>
              <button
                onClick={handleResetAndClose}
                className="px-8 py-3 rounded-full bg-[#101010] border border-[#D4AF37]/50 text-xs font-bold uppercase tracking-wider text-[#E6C766] hover:bg-[#D4AF37] hover:text-black transition-all"
              >
                Enter Portal
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
