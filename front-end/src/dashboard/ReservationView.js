import React from "react";
import { Link } from "react-router-dom";

function ReservationView({ reservation, deleteRecipe }) {
    return (
      <tr>
        <td>          {reservation.first_name}         </td>
        <td>          {reservation.last_name}        </td>
        <td>          {reservation.mobile_number}        </td>
        <td>          {reservation.reservation_date}        </td>
        <td>          {reservation.reservation_time}        </td>
        <td>          {reservation.people}        </td>
        <td data-reservation-id-status={reservation.reservation_id}>
                    {reservation.status}        
        </td>
        <td>
          <Link to={`/reservations/${reservation.reservation_id}/seat`}>
            <button className="btn btn-secondary">
              Seat
            </button>
          </Link>
        </td>
      </tr>
    );
 }

 export default ReservationView;