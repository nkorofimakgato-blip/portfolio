import Reveal from './Reveal'

export default function Certificates() {
  return (
    <section id="certificates" className="section section-muted">
      <div className="section-container">
        <Reveal className="section-heading-row"><div><p className="section-kicker">04 — CONTINUOUS LEARNING</p><h2 className="section-title">Credentials & <em>growth.</em></h2></div><p className="section-intro">Building a strong technical foundation through focused learning and hands-on practice.</p></Reveal>
        <Reveal className="certificate-card"><div className="certificate-image"><img src="/certs/ccna.png" alt="Cisco CCNA certificate" loading="lazy" /></div><div className="certificate-copy"><span className="certificate-label">NETWORKING CERTIFICATION</span><h3>Cisco Certified Network Associate</h3><p>CCNA — networking fundamentals, routing and switching.</p><span className="certificate-arrow">↗</span></div></Reveal>
      </div>
    </section>
  )
}
