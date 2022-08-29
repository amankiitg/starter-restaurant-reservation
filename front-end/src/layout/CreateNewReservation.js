import React, { useState  }  from "react";
import ReservationForm from "./ReservationForm";
import { createReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today } from "../utils/date-time";

function CreateNewReservation({date, setDate}) {

    const [reservationsError, setReservationsError] = useState(null);

    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: today(),
        reservation_time: "",
        people:""
      };

    return (
        <section>
        <h2>New Reservation</h2>
        <ErrorAlert error={reservationsError} />
        <ReservationForm initialFormState={initialFormState} deckFunction={createReservations} setReservationsError={setReservationsError}/>
        </section>
    )
  }
  
  export default CreateNewReservation;