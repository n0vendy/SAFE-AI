import type { Metadata } from "next";
import Link from "next/link";
import { CompareBars, LineChart, SimpleBars } from "@/components/Charts";
import { SAMPLE_DATA, exposure, feelSafe, headline, outcomes, reportingRate, timeToReport } from "@/lib/impactData";

export const metadata: Metadata = { title: "Staff impact" };

export default function ImpactPage() {
  return (
    <section className="section page-top">
      <div className="container">
        <p className="eyebrow">Staff impact</p>
        <h1>What changes when staff can speak up safely</h1>
        <p className="lead">
          How SAFE.AI affects incident exposure, staff confidence and reporting across our pilot facilities. All figures are pooled — no
          individual or unit can be identified.
        </p>
        {SAMPLE_DATA && (
          <div className="notice">
            <strong>Sample data.</strong> These figures are placeholders for layout and testing only. They are not real results.
          </div>
        )}

        <div className="stats">
          {headline.map((s) => (
            <div key={s.label} className="stat">
              <span className="stat-label">{s.label}</span>
              <strong className="stat-value">{s.value}</strong>
              <span className="stat-note">{s.note}</span>
            </div>
          ))}
        </div>

        <div className="chart-grid">
          <figure className="chart-card">
            <figcaption>
              <h3>Staff who feel safe at work</h3>
              <p className="muted small">Share agreeing with &ldquo;I feel safe at work,&rdquo; by quarter</p>
            </figcaption>
            <LineChart data={feelSafe} label="Feel safe at work" />
          </figure>

          <figure className="chart-card">
            <figcaption>
              <h3>Incidents are reported, not absorbed</h3>
              <p className="muted small">Share of experienced incidents that were reported, by quarter</p>
            </figcaption>
            <LineChart data={reportingRate} label="Incidents reported" />
          </figure>

          <figure className="chart-card">
            <figcaption>
              <h3>Incident exposure</h3>
              <p className="muted small">Incidents per 100 staff per quarter</p>
            </figcaption>
            <CompareBars data={exposure} unit="per 100 staff" />
          </figure>

          <figure className="chart-card">
            <figcaption>
              <h3>Time to report</h3>
              <p className="muted small">Median minutes to file one report</p>
            </figcaption>
            <SimpleBars data={timeToReport} highlight="SAFE.AI" unit="min" />
          </figure>
        </div>

        <div className="split outcomes">
          <div>
            <p className="eyebrow">From reports to action</p>
            <h2>Changes made because staff reported</h2>
          </div>
          <ul className="checklist">
            {outcomes.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </div>

        <div className="center">
          <Link href="/report" className="btn btn-primary">
            Add your voice — report anonymously
          </Link>
        </div>
      </div>
    </section>
  );
}
