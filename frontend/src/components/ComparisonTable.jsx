function ComparisonTable({
  company1,
  company2,
  winner,
  comparisonReason
}) {

  /*const winner =
    company1.confidence_score >
    company2.confidence_score
      ? company1.company
      : company2.company
*/
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

      <h2
        className="
        text-3xl
        font-bold
        text-slate-800
        "
      >
        📊 Company Comparison
      </h2>

      <p className="text-gray-500 mb-6">
        AI-driven investment comparison
      </p>

      <div className="overflow-x-auto">

        <table
          className="
          w-full
          text-left
          border-collapse
          "
        >

          <thead>
            <tr
              className="
              border-b
              border-gray-200
              "
            >
              <th className="pb-4">
                Metric
              </th>

              <th className="pb-4 capitalize">
                {company1.company}
              </th>

              <th className="pb-4 capitalize">
                {company2.company}
              </th>
            </tr>
          </thead>

          <tbody>

            {/* Ticker */}
            <tr className="border-b border-gray-100">
              <td className="py-4 font-medium">
                Ticker
              </td>

              <td>
                {
                  company1.stock_data
                    ?.ticker || "N/A"
                }
              </td>

              <td>
                {
                  company2.stock_data
                    ?.ticker || "N/A"
                }
              </td>
            </tr>

            {/* Stock Price */}
            <tr className="border-b border-gray-100">
              <td className="py-4 font-medium">
                Stock Price
              </td>

              <td>
                {
                  company1.stock_data
                    ?.current_price
                  ? `$${company1.stock_data.current_price}`
                  : "N/A"
                }
              </td>

              <td>
                {
                  company2.stock_data
                    ?.current_price
                  ? `$${company2.stock_data.current_price}`
                  : "N/A"
                }
              </td>
            </tr>

            {/* Daily Change */}
            {/* Daily Change */}
<tr className="border-b border-gray-100">
  <td className="py-4 font-medium">
    Daily Change
  </td>

  <td
    className={
      Number(
        company1.stock_data?.daily_change
      ) < 0
        ? "text-red-600 font-semibold"
        : "text-green-600 font-semibold"
    }
  >
    {
      company1.stock_data?.daily_change
        !== undefined
        && company1.stock_data?.daily_change
        !== null
        ? `${company1.stock_data.daily_change}%`
        : "N/A"
    }
  </td>

  <td
    className={
      Number(
        company2.stock_data?.daily_change
      ) < 0
        ? "text-red-600 font-semibold"
        : "text-green-600 font-semibold"
    }
  >
    {
      company2.stock_data?.daily_change
        !== undefined
        && company2.stock_data?.daily_change
        !== null
        ? `${company2.stock_data.daily_change}%`
        : "N/A"
    }
  </td>
</tr>

            {/* Market Cap */}
            <tr className="border-b border-gray-100">
              <td className="py-4 font-medium">
                Market Cap
              </td>

              <td>
                {
                  company1.stock_data
                    ?.market_cap || "N/A"
                }
              </td>

              <td>
                {
                  company2.stock_data
                    ?.market_cap || "N/A"
                }
              </td>
            </tr>

            {/* Sentiment */}
            <tr className="border-b border-gray-100">
              <td className="py-4 font-medium">
                Sentiment
              </td>

              <td>
                {company1.sentiment}
              </td>

              <td>
                {company2.sentiment}
              </td>
            </tr>

            {/* Confidence */}
            <tr className="border-b border-gray-100">
              <td className="py-4 font-medium">
                Confidence
              </td>

              <td>
                {
                  company1.confidence_score
                }%
              </td>

              <td>
                {
                  company2.confidence_score
                }%
              </td>
            </tr>

            {/* Recommendation */}
            <tr className="border-b border-gray-100">
              <td className="py-4 font-medium">
                Recommendation
              </td>

              <td>
                {
                  company1.recommendation
                }
              </td>

              <td>
                {
                  company2.recommendation
                }
              </td>
            </tr>

            {/* Risk Level */}
            <tr>
              <td className="py-4 font-medium">
                Risk Level
              </td>

              <td>
                {
                  company1.insight
                    ?.risk_level
                }
              </td>

              <td>
                {
                  company2.insight
                    ?.risk_level
                }
              </td>
            </tr>

          </tbody>

        </table>
      </div>

      {/* Better Pick */}
      <div
        className="
        mt-8
        bg-green-100
        border
        border-green-300
        rounded-2xl
        p-5
        "
      >
        <h3
          className="
          text-xl
          font-bold
          text-green-800
          "
        >
          🏆 Better Pick: {winner}
        </h3>

        <p className="text-green-700 mt-2">
  {
    company1.company === winner
      ? comparisonReason
      : comparisonReason
  }
</p>
      </div>

    </div>
  )
}

export default ComparisonTable