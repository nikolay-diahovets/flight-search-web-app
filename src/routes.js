import React from "react";
import { Switch, Route } from "react-router-dom";
import { HomePage } from "./components/pages/HomePage";
import { ResultsPage } from "./components/pages/ResultsPage";
import { CheckoutPage } from "./components/pages/CheckoutPage";

export const ROUTES = {
  HOME_PAGE: "/",
  RESULTS_PAGE: "/results",
  CHECKOUT_PAGE: "/checkout",
}

export const useRoutes = () => {
  return (
    <Switch>
      <Route path={ROUTES.HOME_PAGE} exact>
        <HomePage/>
      </Route>
      <Route path={ROUTES.RESULTS_PAGE}>
        <ResultsPage/>
      </Route>
      <Route path={ROUTES.CHECKOUT_PAGE}>
        <CheckoutPage/>
      </Route>
    </Switch>
  );
};
