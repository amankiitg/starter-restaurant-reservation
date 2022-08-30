import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listTables } from "../utils/api";

function TableAssign() {

    const [tables, setTables] = useState(null);
    const [tableId, setTableId] = useState(null);
    const { reservationsId } = useParams();
    
    useEffect(() => {
        async function loadTables() {
            const abortController = new AbortController();
            
            listTables({}, abortController.signal)
                .then(setTables)  
            return () => abortController.abort();
        }
    loadTables();
    }, []);

    const submitHandler = async (event) => {
        let abortController = new AbortController();
        
        event.preventDefault();
        // setFormData({ ...formData});
        console.log("Submitting..", tableId);

        
        // deckFunction(formData, abortController.signal)
        // .then((response) => {
        //     console.log("Saved table!", response);
        //     history.push("/");
        // })
        // .catch((error) => {
        //     setTablesError(error);
        //     setFormData(formData)
        // });
    

        return () => {  
            abortController.abort();  
        }  
    };

    if(tables){
        return(
            <main>
            <h1>Seat Assignment</h1>
            <div className="d-md-flex mb-3">
                <h4 className="mb-0">Reservations for {reservationsId}</h4>
            </div>
            <form onSubmit={submitHandler}>
                <label htmlFor="table_id">
                    Assign seat
                    <select
                        id="table_id"
                        name="table_id"
                        onChange={(event) => setTableId(event.target.value)}
                        value={tableId}
                    >
                    {tables.map(table =>
                        <option key={table.table_id} value={table.table_id}>{table.table_name} - {table.capacity}</option>
                    )};
                    </select>
                </label>
                <button type="submit" className="btn btn-primary mx-3">Assign</button>
            </form>
                
            </main>
        )
    }
    return "Loding.."
    
}

export default TableAssign;