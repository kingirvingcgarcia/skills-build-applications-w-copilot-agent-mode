function readField(item, field) {
  return field.split('.').reduce((value, key) => value?.[key], item)
}

function formatDate(value) {
  if (!value) return '—'
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? '—'
    : new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(date)
}

export default function ResourcePage({ title, category, description, columns, emptyMessage, resource }) {
  const { items, count, next, previous, loading, error, refresh, goToNextPage, goToPreviousPage } = resource

  return (
    <section className="resource-page" aria-labelledby="page-title">
      <div className="page-heading">
        <div>
          <p className="eyebrow">{category}<span aria-hidden="true"> · </span> OCTOFIT TRACKER</p>
          <h1 id="page-title">{title}</h1>
          <p className="page-description">{description}</p>
        </div>
        <button className="refresh-button" type="button" onClick={refresh} disabled={loading}>
          <span className="refresh-icon" aria-hidden="true">↻</span>
          Refresh
        </button>
      </div>

      <div className="resource-toolbar">
        <div className="record-count">
          <strong>{loading && items.length === 0 ? '—' : count.toLocaleString()}</strong>
          <span>{count === 1 ? 'record' : 'records'}</span>
        </div>
        <div className="data-status">
          <span className={`status-indicator${error ? ' status-indicator-error' : ''}`} />
          {error ? 'Connection issue' : loading ? 'Syncing' : 'Live data'}
        </div>
      </div>

      {error ? (
        <div className="request-error" role="alert">
          <div><strong>We couldn’t load this view.</strong><span>{error}</span></div>
          <button type="button" onClick={refresh}>Try again</button>
        </div>
      ) : (
        <div className="table-frame">
          <div className="table-responsive">
            <table className="table resource-table mb-0">
              <thead>
                <tr>{columns.map((column) => <th key={column.label} scope="col">{column.label}</th>)}</tr>
              </thead>
              <tbody>
                {loading && items.length === 0 ? (
                  <tr><td className="table-message" colSpan={columns.length}><span className="loading-mark" /> Loading {title.toLowerCase()}...</td></tr>
                ) : items.length === 0 ? (
                  <tr><td className="table-message empty-message" colSpan={columns.length}>{emptyMessage}</td></tr>
                ) : items.map((item, index) => (
                  <tr key={item._id ?? item.id ?? `${title}-${index}`}>
                    {columns.map((column) => {
                      const value = column.render ? column.render(item) : readField(item, column.field)
                      return <td key={column.label}>{column.date ? formatDate(value) : value ?? '—'}</td>
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {(next || previous) && (
            <div className="pagination-bar">
              <span>{items.length} shown{count > items.length ? ` of ${count.toLocaleString()}` : ''}</span>
              <div className="pagination-actions">
                <button type="button" onClick={goToPreviousPage} disabled={!previous || loading}>Previous</button>
                <button type="button" onClick={goToNextPage} disabled={!next || loading}>Next</button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  )
}