function Certificates() {
  return (
    <section id="certificates" className="border-t border-gray-200 bg-white">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-8">Certificates</h2>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
            <div className="aspect-[4/3] bg-white flex items-center justify-center overflow-hidden">
              <img
                src="/certs/ccna.png"
                alt="CCNA Certificate"
                className="w-full h-full object-contain"
                onError={(e) => {
                  const img = e.target as HTMLImageElement
                  img.style.display = 'none'
                  if (img.parentElement) {
                    img.parentElement.innerHTML =
                      '<p class="text-gray-400 text-sm">Add /certs/ccna.png</p>'
                  }
                }}
              />
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg mb-1">CCNA</h3>
              <p className="text-sm text-gray-600">
                Cisco Certified Network Associate — networking fundamentals,
                routing, and switching.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Certificates