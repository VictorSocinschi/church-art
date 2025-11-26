import { Outlet, Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import churchBgImg from "../assets/church-bg.jpg";

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="min-h-screen text-slate-200 font-serif relative">
      {/* ФОН */}
      <div className="fixed inset-0 z-0">
        <img
          src={churchBgImg}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/85"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/50 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link
              to="/"
              onClick={closeMenu}
              className="text-2xl font-medium tracking-wide text-amber-500 hover:text-amber-400 transition"
            >
              Vasile Prohnitchi
            </Link>

            <nav className="hidden md:flex gap-8 text-sm uppercase tracking-widest text-slate-400">
              <Link to="/" className="hover:text-amber-500 transition-colors">
                Acasă
              </Link>
              <Link
                to="/gallery"
                className="hover:text-amber-500 transition-colors"
              >
                Galerie
              </Link>
              <Link
                to="/about"
                className="hover:text-amber-500 transition-colors"
              >
                Despre mine
              </Link>
              <Link
                to="/contact"
                className="hover:text-amber-500 transition-colors"
              >
                Contacte
              </Link>
            </nav>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-amber-500"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden bg-slate-900 border-b border-white/10 p-6 flex flex-col gap-4 text-center">
              <Link to="/" className="text-amber-500" onClick={closeMenu}>
                Acasă
              </Link>
              <Link to="/gallery" onClick={closeMenu}>
                Galerie
              </Link>
              <Link to="/about" onClick={closeMenu}>
                Despre mine
              </Link>
              <Link to="/contact" onClick={closeMenu}>
                Contacte
              </Link>
            </div>
          )}
        </header>

        <main className="flex-grow">
          <Outlet />
        </main>

        <footer className="border-t border-white/10 py-12 bg-black/40 mt-auto">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-slate-500 text-sm mb-4 italic">
              "Arta este eternă, viața este scurtă"
            </p>
            <div className="flex justify-center items-center gap-2 text-amber-600 mb-8">
              <Phone size={16} />
              <span>+373 00 000 000</span>
            </div>
            <p className="text-slate-700 text-xs uppercase tracking-widest">
              © 2025 Vasile Prohnitchi. Toate drepturile rezervate.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
