// import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useLocation } from "react-router-dom";
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

  useEffect(() => {
        const queryParams = new URLSearchParams(url.search);
        console.log('Url in Routes', url.search, queryParams.get("date"));
        if(queryParams.get("date")){
          setDate(queryParams.get("date"));
        } else{
          setDate(today());
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
