import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Gallery } from "./pages/Gallery";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Project } from "./pages/Project";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ГЛАВНАЯ ОБЕРТКА (LAYOUT) */}
        {/* Обрати внимание: у этого Route НЕТ закрывающего слеша в конце строки! */}
        {/* Он закрывается в самом низу: </Route> */}
        <Route path="/" element={<Layout />}>
          {/* ВНУТРЕННИЕ СТРАНИЦЫ (Они попадут в Outlet) */}

          {/* Главная страница (открывается по адресу /) */}
          <Route index element={<Home />} />

          {/* Остальные страницы */}
          <Route path="gallery" element={<Gallery />} />
          <Route path="gallery/:id" element={<Project />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>{" "}
        {/* <-- Вот здесь закрывается Layout */}
      </Routes>
    </BrowserRouter>
  );
}
