function CompanyCard({ data }) {

  if (!data) return null

  return (
    <div className="
      bg-white
      rounded-3xl
      shadow-xl
      p-8
      border border-gray-100
    ">

      <div className="flex justify-between">

        <div>
          <h2 className="text-4xl font-bold capitalize">
            {data.company}
          </h2>

          <p className="mt-2 text-gray-500">
            Confidence Score
          </p>

          <div className="mt-3 w-56 bg-gray-200 rounded-full h-4">

            <div
              className="bg-blue-600 h-4 rounded-full"
              style={{
                width:
                `${data.confidence_score}%`
              }}
            />
          </div>

          <p className="mt-2 font-semibold">
            {data.confidence_score}%
          </p>
        </div>

        <div>

          <span
            className={`
              px-5 py-3 rounded-2xl
              text-white font-bold text-lg
              ${
                data.sentiment === "Positive"
                ? "bg-green-500"
                : data.sentiment === "Negative"
                ? "bg-red-500"
                : "bg-yellow-500"
              }
            `}
          >
            {data.sentiment}
          </span>

        </div>
      </div>

      <div className="mt-8">

        <p className="text-gray-500">
          Recommendation
        </p>

        <h3 className="text-4xl font-bold text-blue-600">
          {data.recommendation}
        </h3>

      </div>

    </div>
  )
}

export default CompanyCard