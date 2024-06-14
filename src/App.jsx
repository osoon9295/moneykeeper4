import React from "react";
import Router from "./component/shared/Router";
import { TotalProvider } from "./component/context/Context";

const App = () => {
  return (
    <div>
      {/* <TotalProvider> */}
      <Router />
      {/* </TotalProvider> */}
    </div>
  );
};

export default App;
