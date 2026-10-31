import Reveal from './Reveal'

export default function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-inner">
        <Reveal className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> SOFTWARE DEVELOPER · NETWORKING</p>
          <h1>Building digital<br /><span>experiences</span><i> that matter.</i></h1>
          <p className="hero-description">I'm Nkorofi Makgato — a software developer focused on thoughtful interfaces, practical applications and solving problems with technology.</p>
          <div className="hero-actions">
            <a href="#projects" className="button button-dark">Explore my work <span>↗</span></a>
            <a href="#contact" className="text-link">Let's talk <span>→</span></a>
          </div>
          <div className="hero-meta"><span>BASED IN SOUTH AFRICA</span><span>JAVA · REACT · TYPESCRIPT</span></div>
        </Reveal>
        <Reveal className="hero-visual" delay={160}>
          <div className="portrait-frame"><div className="portrait-backdrop" /><img src="/photos/me.jpg" alt="Portrait of Nkorofi Makgato" /><span className="portrait-index">01 / 06</span></div>
          <div className="visual-caption"><span>Curiosity led me here.</span><span>Scroll to explore ↓</span></div>
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
        </Reveal>
      </div>
      <div className="hero-bottom"><span>PORTFOLIO / 2026</span><span>DESIGNING · DEVELOPING · LEARNING</span></div>
    </section>
  )
}
