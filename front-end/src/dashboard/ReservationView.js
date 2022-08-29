import React from "react";

function ReservationView({ reservation, deleteRecipe }) {
    return (
      <tr>
        <td>          {reservation.first_name}         </td>
        <td>          {reservation.last_name}        </td>
        <td>          {reservation.mobile_number}        </td>
        <td>          {reservation.reservation_date}        </td>
        <td>          {reservation.reservation_time}        </td>
        <td>          {reservation.people}        </td>
        <td>
          <button name="delete" onClick={deleteRecipe}>
            Delete
          </button>
        </td>
      </tr>
    );
 }

 export default ReservationView;