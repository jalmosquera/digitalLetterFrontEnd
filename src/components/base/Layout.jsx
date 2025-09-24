import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header fijo arriba */}
      <Header />

      {/* Contenido dinámico de cada página */}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
