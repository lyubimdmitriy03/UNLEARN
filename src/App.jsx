import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Solutions from "./pages/Solutions";
import NotFound from "./pages/NotFound";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import Technology from "./pages/Technology";
import Careers from "./pages/Careers";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "solutions", element: <Solutions /> },
      { path: "technology", element: <Technology /> },
      { path: "careers", element: <Careers /> },
      { path: "resources", element: <Resources /> },
      { path: "contact", element: <Contact /> },
      // {path: "*", element: <NotFound/>},
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
