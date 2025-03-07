import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AddJobPage from "./pages/AddJobPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import EditJobPage from "./pages/EditJobPage";
 


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-job" element={<AddJobPage />} />
          <Route path="/edit-job/:id" element={<EditJobPage />} />
 
          <Route path="/jobs/:id" element={<JobDetailsPage />} />
           <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
