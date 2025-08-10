import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import UploadPrompt from "../pages/UploadPrompt";
import PromptJson from "../pages/PromptJson";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/UploadPrompt" element={<UploadPrompt />} />
      <Route path="/PromptJson" element={<PromptJson />} />
    </Routes>
  );
}

export default AllRoutes;
