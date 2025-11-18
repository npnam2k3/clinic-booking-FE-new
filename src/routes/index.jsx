import { ROUTE } from "@/constants/route-constant";
import ClientLayout from "@/layouts/ClientLayout";
import AdminLayout from "@/layouts/AdminLayout";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import LoginPage from "@/pages/auth/LoginPage";
import NotFoundPage from "@/pages/auth/NotFoundPage";
import ProfilePage from "@/pages/auth/ProfilePage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";
import BookingPage from "@/pages/client/Booking/BookingPage";
import HistoryBookingPage from "@/pages/client/Booking/HistoryBookingPage";
import DoctorDetail from "@/pages/client/Doctors/DoctorDetail";
import DoctorPage from "@/pages/client/Doctors/DoctorPage";
import HomePage from "@/pages/client/Home/HomePage";
import SpecialtyDetailPage from "@/pages/client/Specialties/SpecialtyDetailPage";
import SpecialtyPage from "@/pages/client/Specialties/SpecialtyPage";
// Admin Pages
import DashboardPage from "@/pages/admin/Dashboard/DashboardPage";
import DoctorsPage from "@/pages/admin/Doctors/DoctorsPage";
import SpecialtiesPage from "@/pages/admin/Specialties/SpecialtiesPage";
import PatientsPage from "@/pages/admin/Patients/PatientsPage";
import AppointmentsPage from "@/pages/admin/Appointments/AppointmentsPage";
import WorkSchedulesPage from "@/pages/admin/WorkSchedules/WorkSchedulesPage";
import SpecialSchedulesPage from "@/pages/admin/SpecialSchedules/SpecialSchedulesPage";
import UsersPage from "@/pages/admin/Users/UsersPage";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AdminProtectedRoute from "@/components/auth/AdminProtectedRoute";

export const router = createBrowserRouter([
  // Client routes
  {
    path: ROUTE.HOME,
    element: (
      <ProtectedRoute>
        <ClientLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <LoginPage /> },
      {
        path: ROUTE.SPECIALTY,
        element: <SpecialtyPage />,
      },
      {
        path: `${ROUTE.SPECIALTY_DETAIL}/:id`,
        element: <SpecialtyDetailPage />,
      },
      {
        path: ROUTE.DOCTOR,
        element: <DoctorPage />,
      },
      {
        path: `${ROUTE.DOCTOR_DETAIL}/:id`,
        element: <DoctorDetail />,
      },
      {
        path: `${ROUTE.BOOKING}`,
        element: <BookingPage />,
      },
      {
        path: `${ROUTE.PROFILE}`,
        element: <ProfilePage />,
      },
      {
        path: `${ROUTE.HISTORY_BOOKING}`,
        element: <HistoryBookingPage />,
      },
    ],
  },
  // Admin routes
  {
    path: "/admin",
    element: (
      <AdminProtectedRoute>
        <AdminLayout />
      </AdminProtectedRoute>
    ),
    children: [
      { path: "", element: <DashboardPage /> },
      { path: "doctors", element: <DoctorsPage /> },
      { path: "specialties", element: <SpecialtiesPage /> },
      { path: "patients", element: <PatientsPage /> },
      { path: "appointments", element: <AppointmentsPage /> },
      { path: "work-schedules", element: <WorkSchedulesPage /> },
      // { path: "special-schedules", element: <SpecialSchedulesPage /> },
      { path: "users", element: <UsersPage /> },
    ],
  },
  // Auth routes
  {
    path: ROUTE.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTE.REGISTER,
    element: <RegisterPage />,
  },
  {
    path: ROUTE.FORGOT_PASSWORD,
    element: <ForgotPasswordPage />,
  },
  {
    path: ROUTE.RESET_PASSWORD,
    element: <ResetPasswordPage />,
  },
  {
    path: ROUTE.NOT_FOUND,
    element: <NotFoundPage />,
  },
]);
