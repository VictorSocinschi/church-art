export interface Work {
  id: number;
  title: string;
  category: string;
  image: string;
  year: string;
}

export const works: Work[] = [
  {
    id: 1,
    title: "Nașterea Domnului",
    category: "Frescă",
    year: "2023",
    // Ищем картинку по тегам "fresco" (фреска) и "art" (искусство)
    image: "https://loremflickr.com/800/600/fresco,art/all",
  },
  {
    id: 2,
    title: "Sfântul Gheorghe",
    category: "Icoană",
    year: "2022",
    // Ищем картинку по тегам "icon" (икона) и "orthodox" (православие)
    image: "https://loremflickr.com/800/600/icon,orthodox/all",
  },
  {
    id: 3,
    title: "Cupola Bisericii",
    category: "Pictură Murală",
    year: "2021",
    // Ищем картинку по тегам "church" (церковь) и "ceiling" (потолок)
    image: "https://loremflickr.com/800/600/church,ceiling/all",
  },
  {
    id: 4,
    title: "Sfinții Arhangheli",
    category: "Icoană",
    year: "2024",
    // Ищем картинку по тегу "saint" (святой)
    image: "https://loremflickr.com/800/600/saint,painting/all",
  },
];
