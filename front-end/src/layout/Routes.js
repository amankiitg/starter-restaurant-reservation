import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { today } from "../utils/date-time";

import Dashboard from "../dashboard/Dashboard";
import CreateNewReservation from "../reservations/CreateNewReservation";
import EditReservation from "../reservations/EditReservation.js";
import CreateNewTable from "../tables/CreateNewTable";
import TableAssign from "../tables/TableAssign";
import NotFound from "./NotFound";
import Search from "../reservations/Search";

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
    let queryParams = new URLSearchParams(url.search);
    if (queryParams.get("date")) {
      setDate(queryParams.get("date"));
    } else {
      setDate(today());
    }

    return () => {
      queryParams = new URLSearchParams();
    };
  }, [url]);

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={date} setDate={setDate} />
      </Route>
      <Route path={"/reservations/:reservationsId/seat"}>
        <TableAssign />
      </Route>
      <Route path={"/reservations/:reservationsId/edit"}>
        <EditReservation />
      </Route>
      <Route exact={true} path="/reservations/new">
        <CreateNewReservation />
      </Route>
      <Route path="/reservations">
        <Dashboard date={date} setDate={setDate} />
      </Route>
      <Route exact={true} path="/tables/new">
        <CreateNewTable />
      </Route>
      <Route exact={true} path="/search">
        <Search />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
