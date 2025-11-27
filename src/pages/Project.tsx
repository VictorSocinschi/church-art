/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { client } from "../contentful";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectData {
  title: string;
  images: string[];
}

export function Project() {
  const { id } = useParams();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);

  // Состояние для Лайтбокса (какую картинку смотрим сейчас)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Логика переключения картинок
  const closeModal = () => setSelectedIndex(null);
  const showPrev = useCallback(() => {
    if (!project) return;
    setSelectedIndex((curr) =>
      curr === null || curr === 0 ? project.images.length - 1 : curr - 1
    );
  }, [project]);
  const showNext = useCallback(() => {
    if (!project) return;
    setSelectedIndex((curr) =>
      curr === null || curr === project.images.length - 1 ? 0 : curr + 1
    );
  }, [project]);

  // Клавиатура
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, showNext, showPrev]);

  // Загрузка данных
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await client.getEntry(id as string);
        const fields: any = response.fields;

        // Чистим ссылки на картинки
        const cleanImages = (fields.images || [])
          .map((img: any) => {
            const url = img?.fields?.file?.url;
            return url ? "https:" + url : null;
          })
          .filter((url: any) => url !== null);

        setProject({ title: fields.title, images: cleanImages });
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading)
    return (
      <div className="pt-40 text-center text-amber-500 animate-pulse">
        Se încarcă...
      </div>
    );
  if (!project)
    return (
      <div className="pt-40 text-center text-white">Proiectul nu există</div>
    );

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <Link
            to="/gallery"
            className="text-slate-400 hover:text-amber-500 transition mb-4 inline-block text-sm tracking-widest uppercase"
          >
            ← Înapoi la Galerie
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif text-white border-b border-white/10 pb-6">
            {project.title}
          </h1>
        </div>

        {/* Сетка маленьких картинок */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.images.map((img, index) => (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className="rounded-lg overflow-hidden border border-white/10 cursor-pointer group h-64 relative"
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-lg font-serif tracking-widest border-b border-amber-500 pb-1">
                  Vezi
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Лайтбокс (Большая картинка) */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 text-slate-400 hover:text-white p-2 z-20"
          >
            <X size={40} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-4 text-slate-400 hover:text-amber-500 p-2 z-20 hidden md:block"
          >
            <ChevronLeft size={56} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-4 text-slate-400 hover:text-amber-500 p-2 z-20 hidden md:block"
          >
            <ChevronRight size={56} />
          </button>
          <img
            src={project.images[selectedIndex]}
            className="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl rounded-sm"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-6 left-0 right-0 text-center text-slate-500 font-mono text-sm">
            {selectedIndex + 1} / {project.images.length}
          </div>
        </div>
      )}
    </div>
  );
}
