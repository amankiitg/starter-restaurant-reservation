import React from "react";

function TableView({ table, finishTable }) {

  let status;
  if (!table.reservation_id) {
    status = 'Free';
  } else {
    status = 'Occupied'
  }

    return (
      <tr>
        <td>          {table.table_name}      </td>
        <td>          {table.capacity}        </td>
        <td>          {status}                </td>
        <td>
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