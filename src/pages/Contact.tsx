import { FaFacebook } from "react-icons/fa";

export function Contact() {
  return (
    <div className="pt-28 pb-20 bg-slate-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-amber-500 mb-4">
            Contacte
          </h1>
          <p className="text-slate-400 font-light italic">
            Pentru comenzi de icoane, fresce sau proiecte de restaurare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="p-6 border border-white/10 rounded-lg bg-slate-900/50">
              <div className="mb-8">
                <h3 className="text-amber-500 font-serif text-xl mb-2">
                  Telefon
                </h3>
                <p className="text-slate-300 mb-4">
                  Sunați pentru o consultație sau o întâlnire personală.
                </p>
                <a
                  href="tel:+37300000000"
                  className="text-2xl text-white font-light hover:text-amber-500 transition block"
                >
                  +373 78 371 293
                </a>
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className="text-slate-400 text-sm mb-4 uppercase tracking-widest">
                  Social Media
                </p>
                <a
                  href="https://www.facebook.com/vasile.prohnitchi.75"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-slate-400 hover:text-blue-500 transition"
                  title="Facebook Profile"
                >
                  <FaFacebook size={36} />
                </a>
              </div>
            </div>

            <div className="p-6 border border-white/10 rounded-lg bg-slate-900/50">
              <h3 className="text-amber-500 font-serif text-xl mb-2">
                Atelier
              </h3>
              <p className="text-slate-300">Sadaclia, Republica Moldova</p>
            </div>
          </div>

          <form className="space-y-6 bg-slate-900 p-8 rounded-lg border border-white/5">
            <div>
              <label className="block text-slate-400 text-sm mb-2 uppercase tracking-widest">
                Numele Dvs.
              </label>
              <input
                type="text"
                className="w-full bg-slate-950 border border-slate-800 text-white p-4 focus:border-amber-500 focus:outline-none transition rounded"
                placeholder="Ion Popescu"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-2 uppercase tracking-widest">
                Telefon
              </label>
              <input
                type="tel"
                className="w-full bg-slate-950 border border-slate-800 text-white p-4 focus:border-amber-500 focus:outline-none transition rounded"
                placeholder="+373..."
              />
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-2 uppercase tracking-widest">
                Mesaj
              </label>
              <textarea
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 text-white p-4 focus:border-amber-500 focus:outline-none transition rounded resize-none"
                placeholder="Aș dori o icoană cu Sfântul..."
              ></textarea>
            </div>
            <button
              type="button"
              className="w-full bg-amber-600 text-black font-bold py-4 hover:bg-amber-500 transition uppercase tracking-widest rounded"
            >
              Trimite Mesaj
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
