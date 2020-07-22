import React, { useContext, useState, useEffect } from "react";

import { LoadingContext } from "./contexts/LoadingContext";
import Loading from "./components/Loading";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { setApiInterceptors } from "./services/Api";

import Router from "./services/Router";

function App() {
  const [loadingContextValue, setLoadingContextValue] = useState(
    useContext(LoadingContext)
  );

  useEffect(() => {
    setApiInterceptors(setLoadingContextValue);
  }, []);

  return (
    <LoadingContext.Provider value={loadingContextValue}>
      <ToastContainer />
      <Loading />
      <Router />
    </LoadingContext.Provider>
  );
}

export default App;
