import React from "react";
import TableView from "./TableView";

function TableList({ tables, deleteRecipe }) {
  
  // TODO: Display the list of recipes using the structure of table that is provided.
  // TODO: Create at least one additional component that is used by this component.
  // TODO: Each recipe row must have a delete button - <button name="delete">Delete</button> - that deletes the post when clicked

  return (
    <div className="recipe-list">
      <table>
        <thead>
          <tr>
            <th>Table Name</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {tables.map((table, index) => (
          <TableView
            deleteRecipe={() => deleteRecipe(index)}
            key={index}
            table={table}
          />
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableList;