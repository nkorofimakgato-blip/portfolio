interface Project {
  title: string
  description: string
  image: string
  tech: string[]
  liveUrl?: string
  codeUrl?: string
  isPhone?: boolean
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
  {
    title: 'Movie Finder',
    description:
      'A React + TypeScript app for browsing movies and TV shows. Fetches live data from the TMDB API, includes trending titles, full-text search, rich detail pages with cast and similar titles, and localStorage-backed favorites.',
    image: '/projects/movie-finder.png',
    tech: ['React', 'TypeScript', 'Tailwind', 'React Router', 'TMDB API'],
     liveUrl: 'https://movie-finder-q9vj.vercel.app',
    codeUrl: 'https://github.com/nkorofimakgato-blip/movie-finder',
  },
  {
    title: 'Intelligent Recipes',
    description:
      'An Android app that tells you what you can cook right now with the ingredients you have — and shows which recipes you are 1–2 ingredients away from. Includes camera-based ingredient recognition (ML Kit) and a cloud-synced community recipe feed powered by Firebase Firestore.',
    image: '/projects/intelligent-recipes-1.png',
    tech: ['Android', 'Java', 'Firebase', 'ML Kit', 'CameraX'],
    codeUrl: 'https://github.com/nkorofimakgato-blip/intelligent-recipes',
    isPhone: true,
  },
]

function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mx-auto" style={{ width: '200px' }}>
      {/* Phone body */}
      <div className="relative bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-b-2xl z-10" />

        {/* Screen */}
        <div className="bg-gray-900 rounded-[2rem] overflow-hidden">
          <img
            src={src}
            alt={alt}
            className="w-full h-auto block"
            onError={(e) => {
              const img = e.target as HTMLImageElement
              img.style.display = 'none'
            }}
          />
        </div>

        {/* Side button */}
        <div className="absolute top-20 -right-[3px] w-[3px] h-12 bg-gray-800 rounded-r" />
        {/* Volume buttons */}
        <div className="absolute top-20 -left-[3px] w-[3px] h-8 bg-gray-800 rounded-l" />
        <div className="absolute top-32 -left-[3px] w-[3px] h-8 bg-gray-800 rounded-l" />
      </div>
    </div>
  )
}

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
              className="grid md:grid-cols-2 gap-0 border border-gray-200 rounded-xl overflow-hidden bg-gray-50"
            >
              {/* Image panel */}
              <div className="aspect-[4/3] bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center p-6 overflow-hidden">
                {project.isPhone ? (
                  <PhoneFrame src={project.image} alt={`${project.title} screenshot`} />
                ) : (
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement
                      img.style.display = 'none'
                    }}
                  />
                )}
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
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-900 text-white px-5 py-2.5 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                    >
                      View Live →
                    </a>
                  )}
                  {project.codeUrl && (
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-gray-300 px-5 py-2.5 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
                    >
                      View Code
                    </a>
                  )}
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