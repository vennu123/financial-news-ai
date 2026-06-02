import { useState } from "react"

function SearchBar({
  onSearch,
  onCompare
}) {

  const [query, setQuery] =
    useState("")

  const handleSubmit = () => {

    if (!query.trim()) return

    // COMPARE MODE
    if (query.includes(",")) {

      const companies =
        query.split(",")

      if (
        companies.length === 2
      ) {

        onCompare(
          companies[0].trim(),
          companies[1].trim()
        )

        return
      }
    }

    // SINGLE COMPANY
    onSearch(query)
  }

  return (
    <div
      className="
      bg-white
      rounded-3xl
      shadow-lg
      p-8
      border
      border-gray-100
      "
    >

      <h2
        className="
        text-2xl
        font-bold
        mb-2
        "
      >
        Analyze Company
      </h2>

      <p
        className="
        text-gray-500
        mb-5
        text-sm
        "
      >
        Single:
        {" "}
        <span className="font-medium">
          google
        </span>

        {" "}•{" "}

        Compare:
        {" "}
        <span className="font-medium">
          google,microsoft
        </span>
      </p>

      <div className="flex gap-4">

        <input
          type="text"
          placeholder="Enter company..."
          className="
          flex-1
          px-5
          py-4
          rounded-2xl
          border
          border-gray-300
          outline-none
          focus:ring-4
          focus:ring-blue-200
          text-lg
          "
          value={query}
          onChange={(e) =>
            setQuery(
              e.target.value
            )
          }
        />

        <button
          onClick={handleSubmit}
          className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-8
          rounded-2xl
          font-semibold
          transition
          shadow-lg
          "
        >
          Analyze
        </button>

      </div>
    </div>
  )
}

export default SearchBar