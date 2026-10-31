import Reveal from './Reveal'

interface Project { title: string; description: string; image: string; tech: string[]; liveUrl?: string; codeUrl?: string; isPhone?: boolean }
const projects: Project[] = [
  { title: 'Nkorofi AI', description: "A public-facing AI assistant embedded on this portfolio. It answers questions about my work, skills and experience using a retrieval-augmented knowledge base, with streamed responses from Groq's GPT-OSS 120B.", image: '/projects/nkorofi-ai.png', tech: ['React', 'TypeScript', 'Vercel Functions', 'Groq'], liveUrl: 'https://nkorofi-ai.vercel.app', codeUrl: 'https://github.com/nkorofimakgato-blip/nkorofi-ai' },
  { title: 'Neon Drift', description: 'A top-down arcade racing game built with React, TypeScript and HTML5 Canvas. Features custom driving physics, drifting, a lap system, minimap, skid marks and particle effects.', image: '/projects/neon-drift.png', tech: ['React', 'TypeScript', 'Canvas', 'Game Physics'], liveUrl: 'https://neon-drift-xxx.vercel.app', codeUrl: 'https://github.com/nkorofimakgato-blip/neon-drift' },
  { title: 'Clothing Store', description: 'An e-commerce storefront with product browsing, search, category filters, sorting, a persistent shopping cart and a multi-step checkout with form validation.', image: '/projects/clothing-store.png', tech: ['React', 'TypeScript', 'Tailwind', 'Context API'], liveUrl: 'https://clothing-store-xi-gray.vercel.app', codeUrl: 'https://github.com/nkorofimakgato-blip/clothing-store' },
  { title: 'Weather App', description: 'A weather app with city autocomplete, geolocation and a six-day forecast, integrating the Open-Meteo API for live weather data.', image: '/projects/weather-app.png', tech: ['React', 'TypeScript', 'Open-Meteo API'], liveUrl: 'https://weather-app-nkorofimakgato-blip.vercel.app', codeUrl: 'https://github.com/nkorofimakgato-blip/weather-app' },
  { title: 'Mkansi Movie Finder', description: 'A React and TypeScript app for browsing movies and TV shows, with live TMDB data, trending rows, full-text search, detail pages, cast and saved favourites.', image: '/projects/movie-finder.png', tech: ['React', 'TypeScript', 'TMDB API'], liveUrl: 'https://movie-finder-q9vj.vercel.app', codeUrl: 'https://github.com/nkorofimakgato-blip/movie-finder' },
  { title: 'Intelligent Recipes', description: 'An Android app that helps people cook with ingredients they already have. Includes camera-based ingredient recognition and a community recipe feed powered by Firebase.', image: '/projects/intelligent-recipes-1.png', tech: ['Android', 'Java', 'Firebase', 'ML Kit'], codeUrl: 'https://github.com/nkorofimakgato-blip/intelligent-recipes', isPhone: true },
]

export default function Projects() {
  return (
    <section id="projects" className="section section-light">
      <div className="section-container">
        <Reveal className="section-heading-row"><div><p className="section-kicker">03 — SELECTED WORK</p><h2 className="section-title">Things I've <em>made.</em></h2></div><p className="section-intro">A selection of experiments, applications and ideas brought to life through code.</p></Reveal>
        <div className="project-grid">{projects.map((project, index) => <Reveal key={project.title} delay={(index % 2) * 100} className={`project-card ${index === 0 ? 'project-featured' : ''}`}>
          <a className="project-image" href={project.liveUrl || project.codeUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title}`}>
            <img src={project.image} alt={`${project.title} preview`} className={project.isPhone ? 'phone-preview' : ''} loading="lazy" />
            <span className="project-view">View project ↗</span>
          </a>
          <div className="project-info"><div className="project-title-line"><span className="project-index">0{index + 1}</span><h3>{project.title}</h3></div><p>{project.description}</p><div className="project-tags">{project.tech.map(tag => <span key={tag}>{tag}</span>)}</div><div className="project-links">{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live site ↗</a>}{project.codeUrl && <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">Source code ↗</a>}</div></div>
        </Reveal>)}</div>
      </div>
    </section>
  )
}
