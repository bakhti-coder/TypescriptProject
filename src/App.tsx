import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";

import AdminLayout from "./components/layout";

import LoginPage from "./pages/login";
import DashboardPage from "./pages/dashboard";
import ProductsPage from "./pages/products";
import CategoriesPage from "./pages/category";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { isLogin } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="login" element={<LoginPage />} />
        <Route element={isLogin ? <AdminLayout /> : <Navigate to="/login" />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="products" element={<ProductsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
