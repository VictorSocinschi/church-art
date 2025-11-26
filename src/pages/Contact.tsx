import { useState } from "react";
import { FaFacebook } from "react-icons/fa";

export function Contact() {
  // 1. Состояние формы (здесь мы храним то, что пишет пользователь)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  // Состояние статуса (отправляется, успех, ошибка)
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  // Функция, которая следит за вводом текста
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Функция ОТПРАВКИ
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Не перезагружать страницу
    setStatus("sending"); // Включаем режим "Отправка..."

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "d86bf60b-51b8-4567-816e-3a3b651bb9de",
          ...formData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setFormData({ name: "", phone: "", message: "" }); // Очищаем форму
      } else {
        setStatus("error");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setStatus("error");
    }
  };

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
          {/* --- ЛЕВАЯ КОЛОНКА (Контакты) --- */}
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
                >
                  <FaFacebook size={36} />
                </a>
              </div>
            </div>
            <div className="p-6 border border-white/10 rounded-lg bg-slate-900/50">
              <h3 className="text-amber-500 font-serif text-xl mb-2">
                Atelier
              </h3>
              <p className="text-slate-300">Sadaclias, Republica Moldova</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-slate-900 p-8 rounded-lg border border-white/5"
          >
            {status === "success" && (
              <div className="bg-green-900/30 border border-green-600 text-green-400 p-4 rounded text-center">
                Mesajul a fost trimis cu succes! Vă vom contacta curând.
              </div>
            )}

            {status === "error" && (
              <div className="bg-red-900/30 border border-red-600 text-red-400 p-4 rounded text-center">
                Eroare la trimitere. Vă rugăm să sunați la telefon.
              </div>
            )}

            <div>
              <label className="block text-slate-400 text-sm mb-2 uppercase tracking-widest">
                Numele Dvs.
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
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
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
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
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-slate-950 border border-slate-800 text-white p-4 focus:border-amber-500 focus:outline-none transition rounded resize-none"
                placeholder="Aș dori o icoană cu Sfântul..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === "sending"} // Блокируем кнопку, пока идет отправка
              className={`w-full font-bold py-4 uppercase tracking-widest rounded transition
                ${
                  status === "sending"
                    ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                    : "bg-amber-600 text-black hover:bg-amber-500"
                }
              `}
            >
              {status === "sending" ? "Se trimite..." : "Trimite Mesaj"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
