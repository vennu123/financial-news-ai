function formatMarketCap(value) {

  if (!value)
    return "N/A"

  if (
    value >= 1_000_000_000_000
  ) {
    return (
      "$" +
      (
        value /
        1_000_000_000_000
      ).toFixed(2) +
      "T"
    )
  }

  if (
    value >= 1_000_000_000
  ) {
    return (
      "$" +
      (
        value /
        1_000_000_000
      ).toFixed(2) +
      "B"
    )
  }

  return (
    "$" +
    value.toLocaleString()
  )
}

function StockMetrics({
  stockData
}) {

  if (!stockData)
    return null

  return (
    <div
      className="
      grid
      grid-cols-2
      md:grid-cols-4
      gap-4
      mt-8
      "
    >

      {/* TICKER */}
      <div
        className="
        bg-white/80
        backdrop-blur-lg
        rounded-3xl
        p-5
        shadow-xl
        border
        border-white/30
        "
      >
        <p
          className="
          text-gray-500
          text-sm
          "
        >
          Ticker
        </p>

        <h2
          className="
          text-2xl
          font-bold
          mt-2
          "
        >
          {
            stockData.ticker
            || "N/A"
          }
        </h2>
      </div>

      {/* PRICE */}
      <div
        className="
        bg-white/80
        backdrop-blur-lg
        rounded-3xl
        p-5
        shadow-xl
        border
        border-white/30
        "
      >
        <p
          className="
          text-gray-500
          text-sm
          "
        >
          Stock Price
        </p>

        <h2
          className="
          text-2xl
          font-bold
          mt-2
          "
        >
          $
          {
            stockData.price
              ?.toFixed(2)
            || "N/A"
          }
        </h2>
      </div>

      {/* DAILY CHANGE */}
      <div
        className="
        bg-white/80
        backdrop-blur-lg
        rounded-3xl
        p-5
        shadow-xl
        border
        border-white/30
        "
      >
        <p
          className="
          text-gray-500
          text-sm
          "
        >
          Daily Change
        </p>

        <h2
          className={`
          text-2xl
          font-bold
          mt-2
          ${
            stockData.change_percent >= 0
              ? "text-green-600"
              : "text-red-600"
          }
          `}
        >
          {
            stockData.change_percent >= 0
              ? "▲"
              : "▼"
          }

          {" "}

          {
            stockData
              .change_percent
              ?.toFixed(2)
          }%
        </h2>
      </div>

      {/* MARKET CAP */}
      <div
        className="
        bg-white/80
        backdrop-blur-lg
        rounded-3xl
        p-5
        shadow-xl
        border
        border-white/30
        "
      >
        <p
          className="
          text-gray-500
          text-sm
          "
        >
          Market Cap
        </p>

        <h2
          className="
          text-2xl
          font-bold
          mt-2
          "
        >
          {
            formatMarketCap(
              stockData.market_cap
            )
          }
        </h2>
      </div>

    </div>
  )
}

export default StockMetrics