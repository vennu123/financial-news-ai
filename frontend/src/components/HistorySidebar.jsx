import {
  useEffect,
  useState
} from "react"

import axios from "axios"


const API_BASE_URL =
  import.meta.env
    .VITE_API_BASE_URL


function HistorySidebar({
  user,
  onSelectCompany,
  refreshTrigger
}) {

  const [history, setHistory] =
    useState([])


  const fetchHistory =
    async () => {

      if (!user?.uid)
        return

      try {

        const response =
          await axios.get(
            `${API_BASE_URL}/history`,
            {
              params: {
                user_id:
                  user.uid
              }
            }
          )

        const reports =
          response.data
            .reports || []

        reports.sort(
          (a, b) =>
            new Date(
              b.last_updated
            ) -
            new Date(
              a.last_updated
            )
        )

        setHistory(
          reports
        )

      } catch (error) {

        console.log(error)
      }
    }


  useEffect(() => {
    fetchHistory()
  }, [user])


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

        {history.map(
          (
            item,
            index
          ) => (

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

              <div
                className="
                flex
                justify-between
                items-center
                "
              >

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
                  className="
                  text-xs
                  px-2
                  py-1
                  rounded-full
                  font-semibold
                  bg-blue-100
                  text-blue-700
                  "
                >
                  {
                    item.sentiment
                  }
                </span>

              </div>

            </button>
          )
        )}

      </div>
    </div>
  )
}

export default HistorySidebar