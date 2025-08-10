import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import UploadPrompt from "../pages/UploadPrompt";
import PromptJson from "../pages/PromptJson";
import ColorGenerator from "../pages/ColorGenerator";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ColorGenerator />} />
      <Route path="/home" element={<Home />} />
      <Route path="/color-generator" element={<ColorGenerator />} />
      <Route path="/UploadPrompt" element={<UploadPrompt />} />
      <Route path="/PromptJson" element={<PromptJson />} />
    </Routes>
  );
}

export default AllRoutes;
