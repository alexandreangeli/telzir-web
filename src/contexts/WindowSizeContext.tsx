import React from "react";

export const WindowSizeContext = React.createContext({
  width: window.innerWidth,
  height: window.innerHeight,
});
