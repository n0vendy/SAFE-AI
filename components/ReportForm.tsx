"use client";

import { useState } from "react";
import { type Answers, type Question, OTHER, sections } from "@/lib/survey";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "done"; receipt: string } | { kind: "error"; message: string };

export default function ReportForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [other, setOther] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const section = sections[step];
  const isLast = step === sections.length - 1;
  const set = (id: string, value: Answers[string]) => setAnswers((a) => ({ ...a, [id]: value }));

  function goTo(next: number) {
    setStep(next);
    document.getElementById("report-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function submit() {
    setStatus({ kind: "sending" });
    // Drop answers to questions that ended up hidden, and fold "Other" text in.
    const payload: Answers = {};
    for (const q of sections.flatMap((s) => s.questions)) {
      if (q.showIf && !q.showIf(answers)) continue;
      const value = answers[q.id];
      if (value === undefined) continue;
      payload[q.id] = value;
      if (other[q.id]?.trim()) payload[`${q.id}_other`] = other[q.id].trim();
    }
    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: payload }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setStatus({ kind: "done", receipt: data.receipt });
      setAnswers({});
      setOther({});
    } catch (err) {
      setStatus({ kind: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    }
  }

  if (status.kind === "done") {
    return (
      <div className="form-card done" role="status">
        <h2>Thank you. Your report was received.</h2>
        <p>
          Your anonymous reference is <code>{status.receipt}</code>. It isn&rsquo;t linked to you — it only lets you mention this report later if
          you choose to.
        </p>
        <button
          className="btn btn-ghost"
          onClick={() => {
            setStatus({ kind: "idle" });
            setStep(0);
          }}
        >
          Submit another report
        </button>
      </div>
    );
  }

  return (
    <form
      id="report-form"
      className="form-card"
      onSubmit={(e) => {
        e.preventDefault();
        if (isLast) submit();
        else goTo(step + 1);
      }}
    >
      <div className="progress" aria-label={`Step ${step + 1} of ${sections.length}`}>
        {sections.map((s, i) => (
          <button
            type="button"
            key={s.id}
            className={i === step ? "progress-step current" : i < step ? "progress-step complete" : "progress-step"}
            onClick={() => goTo(i)}
          >
            <span className="progress-dot">{i + 1}</span>
            <span className="progress-label">{s.title}</span>
          </button>
        ))}
      </div>

      <h2>{section.title}</h2>
      {section.intro && <p className="muted">{section.intro}</p>}

      {section.questions
        .filter((q) => !q.showIf || q.showIf(answers))
        .map((q) => (
          <QuestionField
            key={q.id}
            q={q}
            value={answers[q.id]}
            onChange={(v) => set(q.id, v)}
            other={other[q.id] ?? ""}
            onOther={(v) => setOther((o) => ({ ...o, [q.id]: v }))}
          />
        ))}

      {status.kind === "error" && (
        <p className="form-error" role="alert">
          {status.message}
        </p>
      )}

      <div className="form-nav">
        {step > 0 ? (
          <button type="button" className="btn btn-ghost" onClick={() => goTo(step - 1)}>
            Back
          </button>
        ) : (
          <span />
        )}
        <button type="submit" className="btn btn-primary" disabled={status.kind === "sending"}>
          {isLast ? (status.kind === "sending" ? "Sending…" : "Submit anonymously") : "Continue"}
        </button>
      </div>
    </form>
  );
}

type FieldProps = {
  q: Question;
  value: Answers[string] | undefined;
  onChange: (v: Answers[string]) => void;
  other: string;
  onOther: (v: string) => void;
};

function QuestionField({ q, value, onChange, other, onOther }: FieldProps) {
  if (q.type === "text") {
    return (
      <div className="question">
        <label className="question-label" htmlFor={q.id}>
          {q.label} <span className="muted">(optional)</span>
        </label>
        <textarea id={q.id} rows={4} maxLength={2000} value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} />
      </div>
    );
  }

  if (q.type === "matrix") {
    const rows = (value as Record<string, string>) ?? {};
    return (
      <fieldset className="question">
        <legend className="question-label">{q.label}</legend>
        <div className="matrix">
          {q.rows.map((row, r) => (
            <fieldset key={row} className="matrix-row">
              <legend>{row}</legend>
              <div className="matrix-options">
                {q.scale.map((opt) => (
                  <label key={opt} className={rows[row] === opt ? "chip selected" : "chip"}>
                    <input
                      type="radio"
                      name={`${q.id}-${r}`}
                      checked={rows[row] === opt}
                      onChange={() => onChange({ ...rows, [row]: opt })}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </div>
      </fieldset>
    );
  }

  const options = q.other ? [...q.options, OTHER] : q.options;

  if (q.type === "single") {
    return (
      <fieldset className="question">
        <legend className="question-label">{q.label}</legend>
        {q.help && <p className="help">{q.help}</p>}
        <div className="options">
          {options.map((opt) => (
            <label key={opt} className={value === opt ? "option selected" : "option"}>
              <input type="radio" name={q.id} checked={value === opt} onChange={() => onChange(opt)} />
              {opt}
            </label>
          ))}
        </div>
        {value === OTHER && <OtherInput id={q.id} value={other} onChange={onOther} />}
      </fieldset>
    );
  }

  const selected = (value as string[]) ?? [];
  const atMax = q.max !== undefined && selected.length >= q.max;
  function toggle(opt: string) {
    if (selected.includes(opt)) return onChange(selected.filter((s) => s !== opt));
    if (q.type !== "multi") return;
    if (q.exclusive?.includes(opt)) return onChange([opt]);
    onChange([...selected.filter((s) => !q.exclusive?.includes(s)), opt]);
  }

  return (
    <fieldset className="question">
      <legend className="question-label">{q.label}</legend>
      {q.help && <p className="help">{q.help}</p>}
      <div className="options">
        {options.map((opt) => {
          const checked = selected.includes(opt);
          return (
            <label key={opt} className={checked ? "option selected" : atMax ? "option disabled" : "option"}>
              <input type="checkbox" checked={checked} disabled={!checked && atMax} onChange={() => toggle(opt)} />
              {opt}
            </label>
          );
        })}
      </div>
      {selected.includes(OTHER) && <OtherInput id={q.id} value={other} onChange={onOther} />}
    </fieldset>
  );
}

function OtherInput({ id, value, onChange }: { id: string; value: string; onChange: (v: string) => void }) {
  return (
    <input
      className="other-input"
      aria-label="Please specify"
      placeholder="Please specify (no names)"
      maxLength={200}
      id={`${id}-other`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
