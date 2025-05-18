const Table = ({ columns, data, actions, className = '', emptyMessage = 'No records found.' }) => {
  return (
    <div className={`overflow-hidden bg-[#fbfbfe] rounded-lg shadow border border-[#dedcff] ${className}`}>
      <div className="overflow-x-auto w-full">
        <table className="w-full table-fixed">
          <colgroup>
            {columns.map((col) => (
              <col key={col.accessor} style={{ width: `${100 / (columns.length + (actions ? 1 : 0))}%` }} />
            ))}
            {actions && <col style={{ width: `${100 / (columns.length + 1)}%` }} />}
          </colgroup>
          <thead className="bg-[#dedcff]">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.accessor}
                  className="px-6 py-3 text-left text-sm font-semibold text-[#2f27ce] border-b border-[#dedcff]"
                >
                  {col.header}
                </th>
              ))}
              {actions && (
                <th className="px-6 py-3 text-[#2f27ce] border-b border-[#dedcff] text-left">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="text-center py-8 text-[#433bff] bg-[#fbfbfe]"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr
                  key={idx}
                  className={
                    `border-b border-[#dedcff] hover:bg-[#dedcff] transition-colors` +
                    (idx % 2 === 1 ? ' bg-[#f4f4fd]' : ' bg-[#fbfbfe]')
                  }
                >
                  {columns.map((col) => (
                    <td
                      key={col.accessor}
                      className="px-6 py-3 text-sm text-[#050315]"
                    >
                      <div className="truncate">
                        {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                      </div>
                    </td>
                  ))}
                  {actions && (
                    <td className="px-6 py-3">
                      <div className="flex gap-2">
                        {actions.map((action, i) => (
                          <button
                            key={i}
                            className={action.className || 
                              "text-sm font-medium px-3 py-1 rounded bg-[#2f27ce] text-[#fbfbfe] hover:bg-[#433bff] transition-colors"}
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
