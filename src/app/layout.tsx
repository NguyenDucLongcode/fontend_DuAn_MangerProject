import type { Metadata } from "next";
import { ReduxProvider } from "@/redux/provider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Bounce } from "react-toastify";
import "./(main)/scss/Tool.scss"; // tool reset css
import "@/styles/reactTable.scss"; //  global  react table
import "./layout.scss"; // scss layout
import "bootstrap/dist/css/bootstrap.min.css"; // bootstrap

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="app-container">
        <ReduxProvider>{children}</ReduxProvider>
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
      </body>
    </html>
  );
}
