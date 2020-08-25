import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";
import { Provider } from "react-redux";
import { store } from "./store";

import "bootstrap/dist/css/bootstrap-reboot.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const routes = useRoutes();

  return (
    <Provider store={store}>
      <Router>
        {routes}
      </Router>
    </Provider>
  );
}

export default App;
