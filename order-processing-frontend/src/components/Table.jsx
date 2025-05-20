const Table = ({ columns, data, actions, className = '', emptyMessage = 'No records found.' }) => {
  return (
    <div className={`overflow-hidden bg-white rounded-xl shadow-md border border-gray-200 ${className}`}>
      <div className="overflow-x-auto w-full">
        <table className="w-full table-auto text-sm text-gray-700">
          <colgroup>
            {columns.map((col) => (
              <col key={col.accessor} style={{ width: `${100 / (columns.length + (actions ? 1 : 0))}%` }} />
            ))}
            {actions && <col style={{ width: `${100 / (columns.length + 1)}%` }} />}
          </colgroup>
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.accessor}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-300"
                >
                  {col.header}
                </th>
              ))}
              {actions && (
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="text-center py-8 text-gray-500 bg-white"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-gray-200 ${idx % 2 === 1 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.accessor}
                      className="px-4 py-3"
                    >
                      <div className="truncate">
                        {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                      </div>
                    </td>
                  ))}
                  {actions && (
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        {actions.map((action, i) => (
                          <button
                            key={i}
                            className={
                              action.className ||
                              "text-sm font-medium px-3 py-1.5 rounded-mdbg-[#2f27ce] text-white rounded hover:bg-[#433bff] transition-colors"
                            }
                            onClick={() => action.onClick(row)}
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
