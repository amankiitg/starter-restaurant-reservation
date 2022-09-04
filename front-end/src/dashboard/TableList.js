import React from "react";
import TableView from "./TableView";

function TableList({ tables, finishTable }) {
  
  return (
    <div className="recipe-list">
      <table>
        <thead>
          <tr>
            <th>Table Name</th>
            <th>Capacity</th>
            <th>Status</th>
            <th>Finsh</th>
          </tr>
        </thead>
        <tbody>
        {tables.map((table, index) => (
          <TableView
            key={index}
            table={table}
            finishTable={() => finishTable(table.table_id)}
          />
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableList;