import React, { useState, useMemo } from "react"
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table'
const columnHelper = createColumnHelper()

export default function Table({ data = [], schema = {} }) {
  const [tableData, setTableData] = useState(data)

  const getFields = () => {
    if (schema && schema.fields) {
      return schema.fields
    }
    const fields = []
    if (tableData.length > 0) {
      for (let key in tableData[0]) {
        fields.push({
          name: key
        })
      }
    }
    return fields
  }

  const columns = useMemo(() => {
    return getFields().map(field => 
      columnHelper.accessor(field.name, {
        header: field.name,
        id: field.name,
        cell: info => (
          <div className={field.type || ''}>
            <span>{info.getValue()}</span>
          </div>
        )
      })
    )
  }, [tableData, schema, getFields])

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  style={{ wordWrap: "break-word", whiteSpace: "initial" }}
                  className="px-4 py-2 text-left"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-2 border-b">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
