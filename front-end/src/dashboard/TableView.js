import React from "react";

function TableView({ table, finishTable }) {

  let status;
  if (!table.reservation_id) {
    status = 'free';
  } else {
    status = 'occupied'
  }

    return (
      <tr>
        <td>          {table.table_name}      </td>
        <td>          {table.capacity}        </td>
        <td data-table-id-status={table.table_id}>
                    {status}                
        </td>
        <td data-table-id-finish={table.table_id}>
          <button 
            className="btn btn-danger" 
            name="delete" 
            onClick={finishTable}>
            Finish
          </button>
        </td>
      </tr>
    );
 }

 export default TableView;