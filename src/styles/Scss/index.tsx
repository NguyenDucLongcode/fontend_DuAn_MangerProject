"use client";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Bounce } from "react-toastify";
import "./Tool.scss"; // tool reset css
import "./reactTable.scss"; // global react table
import "./LayoutMain.scss";

import "bootstrap/dist/css/bootstrap.min.css"; // bootstrap

export default function GlobalStyles() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}
