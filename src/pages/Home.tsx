import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl md:text-7xl font-serif text-amber-500 mb-6 drop-shadow-xl">
        Pictură Bisericească
      </h1>

      <p className="text-xl md:text-2xl text-slate-200 mb-12 leading-relaxed font-light max-w-3xl drop-shadow-md">
        Iconografie bizantină, frescă și restaurare.
        <br />
        Peste 15 de ani de experiență.
      </p>

      <Link
        to="/gallery"
        className="inline-block border-2 border-amber-500 text-amber-500 px-10 py-4 text-lg uppercase tracking-widest hover:bg-amber-500 hover:text-black transition duration-300 backdrop-blur-sm"
      >
        Vezi Lucrările
      </Link>
    </div>
  );
}
