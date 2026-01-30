export default function Table({
    columns,
    data = [],
    onRowClick,
    className = ''
}) {
    return (
        <div className={`overflow-hidden rounded-2xl border border-gray-100 ${className}`}>
            <table className="w-full">
                <thead className="table-header">
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key} className="px-6 py-4 text-left">
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                    {data.map((row, idx) => (
                        <tr
                            key={row.id || idx}
                            className="table-row cursor-pointer"
                            onClick={() => onRowClick?.(row)}
                        >
                            {columns.map((col) => (
                                <td key={col.key} className="px-6 py-4">
                                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {data.length === 0 && (
                <div className="bg-white px-6 py-12 text-center text-gray-500">
                    ไม่พบข้อมูล
                </div>
            )}
        </div>
    );
}
