function SentimentGauge({ sentiment }) {

  const getPosition = () => {
    if (sentiment === "Positive") return "translate-x-28"
    if (sentiment === "Neutral") return "translate-x-14"
    return "translate-x-0"
  }

  const getColor = () => {
    if (sentiment === "Positive") return "bg-green-500"
    if (sentiment === "Neutral") return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 border border-slate-200 overflow-hidden">

      <h2 className="text-xl font-bold text-slate-800 mb-5">
        AI Market Outlook
      </h2>

      {/* Gauge Container */}
      <div className="bg-slate-200 rounded-full h-4 relative overflow-hidden">

        {/* Colored Sections */}
        <div className="absolute left-0 top-0 h-full w-1/3 bg-red-400"></div>
        <div className="absolute left-1/3 top-0 h-full w-1/3 bg-yellow-400"></div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-green-400"></div>

        {/* Indicator */}
        <div
          className={`absolute top-[-6px] ${getPosition()}
          h-7 w-7 rounded-full border-4 border-white shadow-lg ${getColor()}
          transition-all duration-500`}
        />
      </div>

      {/* Labels */}
      <div className="flex justify-between text-sm text-slate-600 mt-4 px-1">
        <span>Negative</span>
        <span>Neutral</span>
        <span>Positive</span>
      </div>

      {/* Current Sentiment */}
      <div className="mt-5 flex justify-center">
        <span
          className={`px-5 py-2 rounded-full text-white font-semibold ${getColor()}`}
        >
          {sentiment}
        </span>
      </div>

    </div>
  )
}

export default SentimentGauge