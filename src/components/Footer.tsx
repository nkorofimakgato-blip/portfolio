function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-5xl mx-auto px-6 py-8 text-center text-sm text-gray-500">
        © {year} Nkorofi Makgato. Built with React, TypeScript, and Tailwind CSS.
      </div>
    </footer>
  )
}

export default Footer