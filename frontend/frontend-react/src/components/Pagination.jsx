export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const range = [];
  const maxVisible = 5;
  let start = Math.max(0, page - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible);
  if (end - start < maxVisible) start = Math.max(0, end - maxVisible);

  for (let i = start; i < end; i++) range.push(i);

  return (
    <nav>
      <ul className="pagination justify-content-center mb-0">
        <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(0)}>&laquo;</button>
        </li>
        <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(page - 1)}>&lsaquo;</button>
        </li>
        {range.map((p) => (
          <li key={p} className={`page-item ${p === page ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(p)}>{p + 1}</button>
          </li>
        ))}
        <li className={`page-item ${page === totalPages - 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(page + 1)}>&rsaquo;</button>
        </li>
        <li className={`page-item ${page === totalPages - 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(totalPages - 1)}>&raquo;</button>
        </li>
      </ul>
    </nav>
  );
}
