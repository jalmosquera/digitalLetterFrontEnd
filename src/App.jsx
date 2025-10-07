import { Routes, Route } from "react-router-dom";
import Layout from "./components/base/layout";
import Navbar from "./components/base/Navbar";
import Card from "./components/cards/Card";
import ProductsList from "./components/ProductsList";

const App = () => {
  return (
    <Routes>
      {/* Todas las rutas dentro de Layout para que Header y Footer se vean */}
      <Route path="/" element={<Layout />}>
        <Route index element={<ProductsList />} /> {/* Página de inicio */}
        <Route path="categories" element={<Navbar />} />
        <Route path="card" element={<Card />} />
        <Route path="card/:id" element={<Card />} />
        <Route path="productsList" element={<ProductsList />} />
      </Route>
    </Routes>
  );
};

export default App;
