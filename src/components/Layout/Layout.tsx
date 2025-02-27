import { Outlet } from "react-router-dom";
import "./Layout.scss";
import { Navbar } from "../Navbar/Navbar";

export const Layout = () => {
  return (
    <>
      <header>
        <div className="box-container">
          <Navbar />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
