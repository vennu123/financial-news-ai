import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

function SentimentChart({ data }) {

  if (!data) return null

  const chartData = [
    {
      name: "Confidence",
      value: data.confidence_score
    }
  ]

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6">

      <h2 className="text-2xl font-bold mb-5">
        Confidence Score
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Bar
            dataKey="value"
            radius={[10,10,0,0]}
          />
        </BarChart>
      </ResponsiveContainer>

    </div>
  )
}

export default SentimentChart