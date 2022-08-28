// import React, { useState } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
// import { useLocation, useHistory } from "react-router-dom";
import React, {useEffect, useState } from "react";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import CreateNewReservation from "./CreateNewReservation";
import { today } from "../utils/date-time";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {

  const [date, setDate] = useState(today());

  const url = useLocation();
  //const history = useHistory();
  //console.log('URL',url,'History',history);

  useEffect(() => {
       
        const queryParams = new URLSearchParams(url.search);
        console.log('Url in Routes', url, queryParams.get("date"));
        if(queryParams.get("date")){
          setDate(queryParams.get("date"));
        } else{
          setDate(today());
          // history.push("/");
        }
  }, [url]);

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations/new">
        <CreateNewReservation date={date} setDate={setDate}/>
      </Route>
      <Route path="/dashboard">
        <Dashboard date={date} setDate={setDate}/>
      </Route>
      <Route path="/reservations">
        <Dashboard date={date} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
