import React from "react";
import { Link } from "react-router-dom";

function ReservationView({ reservation, cancelReservation }) {
  let seatButton;
  let editButton;
  let cancelButton;
  if (reservation.status === "booked") {
    seatButton = (
      <Link to={`/reservations/${reservation.reservation_id}/seat`}>
        <button className="btn btn-secondary">Seat</button>
      </Link>
    );
    editButton = (
      <Link to={`/reservations/${reservation.reservation_id}/edit`}>
        <button className="btn btn-warning">Edit</button>
      </Link>
    );
  }

  if (reservation.status !== "cancelled") {
    cancelButton = (
      <button className="btn btn-danger" name="put" onClick={cancelReservation}>
        Cancel
      </button>
    );
  }

  return (
    <tr>
      <td data-reservation-id-cancel={reservation.reservation_id}>
        {cancelButton}
      </td>
      <td>{editButton}</td>
      <td> {reservation.first_name} </td>
      <td> {reservation.last_name} </td>
      <td> {reservation.mobile_number} </td>
      <td> {reservation.reservation_date} </td>
      <td> {reservation.reservation_time} </td>
      <td> {reservation.people} </td>
      <td data-reservation-id-status={reservation.reservation_id}>
        {reservation.status}
      </td>
      <td>{seatButton}</td>
    </tr>
  );
}

export default ReservationView;
