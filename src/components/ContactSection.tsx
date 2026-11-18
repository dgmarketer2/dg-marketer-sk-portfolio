import { FormEvent, useEffect, useState } from 'react';
import {
  AlertCircle,
  Check,
  Copy,
  ExternalLink,
  Mail,
  Send,
} from 'lucide-react';
import {
  PORTFOLIO_CONFIG,
  SERVICES,
  SOCIAL_CHANNELS,
  UI_COPY,
} from '../data/portfolioData';
import { Language } from '../types/portfolio';

interface ContactSectionProps {
  language: Language;
  preselectedService: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactSection({
  language,
  preselectedService,
}: ContactSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [serviceTopic, setServiceTopic] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isPrepared, setIsPrepared] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setServiceTopic(preselectedService);
      setIsPrepared(false);
    }
  }, [preselectedService]);

  const copyText = async (text: string, onDone: (val: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
      onDone(true);
      setTimeout(() => onDone(false), 2000);
    } catch {
      onDone(false);
    }
  };

  const validateForm = (): FormErrors => {
    const nextErrors: FormErrors = {};
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      nextErrors.name = UI_COPY.contact.form.errors.nameRequired[language];
    }

    if (!trimmedEmail) {
      nextErrors.email = UI_COPY.contact.form.errors.emailRequired[language];
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email = UI_COPY.contact.form.errors.emailInvalid[language];
    }

    if (!trimmedMessage) {
      nextErrors.message = UI_COPY.contact.form.errors.messageRequired[language];
    } else if (trimmedMessage.length < 10) {
      nextErrors.message = UI_COPY.contact.form.errors.messageTooShort[language];
    }

    return nextErrors;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsPrepared(false);
      return;
    }

    setErrors({});
    setIsPrepared(true);
  };

  const topicLabel = serviceTopic || UI_COPY.contact.form.serviceDefault[language];
  const emailSubject = `[DG MARKETER SK Inquiry] ${topicLabel} — ${name.trim()}`;
  const emailBody = [
    `Name: ${name.trim()}`,
    `Email: ${email.trim()}`,
    `Topic: ${topicLabel}`,
    '',
    'Message:',
    message.trim(),
  ].join('\n');

  const mailtoHref = `mailto:${PORTFOLIO_CONFIG.email}?subject=${encodeURIComponent(
    emailSubject
  )}&body=${encodeURIComponent(emailBody)}`;

  const activeChannels = SOCIAL_CHANNELS.filter(
    (ch) => Boolean(ch.url) && ch.id !== 'whatsapp'
  );
  const pendingChannels = SOCIAL_CHANNELS.filter((ch) => !ch.url);

  return (
    <section
      id="contact"
      className="border-b border-[rgba(148,163,184,0.18)] bg-[#07111F] py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1160px] px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-[#22D3EE]">
            {UI_COPY.contact.eyebrow[language]}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#F5F8FC] sm:text-4xl">
            {UI_COPY.contact.heading[language]}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#A9B8C9]">
            {UI_COPY.contact.subheading[language]}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Direct Email + Social Channels */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <div className="rounded-2xl border border-[rgba(148,163,184,0.18)] bg-[#102238] p-6 sm:p-7">
              <p className="text-xs font-medium text-[#7C91A7]">
                {UI_COPY.contact.directEmailLabel[language]}
              </p>

              <a
                href={`mailto:${PORTFOLIO_CONFIG.email}`}
                className="mt-2 inline-flex items-center gap-2.5 break-all font-display text-lg font-bold text-[#F5F8FC] transition-colors hover:text-[#22D3EE] sm:text-xl"
              >
                <Mail className="h-5 w-5 shrink-0 text-[#22D3EE]" aria-hidden="true" />
                <span>{PORTFOLIO_CONFIG.email}</span>
              </a>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${PORTFOLIO_CONFIG.email}`}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#3B82F6] px-5 py-2.5 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#2563EB]"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  <span>{UI_COPY.contact.emailCta[language]}</span>
                </a>

                <button
                  type="button"
                  onClick={() => copyText(PORTFOLIO_CONFIG.email, setCopiedEmail)}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[rgba(148,163,184,0.22)] bg-[#0D1B2A] px-4 py-2.5 text-sm font-medium text-[#A9B8C9] whitespace-nowrap shrink-0 transition-colors hover:border-[#22D3EE]/50 hover:text-[#F5F8FC]"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-4 w-4 text-[#34D399]" aria-hidden="true" />
                      <span className="text-[#34D399]">
                        {UI_COPY.contact.copiedEmail[language]}
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" aria-hidden="true" />
                      <span>{UI_COPY.contact.copyEmail[language]}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social & Freelance Links Area */}
            <div className="rounded-2xl border border-[rgba(148,163,184,0.18)] bg-[#102238] p-6 sm:p-7">
              <h3 className="font-display text-base font-bold text-[#F5F8FC]">
                {UI_COPY.contact.socialHeading[language]}
              </h3>
              {pendingChannels.length > 0 ? (
                <p className="mt-2 text-xs leading-relaxed text-[#7C91A7]">
                  {UI_COPY.contact.socialPendingNotice[language]}
                </p>
              ) : (
                <p className="mt-2 text-xs leading-relaxed text-[#A9B8C9]">
                  {language === 'en'
                    ? 'Connect directly via any verified profile below.'
                    : 'নিচের যেকোনো যাচাইকৃত প্রোফাইলের মাধ্যমে সরাসরি যোগাযোগ করুন।'}
                </p>
              )}

              {activeChannels.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {activeChannels.map((channel) => (
                    <a
                      key={channel.id}
                      href={channel.url!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-[rgba(148,163,184,0.22)] bg-[#0D1B2A] px-3.5 py-2 text-sm font-medium text-[#F5F8FC] transition-colors hover:border-[#22D3EE]/60 hover:text-[#22D3EE]"
                    >
                      <span>
                        {channel.id === 'whatsapp'
                          ? `${channel.name} · ${channel.note[language]}`
                          : channel.name}
                      </span>
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              )}

              {pendingChannels.length > 0 && (
                <ul className="mt-4 divide-y divide-[rgba(148,163,184,0.14)]">
                  {pendingChannels.map((channel) => (
                    <li
                      key={channel.id}
                      className="flex items-center justify-between gap-4 py-2.5 text-sm first:pt-1 last:pb-0"
                    >
                      <span className="font-medium text-[#A9B8C9]">{channel.name}</span>
                      <span className="text-xs text-[#7C91A7]">
                        {channel.note[language]}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Right Column: Validated Honest Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[rgba(148,163,184,0.18)] bg-[#102238] p-6 sm:p-8">
              {!isPrepared ? (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-medium text-[#F5F8FC]"
                      >
                        {UI_COPY.contact.form.nameLabel[language]}{' '}
                        <span className="text-[#22D3EE]" aria-hidden="true">
                          *
                        </span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        placeholder={UI_COPY.contact.form.namePlaceholder[language]}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                        className={`mt-2 block w-full min-h-[46px] rounded-xl border bg-[#0D1B2A] px-4 py-2.5 text-sm text-[#F5F8FC] placeholder:text-[#7C91A7] transition-colors ${
                          errors.name
                            ? 'border-rose-400'
                            : 'border-[rgba(148,163,184,0.22)] focus:border-[#22D3EE]'
                        }`}
                      />
                      {errors.name && (
                        <p
                          id="contact-name-error"
                          role="alert"
                          className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-300"
                        >
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-medium text-[#F5F8FC]"
                      >
                        {UI_COPY.contact.form.emailLabel[language]}{' '}
                        <span className="text-[#22D3EE]" aria-hidden="true">
                          *
                        </span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        placeholder={UI_COPY.contact.form.emailPlaceholder[language]}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                        className={`mt-2 block w-full min-h-[46px] rounded-xl border bg-[#0D1B2A] px-4 py-2.5 text-sm text-[#F5F8FC] placeholder:text-[#7C91A7] transition-colors ${
                          errors.email
                            ? 'border-rose-400'
                            : 'border-[rgba(148,163,184,0.22)] focus:border-[#22D3EE]'
                        }`}
                      />
                      {errors.email && (
                        <p
                          id="contact-email-error"
                          role="alert"
                          className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-300"
                        >
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-service"
                      className="block text-sm font-medium text-[#F5F8FC]"
                    >
                      {UI_COPY.contact.form.serviceLabel[language]}
                    </label>
                    <select
                      id="contact-service"
                      value={serviceTopic}
                      onChange={(e) => setServiceTopic(e.target.value)}
                      className="mt-2 block w-full min-h-[46px] rounded-xl border border-[rgba(148,163,184,0.22)] bg-[#0D1B2A] px-4 py-2.5 text-sm text-[#F5F8FC] transition-colors focus:border-[#22D3EE]"
                    >
                      <option value="">
                        {UI_COPY.contact.form.serviceDefault[language]}
                      </option>
                      {SERVICES.map((service) => (
                        <option key={service.id} value={service.title[language]}>
                          {service.title[language]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium text-[#F5F8FC]"
                    >
                      {UI_COPY.contact.form.messageLabel[language]}{' '}
                      <span className="text-[#22D3EE]" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) {
                          setErrors((prev) => ({ ...prev, message: undefined }));
                        }
                      }}
                      placeholder={UI_COPY.contact.form.messagePlaceholder[language]}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      className={`mt-2 block w-full rounded-xl border bg-[#0D1B2A] px-4 py-3 text-sm text-[#F5F8FC] placeholder:text-[#7C91A7] transition-colors ${
                        errors.message
                          ? 'border-rose-400'
                          : 'border-[rgba(148,163,184,0.22)] focus:border-[#22D3EE]'
                      }`}
                    />
                    {errors.message && (
                      <p
                        id="contact-message-error"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-300"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-4 pt-1">
                    <button
                      type="submit"
                      className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#3B82F6] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2563EB] sm:w-auto sm:self-start"
                    >
                      <Send className="h-4 w-4" aria-hidden="true" />
                      <span>{UI_COPY.contact.form.submitButton[language]}</span>
                    </button>

                    <p className="text-xs leading-relaxed text-[#7C91A7]">
                      {UI_COPY.contact.form.disclaimer[language]}
                    </p>
                  </div>
                </form>
              ) : (
                <div className="space-y-5">
                  <div className="rounded-xl border border-[#22D3EE]/35 bg-[#0D1B2A] p-5">
                    <h3 className="font-display text-lg font-bold text-[#F5F8FC]">
                      {UI_COPY.contact.form.readyTitle[language]}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#A9B8C9]">
                      {UI_COPY.contact.form.readyDescription[language]}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[rgba(148,163,184,0.18)] bg-[#0D1B2A] p-4 text-xs leading-relaxed text-[#A9B8C9] whitespace-pre-wrap">
                    {emailBody}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={mailtoHref}
                      className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-[#3B82F6] px-5 py-2.5 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#2563EB]"
                    >
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      <span>{UI_COPY.contact.form.openMailClient[language]}</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => copyText(emailBody, setCopiedMessage)}
                      className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-[rgba(148,163,184,0.22)] bg-[#0D1B2A] px-4 py-2.5 text-sm font-medium text-[#F5F8FC] whitespace-nowrap shrink-0 transition-colors hover:border-[#22D3EE]/50"
                    >
                      {copiedMessage ? (
                        <>
                          <Check className="h-4 w-4 text-[#34D399]" aria-hidden="true" />
                          <span className="text-[#34D399]">
                            {UI_COPY.contact.form.copiedFormatted[language]}
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" aria-hidden="true" />
                          <span>{UI_COPY.contact.form.copyFormatted[language]}</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsPrepared(false)}
                      className="inline-flex min-h-[46px] items-center justify-center px-3 py-2 text-sm font-medium text-[#A9B8C9] transition-colors hover:text-[#F5F8FC]"
                    >
                      {UI_COPY.contact.form.editAgain[language]}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
