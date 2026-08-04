import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Globe, CheckCircle2, User, Mail, Building, ArrowRight } from 'lucide-react';
import { soundManager } from '../utils/sound';
import { useI18n } from '../utils/i18n.tsx';

interface BookMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookMeetingModal: React.FC<BookMeetingModalProps> = ({ isOpen, onClose }) => {
  const { t, dir } = useI18n();
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedDate, setSelectedDate] = useState(t('forms.bookMeeting.tomorrow10AM'));
  const [selectedTopic, setSelectedTopic] = useState(t('forms.bookMeeting.topics.enterprise'));
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
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
      setStep(1);
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
          className="relative w-full max-w-2xl bg-[#101010] border border-[#D4AF37]/30 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden z-10 p-6 sm:p-10"
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
              <Calendar className="w-4 h-4" />
              <span>{t('common.executiveConsultation')}</span>
            </div>
          </div>

          {!submitted ? (
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-2">
                                {t('forms.bookMeeting.bookStrategicSession')}
              </h2>
              <p className="text-sm text-[#A7A7A7] mb-8">
                                {t('forms.bookMeeting.connectDirectly')}
              </p>

              {step === 1 ? (
                <div className="space-y-6">
                  {/* Select Topic */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#A7A7A7] mb-3">
                                            {t('forms.bookMeeting.selectTopic')}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        t('forms.bookMeeting.topics.enterprise'),
                        t('forms.bookMeeting.topics.spatial'),
                        t('forms.bookMeeting.topics.ai'),
                        t('forms.bookMeeting.topics.transformation'),
                      ].map((topic) => (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => {
                            soundManager.playClick();
                            setSelectedTopic(topic);
                          }}
                          className={`text-left p-3.5 rounded-xl border text-xs font-medium transition-all ${
                            selectedTopic === topic
                              ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#E6C766]'
                              : 'bg-white/[0.02] border-white/10 text-[#A7A7A7] hover:text-white hover:bg-white/[0.05]'
                          }`}
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Select Time slot */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#A7A7A7] mb-3">
                                            {t('forms.bookMeeting.selectTimeSlot')}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        t('forms.bookMeeting.tomorrow10AM'),
                        t('forms.bookMeeting.tomorrow2PM'),
                        t('forms.bookMeeting.thursday1130AM'),
                      ].map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => {
                            soundManager.playClick();
                            setSelectedDate(slot);
                          }}
                          className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-mono transition-all ${
                            selectedDate === slot
                              ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#E6C766]'
                              : 'bg-white/[0.02] border-white/10 text-[#A7A7A7] hover:text-white'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>{slot}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setStep(2);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E6C766] text-[#050505] font-bold text-sm uppercase tracking-wider font-display hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all"
                  >
                                        <span>{t('forms.bookMeeting.continueToContactInfo')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A7A7A7] mb-1.5">
                                            {t('forms.bookMeeting.fullName')}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 w-4 h-4 text-[#A7A7A7]" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/10 focus:border-[#D4AF37] rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A7A7A7] mb-1.5">
                                            {t('forms.bookMeeting.email')}
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
                                            {t('forms.bookMeeting.company')}
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3.5 top-3.5 w-4 h-4 text-[#A7A7A7]" />
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/10 focus:border-[#D4AF37] rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-1/3 py-3.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-[#A7A7A7] hover:text-white"
                    >
                      {t('common.back')}
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E6C766] text-[#050505] font-bold text-xs uppercase tracking-wider font-display hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all"
                    >
                                            {t('forms.bookMeeting.submit')}
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <div className="py-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center mb-6 gold-glow">
                <CheckCircle2 className="w-8 h-8 text-[#E6C766]" />
              </div>
              <h3 className="text-2xl font-bold font-display text-white mb-2">
                {t('bookMeeting.bookingConfirmed')}
              </h3>
              <p className="text-sm text-[#A7A7A7] max-w-md mb-6 leading-relaxed">
                {t('bookMeeting.bookingConfirmedMessage')}
              </p>
              <button
                onClick={handleResetAndClose}
                className="px-8 py-3 rounded-full bg-[#101010] border border-[#D4AF37]/50 text-xs font-bold uppercase tracking-wider text-[#E6C766] hover:bg-[#D4AF37] hover:text-black transition-all"
              >
                {t('common.close')}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
