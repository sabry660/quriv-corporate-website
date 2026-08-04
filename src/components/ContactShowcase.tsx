import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Facebook,
  MessageCircle,
  User,
  Building,
  Calendar,
  Clock,
  DollarSign,
  Send,
  UserPlus,
  X,
  CheckCircle2,
  AlertCircle,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Globe2,
  PhoneCall
} from 'lucide-react';
import { soundManager } from '../utils/sound';
import { useI18n } from '../utils/i18n.tsx';

export interface ContactInfoStructure {
  phone: string;
  email: string;
  address: string;
  responseTime: string;
  socials: {
    name: string;
    url: string;
    icon: string;
  }[];
}

export const CONTACT_INFO_DATA: ContactInfoStructure = {
  phone: '01157502000',
  email: 'ceo@quriv.com',
  address: 'Azarita, Alexandria, Egypt',
  responseTime: '< 2 Hours Guaranteed',
  socials: [
    { name: 'Facebook', url: 'https://www.facebook.com/p/Quriv-Technologies-100093578880006/', icon: 'facebook' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/quriv-technologies', icon: 'linkedin' },
    { name: 'WhatsApp', url: 'https://wa.me/201157502000', icon: 'whatsapp' },
    { name: 'Email', url: 'mailto:ceo@quriv.com', icon: 'email' },
  ],
};

const INDUSTRIES_LIST = [
  'industryFintech',
  'industryFoodHospitality',
  'industryRealEstate',
  'industryEcommerce',
  'industryHealthcare',
  'enterpriseSoftware',
  'industryOther',
];

const TIME_SLOTS = [
  'morning',
  'afternoon',
  'evening',
  'night',
];

const BUDGET_RANGES = [
  'budgetUnder10k',
  'budget10kTo25k',
  'budget25kTo50k',
  'budget50kTo100k',
  'budget100kPlus',
];

interface ContactShowcaseProps {
  onOpenBookMeeting?: () => void;
}

export const ContactShowcase: React.FC<ContactShowcaseProps> = ({ onOpenBookMeeting }) => {
  const { t, dir } = useI18n();

  // Booking Form State
  const [bookingData, setBookingData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    industry: INDUSTRIES_LIST[0],
    preferredDate: '',
    preferredTime: TIME_SLOTS[0],
    projectBudget: '',
    message: '',
  });

  const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [bookingErrorMessage, setBookingErrorMessage] = useState('');

  // Create Account Modal State
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [accountData, setAccountData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [accountStatus, setAccountStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [accountErrorMessage, setAccountErrorMessage] = useState('');

  // Handle Book Meeting Submission
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playClick();

    // Basic Validation
    if (!bookingData.fullName.trim() || !bookingData.company.trim() || !bookingData.email.trim() || !bookingData.phone.trim()) {
      setBookingStatus('error');
      setBookingErrorMessage(t('common.completeRequiredFields'));
      return;
    }

    if (!bookingData.email.includes('@') || !bookingData.email.includes('.')) {
      setBookingStatus('error');
      setBookingErrorMessage(t('common.validEmailRequired'));
      return;
    }

    setBookingStatus('loading');
    setBookingErrorMessage('');

    // Simulate API Transmission
    setTimeout(() => {
      soundManager.playChime();
      setBookingStatus('success');
    }, 1200);
  };

  const handleResetBooking = () => {
    soundManager.playClick();
    setBookingData({
      fullName: '',
      company: '',
      email: '',
      phone: '',
      industry: INDUSTRIES_LIST[0],
      preferredDate: '',
      preferredTime: TIME_SLOTS[0],
      projectBudget: '',
      message: '',
    });
    setBookingStatus('idle');
  };

  // Handle Create Account Submission
  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playClick();

    if (!accountData.name.trim() || !accountData.email.trim() || !accountData.password.trim()) {
      setAccountStatus('error');
      setAccountErrorMessage('Please complete all required account fields.');
      return;
    }

    if (accountData.password !== accountData.confirmPassword) {
      setAccountStatus('error');
      setAccountErrorMessage('Passwords do not match. Please verify your credentials.');
      return;
    }

    if (accountData.password.length < 6) {
      setAccountStatus('error');
      setAccountErrorMessage('Password must be at least 6 characters in length.');
      return;
    }

    setAccountStatus('loading');
    setAccountErrorMessage('');

    // Simulate Account Creation
    setTimeout(() => {
      soundManager.playChime();
      setAccountStatus('success');
    }, 1400);
  };

  const handleCloseAccountModal = () => {
    soundManager.playClick();
    setIsAccountModalOpen(false);
    setTimeout(() => {
      setAccountStatus('idle');
      setAccountErrorMessage('');
      setAccountData({
        name: '',
        company: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      });
    }, 300);
  };

  return (
    <div className="space-y-10 text-white relative z-10" dir={dir}>
      {/* SECTION HEADER CTA BAR */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-black/60 border border-[#D4AF37]/40 backdrop-blur-2xl shadow-2xl gold-glow">
        <div className="space-y-2 text-center md:text-start">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-mono text-[#E6C766] uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t('common.architecturalConsultation')}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            {t('common.letsBuildSomethingGreat')}
          </h3>
          <p className="text-xs sm:text-sm text-[#A7A7A7] font-light max-w-xl">
            {t('common.readyToConvertComplexity')}
          </p>
        </div>

        {/* Create Account Trigger Button */}
        <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0 w-full md:w-auto">
          <button
            onClick={() => {
              soundManager.playClick();
              setIsAccountModalOpen(true);
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#D4AF37] text-xs font-mono text-[#E6C766] hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
          >
            <UserPlus className="w-4 h-4 text-[#D4AF37]" />
            <span>{t('contact.createAccount')}</span>
          </button>
        </div>
      </div>

      {/* MAIN TWO-COLUMN LAYOUT: CONTACT INFORMATION & BOOK A MEETING FORM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: CONTACT INFORMATION PANEL */}
        <div className="lg:col-span-5 rounded-3xl bg-black/60 border border-white/10 backdrop-blur-2xl p-6 sm:p-8 space-y-8 shadow-2xl">
          <div className="space-y-2 border-b border-white/10 pb-6">
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold">
              // {t('common.directTelemetry')}
            </span>
            <h4 className="text-xl font-bold font-display text-white">
              {t('contact.contactInfo')}
            </h4>
            <p className="text-xs text-[#A7A7A7] font-light leading-relaxed">
              {t('contact.subtitle')}
            </p>
          </div>

          {/* CONTACT DETAILS LIST */}
          <div className="space-y-5">
            {/* Phone */}
            <motion.div
              whileHover={{ scale: 1.02, x: dir === 'rtl' ? -5 : 5 }}
              className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#D4AF37]/50 transition-colors group cursor-pointer"
            >
              <motion.div
                className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center flex-shrink-0"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Phone className="w-5 h-5" />
              </motion.div>
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-[#A7A7A7] uppercase tracking-wider">
                  {t('contact.phoneLabel')}
                </div>
                <div className="text-sm font-mono text-white font-semibold">
                  {CONTACT_INFO_DATA.phone}
                </div>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              whileHover={{ scale: 1.02, x: dir === 'rtl' ? -5 : 5 }}
              className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#D4AF37]/50 transition-colors group cursor-pointer"
            >
              <motion.div
                className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center flex-shrink-0"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Mail className="w-5 h-5" />
              </motion.div>
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-[#A7A7A7] uppercase tracking-wider">
                  {t('contact.emailLabel')}
                </div>
                <div className="text-sm font-mono text-white font-semibold">
                  {CONTACT_INFO_DATA.email}
                </div>
              </div>
            </motion.div>

            {/* Address */}
            <motion.div
              whileHover={{ scale: 1.02, x: dir === 'rtl' ? -5 : 5 }}
              className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#D4AF37]/50 transition-colors group cursor-pointer"
            >
              <motion.div
                className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center flex-shrink-0"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <MapPin className="w-5 h-5" />
              </motion.div>
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-[#A7A7A7] uppercase tracking-wider">
                  {t('contact.addressLabel')}
                </div>
                <div className="text-xs font-mono text-white font-semibold leading-relaxed">
                  {CONTACT_INFO_DATA.address}
                </div>
              </div>
            </motion.div>
          </div>

          {/* SOCIAL MEDIA LINKS */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="text-[10px] font-mono text-[#A7A7A7] uppercase tracking-wider">
              {t('contact.socialMediaLinks')}
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {CONTACT_INFO_DATA.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playClick()}
                  onMouseEnter={() => soundManager.playHover()}
                  className="px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 text-xs font-mono text-[#C0C0C0] hover:text-white transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    {social.icon === 'linkedin' && <Linkedin className="w-3.5 h-3.5 text-[#D4AF37]" />}
                    {social.icon === 'facebook' && <Facebook className="w-3.5 h-3.5 text-[#D4AF37]" />}
                    {social.icon === 'whatsapp' && <MessageCircle className="w-3.5 h-3.5 text-[#D4AF37]" />}
                    {social.icon === 'email' && <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />}
                    <span>{social.icon === 'linkedin' ? t('common.linkedin') : social.icon === 'facebook' ? t('common.facebook') : social.icon === 'whatsapp' ? t('common.whatsapp') : t('common.email')}</span>
                  </div>
                  <ExternalLink className="w-3 h-3 opacity-40 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: BOOK A MEETING FORM PANEL */}
        <div className="lg:col-span-7 rounded-3xl bg-black/60 border border-[#D4AF37]/40 backdrop-blur-2xl p-6 sm:p-8 space-y-6 shadow-2xl gold-glow relative">
          <div className="space-y-1 border-b border-white/10 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold">
                // {t('contact.consultationScheduler')}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[9px] font-mono text-emerald-400">
                {t('contact.slotsOpenToday')}
              </span>
            </div>
            <h4 className="text-2xl font-bold font-display text-white">
              {t('common.bookMeetingFormTitle')}
            </h4>
            <p className="text-xs text-[#A7A7A7] font-light">
              {t('common.bookMeetingFormDescription')}
            </p>
          </div>

          {/* BOOKING FORM SUCCESS STATE */}
          {bookingStatus === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 px-6 text-center space-y-6 bg-gradient-to-b from-[#121612] to-black rounded-2xl border border-emerald-500/40"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h5 className="text-2xl font-bold font-display text-white">
                  {t('bookMeeting.meetingInquiryTransmitted')}
                </h5>
                <p className="text-xs text-[#C0C0C0] max-w-md mx-auto leading-relaxed">
                  {t('bookMeeting.thankYouForRequest')} <span className="text-[#E6C766] font-semibold">{bookingData.fullName}</span>. {t('bookMeeting.yourConsultationRequest')} <span className="text-white font-semibold">{bookingData.company}</span> {t('bookMeeting.hasBeenAssigned')}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 max-w-sm mx-auto text-start font-mono text-xs space-y-2">
                <div className="flex justify-between text-[#A7A7A7]">
                  <span>{t('bookMeeting.preferredDate')}</span>
                  <span className="text-white">{bookingData.preferredDate || t('bookMeeting.earliestSlot')}</span>
                </div>
                <div className="flex justify-between text-[#A7A7A7]">
                  <span>{t('bookMeeting.preferredTime')}</span>
                  <span className="text-white">{bookingData.preferredTime}</span>
                </div>
                <div className="flex justify-between text-[#A7A7A7]">
                  <span>{t('bookMeeting.industry')}</span>
                  <span className="text-[#E6C766]">{bookingData.industry}</span>
                </div>
              </div>

              <button
                onClick={handleResetBooking}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-white transition-all cursor-pointer"
              >
                {t('bookMeeting.submitAnotherRequest')}
              </button>
            </motion.div>
          ) : (
            /* BOOKING FORM */
            <form onSubmit={handleBookingSubmit} className="space-y-5">
              {/* ERROR ALERT BANNER */}
              {bookingStatus === 'error' && bookingErrorMessage && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400 text-xs flex items-center gap-3">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{bookingErrorMessage}</span>
                </div>
              )}

              {/* ROW 1: FULL NAME & COMPANY */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="fullName" className="block text-xs font-mono text-[#A7A7A7] uppercase">
                    {t('common.fullNameLabel')} <span className="text-[#D4AF37]">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-3.5" />
                    <input
                      id="fullName"
                      type="text"
                      required
                      value={bookingData.fullName}
                      onChange={(e) => setBookingData({ ...bookingData, fullName: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="company" className="block text-xs font-mono text-[#A7A7A7] uppercase">
                    {t('common.companyLabel')} <span className="text-[#D4AF37]">*</span>
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-3.5" />
                    <input
                      id="company"
                      type="text"
                      required
                      value={bookingData.company}
                      onChange={(e) => setBookingData({ ...bookingData, company: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* ROW 2: EMAIL & PHONE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-mono text-[#A7A7A7] uppercase">
                    {t('common.emailLabel')} <span className="text-[#D4AF37]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-3.5" />
                    <input
                      id="email"
                      type="email"
                      required
                      value={bookingData.email}
                      onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="phone" className="block text-xs font-mono text-[#A7A7A7] uppercase">
                    {t('common.phoneLabel')} <span className="text-[#D4AF37]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-3.5" />
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* ROW 3: INDUSTRY & BUDGET */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="industry" className="block text-xs font-mono text-[#A7A7A7] uppercase">
                    {t('bookMeeting.selectIndustry')}
                  </label>
                  <select
                    id="industry"
                    value={bookingData.industry}
                    onChange={(e) => setBookingData({ ...bookingData, industry: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all cursor-pointer"
                  >
                    <option value="" className="bg-[#121218] text-[#A7A7A7]">{t('bookMeeting.selectIndustry')}</option>
                    {INDUSTRIES_LIST.map((ind) => (
                      <option key={ind} value={ind} className="bg-[#121218] text-white">
                        {t(`common.${ind}`)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="projectBudget" className="block text-xs font-mono text-[#A7A7A7] uppercase">
                    {t('bookMeeting.projectBudgetOptional')}
                  </label>
                  <select
                    id="projectBudget"
                    value={bookingData.projectBudget}
                    onChange={(e) => setBookingData({ ...bookingData, projectBudget: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all cursor-pointer"
                  >
                    <option value="" className="bg-[#121218] text-[#A7A7A7]">{t('bookMeeting.selectBudget')}</option>
                    {BUDGET_RANGES.map((budget) => (
                      <option key={budget} value={budget} className="bg-[#121218] text-white">
                        {t(`common.${budget}`)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* ROW 4: PREFERRED DATE & TIME */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="preferredDate" className="block text-xs font-mono text-[#A7A7A7] uppercase">
                    {t('bookMeeting.preferredDate')}
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      id="preferredDate"
                      type="date"
                      value={bookingData.preferredDate}
                      onChange={(e) => setBookingData({ ...bookingData, preferredDate: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all [color-scheme:dark]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="preferredTime" className="block text-xs font-mono text-[#A7A7A7] uppercase">
                    {t('bookMeeting.preferredTime')}
                  </label>
                  <select
                    id="preferredTime"
                    value={bookingData.preferredTime}
                    onChange={(e) => setBookingData({ ...bookingData, preferredTime: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all cursor-pointer"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot} className="bg-[#121218] text-white">
                        {t(`common.${slot}Slot`)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* MESSAGE AREA */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="block text-xs font-mono text-[#A7A7A7] uppercase">
                  {t('bookMeeting.messageLabel')}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={bookingData.message}
                  onChange={(e) => setBookingData({ ...bookingData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all resize-none"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={bookingStatus === 'loading'}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E6C766] to-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider font-display hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {bookingStatus === 'loading' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Transmitting Architecture Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Book Architectural Session</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* CREATE ACCOUNT MODAL */}
      <AnimatePresence>
        {isAccountModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="account-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg rounded-3xl bg-[#0c0c12] border border-[#D4AF37]/50 p-6 sm:p-8 space-y-6 shadow-2xl gold-glow overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseAccountModal}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-colors cursor-pointer"
                title="Close Modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[10px] font-mono text-[#E6C766] uppercase tracking-widest">
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  <span>{t('common.clientPortalAccess')}</span>
                </div>
                <h3 className="text-2xl font-bold font-display text-white">
                  {t('contact.createAccount')}
                </h3>
                <p className="text-xs text-[#A7A7A7] font-light">
                  {t('common.establishClientPortal')}
                </p>
              </div>

              {/* SUCCESS STATE IN MODAL */}
              {accountStatus === 'success' ? (
                <div className="py-8 text-center space-y-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/30 p-6">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold font-display text-white">{t('common.accountCreated')}</h4>
                    <p className="text-xs text-[#C0C0C0]">
                      {t('common.welcomeToClientPortal')}, <span className="text-[#E6C766] font-semibold">{accountData.name}</span>.
                    </p>
                  </div>
                  <button
                    onClick={handleCloseAccountModal}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E6C766] text-black font-bold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    {t('common.done')}
                  </button>
                </div>
              ) : (
                /* FORM IN MODAL */
                <form onSubmit={handleAccountSubmit} className="space-y-4 text-start">
                  {accountStatus === 'error' && accountErrorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{accountErrorMessage}</span>
                    </div>
                  )}

                  {/* Name & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-[11px] font-mono text-[#A7A7A7] uppercase">{t('common.fullNameLabel')} *</label>
                      <input
                        type="text"
                        required
                        placeholder={t('common.placeholderFullName')}
                        value={accountData.name}
                        onChange={(e) => setAccountData({ ...accountData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-mono text-[#A7A7A7] uppercase">{t('common.companyLabel')}</label>
                      <input
                        type="text"
                        placeholder={t('common.placeholderOrganizationName')}
                        value={accountData.company}
                        onChange={(e) => setAccountData({ ...accountData, company: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-mono text-[#A7A7A7] uppercase">{t('common.emailLabel')}</label>
                      <input
                        type="email"
                        required
                        placeholder={t('common.placeholderEmail')}
                        value={accountData.email}
                        onChange={(e) => setAccountData({ ...accountData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-mono text-[#A7A7A7] uppercase">{t('common.phoneLabel')}</label>
                      <input
                        type="tel"
                        placeholder={t('common.placeholderPhone')}
                        value={accountData.phone}
                        onChange={(e) => setAccountData({ ...accountData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-mono text-[#A7A7A7] uppercase">{t('common.passwordLabel')}</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          placeholder={t('common.placeholderPassword')}
                          value={accountData.password}
                          onChange={(e) => setAccountData({ ...accountData, password: e.target.value })}
                          className="w-full pl-3.5 pr-8 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-[#A7A7A7] hover:text-white transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-mono text-[#A7A7A7] uppercase">{t('common.confirmPasswordLabel')}</label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder={t('common.placeholderPassword')}
                        value={accountData.confirmPassword}
                        onChange={(e) => setAccountData({ ...accountData, confirmPassword: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={accountStatus === 'loading'}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E6C766] to-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider font-display hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {accountStatus === 'loading' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>Creating Account...</span>
                        </>
                      ) : (
                        <span>{t('common.registerClientPortalAccount')}</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
