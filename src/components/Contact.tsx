function Contact() {
  return (
    <section id="contact" className="border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
        <p className="text-gray-600 mb-8 max-w-xl">
          Have a question, an opportunity, or just want to say hi? Reach out.
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href="mailto:nkorofimakgato@gmail.com"
            className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
             Email me
          </a>
          <a
            href="https://github.com/nkorofimakgato-blip"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/nkorofimakgato"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact