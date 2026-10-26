import type { Metadata } from "next";
import ReportForm from "@/components/ReportForm";

export const metadata: Metadata = { title: "Report an incident" };

export default function ReportPage() {
  return (
    <section className="section page-top">
      <div className="container narrow">
        <p className="eyebrow">Anonymous report</p>
        <h1>Report an incident</h1>
        <p className="lead">
          Your answers help us understand where staff are at risk. Every question is optional, and nothing you enter is linked to your name,
          email or device.
        </p>
        <div className="notice">
          <strong>In immediate danger?</strong> This form is not monitored in real time. Contact your facility&rsquo;s security team or emergency
          services (112 in the EU, 911 in the US).
        </div>
        <ReportForm />
      </div>
    </section>
  );
}
