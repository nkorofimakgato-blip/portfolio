const skills = [
  'Java',
  'Html',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Tailwind CSS',
  'Git & GitHub',
  'Vite',
  'Responsive Design',
  'Networking (CCNA)',
]

function Skills() {
  return (
    <section id="skills" className="border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-8">Skills</h2>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-medium text-gray-800"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills