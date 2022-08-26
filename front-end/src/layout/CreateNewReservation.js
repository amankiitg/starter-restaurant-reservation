import React from "react";
import ReservationForm from "./ReservationForm";
import { createReservations } from "../utils/api";
// import ErrorAlert from "../layout/ErrorAlert";

function CreateNewReservation({date}) {

    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: date,
        reservation_time: "",
        people:""
      };

    return (
        <section>
        <h2>New Reservation</h2>
        <ReservationForm initialFormState={initialFormState} deckFunction={createReservations}/>
        </section>
    )
  }
  
  export default CreateNewReservation;