import React from "react";
import { useAuth } from "./../util/auth.js";
import { useTable } from 'react-table'

export default function DashboardDeliveries(props) {
    const auth = useAuth();

    let data = [];
    let columns = [];
    let count = 0;
    auth.user.deliveries.forEach((d) => {
        data.push(d);
        if (count === 0) {
            Object.entries(d).map(([k, v]) => {
                columns.push({
                    Header: k,
                    accessor: k
                });
            });
        }
        count++;
    })

    data = React.useMemo(
        () => data,
        []
    );

    columns = React.useMemo(
        () => columns,
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    // let data = auth.user.deliveries;
    // let columns = data[0].keys();

    // const table

    // return(
    //     <div>
    //         {items && items.map(i => <p>{String(Object.entries(i))}</p>)}
    //     </div>
    // );

    return (
        <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      borderBottom: 'solid 3px red',
                      background: 'aliceblue',
                      color: 'black',
                      fontWeight: 'bold',
                    }}
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          padding: '10px',
                          border: 'solid 1px gray',
                          background: 'papayawhip',
                        }}
                      >
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      );
}