#  BookCourier

A comprehensive and user-friendly Book Courier and Management system web application designed to streamline book delivery, tracking, and library/shop management.

# Live Links
- Live Website: [https://book-courier-by-sayed.web.app](https://book-courier-by-sayed.web.app)
- Alternative Link: [https://book-courier-74d78.web.app](https://book-courier-74d78.web.app)

---

# Purpose of the Project
The primary objective of BookCourier is to bridge the gap between avid readers and book providers. It allows users to browse a vast collection of books, request courier services for deliveries, and manage their personal reading profiles. For administrators or librarians, it offers an intuitive dashboard to manage inventory, track courier statuses, and handle user requests efficiently.

---

# Key Features
- Secure Authentication: JWT-backed user authentication featuring Email/Password sign-up and one-click Google Sign-In via Firebase.
- Dynamic Book Showcase: An interactive "All Books" page with seamless data fetching, grid layouts, and sorting/filtering capabilities.
- Role-Based Dashboards: Specialized user interfaces and private routes for standard Users, Librarians, and Administrators.
- Real-time Data Operations: Full CRUD operations allowing authorized users to add, update, view, and delete books or order details.
- Dark/Light Mode Toggle: A fully responsive, eye-friendly theme switching feature optimized for all device sizes.
- Error & Crash Handling: Clean navigation with protected routes and a dedicated 404 error page fallback.

---

# NPM Packages Used
This project leverages the power of the following npm packages to ensure high performance and smooth UX:

# Frontend Ecosystem:
- `react` & `react-dom`: Core library for building the declarative component-based UI.
- `react-router-dom`: For handling smooth, single-page client-side routing and private routes.
- `@tanstack/react-query`: For powerful server-state management, caching, and synchronized data fetching.
- `axios`: A promise-based HTTP client used to send secure and clean API requests to the Vercel backend.
- `firebase`: Google's SDK utilized for robust client-side Authentication (Google & Password providers).
- `react-hook-form`: For efficient, flexible, and extensible form validation (e.g., Registration and Login forms).

# Styling & UI Utilities:
- `tailwindcss`: A utility-first CSS framework for rapid and modern UI styling.
- `daisyui`: Highly customizable Tailwind CSS component library for modern buttons, modals, and navigation bars.
- `react-icons`: To incorporate clean, vector-based popular icon packs into the application layout.
