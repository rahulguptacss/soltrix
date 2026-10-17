'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { ContactSectionData } from '../../types';

export default function Contact({ data }: { data: ContactSectionData }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Contact details */}
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-[2px] w-6 bg-[#f59e0b]" />
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#64748b]">
                {data.subtitle}
              </p>
            </div>

            <h2 className="text-[38px] font-black uppercase tracking-tight text-[#0c1713] sm:text-[48px] leading-[1.05]">
              {data.title_line1}
              <br />
              <span className="text-outline-dark">{data.title_highlight}</span>
            </h2>

            <p className="mt-5 max-w-[460px] text-[15px] leading-relaxed text-[#475569]">
              {data.description}
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f59e0b]/10 text-[#f59e0b]">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-[#0c1713]">Our Office</h4>
                  <p className="mt-1 text-[14px] text-[#475569]">{data.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f59e0b]/10 text-[#f59e0b]">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-[#0c1713]">Phone Support</h4>
                  <a
                    href={`tel:${data.phone.replace(/[^\d+]/g, '')}`}
                    className="mt-1 block text-[14px] font-medium text-[#475569] hover:text-[#f59e0b]"
                  >
                    {data.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f59e0b]/10 text-[#f59e0b]">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-[#0c1713]">Email Enquiries</h4>
                  <a
                    href={`mailto:${data.email}`}
                    className="mt-1 block text-[14px] font-medium text-[#475569] hover:text-[#f59e0b]"
                  >
                    {data.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f59e0b]/10 text-[#f59e0b]">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-[#0c1713]">Working Hours</h4>
                  <p className="mt-1 text-[14px] text-[#475569]">{data.hours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Quote Form */}
          <div className="rounded-3xl border border-gray-100 bg-[#fafafa] p-8 shadow-xl sm:p-10">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-2xl font-bold text-[#0c1713]">
                  Thank You!
                </h3>
                <p className="mt-2 max-w-sm text-sm text-[#475569]">
                  Your request has been received. Our solar engineering specialists will contact you shortly with a tailored quotation.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 rounded-full bg-[#f59e0b] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#d97706]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-[22px] font-black uppercase text-[#0c1713]">
                  Get A Free Quote
                </h3>
                <p className="text-[14px] text-[#475569]">
                  Fill out the form below to receive a personalized solar assessment and ROI breakdown.
                </p>

                <div>
                  <label className="block text-[13px] font-bold uppercase tracking-wider text-[#0c1713]">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[14px] text-gray-900 outline-none transition focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b]"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-[13px] font-bold uppercase tracking-wider text-[#0c1713]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[14px] text-gray-900 outline-none transition focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b]"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-bold uppercase tracking-wider text-[#0c1713]">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[14px] text-gray-900 outline-none transition focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-bold uppercase tracking-wider text-[#0c1713]">
                    System Type
                  </label>
                  <select className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[14px] text-gray-900 outline-none transition focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b]">
                    <option>Residential Rooftop Solar</option>
                    <option>Commercial Power Installation</option>
                    <option>Industrial Solar Farm</option>
                    <option>Solar Maintenance & Optimization</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[13px] font-bold uppercase tracking-wider text-[#0c1713]">
                    Message / Project Details
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your property and electricity consumption..."
                    className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[14px] text-gray-900 outline-none transition focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b]"
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#f59e0b] py-3.5 text-[15px] font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-[#d97706]"
                >
                  <span>Submit Consultation Request</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
