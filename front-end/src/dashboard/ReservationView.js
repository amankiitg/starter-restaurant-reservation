import React from "react";

function ReservationView({ recipe, deleteRecipe }) {
    return (
      <tr>
        <td>          {recipe.first_name}         </td>
        <td>          {recipe.last_name}        </td>
        <td>          {recipe.mobile_number}        </td>
        <td>          {recipe.reservation_date}        </td>
        <td>          {recipe.reservation_time}        </td>
        <td>          {recipe.people}        </td>
        <td>
          <button name="delete" onClick={deleteRecipe}>
            Delete
          </button>
        </td>
      </tr>
    );
 }

 export default ReservationView;