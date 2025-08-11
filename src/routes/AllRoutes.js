import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import UploadPrompt from "../pages/UploadPrompt";
import PromptJsonEnhanced from "../pages/PromptJsonEnhanced";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/UploadPrompt" element={<UploadPrompt />} />
      <Route path="/PromptJson" element={<PromptJsonEnhanced />} />
    </Routes>
  );
}

export default AllRoutes;
