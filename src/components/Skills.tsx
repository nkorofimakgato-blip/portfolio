import Reveal from './Reveal'

const groups = [
  { number: '01', title: 'Development', skills: ['Java', 'JavaScript', 'TypeScript', 'React', 'HTML & CSS', 'Tailwind CSS'] },
  { number: '02', title: 'Tools & workflow', skills: ['Git & GitHub', 'Vite', 'Responsive Design', 'REST APIs'] },
  { number: '03', title: 'Infrastructure', skills: ['Networking', 'Routing & Switching', 'CCNA foundations'] },
]

export default function Skills() {
  return (
    <section id="skills" className="section section-muted">
      <div className="section-container">
        <Reveal className="section-heading-row"><div><p className="section-kicker">02 — WHAT I BRING</p><h2 className="section-title">Skills & <em>toolkit.</em></h2></div><p className="section-intro">A growing set of tools and skills for building reliable, accessible digital products.</p></Reveal>
        <div className="skill-groups">{groups.map((group, index) => <Reveal key={group.number} delay={index * 90} className="skill-group"><span className="skill-number">{group.number}</span><h3>{group.title}</h3><div className="skill-list">{group.skills.map(skill => <span key={skill}>{skill}</span>)}</div></Reveal>)}</div>
      </div>
    </section>
  )
}
