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
		id: 'vrttis',
		title: 'Diving Deep into Vrttis',
		titleVi: 'Diving Deep into Vrttis',
		description: 'Panel of 4 Speakers: Ac. Premamayananda Avt., Rutger Tamminga, Ac. Kamaleshvara, Dr. Richard Maxwell. 12’ each',
		descriptionVi: '',
		date: '2026-02-28',
		time: '13:30 UTC',
		duration: '120 min',
		location: 'Zoom',
		price: 'free',
		spots: 20,
		register: 'https://fkr23.r.sp1-brevo.net/mk/cl/f/sh/SMK1E8tHeG13GYUt9aiuCDGkVh5k/Hxf9nxnVd6he',
		// spotsLeft: 7,
		image: '/vrtiis.jpg',
		category: 'Online',
		teacher: 'AMAYE'
	},
	{
		id: 'dak-lak',
		title: 'Daklak Donation Activity',
		titleVi: 'Trao ngọn lửa ấm, xua “mùa đông” vùng lũ',
		description: 'A two-day deep dive into vinyasa methodology — breath-to-movement synchronization, transitions, and building creative sequencing skills.',
		descriptionVi: 'Như các bạn đã theo dõi, trong tháng 11 vừa qua mảnh đất miền Nam Trung Bộ đã trải qua một trận mưa lũ lịch sử với những hệ quả đặc biệt nghiêm trọng, ảnh hưởng trực tiếp đến kế sinh nhai của hơn 10.000 hộ dân ở các tỉnh Đắk Lắk (Phú Yên cũ), Khánh Hòa',
		date: '2025-06-21',
		time: '9:00 AM',
		duration: '2 days',
		location: 'Studio A & B',
		price: 'free',
		spots: 16,
		spotsLeft: 4,
		image: '/daklak.jpg',
		category: 'Social Service',
		// teacher: 'Minh Tran'
	}
// [Hoạt động thiện nguyện]  
// 🌻 Với sự thôi thúc từ trái tim cùng phương châm “lá lành đùm lá rách”, Yoga Hoa Sen đã cùng góp một ít tấm lòng nhỏ bé của mình để san sẻ cùng với các bà con bị ảnh hưởng nặng ở vùng lũ trong việc tái thiết cuộc sống, cùng vực dậy kinh tế gia đình sau mưa to, sóng lớn. 
// Hành động cụ thể:
// 💜 Yoga Hoa Sen đã trao tặng tận tay số tiền tổng cộng 275 triệu đồng cho 550 hộ bà con (500,000 đồng/hộ) ở xã Tuy An Tây và Tuy An Bắc, tỉnh Đắk Lắk (Phú Yên cũ) vào ngày 28/11/25.
// 💜 Tặng 420 bếp ga trị giá 126 triệu đồng cho 420 hộ dân ở xã Tuy An Đông, tỉnh Đắk Lắk (Phú Yên cũ) vào ngày 30/11/25.
// 🇻🇳 Hy vọng với món quà nhỏ bé này, bà con phần nào đó được an ủi và an tâm bắt đầu lại cuộc sống bình yên trên mảnh đất quê hương với nhiều nghị lực và tình yêu thương.
];
