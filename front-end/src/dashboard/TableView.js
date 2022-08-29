import React from "react";

function TableView({ table, deleteRecipe }) {

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
          <button name="delete" onClick={deleteRecipe}>
            Finish
          </button>
        </td>
      </tr>
    );
 }

 export default TableView;