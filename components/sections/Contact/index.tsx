'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle2, ChevronDown, Check } from 'lucide-react';
import type { ContactSectionData } from '../../types';

export default function Contact({ data }: { data: ContactSectionData }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close custom dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Strict numeric-only handler for phone number (only digits 0-9 and optional leading +)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (val.startsWith('+')) {
      val = '+' + val.slice(1).replace(/\D/g, '');
    } else {
      val = val.replace(/\D/g, '');
    }
    if (val.length > 16) val = val.slice(0, 16);
    setFormData((prev) => ({ ...prev, phone: val }));
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow navigation and editing keys
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
      ].includes(e.key)
    ) {
      return;
    }
    // Allow copy/paste/cut/select-all
    if (e.ctrlKey || e.metaKey) {
      return;
    }
    // Allow digits 0-9
    if (/^[0-9]$/.test(e.key)) {
      return;
    }
    // Allow leading + if at cursor position 0 and not already typed
    if (
      e.key === '+' &&
      e.currentTarget.selectionStart === 0 &&
      !formData.phone.includes('+')
    ) {
      return;
    }
    // Block all other keys (letters like 's', spaces, symbols)
    e.preventDefault();
  };

  const handleSubjectSelect = (subject: string) => {
    setFormData((prev) => ({ ...prev, subject }));
    setIsDropdownOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Safe fallback defaults mapped to data.json
  const formSection = data.form || {
    eyebrow: 'SEND US A MESSAGE',
    title_prefix: 'Fill in Your ',
    title_highlight: 'Details',
    description: 'Share your requirements and our team will get in touch with you shortly.',
    fields: {
      fullName: { name: 'fullName', label: 'Full Name *', placeholder: 'Your Name', type: 'text', required: true },
      phone: { name: 'phone', label: 'Phone Number *', placeholder: 'Your Phone Number', type: 'tel', required: true },
      email: { name: 'email', label: 'Email Address *', placeholder: 'Your Email Address', type: 'email', required: true },
      subject: {
        name: 'subject',
        label: 'Subject',
        placeholder: 'Select Subject',
        type: 'select',
        options: [
          'Residential Solar Consultation',
          'Commercial Solar Installation',
          'Industrial Solar Power',
          'Solar Maintenance & Optimization',
          'General Inquiry',
        ],
      },
      message: { name: 'message', label: 'Message', placeholder: 'Tell us about your requirements...', type: 'textarea' },
    },
    submit_button: { text: 'SEND MESSAGE' },
  };

  const infoSection = data.info || {
    eyebrow: 'OUR CONTACT INFO',
    title_line1: 'Let’s Build a',
    title_line2_prefix: 'Brighter Future ',
    title_highlight: 'Together',
    description: 'Whether you want to know more about our solar solutions, need expert advice or request a quote, feel free to reach out using the details below.',
    phone: { label: 'PHONE', value: data.phone || '+100000000000', href: `tel:${(data.phone || '+100000000000').replace(/[^0-9+]/g, '')}` },
    email: { label: 'EMAIL', value: data.email || 'info@xyz.com', href: `mailto:${data.email || 'info@xyz.com'}` },
    office: { label: 'OUR OFFICE', value: data.address || '123 Education Lane, New York, NY 10001' },
    hours: {
      label: 'BUSINESS HOURS',
      schedule: [
        { days: 'Monday – Saturday', time: '9:00 AM – 6:00 PM' },
        { days: 'Sunday', time: 'Closed' },
      ],
    },
  };

  const locationSection = data.location || {
    eyebrow: 'OUR LOCATION',
    title_prefix: 'Find Us ',
    title_highlight: 'Here',
    description: 'Visit our office or get in touch with us online. We are always happy to assist you with the best solar solutions.',
    map_embed_url: 'https://maps.google.com/maps?q=123+Education+Lane,+New+York,+NY+10001&t=&z=14&ie=UTF8&iwloc=&output=embed',
    map_image: '/img/delhi-map-hd.webp',
    pin: {
      title: 'Soltrix',
      subtitle: 'New York, NY 10001',
      address: '123 Education Lane, New York, NY 10001',
      map_url: 'https://maps.google.com/?q=123+Education+Lane,+New+York,+NY+10001',
    },
  };

  // Filter out any default placeholder entry from dropdown options
  const subjectOptions = (formSection.fields.subject.options || [
    'Residential Solar Consultation',
    'Commercial Solar Installation',
    'Industrial Solar Power',
    'Solar Maintenance & Optimization',
    'General Inquiry',
  ]).filter((opt) => opt !== 'Select Subject');

  return (
    <div className="relative w-full bg-white text-[#0c1f17] selection:bg-[#f5a623] selection:text-white">
      
      {/* ==================================================== */}
      {/* 1. HERO / HEADING SECTION                            */}
      {/* Matches exact screenshot: 2-line title & description  */}
      {/* ==================================================== */}
      <section className="pt-10 sm:pt-14 lg:pt-16 pb-6 sm:pb-8">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-12">
            
            {/* Left: Eyebrow + 2-Line Title */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="max-w-[620px]"
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-2.5 mb-2 sm:mb-2.5">
                <span className="h-[2.5px] w-8 bg-[#f5a623] shrink-0" />
                <span className="text-[11.5px] sm:text-[12px] font-bold uppercase tracking-[0.18em] text-[#64748b]">
                  {data.eyebrow || data.subtitle || 'CONTACT US'}
                </span>
              </div>

              {/* Title: Exactly 2 lines at all viewports */}
              <h1 className="text-[34px] sm:text-[44px] md:text-[48px] lg:text-[52px] font-black leading-[1.05] tracking-tight text-[#0c1f17]">
                <span className="block">{data.title_line1 || 'Get in Touch'}</span>
                <span className="block">
                  <span>{data.title_with || 'with'} </span>
                  <span className="text-[#f5a623]">{data.title_highlight || 'Soltrix'}</span>
                </span>
              </h1>
            </motion.div>

            {/* Right: Intro Description (Clean 3-line wrap on desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
              className="w-full lg:max-w-[430px] xl:max-w-[450px] lg:pb-1"
            >
              <p className="text-[14px] sm:text-[14.5px] lg:text-[15px] leading-[1.58] text-[#556961] font-normal">
                {data.description}
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 2. MAIN 2-COLUMN SECTION: Form (Left) & Info (Right) */}
      {/* Equal level: flex-row, items-stretch, lg:flex-1, same top/bottom */}
      {/* ==================================================== */}
      <section className="py-6 sm:py-8 lg:py-10">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-10 xl:gap-12">

            {/* ------------------------------------------------ */}
            {/* LEFT COLUMN: "Send Us a Message" Form Card       */}
            {/* Exactly leveled with right card: lg:flex-1       */}
            {/* ------------------------------------------------ */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full lg:flex-1 rounded-[8px] sm:rounded-[10px] bg-[#fbfaf8] border border-[#eaedea] p-6 sm:p-8 lg:p-9 xl:p-10 shadow-[0_2px_12px_rgba(0,0,0,0.015)] flex flex-col justify-between"
            >
              <div className="flex-1 flex flex-col">
                {/* Form Eyebrow */}
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="h-[2.5px] w-8 bg-[#f5a623] shrink-0" />
                  <span className="text-[11.5px] sm:text-[12px] font-bold uppercase tracking-[0.16em] text-[#64748b]">
                    {formSection.eyebrow}
                  </span>
                </div>

                {/* Form Title */}
                <h2 className="text-[28px] sm:text-[34px] md:text-[36px] font-black text-[#0c1f17] tracking-tight leading-tight mt-1">
                  <span>{formSection.title_prefix}</span>
                  <span className="text-[#f5a623]">{formSection.title_highlight}</span>
                </h2>

                {/* Form Subtitle */}
                <p className="mt-1.5 text-[13.5px] sm:text-[14px] text-[#556961] font-normal leading-relaxed">
                  {formSection.description}
                </p>

                {/* Form Fields Card */}
                <div className="mt-6 sm:mt-7 flex-1 flex flex-col">
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        className="my-auto rounded-[4px] bg-white border border-[#eaedea] p-8 text-center"
                      >
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f5ec] text-[#2d6a4f]">
                          <CheckCircle2 className="h-8 w-8" />
                        </div>
                        <h3 className="mt-4 text-[20px] font-black text-[#0c1f17]">
                          Thank You!
                        </h3>
                        <p className="mt-2 text-[13.5px] leading-relaxed text-[#556961] max-w-sm mx-auto">
                          Your message has been received. Our solar experts will get back to you shortly.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setSubmitted(false);
                            setFormData({ fullName: '', phone: '', email: '', subject: '', message: '' });
                          }}
                          className="mt-6 inline-flex items-center gap-2 rounded-[2px] bg-[#f5a623] px-6 py-2.5 text-[12px] font-bold uppercase tracking-wider text-[#0c1f17] hover:bg-[#e0961b] transition-all"
                        >
                          Send Another Message
                        </button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        className="flex-1 flex flex-col justify-between"
                      >
                        <div className="space-y-4 sm:space-y-4.5">
                          {/* Row 1: Full Name & Phone Number */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[12px] sm:text-[12.5px] font-bold text-[#0c1f17] mb-1.5">
                                {formSection.fields.fullName.label}
                              </label>
                              <input
                                type="text"
                                name="fullName"
                                required={formSection.fields.fullName.required !== false}
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder={formSection.fields.fullName.placeholder}
                                className="w-full rounded-[2px] border border-[#dce3de] bg-white px-3.5 py-2.5 sm:py-3 text-[13.5px] text-[#0c1f17] placeholder-[#9ca3af] outline-none transition-all duration-200 focus:border-[#f5a623] focus:ring-1 focus:ring-[#f5a623]"
                              />
                            </div>

                            <div>
                              <label className="block text-[12px] sm:text-[12.5px] font-bold text-[#0c1f17] mb-1.5">
                                {formSection.fields.phone.label}
                              </label>
                              <input
                                type="tel"
                                name="phone"
                                inputMode="numeric"
                                required={formSection.fields.phone.required !== false}
                                value={formData.phone}
                                onChange={handlePhoneChange}
                                onKeyDown={handlePhoneKeyDown}
                                placeholder={formSection.fields.phone.placeholder}
                                className="w-full rounded-[2px] border border-[#dce3de] bg-white px-3.5 py-2.5 sm:py-3 text-[13.5px] text-[#0c1f17] placeholder-[#9ca3af] outline-none transition-all duration-200 focus:border-[#f5a623] focus:ring-1 focus:ring-[#f5a623]"
                              />
                            </div>
                          </div>

                          {/* Row 2: Email Address */}
                          <div>
                            <label className="block text-[12px] sm:text-[12.5px] font-bold text-[#0c1f17] mb-1.5">
                              {formSection.fields.email.label}
                            </label>
                            <input
                              type="email"
                              name="email"
                              required={formSection.fields.email.required !== false}
                              value={formData.email}
                              onChange={handleChange}
                              placeholder={formSection.fields.email.placeholder}
                              className="w-full rounded-[2px] border border-[#dce3de] bg-white px-3.5 py-2.5 sm:py-3 text-[13.5px] text-[#0c1f17] placeholder-[#9ca3af] outline-none transition-all duration-200 focus:border-[#f5a623] focus:ring-1 focus:ring-[#f5a623]"
                            />
                          </div>

                          {/* Row 3: Custom Polished Dropdown (Matches reference screenshot) */}
                          <div ref={dropdownRef} className="relative">
                            <label className="block text-[12px] sm:text-[12.5px] font-bold text-[#0c1f17] mb-1.5">
                              {formSection.fields.subject.label}
                            </label>

                            <input type="hidden" name="subject" value={formData.subject} />
                            
                            {/* Dropdown Button */}
                            <button
                              type="button"
                              aria-haspopup="listbox"
                              aria-expanded={isDropdownOpen}
                              onClick={() => setIsDropdownOpen((prev) => !prev)}
                              onKeyDown={(e) => {
                                if (e.key === 'Escape') setIsDropdownOpen(false);
                              }}
                              className={`w-full flex items-center justify-between rounded-[2px] border bg-white px-3.5 py-2.5 sm:py-3 text-[13.5px] transition-all duration-200 cursor-pointer outline-none select-none text-left ${
                                isDropdownOpen
                                  ? 'border-[#f5a623] ring-1 ring-[#f5a623]'
                                  : 'border-[#dce3de] hover:border-[#b8c4bc] focus:border-[#f5a623] focus:ring-1 focus:ring-[#f5a623]'
                              }`}
                            >
                              <span className={formData.subject ? 'text-[#0c1f17] font-medium' : 'text-[#9ca3af]'}>
                                {formData.subject || formSection.fields.subject.placeholder || 'Select Subject'}
                              </span>
                              <ChevronDown
                                className={`h-4 w-4 stroke-[1.8] text-[#64748b] transition-transform duration-200 shrink-0 ${
                                  isDropdownOpen ? 'rotate-180 text-[#f5a623]' : ''
                                }`}
                              />
                            </button>

                            {/* Floating Animated Dropdown Menu */}
                            <AnimatePresence>
                              {isDropdownOpen && (
                                <motion.ul
                                  role="listbox"
                                  initial={{ opacity: 0, y: -6, scale: 0.99 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: -6, scale: 0.99 }}
                                  transition={{ duration: 0.15, ease: 'easeOut' }}
                                  className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 rounded-[4px] border border-[#e2e8e4] bg-white py-1.5 shadow-[0_12px_28px_rgba(0,0,0,0.08)] max-h-[240px] overflow-y-auto"
                                >
                                  {subjectOptions.map((opt) => {
                                    const isSelected = formData.subject === opt;
                                    return (
                                      <li
                                        key={opt}
                                        role="option"
                                        aria-selected={isSelected}
                                        onClick={() => handleSubjectSelect(opt)}
                                        className={`px-4 py-2.5 text-[13px] sm:text-[13.5px] flex items-center justify-between cursor-pointer transition-colors duration-150 ${
                                          isSelected
                                            ? 'bg-[#fff7ea] text-[#d97706] font-semibold'
                                            : 'text-[#0c1f17] hover:bg-[#faf8f5] hover:text-[#f5a623]'
                                        }`}
                                      >
                                        <span>{opt}</span>
                                        {isSelected && <Check className="h-4 w-4 text-[#f5a623] shrink-0" />}
                                      </li>
                                    );
                                  })}
                                </motion.ul>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Row 4: Message */}
                          <div>
                            <label className="block text-[12px] sm:text-[12.5px] font-bold text-[#0c1f17] mb-1.5">
                              {formSection.fields.message.label}
                            </label>
                            <textarea
                              rows={4}
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              placeholder={formSection.fields.message.placeholder}
                              className="w-full rounded-[2px] border border-[#dce3de] bg-white px-3.5 py-2.5 text-[13.5px] text-[#0c1f17] placeholder-[#9ca3af] outline-none transition-all duration-200 focus:border-[#f5a623] focus:ring-1 focus:ring-[#f5a623] resize-none h-[110px]"
                            />
                          </div>
                        </div>

                        {/* Submit Button (Inline width, aligned at bottom) */}
                        <div className="pt-5 mt-auto">
                          <button
                            type="submit"
                            className="group inline-flex items-center justify-center gap-3 rounded-[2px] bg-[#f5a623] px-8 py-3.5 text-[12.5px] sm:text-[13px] font-bold uppercase tracking-wider text-[#0c1f17] shadow-sm transition-all duration-300 hover:bg-[#e0961b] hover:shadow-md active:scale-97 cursor-pointer"
                          >
                            <span>{formSection.submit_button.text || 'SEND MESSAGE'}</span>
                            <ArrowRight className="h-4 w-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
                          </button>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* ------------------------------------------------ */}
            {/* RIGHT COLUMN: "Our Contact Info" Card            */}
            {/* Exactly leveled with left card: lg:flex-1       */}
            {/* ------------------------------------------------ */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="w-full lg:flex-1 rounded-[8px] sm:rounded-[10px] bg-[#fbfaf8] border border-[#eaedea] p-6 sm:p-8 lg:p-9 xl:p-10 shadow-[0_2px_12px_rgba(0,0,0,0.015)] flex flex-col justify-between"
            >
              <div>
                {/* Info Eyebrow */}
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="h-[2.5px] w-8 bg-[#f5a623] shrink-0" />
                  <span className="text-[11.5px] sm:text-[12px] font-bold uppercase tracking-[0.16em] text-[#64748b]">
                    {infoSection.eyebrow}
                  </span>
                </div>

                {/* Info Title: Exactly 2 lines */}
                <h2 className="text-[28px] sm:text-[34px] md:text-[36px] font-black text-[#0c1f17] tracking-tight leading-[1.08] mt-1">
                  <span className="block">{infoSection.title_line1}</span>
                  <span className="block">
                    <span>{infoSection.title_line2_prefix}</span>
                    <span className="text-[#f5a623]">{infoSection.title_highlight}</span>
                  </span>
                </h2>

                {/* Info Subtitle */}
                <p className="mt-1.5 text-[13.5px] sm:text-[14px] text-[#556961] font-normal leading-relaxed">
                  {infoSection.description}
                </p>

                {/* Contact Info List with Horizontal Dividers */}
                <div className="mt-6 sm:mt-7 divide-y divide-[#e8ecea]">

                  {/* 1. Phone */}
                  <div className="py-5 sm:py-5.5 first:pt-2">
                    <a
                      href={infoSection.phone.href}
                      className="group flex items-center transition-all duration-200"
                    >
                      {/* Sage/Mint Circle Icon */}
                      <div className="flex h-[52px] w-[52px] sm:h-[54px] sm:w-[54px] shrink-0 items-center justify-center rounded-full bg-[#edf4e8] text-[#1a382b] transition-transform duration-300 group-hover:scale-105">
                        <Phone className="h-5 w-5 stroke-[1.8]" />
                      </div>

                      {/* Vertical Divider Line matching screenshot */}
                      <div className="h-10 w-[1px] bg-[#e2e8e4] mx-4 sm:mx-4.5 shrink-0" />

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <span className="block text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#718096]">
                          {infoSection.phone.label}
                        </span>
                        <span className="mt-0.5 block text-[15px] sm:text-[15.5px] font-extrabold text-[#0c1f17] transition-colors duration-200 group-hover:text-[#f5a623]">
                          {infoSection.phone.value}
                        </span>
                      </div>
                    </a>
                  </div>

                  {/* 2. Email */}
                  <div className="py-5 sm:py-5.5">
                    <a
                      href={infoSection.email.href}
                      className="group flex items-center transition-all duration-200"
                    >
                      {/* Sage/Mint Circle Icon */}
                      <div className="flex h-[52px] w-[52px] sm:h-[54px] sm:w-[54px] shrink-0 items-center justify-center rounded-full bg-[#edf4e8] text-[#1a382b] transition-transform duration-300 group-hover:scale-105">
                        <Mail className="h-5 w-5 stroke-[1.8]" />
                      </div>

                      {/* Vertical Divider Line matching screenshot */}
                      <div className="h-10 w-[1px] bg-[#e2e8e4] mx-4 sm:mx-4.5 shrink-0" />

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <span className="block text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#718096]">
                          {infoSection.email.label}
                        </span>
                        <span className="mt-0.5 block text-[15px] sm:text-[15.5px] font-extrabold text-[#0c1f17] transition-colors duration-200 group-hover:text-[#f5a623]">
                          {infoSection.email.value}
                        </span>
                      </div>
                    </a>
                  </div>

                  {/* 3. Our Office */}
                  <div className="py-5 sm:py-5.5">
                    <div className="flex items-center">
                      {/* Sage/Mint Circle Icon */}
                      <div className="flex h-[52px] w-[52px] sm:h-[54px] sm:w-[54px] shrink-0 items-center justify-center rounded-full bg-[#edf4e8] text-[#1a382b]">
                        <MapPin className="h-5 w-5 stroke-[1.8]" />
                      </div>

                      {/* Vertical Divider Line matching screenshot */}
                      <div className="h-10 w-[1px] bg-[#e2e8e4] mx-4 sm:mx-4.5 shrink-0" />

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <span className="block text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#718096]">
                          {infoSection.office.label}
                        </span>
                        <p className="mt-0.5 text-[14px] sm:text-[14.5px] font-bold text-[#0c1f17] leading-snug">
                          {infoSection.office.value}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* 4. Business Hours (At bottom to match height with Left Form button) */}
              <div className="pt-5 sm:pt-6 border-t border-[#e8ecea] mt-auto">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-6 w-6 items-center justify-center shrink-0 mt-0.5 text-[#0c1f17]">
                    <Clock className="h-5.5 w-5.5 stroke-[1.8]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#718096] mb-2">
                      {infoSection.hours.label}
                    </span>
                    
                    <div className="space-y-1.5 max-w-[340px]">
                      {infoSection.hours.schedule &&
                        infoSection.hours.schedule.map((slot, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between text-[13px] sm:text-[13.5px]"
                          >
                            <span className="text-[#0c1f17] font-medium">{slot.days}</span>
                            <span className="text-[#0c1f17] font-medium text-right">{slot.time}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 3. LOCATION & MAP SECTION                            */}
      {/* ==================================================== */}
      <section className="pt-8 sm:pt-10 lg:pt-12 pb-14 sm:pb-16 lg:pb-20">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            {/* Location Eyebrow */}
            <div className="flex items-center gap-2.5 mb-2">
              <span className="h-[2.5px] w-7 bg-[#f5a623] shrink-0" />
              <span className="text-[11.5px] sm:text-[12px] font-bold uppercase tracking-[0.16em] text-[#64748b]">
                {locationSection.eyebrow}
              </span>
            </div>

            {/* Location Title */}
            <h2 className="text-[28px] sm:text-[34px] md:text-[36px] font-black text-[#0c1f17] tracking-tight leading-tight">
              <span>{locationSection.title_prefix}</span>
              <span className="text-[#f5a623]">{locationSection.title_highlight}</span>
            </h2>

            {/* Location Subtitle */}
            <p className="mt-1.5 text-[13.5px] sm:text-[14px] text-[#556961] font-normal leading-relaxed max-w-[560px]">
              {locationSection.description}
            </p>
          </motion.div>

          {/* Interactive Google Map Display */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="group relative mt-6 sm:mt-8 w-full overflow-hidden rounded-[8px] sm:rounded-[10px] border border-[#e2e8e4] bg-[#f8faf8] shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
          >
            <div className="relative w-full h-[360px] sm:h-[400px] lg:h-[430px] overflow-hidden">
              <iframe
                src={
                  locationSection.map_embed_url ||
                  `https://maps.google.com/maps?q=${encodeURIComponent(
                    data.address || '123 Education Lane, New York, NY 10001'
                  )}&t=&z=14&ie=UTF8&iwloc=&output=embed`
                }
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${locationSection.pin?.title || 'Soltrix'} Location Map`}
                className="h-full w-full border-0"
              />


              {/* View on Google Maps Link Button */}
              {locationSection.pin.map_url && (
                <a
                  href={locationSection.pin.map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-3.5 bottom-3.5 z-10 inline-flex items-center gap-1.5 rounded-[4px] bg-white/95 backdrop-blur-md px-3 py-1.5 text-[11px] sm:text-[11.5px] font-bold text-[#0c1f17] shadow-sm border border-[#e2e8e4] hover:bg-[#f5a623] hover:text-[#0c1f17] transition-all cursor-pointer"
                  title="Open in Google Maps"
                >
                  <span>View on Google Maps</span>
                  <span className="text-[12px]">↗</span>
                </a>
              )}
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  );
}
