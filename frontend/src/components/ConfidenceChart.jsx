import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer
} from "recharts"

function ConfidenceChart({ score }) {

  const data = [
    {
      name: "Confidence",
      value: score,
      fill: "#4F46E5"
    }
  ]

  return (
    <div
      className="bg-white/70 backdrop-blur-xl
      rounded-3xl shadow-lg border border-white/30
      p-6 h-[350px]"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Confidence Score
      </h2>

      <div className="h-[250px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <RadialBarChart
            innerRadius="70%"
            outerRadius="100%"
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar
              minAngle={15}
              clockWise
              dataKey="value"
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center -mt-16">
        <h3 className="text-5xl font-bold text-indigo-600">
          {score}%
        </h3>

        <p className="text-gray-500 mt-2">
          AI Confidence
        </p>
      </div>
    </div>
  )
}

export default ConfidenceChart