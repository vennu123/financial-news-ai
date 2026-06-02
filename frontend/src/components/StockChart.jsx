import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"

function StockChart({
  data,
  company
}) {

  if (!data?.length)
    return null

  return (
    <div
      className="
      bg-white/80
      backdrop-blur-lg
      rounded-3xl
      shadow-xl
      border border-white/30
      p-6
      mt-8
      "
    >

      <h2
        className="
        text-2xl
        font-bold
        text-slate-800
        mb-5
        capitalize
        "
      >
        📈 {company}
        Stock Trend
      </h2>

      <div
        className="
        h-[350px]
        "
      >

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart
            data={data}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="date"
              tick={{
                fontSize: 12
              }}
            />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="price"
              strokeWidth={3}
              dot={false}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}

export default StockChart