import Image from "next/image";
import Link from "next/link";

const PILLARS = [
  { title: "Notice", text: "Trust your instincts. Learn the warning signs that come before a situation escalates." },
  { title: "Report", text: "Tell us what happened in a few minutes — anonymously, with no names and no login." },
  { title: "Understand", text: "Reports are pooled so patterns across units, shifts and roles become visible." },
  { title: "Prevent", text: "Our upcoming model flags high-risk scenarios so teams can act before harm happens." },
  { title: "Support", text: "Findings go back to staff and leadership as concrete, practical safety changes." },
];

const PRIVACY = [
  { title: "No names, no accounts", text: "We never ask who you are. There is nothing to sign in to." },
  { title: "Only what's needed", text: "Questions describe the work context — role, unit, shift — never a specific person." },
  { title: "Pooled, never singled out", text: "Results are shown only in aggregate, so no individual report can be picked out." },
  { title: "You stay in control", text: "Every question is optional. Skip anything you'd rather not answer." },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <p className="eyebrow">For nurses, doctors and everyone who keeps care running</p>
          <h1>
            Speak up safely.
            <br />
            <span className="gradient-text">Prevent the next incident.</span>
          </h1>
          <p className="lead">
            SAFE.AI is a privacy-conscious way for healthcare workers to report workplace violence and near-misses. Every report helps build a
            clearer picture of where and when staff are at risk — and what can be done about it.
          </p>
          <div className="actions">
            <Link className="btn btn-primary" href="/report">
              Report an incident
            </Link>
            <Link className="btn btn-ghost" href="/impact">
              See the impact
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <p className="eyebrow">About SAFE.AI</p>
            <h2>Most incidents are never reported. We want to change that.</h2>
          </div>
          <div className="prose">
            <p>
              Violence against healthcare workers is often treated as &ldquo;part of the job.&rdquo; Reporting is slow, unclear, or feels pointless,
              so the true scale of the problem stays hidden — and the conditions behind it never change.
            </p>
            <p>
              SAFE.AI makes reporting quick and anonymous. Built on the holistic approach of Empowerment Self-Defense, it treats safety as more than
              a reaction: it starts with recognising danger early, preventing escalation, and supporting staff afterwards.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <p className="eyebrow center">How it works</p>
          <h2 className="center">Five steps from one report to a safer ward</h2>
          <ol className="pillars">
            {PILLARS.map((p, i) => (
              <li key={p.title} className={`pillar pillar-${i + 1}`}>
                <span className="pillar-num">{i + 1}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="did-you-know">
            <p className="eyebrow">Did you know?</p>
            <ul className="facts">
              <li>
                <strong>8–38%</strong>
                <span>of health workers experience physical violence at some point in their careers.</span>
              </li>
              <li>
                <strong>Many more</strong>
                <span>are threatened or verbally abused — most often in emergency and psychiatric care.</span>
              </li>
              <li>
                <strong>Under-reported</strong>
                <span>Staff commonly skip reporting because it takes too long or nothing seems to change.</span>
              </li>
            </ul>
            <p className="small muted">Source: World Health Organization, Preventing violence against health workers.</p>
          </div>
        </div>
      </section>

      <section className="section section-tint" id="privacy">
        <div className="container">
          <p className="eyebrow center">Privacy first</p>
          <h2 className="center">Built so you can be honest</h2>
          <div className="cards">
            {PRIVACY.map((p) => (
              <div key={p.title} className="card">
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <p className="eyebrow">Partnership</p>
            <h2>Grounded in Empowerment Self-Defense</h2>
            <p className="prose">
              SAFE.AI is developed alongside ESD Czechia, whose holistic self-defense programme teaches people to recognise danger, prevent
              attacks and defend themselves — with a focus on prevention, communication and boundary-setting.
            </p>
          </div>
          <div className="partner-logo">
            <Image src="/logo.png" alt="ESD Czechia" width={340} height={124} />
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta-inner">
          <h2>Something happened at work?</h2>
          <p>It takes about 5 minutes. No names. No login.</p>
          <Link className="btn btn-light" href="/report">
            Start an anonymous report
          </Link>
        </div>
      </section>
    </>
  );
}
