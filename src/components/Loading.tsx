import React, { useContext } from "react";
import ReactLoading from "react-loading";
import { LoadingContext } from "../contexts/LoadingContext";

export default function Loading() {
  const loadingContextValue = useContext(LoadingContext);

  const loadingContainerStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.3,
    backgroundColor: "black",
    zIndex: 99,
  };

  return loadingContextValue ? (
    <div style={loadingContainerStyle}>
      <ReactLoading type="spin" color="black" />
    </div>
  ) : null;
}
