function Hero() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20 sm:py-28">
      <div className="grid sm:grid-cols-[1fr_auto] gap-10 items-center">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">
            Software Developer
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            Hi, I'm Nkorofi Makgato.
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-xl">
            I'm a software developer studying at Tshwane University of
            Technology.my main programming language is Java, but I also build responsive web applications with React,
            TypeScript, and Tailwind CSS — and I hold a CCNA certification
            in networking fundamentals.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Get in touch
            </a>
            <a
              href="#certificates"
              className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              View certificates
            </a>
          </div>
        </div>

        <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden bg-gray-200 mx-auto sm:mx-0 flex items-center justify-center">
          <img
            src="/photos/profile.jpg"
            alt="Nkorofi Makgato"
            className="w-full h-full object-cover"
            onError={(e) => {
              const img = e.target as HTMLImageElement
              img.style.display = 'none'
              if (img.parentElement) {
                img.parentElement.innerHTML =
                  '<span class="text-gray-400 text-sm">Add photo</span>'
              }
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default Hero