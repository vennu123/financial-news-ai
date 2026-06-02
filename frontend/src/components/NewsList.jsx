function NewsList({ news }) {

  if (!news || news.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 border border-slate-200">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Latest Financial News
        </h2>

        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          {news.length} Articles
        </span>
      </div>

      <div className="grid gap-4">

        {news.map((item, index) => (

          <div
            key={index}
            className="p-5 rounded-2xl border border-slate-200 hover:shadow-lg transition duration-300 hover:scale-[1.01] bg-gradient-to-r from-white to-slate-50"
          >

            <div className="flex gap-4 items-start">

              <div className="bg-blue-600 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0">
                {index + 1}
              </div>

              <div className="flex-1">

                <h3 className="font-semibold text-slate-800 leading-relaxed">
                  {typeof item === "string"
                    ? item
                    : item.title}
                </h3>

                {/* Open link only if exists */}
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-blue-600 font-medium hover:text-blue-800"
                  >
                    Read Full Article →
                  </a>
                )}

              </div>
            </div>

          </div>
        ))}

      </div>
    </div>
  )
}

export default NewsList