import React from "react";
import { useHistory } from "react-router-dom";

import { Legs } from "../Legs";

import { scrollToTop } from "../../utils/scrollToTop";
import { ROUTES } from "../../routes";
import { Header } from "../Header";

export const ResultsPage = () => {
  const history = useHistory();

  const backToHomePage = () => {
    history.push(ROUTES.HOME_PAGE);
    scrollToTop();
  };

  return (
    <div>
      <Header title="Flight results" handleBackBtn={backToHomePage}/>
      <Legs/>
    </div>
  );
};
