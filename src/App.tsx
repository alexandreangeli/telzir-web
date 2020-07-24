import React, { useContext, useState, useEffect } from "react";

import { LoadingContext } from "./contexts/LoadingContext";
import Loading from "./components/Loading";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { setApiInterceptors } from "./services/Api";

import Router from "./services/Router";

import "./global.css";
import { WindowSizeContext } from "./contexts/WindowSizeContext";

function App() {
  const [windowSizeContextValue, setWindowSizeContextValue] = useState(
    useContext(WindowSizeContext)
  );
  const [loadingContextValue, setLoadingContextValue] = useState(
    useContext(LoadingContext)
  );

  function updateWindowDimensions() {
    setWindowSizeContextValue({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  useEffect(() => {
    setApiInterceptors(setLoadingContextValue);
    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);
    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []);

  return (
    <WindowSizeContext.Provider value={windowSizeContextValue}>
      <LoadingContext.Provider value={loadingContextValue}>
        <ToastContainer />
        <Loading />
        <Router />
      </LoadingContext.Provider>
    </WindowSizeContext.Provider>
  );
}

export default App;
