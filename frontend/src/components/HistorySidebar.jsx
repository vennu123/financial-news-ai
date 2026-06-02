import { useEffect, useState } from "react"
import axios from "axios"

function HistorySidebar({
  onSelectCompany,
  refreshTrigger
}) {

  const [history, setHistory] =
    useState([])

  // ------------------------
  // FETCH HISTORY
  // ------------------------
  const fetchHistory =
    async () => {

      try {

        const response =
         await axios.get(
  "https://financial-news-api-1043835311951.asia-south1.run.app/history"
)

        const reports =
          response.data.reports || []

        // Sort newest first
        reports.sort(
          (a, b) =>
            new Date(
              b.last_updated
            ) -
            new Date(
              a.last_updated
            )
        )

        setHistory(reports)

      } catch (error) {
        console.log(error)
      }
    }

  // First load
  useEffect(() => {
    fetchHistory()
  }, [])

  // Refresh after new search
  useEffect(() => {
    fetchHistory()
  }, [refreshTrigger])

  return (
    <div
      className="
      bg-white/70
      backdrop-blur-lg
      rounded-3xl
      shadow-xl
      p-6
      border border-white/30
      sticky top-6
      "
    >

      <h2
        className="
        text-xl
        font-bold
        mb-5
        text-slate-800
        "
      >
        Search History
      </h2>

      <div className="space-y-3">

        {history.length === 0 && (
          <p className="text-gray-500">
            No searches yet
          </p>
        )}

        {history.map((item, index) => (

          <button
            key={index}
            onClick={() =>
              onSelectCompany(
                item.company
              )
            }

            className="
              w-full
              text-left
              bg-slate-100
              hover:bg-blue-100
              transition-all
              duration-300
              p-4
              rounded-2xl
              shadow-sm
              hover:shadow-md
              hover:scale-[1.02]
            "
          >

            <div className="flex justify-between items-center">

              <h3
                className="
                font-semibold
                capitalize
                text-slate-800
                "
              >
                {item.company}
              </h3>

              <span
                className={`
                text-xs
                px-2 py-1
                rounded-full
                font-semibold
                ${
                  item.sentiment ===
                  "Positive"
                    ? "bg-green-100 text-green-700"
                    : item.sentiment ===
                      "Negative"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }
                `}
              >
                {item.sentiment}
              </span>

            </div>

            <p
              className="
              text-sm
              text-gray-500
              mt-1
              "
            >
              {item.recommendation}
            </p>

          </button>
        ))}

      </div>
    </div>
  )
}

export default HistorySidebar