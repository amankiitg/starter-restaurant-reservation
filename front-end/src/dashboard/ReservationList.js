import React from "react";
import ReservationView from "./ReservationView";

function ReservationList({ reservations, deleteRecipe }) {
  
  // reservations = reservations.filter((reservation) => reservation.status !== 'finished');

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
        {reservations.map((reservation, index) => (
          <ReservationView
            deleteRecipe={() => deleteRecipe(index)}
            key={index}
            reservation={reservation}
          />
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReservationList;