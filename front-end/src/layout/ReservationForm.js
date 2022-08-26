import React, { useState  }  from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function ReservationForm({initialFormState, deckFunction}) {

    const [formData, setFormData] = useState({ ...initialFormState });

    const history = useHistory();
    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        setFormData({ ...initialFormState });
        console.log("Submitting..", formData);

        // const abortController = new AbortController();

        const response = deckFunction(formData);
        const savedData = await response;
        console.log("Saved user!", savedData);
        history.push("/");
      };

    return (
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <label htmlFor="first_name" className="form-label">First Name</label>
                <input
                    className="form-control"
                    id="first_name"
                    type="text"
                    name="first_name"
                    placeholder = "First Name"
                    onChange={handleChange}
                    value={formData.first_name}
                    />
            </div>
            <div className="form-group">
                <label htmlFor="last_name" className="form-label">Last Name</label>
                <input
                    className="form-control"
                    id="last_name"
                    type="text"
                    name="last_name"
                    placeholder = "Last Name"
                    onChange={handleChange}
                    value={formData.last_name}
                    />
            </div>
            <div className="form-group">
                <label htmlFor="mobile_number" className="form-label">Mobile Number</label>
                <input
                    className="form-control"
                    id="mobile_number"
                    type="text"
                    name="mobile_number"
                    placeholder = "Mobile Number"
                    onChange={handleChange}
                    value={formData.mobile_number}
                    />
            </div>
            <div className="form-group">
                <label htmlFor="reservation_date" className="form-label">Reservation Date</label>
                <input
                    className="form-control"
                    id="reservation_date"
                    type="text"
                    name="reservation_date"
                    placeholder = "Reservation Date"
                    onChange={handleChange}
                    value={formData.reservation_date}
                    />
            </div>
            <div className="form-group">
                <label htmlFor="reservation_time" className="form-label">Reservation Time</label>
                <input
                    className="form-control"
                    id="reservation_time"
                    type="text"
                    name="reservation_time"
                    placeholder = "Reservation Time"
                    onChange={handleChange}
                    value={formData.reservation_time}
                    />
            </div>
            <div className="form-group">
                <label htmlFor="people" className="form-label">People</label>
                <input
                    className="form-control"
                    id="people"
                    type="text"
                    name="people"
                    placeholder = "People"
                    onChange={handleChange}
                    value={formData.people}
                    />
            </div>
            
            <Link to={"/"}><button className="btn btn-secondary">Cancel</button></Link>
            <button type="submit" className="btn btn-primary mx-3">Submit</button>
        </form>        
    );
  }
  
  export default ReservationForm;