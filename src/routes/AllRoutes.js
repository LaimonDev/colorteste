import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import UploadPrompt from "../pages/UploadPrompt";
import PromptJson from "../pages/PromptJson";
import ColorPicker from "../pages/ColorPicker";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/UploadPrompt" element={<UploadPrompt />} />
      <Route path="/PromptJson" element={<PromptJson />} />
      <Route path="/color-picker" element={<ColorPicker />} />
    </Routes>
  );
}

export default AllRoutes;