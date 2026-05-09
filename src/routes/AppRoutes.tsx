import { Routes, Route, Navigate } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
