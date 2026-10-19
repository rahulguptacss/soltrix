'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ArrowRight, ChevronDown, CheckCircle2, Check, Loader2 } from 'lucide-react';
import type { QuoteSectionData } from '../../types';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -8, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.98,
    transition: {
      duration: 0.15,
      ease: 'easeIn',
    },
  },
};

export default function GetAQuote({ data }: { data: QuoteSectionData }) {
  const { form, info } = data;

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    propertyType: '',
    city: '',
    requirements: '',
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownError, setDropdownError] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Close custom dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Standard input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Strict Numeric-Only handler for Phone Number
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    // Allow optional leading + followed only by digits
    if (val.startsWith('+')) {
      val = '+' + val.slice(1).replace(/\D/g, '');
    } else {
      val = val.replace(/\D/g, '');
    }
    // Limit to max 15 digits
    if (val.length > 16) val = val.slice(0, 16);

    setFormData((prev) => ({
      ...prev,
      phone: val,
    }));
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow navigational and editing keys
    if (
      [
        'Backspace',
        'Delete',
        'Tab',
        'Escape',
        'Enter',
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        'Home',
        'End',
      ].includes(e.key) ||
      e.ctrlKey ||
      e.metaKey
    ) {
      return;
    }
    // Allow '+' ONLY as first character
    if (
      e.key === '+' &&
      e.currentTarget.selectionStart === 0 &&
      !e.currentTarget.value.includes('+')
    ) {
      return;
    }
    // Block any non-numeric character
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleSelectOption = (option: string) => {
    setFormData((prev) => ({
      ...prev,
      propertyType: option,
    }));
    setIsDropdownOpen(false);
    setDropdownError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.propertyType) {
      setDropdownError(true);
      setIsDropdownOpen(true);
      return;
    }

    setIsSubmitting(true);

    // Simulate clean form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 650);
  };

  return (
    <section className="relative overflow-hidden bg-white py-8 sm:py-12 lg:py-16">
      {/* Decorative ambient blur background lights with smooth breathing motion */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -left-48 top-1/4 h-96 w-96 rounded-full bg-[#f59e0b]/5 blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="pointer-events-none absolute -right-48 bottom-1/4 h-96 w-96 rounded-full bg-[#081d16]/4 blur-3xl"
      />

      <div className="mx-auto max-w-[1280px] px-3.5 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 xl:gap-14 items-start"
        >
          {/* Left Column: Form Card with Light Background */}
          <motion.div
            variants={itemVariants}
            style={{ backgroundColor: form.bg_color || '#f5f7f5' }}
            className="w-full lg:col-span-7 rounded-[14px] sm:rounded-[18px] border border-[#e5ece5] p-4.5 sm:p-7 lg:p-9 shadow-[0_2px_16px_rgba(0,0,0,0.025)]"
          >
            {/* Eyebrow with Expanding Orange Dash */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: 28 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-[2px] bg-[#f5a623] shrink-0"
              />
              <span className="text-[11.5px] sm:text-[13px] font-semibold uppercase tracking-[0.18em] text-[#556961]">
                {form.eyebrow}
              </span>
            </div>

            {/* Title: Fill in Your Details */}
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mt-3 sm:mt-4 text-[26px] sm:text-[34px] lg:text-[40px] font-black tracking-tight leading-[1.12] text-[#081d16]"
            >
              {form.title_prefix}
              <span className="text-[#f59e0b] ml-1.5">{form.title_highlight}</span>
            </motion.h2>

            {/* Description */}
            <p className="mt-2 sm:mt-2.5 text-[13.5px] sm:text-[15px] text-[#64748b] font-normal leading-relaxed">
              {form.description}
            </p>

            {/* Success Notification Alert */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-5 flex items-start gap-3 rounded-[10px] border border-emerald-200 bg-emerald-50/90 p-4 text-emerald-900 shadow-xs"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.25, 1] }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  </motion.div>
                  <div className="flex-1 text-[13.5px] sm:text-[14px]">
                    <p className="font-semibold text-emerald-900">
                      {form.success_message || 'Thank you! Your quote request has been received.'}
                    </p>
                    <p className="mt-0.5 text-emerald-700">
                      We will review your property requirements and reach out within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          fullName: '',
                          phone: '',
                          email: '',
                          propertyType: '',
                          city: '',
                          requirements: '',
                        });
                      }}
                      className="mt-2 text-[13px] font-bold text-emerald-800 underline underline-offset-2 hover:text-emerald-950 cursor-pointer"
                    >
                      Submit another quote request
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quote Form */}
            <form onSubmit={handleSubmit} className="mt-5 sm:mt-7 space-y-3.5 sm:space-y-4">
              {/* Row 1: Full Name & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-[12.5px] sm:text-[13px] font-bold text-[#0c1713] mb-1.5"
                  >
                    {form.fields.fullName.label}
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required={form.fields.fullName.required}
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder={form.fields.fullName.placeholder}
                    className="w-full rounded-[6px] border border-[#e2e8f0] bg-white px-3.5 py-2.5 sm:py-3 text-[13.5px] sm:text-[14px] text-[#0c1713] placeholder-[#94a3b8] transition-all duration-200 focus:border-[#f59e0b] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#f59e0b] shadow-2xs"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-[12.5px] sm:text-[13px] font-bold text-[#0c1713] mb-1.5"
                  >
                    {form.fields.phone.label}
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9+]*"
                    required={form.fields.phone.required}
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    onKeyDown={handlePhoneKeyDown}
                    placeholder={form.fields.phone.placeholder}
                    className="w-full rounded-[6px] border border-[#e2e8f0] bg-white px-3.5 py-2.5 sm:py-3 text-[13.5px] sm:text-[14px] text-[#0c1713] placeholder-[#94a3b8] transition-all duration-200 focus:border-[#f59e0b] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#f59e0b] shadow-2xs"
                  />
                </div>
              </div>

              {/* Row 2: Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-[12.5px] sm:text-[13px] font-bold text-[#0c1713] mb-1.5"
                >
                  {form.fields.email.label}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required={form.fields.email.required}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={form.fields.email.placeholder}
                  className="w-full rounded-[6px] border border-[#e2e8f0] bg-white px-3.5 py-2.5 sm:py-3 text-[13.5px] sm:text-[14px] text-[#0c1713] placeholder-[#94a3b8] transition-all duration-200 focus:border-[#f59e0b] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#f59e0b] shadow-2xs"
                />
              </div>

              {/* Row 3: Custom Styled Animated Dropdown (Property Type) & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                {/* Custom Animated Property Type Dropdown */}
                <div ref={dropdownRef} className="relative">
                  <label
                    htmlFor="propertyTypeTrigger"
                    className="block text-[12.5px] sm:text-[13px] font-bold text-[#0c1713] mb-1.5"
                  >
                    {form.fields.propertyType.label}
                  </label>

                  {/* Trigger Button */}
                  <button
                    id="propertyTypeTrigger"
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen((prev) => !prev);
                      setDropdownError(false);
                    }}
                    aria-haspopup="listbox"
                    aria-expanded={isDropdownOpen}
                    className={`w-full flex items-center justify-between rounded-[6px] bg-white px-3.5 py-2.5 sm:py-3 text-[13.5px] sm:text-[14px] transition-all duration-200 cursor-pointer shadow-2xs ${
                      dropdownError
                        ? 'border border-red-400 ring-1 ring-red-400'
                        : isDropdownOpen
                        ? 'border border-[#f59e0b] ring-1 ring-[#f59e0b]'
                        : 'border border-[#e2e8f0] hover:border-[#cbd5e1]'
                    }`}
                  >
                    <span
                      className={
                        formData.propertyType
                          ? 'font-medium text-[#0c1713]'
                          : 'text-[#94a3b8]'
                      }
                    >
                      {formData.propertyType || form.fields.propertyType.placeholder}
                    </span>
                    <motion.div
                      animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4 text-[#64748b] shrink-0" />
                    </motion.div>
                  </button>

                  {/* Custom Animated Dropdown Menu Panel */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-60 overflow-y-auto rounded-[8px] border border-[#e2e8f0] bg-white py-1.5 shadow-[0_12px_28px_rgba(0,0,0,0.12)]"
                      >
                        {form.fields.propertyType.options?.map((opt) => {
                          const isSelected = formData.propertyType === opt;
                          return (
                            <motion.button
                              key={opt}
                              type="button"
                              whileHover={{ x: 3 }}
                              transition={{ duration: 0.15 }}
                              onClick={() => handleSelectOption(opt)}
                              className={`flex w-full items-center justify-between px-3.5 py-2.5 text-left text-[13.5px] sm:text-[14px] cursor-pointer transition-colors ${
                                isSelected
                                  ? 'bg-[#fff8ee] text-[#f59e0b] font-bold'
                                  : 'text-[#0c1713] hover:bg-[#f8faf8] hover:text-[#f59e0b]'
                              }`}
                            >
                              <span>{opt}</span>
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ duration: 0.15 }}
                                >
                                  <Check className="h-4 w-4 text-[#f59e0b]" />
                                </motion.div>
                              )}
                            </motion.button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {dropdownError && (
                    <p className="mt-1 text-[11.5px] font-medium text-red-500">
                      Please select a property type
                    </p>
                  )}
                </div>

                {/* City Input */}
                <div>
                  <label
                    htmlFor="city"
                    className="block text-[12.5px] sm:text-[13px] font-bold text-[#0c1713] mb-1.5"
                  >
                    {form.fields.city.label}
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    required={form.fields.city.required}
                    value={formData.city}
                    onChange={handleChange}
                    placeholder={form.fields.city.placeholder}
                    className="w-full rounded-[6px] border border-[#e2e8f0] bg-white px-3.5 py-2.5 sm:py-3 text-[13.5px] sm:text-[14px] text-[#0c1713] placeholder-[#94a3b8] transition-all duration-200 focus:border-[#f59e0b] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#f59e0b] shadow-2xs"
                  />
                </div>
              </div>

              {/* Row 4: Your Requirements */}
              <div>
                <label
                  htmlFor="requirements"
                  className="block text-[12.5px] sm:text-[13px] font-bold text-[#0c1713] mb-1.5"
                >
                  {form.fields.requirements.label}
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  rows={4}
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder={form.fields.requirements.placeholder}
                  className="w-full resize-none rounded-[6px] border border-[#e2e8f0] bg-white px-3.5 py-2.5 sm:py-3 text-[13.5px] sm:text-[14px] text-[#0c1713] placeholder-[#94a3b8] transition-all duration-200 focus:border-[#f59e0b] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#f59e0b] shadow-2xs"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="group flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-[6px] bg-[#f5a623] px-7 py-3.5 sm:py-4 text-[13.5px] sm:text-[14px] font-extrabold uppercase tracking-wider text-[#081d16] shadow-sm transition-all duration-200 hover:bg-[#e0961b] hover:shadow-md disabled:opacity-70 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-[#081d16]" />
                      <span>SUBMITTING...</span>
                    </>
                  ) : (
                    <>
                      <span>{form.submit_button.text}</span>
                      <ArrowRight className="h-4 w-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Right Column: Info & Features Card */}
          <motion.div variants={itemVariants} className="w-full lg:col-span-5">
            {/* Top Image: Rooftop Solar Sunset Flare with Hover Zoom */}
            <div className="group relative w-full aspect-[16/10] sm:aspect-[16/9.5] overflow-hidden rounded-[10px] sm:rounded-[12px] bg-[#f3efe9] shadow-sm">
              <motion.img
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                src={info.image}
                alt={info.title_line1}
                className="h-full w-full object-cover object-center select-none cursor-pointer"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Bottom Info Details */}
            <div className="mt-6 sm:mt-7">
              {/* Eyebrow */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="h-[2px] w-7 bg-[#f5a623] shrink-0" />
                <span className="text-[11.5px] sm:text-[13px] font-semibold uppercase tracking-[0.18em] text-[#556961]">
                  {info.eyebrow}
                </span>
              </div>

              {/* Title */}
              <h3 className="mt-2.5 sm:mt-3 text-[22px] sm:text-[26px] lg:text-[28px] font-extrabold text-[#081d16] leading-tight tracking-tight">
                {info.title_line1}{' '}
                {info.title_prefix2 && (
                  <span className="text-[#081d16]">{info.title_prefix2} </span>
                )}
                <span className="text-[#f59e0b]">{info.title_highlight}</span>
              </h3>

              {/* Description */}
              <p className="mt-2.5 text-[13.5px] sm:text-[14.5px] text-[#64748b] leading-relaxed">
                {info.description}
              </p>

              {/* Subtle Divider Line */}
              <div className="my-5 border-t border-[#f1f5f3]" />

              {/* Features List with Orange Left Accent Bars & Micro-interactions */}
              <div className="space-y-3.5 sm:space-y-4">
                {info.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    className="border-l-[3px] border-[#f5a623] pl-3.5 py-0.5 transition-colors duration-200 hover:border-[#e0961b] cursor-default"
                  >
                    <h4 className="text-[14.5px] sm:text-[15.5px] font-bold text-[#081d16]">
                      {feature.title}
                    </h4>
                    <p className="mt-0.5 text-[12.5px] sm:text-[13.5px] text-[#64748b] leading-snug">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
