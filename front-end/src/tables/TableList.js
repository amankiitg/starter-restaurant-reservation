import React from "react";
import TableView from "./TableView";

function TableList({ tables, finishTable }) {
  return (
    <div>
      <table class="table">
        <thead>
          <tr>
            <th>Table Name</th>
            <th>Capacity</th>
            <th>Status</th>
            <th>Finish</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((table) => (
            <TableView
              key={table.table_id}
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
