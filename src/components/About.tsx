import Reveal from './Reveal'

export default function About() {
  return (
    <section id="about" className="section section-light">
      <div className="section-container about-layout">
        <Reveal><p className="section-kicker">01 — A LITTLE ABOUT ME</p><h2 className="section-title">Technology is the tool.<br /><em>Problem-solving is the point.</em></h2></Reveal>
        <Reveal className="about-copy" delay={100}>
          <p>I'm a software developer currently studying at Tshwane University of Technology. I particularly work with Java and enjoy building clean, responsive interfaces and solving problems with code.</p>
          <p>My focus includes frontend development with React and TypeScript, alongside a foundation in networking through my CCNA certification. That combination helps me understand both the experience people see and the systems working behind it.</p>
          <p>I'm always learning, experimenting and turning ideas into useful projects.</p>
          <a href="#contact" className="underlined-link">A little more about working together <span>↗</span></a>
        </Reveal>
      </div>
    </section>
  )
}
