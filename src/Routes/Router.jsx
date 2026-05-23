import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import MyOrder from "../Pages/Dashboard/User/MyOrder";
import AddBook from "../Pages/Dashboard/Librarian/AddBook";
import MyProfile from "../Pages/Dashboard/MyProfile";
import Invoice from "../Pages/Dashboard/User/Invoice";
import MyBook from "../Pages/Dashboard/Librarian/MyBook";
import Order from "../Pages/Dashboard/Librarian/Order";
import AllUser from "../Pages/Dashboard/Admin/AllUser";
import ManageBook from "../Pages/Dashboard/Admin/ManageBook";
import AllBook from "../Pages/AllBook";
import BookDetails from "../Pages/BookDetails";

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
        path:'allBook',
        Component:AllBook
      },
      {
        path:'boodDetails/:id',
        Component:BookDetails
      }
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
        path: "myOrder",
        Component: MyOrder,
      },
      {
        path: "myProfile",
        Component: MyProfile,
      },
      {
        path: "invoice",
        Component: Invoice,
      },
      {
        path: "addBook",
        Component: AddBook,
      },
      {
        path: "myBook",
        Component: MyBook,
      },
      {
        path: "order",
        Component: Order,
      },
      {
        path: "allUser",
        Component: AllUser,
      },
      {
        path: "manageBook",
        Component: ManageBook,
      },
    ],
  },
]);
