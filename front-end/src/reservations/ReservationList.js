import React from "react";
import ReservationView from "./ReservationView";

function ReservationList({ reservations, cancelReservation }) {
  if (reservations.length > 0) {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Cancel</th>
              <th>Edit</th>
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
                key={reservation.reservation_id}
                reservation={reservation}
                cancelReservation={() =>
                  cancelReservation(reservation.reservation_id)
                }
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return "No reservations found";
}

export default ReservationList;
