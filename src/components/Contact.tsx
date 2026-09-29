import { useState, type FormEvent, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { COMPANY, PROJECT_TYPES } from "@/data/site";
import { Reveal, Words } from "@/lib/motion";
import { ArrowUpRight, SectionLabel } from "./ui";

type Fields = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
};
type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  message: "",
};

function validate(v: Fields): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please enter your name";
  else if (v.name.trim().length < 2) e.name = "That name looks too short";

  if (!v.email.trim()) e.email = "Please enter your email";
  else if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.email.trim()))
    e.email = "Please enter a valid email address";

  if (v.phone.trim() && v.phone.replace(/\D/g, "").length < 10)
    e.phone = "Please enter a valid phone number";

  if (!v.projectType) e.projectType = "Select a project type";

  if (!v.message.trim()) e.message = "Tell us a little about the project";
  else if (v.message.trim().length < 12)
    e.message = "A few more details would help";

  return e;
}

export default function Contact() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>(
    {},
  );
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const set = (k: keyof Fields, val: string) => {
    const next = { ...values, [k]: val };
    setValues(next);
    if (touched[k]) setErrors(validate(next));
  };
  const blur = (k: keyof Fields) => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(values));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({
      name: true,
      email: true,
      phone: true,
      projectType: true,
      message: true,
    });
    if (Object.keys(found).length) return;
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 950);
  };

  const err = (k: keyof Fields) => (touched[k] ? errors[k] : undefined);

  return (
    <section
      id="contact"
      className="theme-iris sec relative overflow-hidden bg-paper text-deep"
    >
      <span className="pointer-events-none absolute -right-[10%] top-[-10%] h-[44vh] w-[44vh] rounded-full bg-[radial-gradient(circle,rgba(168,126,79,.1)_0%,transparent_68%)]" />
      <div className="shell relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* ---------- Left ---------- */}
          <div className="lg:col-span-5">
            <SectionLabel index="06" tone="light">
              Contact
            </SectionLabel>

            <h2 className="t-h2 mt-6 max-w-[11ch] text-deep md:mt-8">
              <Words text="Request an" />{" "}
              <span className="serif text-a">
                <Words text="estimate." delay={200} />
              </span>
            </h2>

            <Reveal delay={90}>
              <p className="t-lead mt-5 max-w-[42ch] text-ash md:mt-7">
                Share a few details and we'll follow up to arrange a visit. No
                obligation.
              </p>
            </Reveal>

            <dl className="mt-9 border-t border-deep/12 md:mt-12">
              {[
                {
                  l: "Email",
                  v: COMPANY.email,
                  href: `mailto:${COMPANY.email}`,
                },
                { l: "Service area", v: COMPANY.areaLong },
                { l: "Hours", v: COMPANY.hours },
              ].map((item, i) => (
                <Reveal
                  key={item.l}
                  delay={i * 80}
                  className="flex flex-col gap-1 border-b border-deep/12 py-4 sm:flex-row sm:items-baseline sm:gap-8"
                >
                  <dt className="t-label w-28 shrink-0 text-ash">{item.l}</dt>
                  <dd className="t-body text-deep">
                    {item.href ? (
                      <a
                        href={item.href}
                        className="link-ul break-all transition-colors duration-500 hover:text-a"
                      >
                        {item.v}
                      </a>
                    ) : (
                      item.v
                    )}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>

          {/* ---------- Form ---------- */}
          <div className="lg:col-span-7">
            <Reveal
              delay={60}
              className="relative overflow-hidden border border-deep/12 bg-chalk p-5 shadow-[0_18px_60px_rgba(13,21,38,.07)] sm:p-8 lg:p-10"
            >
              {/* spectrum top edge */}
              <span className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(100deg,#a87e4f,#c9a273_55%,rgba(168,126,79,.25))]" />

              {/* success state */}
              <div
                className={cn(
                  "absolute inset-0 z-20 flex flex-col items-start justify-center gap-4 bg-chalk px-5 transition-all duration-600 ease-[cubic-bezier(.32,.72,0,1)] sm:px-9",
                  status === "sent"
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0",
                )}
              >
                <span className="border-a text-a grid h-11 w-11 place-items-center border">
                  <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
                    <path
                      d="M3 10.5l4.5 4.5L17 5.5"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="square"
                    />
                  </svg>
                </span>
                <h3 className="font-display text-[1.45rem] font-light tracking-[-0.025em] text-deep sm:text-[1.7rem]">
                  Thank you — your request is in.
                </h3>
                <p className="t-body max-w-[40ch] text-ash">
                  We've received your details and will follow up shortly to talk
                  through the project.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setValues(EMPTY);
                    setTouched({});
                    setErrors({});
                    setStatus("idle");
                  }}
                  className="link-ul text-a mt-1 font-display text-[0.7rem] font-semibold uppercase tracking-[0.16em]"
                >
                  Send another request
                </button>
              </div>

              <form
                onSubmit={onSubmit}
                noValidate
                className="grid gap-5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-6"
              >
                <Field label="Name" error={err("name")}>
                  <input
                    className={cn("field", err("name") && "field-err")}
                    name="name"
                    autoComplete="name"
                    placeholder="Your full name"
                    value={values.name}
                    onChange={(e) => set("name", e.target.value)}
                    onBlur={() => blur("name")}
                  />
                </Field>

                <Field label="Email" error={err("email")}>
                  <input
                    className={cn("field", err("email") && "field-err")}
                    type="email"
                    name="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="you@email.com"
                    value={values.email}
                    onChange={(e) => set("email", e.target.value)}
                    onBlur={() => blur("email")}
                  />
                </Field>

                <Field label="Phone" optional error={err("phone")}>
                  <input
                    className={cn("field", err("phone") && "field-err")}
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="(000) 000-0000"
                    value={values.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    onBlur={() => blur("phone")}
                  />
                </Field>

                <Field label="Project type" error={err("projectType")} caret>
                  <select
                    className={cn(
                      "field",
                      !values.projectType && "text-ash/70",
                      err("projectType") && "field-err",
                    )}
                    name="projectType"
                    value={values.projectType}
                    onChange={(e) => set("projectType", e.target.value)}
                    onBlur={() => blur("projectType")}
                  >
                    <option value="">Select one</option>
                    {PROJECT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>

                <div className="sm:col-span-2">
                  <Field label="Message" error={err("message")}>
                    <textarea
                      className={cn(
                        "field resize-none",
                        err("message") && "field-err",
                      )}
                      name="message"
                      rows={4}
                      placeholder="Tell us about the property and what you're hoping to do."
                      value={values.message}
                      onChange={(e) => set("message", e.target.value)}
                      onBlur={() => blur("message")}
                    />
                  </Field>
                </div>

                <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="t-small max-w-[32ch] text-ash/80">
                    We only use your details to respond to your request.
                  </p>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className={cn(
                      "btn btn-deep group w-full sm:w-auto",
                      status === "sending" && "cursor-wait opacity-75",
                    )}
                  >
                    {status === "sending" ? "Sending…" : "Request an Estimate"}
                    {status !== "sending" && (
                      <span className="nudge">
                        <ArrowUpRight />
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
  error,
  optional,
  caret,
}: {
  label: string;
  children: ReactNode;
  error?: string;
  optional?: boolean;
  caret?: boolean;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-3">
        <span className="t-label text-ash">{label}</span>
        {optional && (
          <span className="font-display text-[0.58rem] uppercase tracking-[0.18em] text-ash/60">
            Optional
          </span>
        )}
      </span>

      <span className="relative mt-2 block">
        {children}
        {caret && (
          <svg
            viewBox="0 0 10 6"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute right-3.5 top-1/2 h-1.5 w-2.5 -translate-y-1/2 text-ash"
          >
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.1" />
          </svg>
        )}
      </span>

      <span
        className={cn(
          "block overflow-hidden text-[0.72rem] leading-[1.6] text-orchid transition-all duration-500 ease-[cubic-bezier(.32,.72,0,1)]",
          error ? "mt-1.5 max-h-8 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        {error}
      </span>
    </label>
  );
}
