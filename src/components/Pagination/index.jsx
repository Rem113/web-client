import React from "react"

const Pagination = ({ page, maxPage, onChangePage }) => {
  return (
    <div>
      {[...Array(maxPage).keys()]
        .map((i) => i + 1)
        .map((i) => (
          <button key={i} onClick={() => onChangePage(i)} disabled={page === i}>
            {i}
          </button>
        ))}
    </div>
  )
}

export default Pagination
