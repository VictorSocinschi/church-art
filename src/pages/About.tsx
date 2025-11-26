import artistImg from "../assets/artist.jpg";

export function About() {
  return (
    <div className="pt-24 pb-20 bg-slate-900 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="absolute inset-0 border-2 border-amber-500/30 translate-x-4 translate-y-4 rounded-lg"></div>

          <img
            src={artistImg}
            alt="Vasile Prohnitchi"
            className="relative w-full h-[500px] object-cover object-top rounded-lg shadow-2xl "
          />
        </div>

        <div>
          <span className="text-amber-500 text-sm uppercase tracking-widest font-bold">
            Despre Artist
          </span>

          <h1 className="text-4xl md:text-5xl font-serif text-white mt-2 mb-8">
            Vasile Prohnitchi
          </h1>

          <div className="text-slate-300 leading-relaxed space-y-4 font-light text-lg">
            <p>
              Născut cu dragoste pentru frumos și credință, Vasile Prohnitchi
              și-a dedicat viața artei sacre. Cu o experiență de peste 15 de
              ani, a pictat numeroase lăcașuri de cult în Republica Moldova.
            </p>
            <p>
              Stilul său îmbină canoanele bizantine tradiționale cu o
              sensibilitate artistică modernă, punând accent pe expresivitatea
              chipurilor sfinților și pe armonia culorilor.
            </p>
            <p>
              "Pentru mine, a picta o biserică nu este doar o meserie, ci o
              rugăciune în culori. Fiecare tușă este o mărturisire de credință."
            </p>
          </div>

          <div className="mt-8 text-amber-500 font-serif text-2xl italic">
            — V. Prohnitchi
          </div>
        </div>
      </div>
    </div>
  );
}
