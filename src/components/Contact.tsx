import Reveal from './Reveal'

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="section-container">
        <Reveal><p className="section-kicker">05 — HAVE A PROJECT IN MIND?</p><h2>Let's make<br /><em>something meaningful.</em></h2><p className="contact-description">Have a question, an opportunity or an idea you'd like to explore? I'd be glad to hear from you.</p><a href="mailto:nkorofimakgato@gmail.com" className="button button-light">Start a conversation <span>↗</span></a></Reveal>
        <div className="contact-socials"><a href="https://github.com/nkorofimakgato-blip" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/nkorofimakgato" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="mailto:nkorofimakgato@gmail.com">Email ↗</a></div>
      </div>
    </section>
  )
}
