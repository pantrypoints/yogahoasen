/**
 * Article registry — used by the /articles listing page.
 *
 * `title` and `excerpt` are the English fallback shown in listing cards.
 * `titleVi` / `excerptVi` are optional: when present they're shown to VI users
 * in the listing card. The article page itself always loads the right language's
 * .md file (which has its own title/excerpt in frontmatter).
 *
 * Content files live at:
 *   src/content/en/articles/{slug}.md   ← required
 *   src/content/vi/articles/{slug}.md   ← optional (falls back to en)
 */

export interface Article {
  slug: string;
  title: string;
  titleVi?: string;
  excerpt: string;
  excerptVi?: string;
  date: string;
  readTime: number;
  category: string;
  image: string;
  author: string;
}

export const articles: Article[] = [
  {
    slug: 'asana',
    title: "Guidelines for Asanas",
    titleVi: 'Các Qui Tắc Khi Tập Asanas',
    excerpt: "10 Guidelines for Asanas",
    excerptVi: 'Các Qui Tắc Khi Tập Asanas (Các Động Tác Yoga)',
    date: '2017-12-15',
    readTime: 8,
    category: 'Asanas',
    image: '/cobra.jpg',
    author: 'Kalyani'
  },
  {
    slug: 'selfishness',
    title: "How to Fight Selfishness",
    titleVi: 'How to Fight Selfishness',
    excerpt: "Selfishness is a big problem in the world",
    excerptVi: 'Các Qui Tắc Khi Tập Asanas (Các Động Tác Yoga)',
    date: '2017-12-15',
    readTime: 8,
    category: 'Asanas',
    image: '/cobra.jpg',
    author: 'Lavanya'
  },  
  {
    slug: 'yamas',
    title: "The Yamas: Yoga's Code of Ethical Living",
    titleVi: 'Yamas: Bộ Quy Tắc Đạo Đức Của Yoga',
    excerpt: "The first limb of Patanjali's eight-fold path — five ethical principles that guide how we relate to the world around us.",
    excerptVi: 'Chi đầu tiên trong tám chi của Patanjali — năm nguyên tắc đạo đức hướng dẫn cách chúng ta sống hài hòa với thế giới.',
    date: '2025-06-15',
    readTime: 8,
    category: 'Morality',
    image: '/yamas.jpg',
    author: 'Linh Nguyen'
  },
  {
    slug: 'niyamas',
    title: 'The Niyamas: Observances or Duties',
    titleVi: '5 Nguyên tắc Niyama',
    excerpt: 'The first limb of the eight-fold path of Patanjali, the Yamas are five ethical principles that guide how we relate to the world around us.',
    excerptVi: 'Nếu 5 Yama bảo bạn nên tránh gì để tăng ham muốn thiền, thì 5 Niyama chỉ bạn nên theo đuổi điều gì.',
    date: '2025-05-12',
    readTime: 6,
    category: 'Morality',
    image: '/niyamas.jpg',
    author: 'Lavanya'
  },
  {
    slug: 'fasting-benefits',
    title: 'The Benefits of Fasting',
    titleVi: 'Lợi ích của việc nhịn ăn',
    excerpt: 'The food crisis from 2022, as well as the starvation in Gaza and Sudan, have put renewed importance on global food security.',
    excerptVi: 'Khủng hoảng lương thực từ năm 2022, cùng với nạn đói ở Gaza và Sudan, đã làm dấy lên tầm quan trọng mới về an ninh lương thực toàn cầu.',
    date: '2025-08-08',
    readTime: 5,
    category: 'Food',
    image: '/fasting.jpg',
    author: 'Lavanya'
  },
  {
    slug: 'vegetarian-diets',
    title: 'Types of Vegetarian Diets',
    titleVi: 'Chế độ ăn chay',
    excerpt: 'Ayurvedic principles of eating — how to nourish your body to deepen your practice and maintain vibrant energy.',
    excerptVi: 'Nguyên tắc ăn uống Ayurveda — cách nuôi dưỡng cơ thể để đào sâu việc luyện tập và duy trì năng lượng sống động.',
    date: '2025-02-18',
    readTime: 8,
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
    author: 'Hoa Pham'
  },
  {
    slug: 'potato-soup',
    title: "Potato Soup Recipe",
    titleVi: 'Súp kem Khoai Tây',
    excerpt: "Potato soup is packed with nutritional benefits. Potatoes are an excellent source of vitamin C, potassium, and vitamin B6, which support immune function, heart health, and brain development.",
    excerptVi: 'Potato soup is packed with nutritional benefits. Potatoes are an excellent source of vitamin C, potassium, and vitamin B6, which support immune function, heart health, and brain development.',
    date: '2017-12-15',
    readTime: 8,
    category: 'Food',
    image: 'https://plus.unsplash.com/premium_photo-1700673590238-a0e3a3795ae2',
    author: 'Kalyani'
  },  
];
