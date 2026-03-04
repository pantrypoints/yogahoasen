export interface Article {
	slug: string;
	title: string;
	titleVi: string;
	excerpt: string;
	excerptVi: string;
	date: string;
	readTime: number;
	category: string;
	image: string;
	author: string;
}

export const articles: Article[] = [
	{
		slug: 'test',
		title: 'Tesat',
		titleVi: 'Tesat',
		excerpt: 'Discover how ancient lotus symbolism mirrors the journey of a dedicated yoga practitioner — from muddy beginnings to radiant blossoming.',
		excerptVi: 'Khám phá cách biểu tượng hoa sen cổ đại phản ánh hành trình của người thực hành yoga chuyên tâm.',
		date: '2025-05-12',
		readTime: 6,
		category: 'Philosophy',
		image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
		author: 'Linh Nguyen'
	},
	{
		slug: 'the-path-of-lotus',
		title: 'The Path of the Lotus: Yoga as a Way of Life',
		titleVi: 'Con Đường Hoa Sen: Yoga Như Một Lối Sống',
		excerpt: 'Discover how ancient lotus symbolism mirrors the journey of a dedicated yoga practitioner — from muddy beginnings to radiant blossoming.',
		excerptVi: 'Khám phá cách biểu tượng hoa sen cổ đại phản ánh hành trình của người thực hành yoga chuyên tâm.',
		date: '2025-05-12',
		readTime: 6,
		category: 'Philosophy',
		image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
		author: 'Linh Nguyen'
	},
	{
		slug: 'breathwork-basics',
		title: 'Breathwork Basics: The Power of Pranayama',
		titleVi: 'Căn Bản Hơi Thở: Sức Mạnh Của Pranayama',
		excerpt: 'Pranayama, the yogic science of breath, holds the key to regulating your nervous system and unlocking deep states of calm.',
		excerptVi: 'Pranayama, khoa học hơi thở yoga, là chìa khóa điều hòa hệ thần kinh và mở khóa trạng thái bình an sâu sắc.',
		date: '2025-04-28',
		readTime: 5,
		category: 'Practice',
		image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
		author: 'Minh Tran'
	},
	{
		slug: 'yoga-for-beginners',
		title: 'Your First Mat: A Beginner\'s Guide to Yoga',
		titleVi: 'Tấm Thảm Đầu Tiên: Hướng Dẫn Yoga Cho Người Mới',
		excerpt: 'Everything you need to know before stepping onto your yoga mat for the first time — no flexibility required.',
		excerptVi: 'Mọi thứ bạn cần biết trước khi bước lên tấm thảm yoga lần đầu tiên — không cần sự linh hoạt.',
		date: '2025-04-10',
		readTime: 7,
		category: 'Beginners',
		image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&q=80',
		author: 'Linh Nguyen'
	},
	{
		slug: 'yin-yoga-deep-release',
		title: 'Yin Yoga: The Art of Deep Release',
		titleVi: 'Yin Yoga: Nghệ Thuật Buông Bỏ Sâu',
		excerpt: 'In a world that demands constant movement, yin yoga teaches us the radical power of stillness and surrender.',
		excerptVi: 'Trong thế giới đòi hỏi chuyển động không ngừng, yin yoga dạy chúng ta sức mạnh cấp tiến của sự tĩnh lặng.',
		date: '2025-03-22',
		readTime: 4,
		category: 'Practice',
		image: 'https://images.unsplash.com/photo-1510894347713-fc3dc6166086?w=800&q=80',
		author: 'Hoa Pham'
	},
	{
		slug: 'meditation-morning-ritual',
		title: 'Building a Morning Meditation Ritual',
		titleVi: 'Xây Dựng Nghi Thức Thiền Buổi Sáng',
		excerpt: 'How five minutes of morning stillness can transform your entire day — a practical guide to starting a meditation habit.',
		excerptVi: 'Năm phút tĩnh lặng buổi sáng có thể thay đổi cả ngày của bạn — hướng dẫn thực tế để bắt đầu thiền định.',
		date: '2025-03-05',
		readTime: 5,
		category: 'Meditation',
		image: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=800&q=80',
		author: 'Minh Tran'
	},
	{
		slug: 'nutrition-for-yogis',
		title: 'Eating to Flow: Nutrition for Yogis',
		titleVi: 'Ăn Để Chảy: Dinh Dưỡng Cho Người Tập Yoga',
		excerpt: 'Ayurvedic principles of eating — how to nourish your body to deepen your practice and maintain vibrant energy.',
		excerptVi: 'Nguyên tắc ăn uống Ayurveda — cách nuôi dưỡng cơ thể để đào sâu việc luyện tập và duy trì năng lượng sống động.',
		date: '2025-02-18',
		readTime: 8,
		category: 'Wellness',
		image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
		author: 'Hoa Pham'
	}
];
