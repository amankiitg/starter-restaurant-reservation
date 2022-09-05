import React, { useState  }  from "react";
import { searchReservations } from "../utils/api";
import CancelButton from "./CancelButton";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from "../dashboard/ReservationList";

function Search() {

    let initialFormState = {mobile_number:""};

    const [formData, setFormData] = useState({ ...initialFormState });
    const [reservations, setReservations] = useState([]);
    const [reservationsError, setReservationsError] = useState(null);

    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };

    const submitHandler = async (event) => {

        let abortController = new AbortController();

        event.preventDefault();
        setFormData({ ...initialFormState });
        console.log("Submitting..", formData);

        searchReservations(formData, abortController.signal)
        .then((response) => {
            setReservations(response)
        })
        .catch((error) => {
            setReservationsError(error);
            setFormData(formData)
        });
        
        return () => {  
            abortController.abort();  
        }  

      };

      function deleteRecipe() {
        const abortController = new AbortController();
        setReservationsError(null);
        searchReservations({}, abortController.signal)
          .then(setReservations)
          .catch(setReservationsError);
        return () => abortController.abort();
      }

    return (
        <main>
        <h1>Search Reservation Using Mobile Number</h1>
        <div>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="mobile_number" className="form-label">Mobile Number</label>
                    <input
                        className="form-control"
                        id="mobile_number"
                        type="text"
                        name="mobile_number"
                        placeholder = "(___)-___-_____"
                        onChange={handleChange}
                        value={formData.mobile_number}
                        />
                </div>
                <CancelButton/>
                <button type="submit" className="btn btn-primary mx-3">Search</button>
            </form>
        </div>
            <div>
            <ErrorAlert error={reservationsError} />
            <div>
                <h4 className="mb-0">Search result</h4>
                <ReservationList reservations={reservations} deleteRecipe={deleteRecipe}/>
            </div>
        </div>
    </main>
    );
  }
  
  export default Search;