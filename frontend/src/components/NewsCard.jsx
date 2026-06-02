import {
  FaExternalLinkAlt
} from "react-icons/fa"

function NewsCard({
  title,
  link,
  index
}) {

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="
      group block
      bg-white/70 backdrop-blur-xl
      border border-white/30
      rounded-3xl p-5
      shadow-lg hover:shadow-2xl
      hover:-translate-y-2
      transition duration-300
    "
    >
      <div className="flex items-start gap-4">

        <div
          className="
          min-w-[45px] h-[45px]
          rounded-2xl
          bg-gradient-to-r
          from-blue-600 to-indigo-600
          text-white font-bold
          flex items-center justify-center
        "
        >
          {index + 1}
        </div>

        <div className="flex-1">

          <h3
            className="
            text-gray-800 font-semibold
            group-hover:text-blue-600
            transition
          "
          >
            {title}
          </h3>

          <div
            className="
            flex items-center gap-2
            text-sm text-gray-500
            mt-3
          "
          >
            <span>Read article</span>

            <FaExternalLinkAlt
              className="text-xs"
            />
          </div>
        </div>

      </div>
    </a>
  )
}

export default NewsCard