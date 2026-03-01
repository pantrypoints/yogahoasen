export interface Event {
	id: string;
	title: string;
	titleVi: string;
	description: string;
	descriptionVi: string;
	date: string;
	time: string;
	duration: string;
	location: string;
	price: number | 'free';
	spots: number;
	spotsLeft: number;
	image: string;
	category: string;
	teacher: string;
}

export const events: Event[] = [
	{
		id: 'full-moon-yin',
		title: 'Full Moon Yin & Sound Bath',
		titleVi: 'Yin Trăng Tròn & Tắm Âm Thanh',
		description: 'Join us under the full moon for a deeply restorative yin yoga practice paired with Tibetan singing bowls. Release what no longer serves you.',
		descriptionVi: 'Tham gia cùng chúng tôi dưới ánh trăng tròn cho một buổi yin yoga phục hồi sâu sắc kết hợp với bát hát Tây Tạng.',
		date: '2025-06-11',
		time: '7:30 PM',
		duration: '90 min',
		location: 'Main Studio',
		price: 350000,
		spots: 20,
		spotsLeft: 7,
		image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&q=80',
		category: 'Special Event',
		teacher: 'Hoa Pham'
	},
	{
		id: 'vinyasa-immersion',
		title: 'Weekend Vinyasa Immersion',
		titleVi: 'Khóa Học Vinyasa Cuối Tuần',
		description: 'A two-day deep dive into vinyasa methodology — breath-to-movement synchronization, transitions, and building creative sequencing skills.',
		descriptionVi: 'Khóa học hai ngày khám phá sâu phương pháp vinyasa — đồng bộ hơi thở và chuyển động, chuyển tiếp, và xây dựng kỹ năng sắp xếp trình tự.',
		date: '2025-06-21',
		time: '9:00 AM',
		duration: '2 days',
		location: 'Studio A & B',
		price: 1500000,
		spots: 16,
		spotsLeft: 4,
		image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=800&q=80',
		category: 'Workshop',
		teacher: 'Minh Tran'
	},
	{
		id: 'beginner-bootcamp',
		title: 'Yoga Beginner Bootcamp',
		titleVi: 'Khóa Yoga Dành Cho Người Mới',
		description: 'New to yoga? This four-week beginner series will teach you the fundamentals — alignment, breath, and the core postures of a sustainable practice.',
		descriptionVi: 'Mới tập yoga? Chuỗi bốn tuần dành cho người mới này sẽ dạy bạn các kiến thức cơ bản — căn chỉnh, hơi thở và các tư thế cốt lõi.',
		date: '2025-07-07',
		time: '6:00 PM',
		duration: '4 weeks',
		location: 'Studio B',
		price: 800000,
		spots: 12,
		spotsLeft: 10,
		image: 'https://images.unsplash.com/photo-1540206395-68808572332f?w=800&q=80',
		category: 'Course',
		teacher: 'Linh Nguyen'
	},
	{
		id: 'meditation-free',
		title: 'Community Meditation Morning',
		titleVi: 'Buổi Sáng Thiền Cộng Đồng',
		description: 'A free open practice for the community. Sit, breathe, and be still together. All levels and backgrounds welcome.',
		descriptionVi: 'Buổi tập mở miễn phí cho cộng đồng. Ngồi, thở và tĩnh lặng cùng nhau. Chào đón mọi trình độ.',
		date: '2025-06-29',
		time: '7:00 AM',
		duration: '60 min',
		location: 'Rooftop Garden',
		price: 'free',
		spots: 30,
		spotsLeft: 18,
		image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
		category: 'Community',
		teacher: 'All Teachers'
	},
	{
		id: 'prenatal-workshop',
		title: 'Prenatal Yoga & Birthing Prep',
		titleVi: 'Yoga Tiền Sản & Chuẩn Bị Sinh',
		description: 'A nurturing one-day workshop covering prenatal yoga, breathing for labor, and postpartum recovery practices.',
		descriptionVi: 'Hội thảo một ngày nuôi dưỡng bao gồm yoga tiền sản, hơi thở khi sinh và các phương pháp phục hồi sau sinh.',
		date: '2025-07-19',
		time: '9:30 AM',
		duration: 'Full Day',
		location: 'Studio A',
		price: 650000,
		spots: 10,
		spotsLeft: 6,
		image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
		category: 'Workshop',
		teacher: 'Linh Nguyen'
	}
];
