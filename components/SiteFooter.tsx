import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-brand">
            SAFE<span>.AI</span>
          </p>
          <p className="muted">Privacy-conscious incident reporting for healthcare workers.</p>
        </div>
        <div className="footer-partner">
          <p className="muted small">In partnership with</p>
          <Image src="/logo.png" alt="ESD Czechia" width={170} height={62} />
        </div>
        <nav className="footer-nav" aria-label="Footer">
          <Link href="/report">Report an incident</Link>
          <Link href="/impact">Staff impact</Link>
          <Link href="/#privacy">Data protection</Link>
        </nav>
      </div>
      <div className="container footer-bottom small muted">© 2026 SAFE.AI — Prototype for testing.</div>
    </footer>
  );
}
