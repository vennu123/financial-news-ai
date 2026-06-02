import {
  FaChartLine,
  FaBrain,
  FaShieldAlt,
  FaLightbulb,
  FaDollarSign,
  FaBuilding
} from "react-icons/fa"

function KPISection({ data }) {

  if (!data) return null

  const dailyChange =
    data.stock_data?.daily_change

  const kpis = [
    {
      title: "Sentiment",
      value: data.sentiment,
      icon: <FaChartLine />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Confidence",
      value: `${data.confidence_score}%`,
      icon: <FaBrain />,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Recommendation",
      value: data.recommendation,
      icon: <FaLightbulb />,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Risk Level",
      value:
        data.insight?.risk_level
        || "MEDIUM",
      icon: <FaShieldAlt />,
      color:
        "from-orange-500 to-red-500"
    },

    // -------------------------
    // STOCK KPIs
    // -------------------------
    {
      title: "Ticker",
      value:
        data.stock_data?.ticker
        || "N/A",
      icon: <FaChartLine />,
      color:
        "from-indigo-500 to-blue-500"
    },
    {
      title: "Stock Price",
      value:
        data.stock_data
          ?.current_price !== null
          &&
        data.stock_data
          ?.current_price !== undefined
          ? `$${Number(
              data.stock_data.current_price
            ).toFixed(2)}`
          : "N/A",
      icon: <FaDollarSign />,
      color:
        "from-green-500 to-teal-500"
    },
    {
      title: "Daily Change",
      value:
        dailyChange !== null
        &&
        dailyChange !== undefined
          ? `${dailyChange}%`
          : "N/A",
      icon: <FaChartLine />,
      color:
        dailyChange < 0
          ? "from-red-500 to-rose-500"
          : "from-green-500 to-lime-500"
    },
    {
      title: "Market Cap",
      value:
        data.stock_data
          ?.market_cap
          ? `$${data.stock_data.market_cap}`
          : "N/A",
      icon: <FaBuilding />,
      color:
        "from-violet-500 to-purple-500"
    }
  ]

  return (
    <div
      className="
      grid
      grid-cols-1
      md:grid-cols-2
      xl:grid-cols-4
      gap-5
      mt-8
      "
    >
      {kpis.map(
        (item, index) => (
          <div
            key={index}
            className="
            relative
            overflow-hidden
            rounded-3xl
            bg-white/70
            backdrop-blur-xl
            shadow-lg
            border
            border-white/30
            p-6
            hover:scale-105
            transition-all
            duration-300
            "
          >

            <div
              className={`
              absolute
              top-0
              left-0
              w-full
              h-1
              bg-gradient-to-r
              ${item.color}
              `}
            />

            <div
              className="
              flex
              justify-between
              items-center
              "
            >

              <div>

                <p
                  className="
                  text-gray-500
                  text-sm
                  "
                >
                  {item.title}
                </p>

                <h3
                  className="
                  text-2xl
                  font-bold
                  text-gray-800
                  mt-2
                  "
                >
                  {item.value}
                </h3>

              </div>

              <div
                className={`
                text-white
                p-4
                rounded-2xl
                bg-gradient-to-r
                ${item.color}
                text-xl
                shadow-lg
                `}
              >
                {item.icon}
              </div>

            </div>

          </div>
        )
      )}
    </div>
  )
}

export default KPISection