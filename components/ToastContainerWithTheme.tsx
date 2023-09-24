"use client";

import { useTheme } from "next-themes";

import { ToastContainer } from "react-toastify";

const ToastContainerWithTheme = () => {
  const { resolvedTheme } = useTheme();

  return (
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
};

export default ToastContainerWithTheme;
