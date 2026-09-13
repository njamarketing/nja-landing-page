"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCheck,
  Clipboard,
  CreditCard,
  FileText,
  Globe2,
  MessageCircle,
  Pencil,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { WebsiteProductCopy } from "@/data/website-product";
import {
  briefingFields,
  briefingOptions,
  buildBriefingMessage,
  emptyBriefing,
  getBriefingWhatsAppUrl,
  validateBriefing,
  WEBSITE_OFFER,
  type BriefingField,
  type WebsiteBriefing,
} from "@/lib/website-briefing";

type Props = {
  copy: WebsiteProductCopy;
  locale: string;
  phone: string;
  paymentUrl: string | null;
};
const storageKey = "nja-website-briefing-v1";
const fieldKeys = Object.keys(briefingFields) as BriefingField[];
const longFields = ["about", "services", "brand", "links", "notes"];
const autocomplete: Partial<Record<BriefingField, string>> = {
  company: "organization",
  contact: "name",
  phone: "tel",
  email: "email",
  location: "address-level2",
};

export default function WebsiteBriefingForm({
  copy,
  locale,
  phone,
  paymentUrl,
}: Props) {
  const t = copy.form;
  const [briefing, setBriefing] = useState<WebsiteBriefing>({
    ...emptyBriefing,
  });
  const [step, setStep] = useState(0);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<ReturnType<typeof validateBriefing>>({});
  const [consentError, setConsentError] = useState(false);
  const [handoff, setHandoff] = useState(false);
  const [sent, setSent] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle",
  );
  const [restored, setRestored] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(storageKey) ?? "null");
      if (
        saved &&
        typeof saved.briefing === "object" &&
        saved.briefing !== null
      ) {
        const draft = { ...emptyBriefing };
        for (const key of fieldKeys) {
          if (typeof saved.briefing[key] === "string")
            draft[key] = saved.briefing[key].slice(0, briefingFields[key].max);
        }
        const valid = Object.keys(validateBriefing(draft)).length === 0;
        setBriefing(draft);
        setStep(
          valid && saved.step === 2
            ? 2
            : Object.keys(validateBriefing(draft, 0)).length === 0 &&
                saved.step >= 1
              ? 1
              : 0,
        );
        setConsent(valid && saved.consent === true);
        setHandoff(valid && saved.consent === true && saved.handoff === true);
      }
    } catch {
      // The form also works when browser storage is unavailable.
    }
    setRestored(true);
  }, []);

  useEffect(() => {
    if (!restored) return;
    try {
      sessionStorage.setItem(
        storageKey,
        JSON.stringify({ briefing, step, consent, handoff }),
      );
    } catch {
      // Keep the current in-memory draft if storage is disabled or full.
    }
  }, [briefing, step, consent, handoff, restored]);

  function focusStep(field?: BriefingField) {
    requestAnimationFrame(() => {
      const target = field
        ? document.getElementById(`briefing-${field}`)
        : headingRef.current;
      target?.focus({ preventScroll: true });
      target?.scrollIntoView({ behavior: "instant", block: "center" });
    });
  }

  function updateField(key: BriefingField, value: string) {
    setBriefing((current) => ({ ...current, [key]: value }));
    setConsent(false);
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!restored) return;
    const nextErrors = validateBriefing(briefing, step < 2 ? step : undefined);
    setErrors(nextErrors);
    const invalidField = fieldKeys.find((key) => nextErrors[key]);

    if (invalidField) {
      setStep(briefingFields[invalidField].step);
      focusStep(invalidField);
      return;
    }
    if (step < 2) {
      setStep(step + 1);
      focusStep();
      return;
    }
    if (!consent) {
      setConsentError(true);
      document.getElementById("briefing-consent")?.focus();
      return;
    }

    setHandoff(true);
    setSent(false);
    // A click-to-chat link prepares the message; only the customer can send it.
    window.open(
      getBriefingWhatsAppUrl(phone, briefing),
      "_blank",
      "noopener,noreferrer",
    );
    focusStep();
  }

  async function copyBriefing() {
    try {
      await navigator.clipboard.writeText(buildBriefingMessage(briefing));
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  }

  function displayValue(key: BriefingField) {
    if (key in briefingOptions) {
      const optionKey = key as keyof typeof briefingOptions;
      const index = (briefingOptions[optionKey] as readonly string[]).indexOf(
        briefing[key],
      );
      return t.options[optionKey][index] ?? briefing[key];
    }
    return briefing[key].trim();
  }

  function renderField(key: BriefingField) {
    const spec = briefingFields[key];
    const isLong = longFields.includes(key);
    const selectOptions =
      key in briefingOptions
        ? briefingOptions[key as keyof typeof briefingOptions]
        : null;
    const [label, placeholder] = t.fields[key];
    const id = `briefing-${key}`;
    const commonProps = {
      id,
      name: key,
      value: briefing[key],
      required: spec.required,
      "aria-invalid": !!errors[key],
      "aria-describedby": errors[key]
        ? `${id}-error`
        : isLong
          ? `${id}-count`
          : undefined,
      className: "website-input",
      onChange: (
        event: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
      ) => updateField(key, event.target.value),
    };

    return (
      <div key={key} className={isLong ? "sm:col-span-2" : "min-w-0"}>
        <label
          htmlFor={id}
          className="mb-2.5 block text-sm font-medium text-white/85"
        >
          {label}{" "}
          {spec.required ? (
            <span className="text-brand-cyan">*</span>
          ) : (
            <span className="text-xs font-normal text-white/45">
              ({t.optional})
            </span>
          )}
        </label>
        {selectOptions ? (
          <select {...commonProps}>
            <option value="">{t.choose}</option>
            {selectOptions.map((value, index) => (
              <option key={value} value={value}>
                {t.options[key as keyof typeof briefingOptions][index]}
              </option>
            ))}
          </select>
        ) : isLong ? (
          <textarea
            {...commonProps}
            placeholder={placeholder}
            maxLength={spec.max}
            rows={key === "about" || key === "services" ? 4 : 3}
            data-lenis-prevent
          />
        ) : (
          <input
            {...commonProps}
            type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
            inputMode={
              key === "phone" ? "tel" : key === "email" ? "email" : undefined
            }
            autoComplete={autocomplete[key] ?? "off"}
            placeholder={placeholder}
            maxLength={spec.max}
          />
        )}
        <div className="mt-1.5 flex items-start justify-between gap-3 text-xs">
          {errors[key] && (
            <p id={`${id}-error`} className="text-rose-300" role="alert">
              {t.errors[errors[key]]}
            </p>
          )}
          {isLong && (
            <span id={`${id}-count`} className="ml-auto shrink-0 text-white/40">
              {briefing[key].length}/{spec.max}
            </span>
          )}
        </div>
      </div>
    );
  }

  const whatsappUrl = getBriefingWhatsAppUrl(phone, briefing);

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="landing-glass min-w-0 overflow-hidden rounded-[1.75rem]">
        <div className="border-b border-white/8 px-5 py-6 sm:px-8">
          <ol
            className="flex items-center justify-between gap-2"
            aria-label={copy.nav.product}
          >
            {t.steps.map((label, index) => (
              <li
                key={label}
                aria-current={!handoff && step === index ? "step" : undefined}
                className="flex items-center gap-2 text-[11px] sm:gap-3 sm:text-sm"
              >
                <span
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full border text-xs sm:size-8 ${handoff || step > index ? "border-brand-cyan/25 bg-brand-cyan/10 text-brand-cyan" : step === index ? "border-brand-cyan bg-brand-cyan text-[#041018]" : "border-white/15 text-white/40"}`}
                >
                  {handoff || step > index ? (
                    <Check className="size-3.5" aria-hidden="true" />
                  ) : (
                    `0${index + 1}`
                  )}
                </span>
                <span
                  className={
                    handoff || step >= index ? "text-white" : "text-white/45"
                  }
                >
                  {label}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {handoff ? (
          <div className="p-5 sm:p-8">
            <div className="mb-5 flex size-12 items-center justify-center rounded-2xl border border-brand-cyan/20 bg-brand-cyan/10 text-brand-cyan">
              <FileText className="size-6" aria-hidden="true" />
            </div>
            <div className="landing-label">{t.handoff.badge}</div>
            <h3
              ref={headingRef}
              tabIndex={-1}
              className="mt-3 text-2xl font-semibold outline-none sm:text-3xl"
            >
              {t.handoff.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-white/70">
              {t.handoff.description}
            </p>
            <p className="mt-3 text-xs leading-6 text-white/55">
              {t.handoff.fallback}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="landing-button landing-button-secondary gap-2 text-sm"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                {t.handoff.reopen}
              </a>
              <button
                type="button"
                onClick={copyBriefing}
                className="flex min-h-11 items-center gap-2 rounded-full px-4 text-sm text-white/75 transition hover:bg-white/5"
              >
                <Clipboard className="size-4" aria-hidden="true" />
                {t.handoff.copy}
              </button>
            </div>
            <p role="status" className="mt-3 text-xs text-brand-cyan">
              {copyStatus === "copied"
                ? t.handoff.copied
                : copyStatus === "error"
                  ? t.handoff.copyError
                  : ""}
            </p>
            {copyStatus === "error" && (
              <textarea
                aria-label={t.handoff.copy}
                readOnly
                value={buildBriefingMessage(briefing)}
                className="website-input mt-3"
                rows={8}
                onFocus={(event) => event.target.select()}
                data-lenis-prevent
              />
            )}

            <div className="mt-7 rounded-2xl border border-brand-cyan/15 bg-brand-blue/8 p-5 sm:p-6">
              <CreditCard
                className="size-5 text-brand-cyan"
                aria-hidden="true"
              />
              <h4 className="mt-4 text-xl font-semibold">
                {paymentUrl ? t.handoff.paymentTitle : t.handoff.pendingTitle}
              </h4>
              <p className="mt-3 text-sm leading-7 text-white/65">
                {paymentUrl
                  ? t.handoff.paymentDescription
                  : t.handoff.pendingDescription}
              </p>
              {paymentUrl ? (
                <>
                  <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm leading-6 text-white/80">
                    <input
                      type="checkbox"
                      checked={sent}
                      onChange={(event) => setSent(event.target.checked)}
                      className="mt-1 size-4 shrink-0 accent-brand-cyan"
                    />
                    {t.handoff.confirm}
                  </label>
                  {sent ? (
                    <a
                      href={paymentUrl}
                      className="landing-button mt-5 w-full gap-2 text-sm"
                    >
                      {t.handoff.pay}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="landing-button mt-5 w-full gap-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {t.handoff.pay}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </button>
                  )}
                </>
              ) : (
                <a
                  href={`https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent("Olá, NJA! Gostaria de combinar o pagamento do meu site institucional (R$ 300,00 + R$ 99,90/mês).")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="landing-button mt-5 gap-2 text-sm"
                >
                  {t.handoff.pendingAction}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                setHandoff(false);
                setStep(2);
                setCopyStatus("idle");
                focusStep();
              }}
              className="mt-6 flex min-h-11 items-center gap-2 text-sm text-white/65 transition hover:text-white"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              {t.edit}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="p-5 sm:p-8">
            <h3
              ref={headingRef}
              tabIndex={-1}
              className="text-2xl font-semibold outline-none sm:text-3xl"
            >
              {t.titles[step]}
            </h3>
            <p className="mt-3 text-sm leading-7 text-white/65">
              {t.descriptions[step]}
            </p>
            {step < 2 ? (
              <>
                <p className="mt-4 text-xs text-white/45">{t.required}</p>
                <div className="mt-7 grid gap-x-5 gap-y-5 sm:grid-cols-2">
                  {fieldKeys
                    .filter((key) => briefingFields[key].step === step)
                    .map(renderField)}
                </div>
                {step === 1 && (
                  <p className="mt-5 rounded-xl border border-white/8 bg-white/3 p-4 text-xs leading-6 text-white/60">
                    {t.materialsHint}
                  </p>
                )}
              </>
            ) : (
              <>
                <div className="mt-7 space-y-5">
                  {[0, 1].map((group) => (
                    <div
                      key={group}
                      className="rounded-2xl border border-white/10 p-5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="text-sm font-semibold">
                          {t.steps[group]}
                        </h4>
                        <button
                          type="button"
                          onClick={() => {
                            setStep(group);
                            focusStep();
                          }}
                          className="flex min-h-10 items-center gap-1.5 text-xs text-brand-cyan"
                        >
                          <Pencil className="size-3" aria-hidden="true" />
                          {t.edit}
                        </button>
                      </div>
                      <dl className="mt-3 grid gap-4 sm:grid-cols-2">
                        {fieldKeys
                          .filter(
                            (key) =>
                              briefingFields[key].step === group &&
                              briefing[key].trim(),
                          )
                          .map((key) => (
                            <div
                              key={key}
                              className={`min-w-0 ${longFields.includes(key) ? "sm:col-span-2" : ""}`}
                            >
                              <dt className="text-xs text-white/45">
                                {t.fields[key][0]}
                              </dt>
                              <dd className="mt-1 whitespace-pre-wrap text-sm leading-6 break-words text-white/85">
                                {displayValue(key)}
                              </dd>
                            </div>
                          ))}
                      </dl>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl border border-brand-cyan/20 bg-brand-cyan/5 p-5 text-sm leading-7">
                  <p className="font-semibold">
                    {WEBSITE_OFFER.development} + {WEBSITE_OFFER.monthly}{" "}
                    {copy.pricing.monthly}
                  </p>
                  <p className="mt-2 text-xs text-white/65">{t.summaryNote}</p>
                  <p className="mt-2 text-xs text-white/65">
                    {copy.hero.deadline}
                  </p>
                </div>
                <label className="mt-6 flex cursor-pointer items-start gap-3 text-xs leading-6 text-white/75">
                  <input
                    id="briefing-consent"
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(event) => {
                      setConsent(event.target.checked);
                      setConsentError(false);
                    }}
                    aria-invalid={consentError}
                    aria-describedby={
                      consentError ? "briefing-consent-error" : undefined
                    }
                    className="mt-1 size-4 shrink-0 accent-brand-cyan"
                  />
                  {t.consent}
                </label>
                {consentError && (
                  <p
                    id="briefing-consent-error"
                    role="alert"
                    className="mt-2 text-xs text-rose-300"
                  >
                    {t.errors.consent}
                  </p>
                )}
                <a
                  href={`/${locale}/privacy-policy`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-xs text-white/55 underline underline-offset-4 transition hover:text-white"
                >
                  {t.privacy}
                </a>
              </>
            )}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-6">
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setStep(step - 1);
                    focusStep();
                  }}
                  className="flex min-h-11 items-center gap-2 text-sm text-white/65 transition hover:text-white"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  {t.back}
                </button>
              )}
              <button
                type="submit"
                disabled={!restored}
                className="landing-button ml-auto w-full gap-2 text-sm disabled:opacity-40 sm:w-auto"
              >
                {step === 2 ? (
                  <MessageCircle
                    className="size-4 shrink-0"
                    aria-hidden="true"
                  />
                ) : null}
                {step === 2 ? t.submit : t.next}
                {step < 2 ? (
                  <ArrowRight className="size-4" aria-hidden="true" />
                ) : null}
              </button>
            </div>
            {step === 2 && (
              <p className="mt-4 text-xs leading-6 text-white/50">
                {t.submitHint}
              </p>
            )}
          </form>
        )}
      </div>

      <aside
        aria-label={t.summary}
        className="landing-glass-strong rounded-[1.75rem] p-6 lg:sticky lg:top-28"
      >
        <Globe2
          className="size-6 text-brand-cyan"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <div className="landing-label mt-5">{t.summary}</div>
        <h3 className="mt-3 text-xl font-semibold">{copy.pricing.plan}</h3>
        <p className="mt-6 text-xs text-white/55">{copy.pricing.development}</p>
        <p className="font-display mt-2 text-4xl font-semibold">
          {WEBSITE_OFFER.development}
        </p>
        <div className="mt-5 border-t border-white/10 pt-5">
          <p className="text-sm text-white/80">
            + {WEBSITE_OFFER.monthly}{" "}
            <span className="text-xs text-white/50">
              {copy.pricing.monthly}
            </span>
          </p>
          <p className="mt-1 text-xs text-white/55">
            {copy.pricing.maintenance}
          </p>
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-brand-cyan/15 bg-brand-cyan/8 px-3 py-1 text-[10px] text-brand-cyan">
            <CheckCheck className="size-3" aria-hidden="true" />
            {copy.pricing.fixed}
          </span>
        </div>
        <ul className="mt-6 space-y-3">
          {copy.pricing.items.slice(1).map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-xs leading-6 text-white/65"
            >
              <Check
                className="mt-1 size-3.5 shrink-0 text-brand-cyan"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-5 border-t border-white/8 pt-5 text-[11px] leading-6 text-white/45">
          {copy.hero.deadline}
        </p>
      </aside>
    </div>
  );
}
