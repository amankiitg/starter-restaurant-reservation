import React, { useState  }  from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function TableForm({initialFormState, deckFunction, setTablesError}) {

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
        deckFunction(formData)
        .then((response) => {
            console.log("Saved table!", response);
            history.push("/");
        })
        .catch((error) => {
            setTablesError(error);
            setFormData(formData)
        });
    };

    return (
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <label htmlFor="table_name" className="form-label">Table Name</label>
                <input
                    className="form-control"
                    id="table_name"
                    type="text"
                    name="table_name"
                    placeholder = "Table Name"
                    onChange={handleChange}
                    value={formData.table_name}
                    />
            </div>
            <div className="form-group">
                <label htmlFor="capacity" className="form-label">Capacity</label>
                <input
                    className="form-control"
                    id="capacity"
                    type="number"
                    name="capacity"
                    min="1"
                    placeholder = "Capacity"
                    onChange={handleChange}
                    value={formData.capacity}
                    />
            </div>
            
            <Link to={"/"}><button className="btn btn-secondary">Cancel</button></Link>
            <button type="submit" className="btn btn-primary mx-3">Submit</button>
        </form>        
    );
  }
  
  export default TableForm;