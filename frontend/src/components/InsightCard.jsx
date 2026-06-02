function InsightCard({ insight }) {

  if (!insight) {
    return (
      <div
        className="
        bg-white/70 backdrop-blur-xl
        rounded-3xl shadow-lg
        border border-white/30
        p-6 h-[350px]
        flex items-center justify-center
      "
      >
        <p className="text-gray-500">
          No investment insight available
        </p>
      </div>
    )
  }

  return (
    <div
      className="
      bg-white/70 backdrop-blur-xl
      rounded-3xl shadow-lg
      border border-white/30
      p-6 h-[350px] overflow-auto
    "
    >
      <h2 className="text-xl font-bold text-gray-800 mb-5">
        Investment Insight
      </h2>

      <div className="space-y-5">

        <div>
          <p className="text-sm text-gray-500">
            Signal
          </p>

          <h3 className="text-3xl font-bold text-blue-600">
            {insight.signal}
          </h3>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Risk Level
          </p>

          <p className="font-semibold text-gray-800">
            {insight.risk_level}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">
            Summary
          </p>

          <p className="text-gray-700 leading-relaxed">
            {insight.summary}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">
            Investment Thesis
          </p>

          <p className="text-gray-700 leading-relaxed">
            {insight.investment_thesis}
          </p>
        </div>

      </div>
    </div>
  )
}

export default InsightCard