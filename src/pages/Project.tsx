/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { client } from "../contentful";

interface ProjectData {
  title: string;
  description: string; // Если ты добавил описание в Contentful, если нет - удали
  images: string[]; // Массив ссылок на картинки
}

export function Project() {
  const { id } = useParams(); // Берем ID из адреса (ссылки)
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await client.getEntry(id as string);
        const fields: any = response.fields;

        // --- ВОТ ЗДЕСЬ МЫ ИСПРАВЛЯЕМ ОШИБКУ ---
        // Мы проверяем каждый шаг знаком вопроса (?.)
        // Если fields нет, или file нет — код не сломается, а вернет null
        const cleanImages = (fields.images || [])
          .map((img: any) => {
            const url = img?.fields?.file?.url;
            return url ? "https:" + url : null;
          })
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .filter((url: any) => url !== null); // Убираем пустые (null) значения
        // ---------------------------------------

        setProject({
          title: fields.title,
          description: fields.description,
          images: cleanImages, // Используем наш чистый список
        });
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
      <div className="pt-40 text-center text-amber-500">Se încarcă...</div>
    );
  if (!project)
    return (
      <div className="pt-40 text-center text-white">Proiectul nu există</div>
    );

  return (
    <div className="pt-28 pb-20 bg-slate-950 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        {/* Заголовок и кнопка Назад */}
        <div className="mb-12">
          <Link
            to="/gallery"
            className="text-slate-400 hover:text-amber-500 transition mb-4 inline-block"
          >
            ← Înapoi la Galerie
          </Link>
          <h1 className="text-4xl font-serif text-white">{project.title}</h1>
        </div>

        {/* СЕТКА ФОТОГРАФИЙ ЭТОГО ПРОЕКТА */}
        {/* masonry-grid: Можно сделать просто сетку */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.images.map((img, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden border border-white/10"
            >
              <img
                src={img}
                alt={`Foto ${index}`}
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
