/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Импортируем Link
import { client } from "../contentful";

interface Work {
  id: string;
  title: string;
  category: string;
  year: string;
  coverImage: string; // Только одна картинка для обложки
}

export function Gallery() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await client.getEntries({ content_type: "work" });

        const formattedWorks = response.items.map((item: any) => {
          // Берем ПЕРВУЮ картинку из массива images как обложку
          const firstImage = item.fields.images?.[0]?.fields?.file?.url;

          return {
            id: item.sys.id,
            title: item.fields.title,
            category: item.fields.category,
            year: item.fields.year,
            coverImage: firstImage ? "https:" + firstImage : "", // Защита, если картинок нет
          };
        });

        setWorks(formattedWorks);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchWorks();
  }, []);

  return (
    <div className="pt-20 pb-20 min-h-screen">
      <div className="text-center mb-16 px-4">
        <h1 className="text-4xl md:text-5xl font-serif text-amber-500 mb-4">
          Proiecte
        </h1>
        <p className="text-slate-400">
          Selectați un album pentru a vedea toate fotografiile.
        </p>
      </div>

      {loading ? (
        <div className="text-center text-amber-500 animate-pulse">
          Se încarcă albumele...
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work) => (
            // ССЫЛКА НА СТРАНИЦУ ПРОЕКТА
            <Link
              key={work.id}
              to={`/gallery/${work.id}`}
              className="group relative h-96 overflow-hidden rounded-lg border border-white/10 shadow-2xl cursor-pointer block"
            >
              <img
                src={work.coverImage}
                alt={work.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500 flex flex-col items-center justify-center text-center p-6">
                <span className="text-amber-500 text-xs uppercase tracking-[0.2em] mb-3">
                  {work.category}
                </span>
                <h3 className="text-2xl font-serif text-white mb-2 border-b-2 border-transparent group-hover:border-amber-500 transition-colors pb-2">
                  {work.title}
                </h3>
                <span className="text-slate-300 text-sm font-serif italic">
                  {work.year}
                </span>
                <span className="mt-4 text-xs text-white bg-amber-600 px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  Deschide Albumul
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
