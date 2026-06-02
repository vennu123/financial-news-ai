function AIExplanationCard({
  data
}) {

  if (!data) return null

  return (
    <div
      className="
      bg-white/80
      backdrop-blur-lg
      rounded-3xl
      shadow-xl
      border border-white/30
      p-8
      mt-8
      "
    >

      <div className="flex items-center gap-3 mb-6">

        <div
          className="
          w-12
          h-12
          rounded-2xl
          bg-gradient-to-r
          from-violet-500
          to-indigo-500
          flex
          items-center
          justify-center
          text-white
          text-xl
          shadow-lg
          "
        >
          🧠
        </div>

        <div>
          <h2
            className="
            text-2xl
            font-bold
            text-slate-800
            "
          >
            Why did AI recommend{" "}
            {data.recommendation}?
          </h2>

          <p className="text-gray-500">
            AI-generated investment reasoning
          </p>
        </div>

      </div>

      {/* SUMMARY */}
      <div className="mb-6">

        <h3
          className="
          text-lg
          font-semibold
          text-slate-800
          mb-2
          "
        >
          Summary
        </h3>

        <p className="text-gray-600 leading-7">
          {
            data.insight
              ?.summary
            || "No summary available"
          }
        </p>

      </div>

      {/* INVESTMENT THESIS */}
      <div className="mb-6">

        <h3
          className="
          text-lg
          font-semibold
          text-slate-800
          mb-2
          "
        >
          Investment Thesis
        </h3>

        <p className="text-gray-600 leading-7">
          {
            data.insight
              ?.investment_thesis
            || "No thesis available"
          }
        </p>

      </div>

      {/* AI REASON */}
      <div>

        <h3
          className="
          text-lg
          font-semibold
          text-slate-800
          mb-2
          "
        >
          Key Reason
        </h3>

        <p className="text-gray-600 leading-7">
          {
            data.reason
            || "No reasoning available"
          }
        </p>

      </div>

    </div>
  )
}

export default AIExplanationCard