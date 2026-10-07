interface Project {
  title: string
  description: string
  image: string
  tech: string[]
  liveUrl: string
  codeUrl: string
}

const projects: Project[] = [
  {
    title: 'Clothing Store',
    description:
      'A full-featured e-commerce storefront with product browsing, search, category filters, sorting, a persistent shopping cart, and a multi-step checkout with form validation.',
    image: '/projects/clothing-store.png',
    tech: ['React', 'TypeScript', 'Tailwind', 'React Router', 'Context API'],
    liveUrl: 'https://clothing-store-xi-gray.vercel.app',
    codeUrl: 'https://github.com/nkorofimakgato-blip/clothing-store',
  },
  {
    title: 'Weather App',
    description:
      'A weather app with city autocomplete, geolocation, and a 6-day forecast. Integrates the Open-Meteo API for real-time weather data with loading and error states.',
    image: '/projects/weather-app.png',
    tech: ['React', 'TypeScript', 'Tailwind', 'Open-Meteo API'],
    liveUrl: 'https://weather-app-nkorofimakgato-blip.vercel.app',
    codeUrl: 'https://github.com/nkorofimakgato-blip/weather-app',
  },
]

function Projects() {
  return (
    <section id="projects" className="border-t border-gray-200 bg-white">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-2">Projects</h2>
        <p className="text-gray-600 mb-10 max-w-xl">
          A selection of things I've built. Each one is live and the code is
          public.
        </p>

        <div className="grid gap-10">
          {projects.map((project) => (
            <article
              key={project.title}
              className="grid md:grid-cols-2 gap-6 border border-gray-200 rounded-xl overflow-hidden bg-gray-50"
            >
              <div className="aspect-video md:aspect-auto md:h-full bg-gray-100 overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement
                    img.style.display = 'none'
                  }}
                />
              </div>

              <div className="p-6 sm:p-8 flex flex-col">
                <h3 className="text-2xl font-bold mb-3">
                  {project.title}
                </h3>

                <p className="text-gray-700 leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="bg-white border border-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 mt-auto">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-900 text-white px-5 py-2.5 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                  >
                    View Live →
                  </a>
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-gray-300 px-5 py-2.5 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
                  >
                    View Code
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects