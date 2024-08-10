import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/minimalist-todo/" element={<MainLayout />}>
        <Route index element={<MainPage />} />
        <Route path="/minimalist-todo/login" element={<LoginPage />} />
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
