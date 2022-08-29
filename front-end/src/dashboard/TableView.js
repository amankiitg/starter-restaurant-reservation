import React from "react";

function TableView({ table, deleteRecipe }) {
    return (
      <tr>
        <td>          {table.table_name}         </td>
        <td>          {table.capacity}        </td>
        <td>
          <button name="delete" onClick={deleteRecipe}>
            Delete
          </button>
        </td>
      </tr>
    );
 }

 export default TableView;