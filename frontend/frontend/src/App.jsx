import { Routes, Route, Navigate } from "react-router-dom";
import UserLayout from "./components/UserLayout";
import AdminLayout from "./components/AdminLayout";
import UserHome from "./pages/UserHome";
import QueueDetails from "./pages/QueueDetails";
import TokenStatus from "./pages/TokenStatus";
import AdminDashboard from "./pages/AdminDashboard";
import AdminQueue from "./pages/AdminQueue";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/user" replace />} />

      <Route element={<UserLayout />}>
        <Route path="/user" element={<UserHome />} />
        <Route path="/user/queue/:queueId" element={<QueueDetails />} />
        <Route path="/user/status/:queueId/:token" element={<TokenStatus />} />
      </Route>

      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/queue/:queueId" element={<AdminQueue />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
