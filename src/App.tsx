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
      <Route element={<MainLayout />} path="/todo/">
        <Route element={<MainPage />} index />
        <Route element={<LoginPage />} path="/todo/login" />
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
