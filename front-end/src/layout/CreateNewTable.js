import React, { useState  }  from "react";
import TableForm from "./TableForm";
import { createTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function CreateNewTable() {

    const [tablesError, setTablesError] = useState(null);

    const initialFormState = {
        table_name: "",
        capacity: 1
      };

    return (
        <section>
        <h2>New Table</h2>
        <ErrorAlert error={tablesError} />
        <TableForm initialFormState={initialFormState} deckFunction={createTables} setTablesError={setTablesError}/>
        </section>
    )
  }
  
  export default CreateNewTable;