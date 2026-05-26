import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import AddBook from "../Pages/Dashboard/Librarian/AddBook";
import MyProfile from "../Pages/Dashboard/MyProfile";
import Invoice from "../Pages/Dashboard/User/Invoice";
import MyBook from "../Pages/Dashboard/Librarian/MyBook";
import Order from "../Pages/Dashboard/Librarian/Order";
import AllUser from "../Pages/Dashboard/Admin/AllUser";
import ManageBook from "../Pages/Dashboard/Admin/ManageBook";
import AllBook from "../Pages/AllBook";
import BookDetails from "../Pages/BookDetails";
import PaymentSuccess from "../Pages/Payment/PaymentSuccess";
import PaymentCancel from "../Pages/Payment/PaymentCancel";
import UserRoute from "./UserRoute";
import MyOrder from "../Pages/Dashboard/User/MyOrder";
import LibrarianRoute from "./LibrarianRoute";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "allBook",
        Component: AllBook,
      },
      {
        path: "boodDetails/:id",
        Component: BookDetails,
      },
      {
        path: "paymentSuccess",
        Component: PaymentSuccess,
      },
      {
        path: "paymentCancel",
        Component: PaymentCancel,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "myProfile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "myOrder",
        element: (
          <PrivateRoute>
            <UserRoute>
              <MyOrder></MyOrder>
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "invoice",
        element: (
          <PrivateRoute>
            <UserRoute>
              <Invoice></Invoice>
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "addBook",
        element: (
          <PrivateRoute>
            <LibrarianRoute>
              <AddBook></AddBook>
            </LibrarianRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "myBook",
        element: (
          <PrivateRoute>
            <LibrarianRoute>
              <MyBook></MyBook>
            </LibrarianRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "order",
        element: (
          <PrivateRoute>
            <LibrarianRoute>
              <Order></Order>
            </LibrarianRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "allUser",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllUser></AllUser>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manageBook",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageBook></ManageBook>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
