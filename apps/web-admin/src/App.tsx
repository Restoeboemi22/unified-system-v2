import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CapabilitiesPage from "@/pages/CapabilitiesPage";
import DashboardPage from "@/pages/DashboardPage";
import LoginPage from "@/pages/LoginPage";
import ServiceStatusPage from "@/pages/ServiceStatusPage";
import StudentsPage from "@/pages/StudentsPage";
import TeachersPage from "@/pages/TeachersPage";
import StaffsPage from "@/pages/StaffsPage";
import ClassroomsPage from "@/pages/ClassroomsPage";
import AcademicPeriodsPage from "@/pages/AcademicPeriodsPage";
import AttendanceReportPage from "@/pages/AttendanceReportPage";
import SchoolsManagementPage from "@/pages/SchoolsManagementPage";
import GasDashboardPage from "@/pages/GasDashboardPage";
import EdulockSuperAdminPage from "@/pages/EdulockSuperAdminPage";
import EdulockAdminPage from "@/pages/EdulockAdminPage";
import AdminSekolahPage from "@/pages/AdminSekolahPage";
import GasStudentsDashboardPage from "@/pages/GasStudentsDashboardPage";

import LenteraPage from "@/pages/LenteraPage";
import LenteraMembersPage from "@/pages/LenteraMembersPage";
import LenteraLayout from "@/components/layout/LenteraLayout";
import GasTenantsPage from "@/pages/GasTenantsPage";
import GasGlobalConfigPage from "@/pages/GasGlobalConfigPage";
import GasSyncJobsPage from "@/pages/GasSyncJobsPage";
import GasBroadcastPage from "@/pages/GasBroadcastPage";
import GasSupportPage from "@/pages/GasSupportPage";
import GasAuditPage from "@/pages/GasAuditPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/edulock/login" element={<Navigate to="/login" replace />} />
        <Route path="/admin" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        
        {/* Legacy Routes Mapping */}
        <Route path="/super-admin/database" element={<SchoolsManagementPage />} />
        <Route path="/dashboard/super" element={<GasDashboardPage />} />
        <Route path="/dashboard/students" element={<GasStudentsDashboardPage />} />
        <Route path="/dashboard/super/service-status" element={<ServiceStatusPage />} />
        <Route path="/edulock/super" element={<EdulockSuperAdminPage />} />
        <Route path="/dashboard/super/tenants" element={<GasTenantsPage />} />
        <Route path="/dashboard/super/global-config" element={<GasGlobalConfigPage />} />
        <Route path="/dashboard/super/sync-jobs" element={<GasSyncJobsPage />} />
        <Route path="/dashboard/super/broadcast" element={<GasBroadcastPage />} />
        <Route path="/dashboard/super/support" element={<GasSupportPage />} />
        <Route path="/dashboard/super/audit" element={<GasAuditPage />} />
        <Route path="/admin/students" element={<AdminSekolahPage />} />
        <Route path="/edulock/admin" element={<EdulockAdminPage />} />
        
        <Route element={<LenteraLayout />}>
          <Route path="/admin/lentera" element={<LenteraPage />} />
          <Route path="/admin/lentera/anggota" element={<LenteraMembersPage />} />
        </Route>

        {/* Standard V2 routes */}
        <Route path="/capabilities" element={<CapabilitiesPage />} />
        <Route path="/service-status" element={<ServiceStatusPage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/staffs" element={<StaffsPage />} />
        <Route path="/classrooms" element={<ClassroomsPage />} />
        <Route path="/academic-periods" element={<AcademicPeriodsPage />} />
        <Route path="/attendance-report" element={<AttendanceReportPage />} />
        <Route path="/schools" element={<SchoolsManagementPage />} />
      </Routes>
    </BrowserRouter>
  );
}
