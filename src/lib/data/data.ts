export interface Testimonial {
	id: number;
	name: string;
	avatar: string;
	text: string;
	textVi: string;
	rating: number;
	role: string;
}

export const testimonials: Testimonial[] = [
	{
		id: 1,
		name: 'Thi Nguyen',
		avatar: 'https://i.pravatar.cc/100?img=47',
		text: 'Yoga Hoa Sen changed my life. After years of chronic back pain, six months of practice here has given me my body back. The teachers are genuinely gifted.',
		textVi: 'Yoga Hoa Sen đã thay đổi cuộc đời tôi. Sau nhiều năm đau lưng mãn tính, sáu tháng tập luyện ở đây đã trả lại cơ thể cho tôi.',
		rating: 5,
		role: 'Student, 1 year'
	},
	{
		id: 2,
		name: 'David Chen',
		avatar: 'https://i.pravatar.cc/100?img=12',
		text: 'I was a complete sceptic about yoga. Now I practice four times a week and cannot imagine life without it. The community here is warm, inclusive, and deeply supportive.',
		textVi: 'Tôi hoàn toàn hoài nghi về yoga. Giờ tôi tập bốn lần một tuần và không thể tưởng tượng cuộc sống không có nó.',
		rating: 5,
		role: 'Student, 8 months'
	},
	{
		id: 3,
		name: 'Mai Le',
		avatar: 'https://i.pravatar.cc/100?img=56',
		text: 'The prenatal classes with Teacher Linh were a lifesaver during my pregnancy. I felt strong, calm, and prepared. Now I bring my daughter to kids yoga!',
		textVi: 'Các lớp tiền sản với Cô Linh là vô giá trong thai kỳ của tôi. Tôi cảm thấy mạnh mẽ, bình an và sẵn sàng.',
		rating: 5,
		role: 'Student, 2 years'
	},
	{
		id: 4,
		name: 'James Park',
		avatar: 'https://i.pravatar.cc/100?img=33',
		text: 'As a runner, I was struggling with tight hips and hamstrings. The yin yoga classes here have been the missing piece in my training. My recovery times have halved.',
		textVi: 'Là một người chạy bộ, tôi gặp khó khăn với hông và gân khoeo căng. Các lớp yin yoga ở đây là phần còn thiếu trong quá trình tập luyện của tôi.',
		rating: 5,
		role: 'Student, 5 months'
	},
	{
		id: 5,
		name: 'Anh Phuong',
		avatar: 'https://i.pravatar.cc/100?img=44',
		text: 'The meditation program transformed how I handle stress at work. I am more focused, patient, and creative. My colleagues have noticed the difference!',
		textVi: 'Chương trình thiền định đã thay đổi cách tôi xử lý căng thẳng trong công việc. Tôi tập trung, kiên nhẫn và sáng tạo hơn.',
		rating: 5,
		role: 'Student, 14 months'
	}
];

export interface Person {
	id: number;
	name: string;
	role: string;
	roleVi: string;
	bio: string;
	bioVi: string;
	avatar: string;
	specialties: string[];
	instagram: string;
}

export const people: Person[] = [
	{
		id: 1,
		name: 'Linh Nguyen',
		role: 'Founder & Lead Teacher',
		roleVi: 'Người Sáng Lập & Giáo Viên Chính',
		bio: 'Trained in Mysore, India with 200h RYT, 300h advanced certification. 12 years teaching experience across hatha, vinyasa, and prenatal yoga.',
		bioVi: 'Được đào tạo tại Mysore, Ấn Độ với chứng chỉ RYT 200h, 300h nâng cao. 12 năm kinh nghiệm giảng dạy hatha, vinyasa và yoga tiền sản.',
		avatar: 'https://i.pravatar.cc/200?img=49',
		specialties: ['Hatha', 'Vinyasa', 'Prenatal'],
		instagram: '#'
	},
	{
		id: 2,
		name: 'Minh Tran',
		role: 'Vinyasa & Meditation Teacher',
		roleVi: 'Giáo Viên Vinyasa & Thiền Định',
		bio: 'Former dancer turned yoga teacher. Minh\'s classes blend movement with mindfulness, creating sequences that feel like moving meditation.',
		bioVi: 'Vũ công trở thành giáo viên yoga. Các lớp học của Minh kết hợp chuyển động với chánh niệm, tạo ra các chuỗi như thiền định chuyển động.',
		avatar: 'https://i.pravatar.cc/200?img=15',
		specialties: ['Vinyasa', 'Meditation', 'Breathwork'],
		instagram: '#'
	},
	{
		id: 3,
		name: 'Hoa Pham',
		role: 'Yin & Restorative Teacher',
		roleVi: 'Giáo Viên Yin & Phục Hồi',
		bio: 'Certified in Yin Yoga and traditional Chinese medicine principles. Hoa creates profound healing spaces through stillness and surrender.',
		bioVi: 'Chứng nhận Yin Yoga và nguyên tắc y học cổ truyền Trung Quốc. Hoa tạo ra không gian chữa lành sâu sắc qua sự tĩnh lặng.',
		avatar: 'https://i.pravatar.cc/200?img=41',
		specialties: ['Yin Yoga', 'Restorative', 'Sound Healing'],
		instagram: '#'
	},
	{
		id: 4,
		name: 'Duc Vo',
		role: 'Kids & Teens Yoga Teacher',
		roleVi: 'Giáo Viên Yoga Trẻ Em & Thiếu Niên',
		bio: 'With a background in child development and education, Duc brings yoga to life for young people through storytelling and creative play.',
		bioVi: 'Với nền tảng phát triển trẻ em và giáo dục, Đức mang yoga đến cuộc sống của người trẻ qua kể chuyện và chơi sáng tạo.',
		avatar: 'https://i.pravatar.cc/200?img=67',
		specialties: ['Kids Yoga', 'Teen Yoga', 'Mindfulness'],
		instagram: '#'
	}
];

export interface ScheduleClass {
	time: string;
	name: string;
	teacher: string;
	duration: number;
	level: 'All' | 'Beginner' | 'Intermediate' | 'Advanced';
	spots: number;
}

export const schedule: Record<string, ScheduleClass[]> = {
	mon: [
		{ time: '6:30', name: 'Morning Hatha', teacher: 'Linh', duration: 60, level: 'All', spots: 5 },
		{ time: '9:00', name: 'Vinyasa Flow', teacher: 'Minh', duration: 75, level: 'Intermediate', spots: 8 },
		{ time: '18:00', name: 'Beginner Yoga', teacher: 'Linh', duration: 60, level: 'Beginner', spots: 3 },
		{ time: '19:30', name: 'Yin Yoga', teacher: 'Hoa', duration: 75, level: 'All', spots: 12 }
	],
	tue: [
		{ time: '7:00', name: 'Meditation', teacher: 'Minh', duration: 45, level: 'All', spots: 15 },
		{ time: '10:00', name: 'Prenatal Yoga', teacher: 'Linh', duration: 60, level: 'All', spots: 4 },
		{ time: '18:30', name: 'Power Vinyasa', teacher: 'Minh', duration: 60, level: 'Advanced', spots: 6 }
	],
	wed: [
		{ time: '6:30', name: 'Morning Hatha', teacher: 'Hoa', duration: 60, level: 'All', spots: 7 },
		{ time: '9:30', name: 'Yin & Restore', teacher: 'Hoa', duration: 90, level: 'All', spots: 10 },
		{ time: '17:00', name: 'Kids Yoga', teacher: 'Duc', duration: 45, level: 'All', spots: 8 },
		{ time: '19:00', name: 'Vinyasa Flow', teacher: 'Linh', duration: 75, level: 'Intermediate', spots: 2 }
	],
	thu: [
		{ time: '7:00', name: 'Breathwork', teacher: 'Minh', duration: 60, level: 'All', spots: 12 },
		{ time: '9:00', name: 'Hatha Yoga', teacher: 'Linh', duration: 60, level: 'All', spots: 9 },
		{ time: '18:00', name: 'Beginner Flow', teacher: 'Duc', duration: 60, level: 'Beginner', spots: 6 },
		{ time: '19:30', name: 'Deep Yin', teacher: 'Hoa', duration: 90, level: 'All', spots: 11 }
	],
	fri: [
		{ time: '6:30', name: 'Morning Vinyasa', teacher: 'Minh', duration: 75, level: 'Intermediate', spots: 4 },
		{ time: '10:00', name: 'Slow Flow', teacher: 'Hoa', duration: 60, level: 'All', spots: 8 },
		{ time: '18:00', name: 'TGIF Flow', teacher: 'Linh', duration: 60, level: 'All', spots: 5 }
	],
	sat: [
		{ time: '8:00', name: 'Weekend Hatha', teacher: 'Linh', duration: 90, level: 'All', spots: 0 },
		{ time: '10:00', name: 'Vinyasa Workshop', teacher: 'Minh', duration: 120, level: 'Intermediate', spots: 3 },
		{ time: '14:00', name: 'Kids & Family', teacher: 'Duc', duration: 60, level: 'All', spots: 7 },
		{ time: '16:00', name: 'Yin & Nidra', teacher: 'Hoa', duration: 90, level: 'All', spots: 9 }
	],
	sun: [
		{ time: '8:30', name: 'Sunrise Meditation', teacher: 'Minh', duration: 60, level: 'All', spots: 14 },
		{ time: '10:00', name: 'Gentle Hatha', teacher: 'Hoa', duration: 75, level: 'Beginner', spots: 6 },
		{ time: '17:00', name: 'Restorative Yoga', teacher: 'Linh', duration: 90, level: 'All', spots: 8 }
	]
};

export const faqItems = [
	{
		q: 'Do I need experience to join?',
		qVi: 'Tôi có cần kinh nghiệm để tham gia không?',
		a: 'Not at all! We welcome complete beginners. Our beginner classes are specifically designed to introduce you to yoga safely and joyfully. Many of our regular classes are also suitable for all levels.',
		aVi: 'Không cần thiết! Chúng tôi chào đón người hoàn toàn mới. Các lớp học dành cho người mới được thiết kế để giới thiệu yoga cho bạn một cách an toàn và vui vẻ.'
	},
	{
		q: 'What should I wear and bring?',
		qVi: 'Tôi nên mặc gì và mang theo gì?',
		a: 'Wear comfortable, stretchy clothing. Yoga is practiced barefoot. We provide mats, blocks, straps, and blankets — just bring yourself and a water bottle. You may want to bring a small towel for more active classes.',
		aVi: 'Mặc quần áo thoải mái, co giãn. Yoga được tập chân trần. Chúng tôi cung cấp thảm, gạch, dây và chăn — chỉ cần mang theo bản thân và bình nước.'
	},
	{
		q: 'How do I book a class?',
		qVi: 'Tôi đặt lớp học như thế nào?',
		a: 'You can book online through our website, via the booking button on any class, or by calling us directly. We recommend booking ahead as popular classes fill up fast, especially on weekends.',
		aVi: 'Bạn có thể đặt chỗ trực tuyến qua trang web của chúng tôi, qua nút đặt chỗ trên bất kỳ lớp nào, hoặc gọi điện trực tiếp cho chúng tôi.'
	},
	{
		q: 'What is your cancellation policy?',
		qVi: 'Chính sách hủy lớp của bạn là gì?',
		a: 'You can cancel up to 4 hours before class for a full credit. Cancellations within 4 hours or no-shows will forfeit the class. For workshops and events, please check the individual event policy.',
		aVi: 'Bạn có thể hủy đến 4 giờ trước lớp để được hoàn tiền đầy đủ. Hủy trong vòng 4 giờ hoặc vắng mặt sẽ mất buổi học.'
	},
	{
		q: 'Do you offer trial classes?',
		qVi: 'Bạn có cung cấp lớp học thử không?',
		a: 'Yes! New students get their first class free. Simply register online and use the code FIRSTBLOOM at checkout.',
		aVi: 'Có! Học viên mới được học thử lớp đầu tiên miễn phí. Chỉ cần đăng ký trực tuyến và sử dụng mã FIRSTBLOOM khi thanh toán.'
	},
	{
		q: 'Is yoga safe during pregnancy?',
		qVi: 'Yoga có an toàn trong thai kỳ không?',
		a: 'Absolutely, with modifications. We have a dedicated prenatal yoga program designed specifically for expectant mothers. Please always inform your teacher of your pregnancy before class.',
		aVi: 'Hoàn toàn an toàn, với các điều chỉnh phù hợp. Chúng tôi có chương trình yoga tiền sản dành riêng cho các bà mẹ đang mang thai.'
	},
	{
		q: 'Do you offer memberships or class packs?',
		qVi: 'Bạn có cung cấp thẻ thành viên hoặc gói lớp học không?',
		a: 'Yes! We offer single drop-in classes, class packs of 5, 10, or 20, and monthly unlimited memberships. Memberships offer the best value and include priority booking. Details are on our Pricing page.',
		aVi: 'Có! Chúng tôi cung cấp lớp học đơn lẻ, gói 5, 10 hoặc 20 lớp, và thẻ thành viên không giới hạn hàng tháng.'
	},
	{
		q: 'Do you have parking?',
		qVi: 'Có chỗ đậu xe không?',
		a: 'There is paid parking available in the building\'s car park. We are also well-connected by public transport — multiple bus lines stop within 50 metres.',
		aVi: 'Có bãi đậu xe có tính phí trong tòa nhà. Chúng tôi cũng kết nối tốt với phương tiện công cộng — nhiều tuyến xe buýt dừng trong phạm vi 50 mét.'
	}
];
