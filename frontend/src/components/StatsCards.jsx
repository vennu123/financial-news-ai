function StatsCards({ data }) {

  if (!data) return null

  return (
    <div className="grid md:grid-cols-3 gap-5">

      <div className="bg-white p-6 rounded-3xl shadow-lg">
        <p className="text-gray-500">
          Sentiment
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {data.sentiment}
        </h2>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-lg">
        <p className="text-gray-500">
          Confidence
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {data.confidence_score}%
        </h2>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-lg">
        <p className="text-gray-500">
          Recommendation
        </p>

        <h2 className="text-3xl font-bold mt-2 text-blue-600">
          {data.recommendation}
        </h2>
      </div>

    </div>
  )
}

export default StatsCards