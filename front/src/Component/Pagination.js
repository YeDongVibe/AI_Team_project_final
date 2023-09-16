import {useEffect, useState} from 'react'

export const Pagination = ({total, limit, page, setPage, className}) => {
  const numPages = Math.ceil(total / limit)
  const btnClassName = ['btn', 'btn-success', 'text-white', 'text-xl', 'mr-4', className].join(' ')

  const currClassName = [btnClassName + 'bg-gray-400'].join(' ')
  const [minPage, setMinPage] = useState(1)
  const [maxPage, setMaxPage] = useState(Math.min(numPages, 10))

  useEffect(() => {
    if (numPages <= 10) {
      setMinPage(1)
      setMaxPage(numPages)
    } else {
      const halfMax = Math.floor(10 / 2)

      if (page <= halfMax) {
        setMinPage(1)
        setMaxPage(10)
      } else if (page > halfMax && page + halfMax <= numPages) {
        setMinPage(page - halfMax)
        setMaxPage(page + halfMax)
      } else {
        setMinPage(numPages - 9)
        setMaxPage(numPages)
      }
    }
  }, [page, numPages])

  const pageNumbersToShow =
    numPages !== 0 ? Array.from({length: maxPage - minPage + 1}, (_, i) => i + minPage) : Array(10).map((_, i) => i)

  return (
    <nav className="flex justify-center my-8 ">
      <button className={btnClassName} onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt;
      </button>

      {pageNumbersToShow.map(pageNumber => (
        <button
          className={page === pageNumber ? currClassName : btnClassName}
          key={pageNumber}
          onClick={() => {
            setPage(pageNumber)
          }}
          aria-current={page === pageNumber ? 'page' : undefined}>
          {pageNumber}
        </button>
      ))}

      <button className={btnClassName} onClick={() => setPage(page + 1)} disabled={page === numPages}>
        &gt;
      </button>
    </nav>
  )
}

export default Pagination
