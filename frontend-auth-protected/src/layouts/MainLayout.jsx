import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  return (
    <div className="App">
      <Navbar />
      <main className="content">
        <Outlet />
      </main>
      <ToastContainer />
    </div>
  );
};

export default MainLayout;
