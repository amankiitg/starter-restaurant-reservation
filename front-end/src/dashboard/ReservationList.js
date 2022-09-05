import React from "react";
import ReservationView from "./ReservationView";

function ReservationList({ reservations, deleteRecipe }) {

  if(reservations.length>0){
    return (
      <div className="recipe-list">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Mobile Number</th>
              <th>Reservation Date</th>
              <th>Reservation Time</th>
              <th>People</th>
              <th>Status</th>
              <th>Seat</th>
            </tr>
          </thead>
          <tbody>
          {reservations.map((reservation) => (
            <ReservationView
              deleteRecipe={() => deleteRecipe(reservation.reservation_id)}
              key={reservation.reservation_id}
              reservation={reservation}
            />
          ))}
          </tbody>
        </table>
      </div>
    );
  }
  return null;
  
}

export default ReservationList;