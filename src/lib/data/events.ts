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
		id: 'prout',
		title: 'PROUT Day',
		titleVi: 'PROUT Day',
		description: '',
		descriptionVi: '',
		date: '2026-06-05',
		time: '13:30 UTC',
		duration: '120 min',
		location: '',
		price: 'free',
		spots: 20,
		register: '',
		// spotsLeft: 7,
		image: '/prout.jpg',
		category: '',
		teacher: ''
	},
	{
		id: 'diipavalii',
		title: 'Diipavalii',
		titleVi: 'Diipavalii',
		description: '',
		descriptionVi: '',
		date: '2026-11-08',
		time: '13:30 UTC',
		duration: '120 min',
		location: '',
		price: 'free',
		spots: 20,
		register: '',
		// spotsLeft: 7,
		image: '/divali.jpg',
		category: '',
		teacher: ''
	},
	{
		id: 'dadhicii',
		title: 'Dadhicii Divas',
		titleVi: 'Dadhicii Divas',
		description: '',
		descriptionVi: '',
		date: '2026-03-05',
		time: '13:30 UTC',
		duration: '120 min',
		location: '',
		price: 'free',
		spots: 20,
		register: 'https://india.anandamarga.org/articles/the-dadhichi-divas-a-commendation-to-unwavering-courage-faced-by-babas-children/',
		// spotsLeft: 7,
		image: 'https://india.anandamarga.org/wp-content/uploads/2025/03/Dadhichii.jpg',
		category: 'Onsite',
		teacher: 'AMAYE'
	},
	{
		id: 'mooncakes',
		title: 'White Lotus Moon Cakes',
		titleVi: 'Bánh Trung thu thuần chay Hoa Sen',
		description: 'Yoga Hoa Sen vegan mooncakes do not use animal-derived ingredients such as milk, butter, eggs, honey, etc. Regular vegan mooncakes usually contain eggs.',
		descriptionVi: 'Bánh Trung thu thuần chay tại Yoga Hoa Sen không sử dụng các nguyên liệu làm từ động vật như: sữa, bơ, trứng, mật ong… Bánh trung thu chay thông thường sẽ có trứng.',
		date: '2025-10-03',
		time: '13:30 UTC',
		duration: '48 hours',
		location: '',
		price: '350,000 VND',
		spots: 100,
		register: 'https://www.facebook.com/share/p/1CCZoUK9kV/',
		// spotsLeft: 7,
		image: '/whitelotuscake.jpg',
		category: 'Onsite',
		teacher: 'Kalyanii'
	},
// 	6 điều trác tuyệt của Bánh Trung thu thuần chay Hoa Sen 🇻🇳
// 🥮 Về thủ thuật: Tất cả các công đoạn được làm HOÀN TOÀN THỦ CÔNG và vô cùng tỉ mỉ, bao gồm: sơ chế, cắt, gọt, sên nhân, vo nhân, trộn bột, bao bột, tạo hoa văn, ép khuôn… Tất cả các loại bánh đều được nướng, hoàn toàn không trải qua quá trình lên men.
// 🥮Về tính nghệ thuật: Để tạo ra hoa văn nhiều màu sắc với các góc cạnh sắc nét cần rất nhiều thời gian và sự tỉ mỉ dưới bàn tay người thợ có kinh nghiệm lâu năm. Do đó số lượng bánh có giới hạn #limited nhằm đảm bảo tính thẩm mỹ và độ thơm ngon cao nhất.
// 🥮Về việc bảo quản: Bánh không dùng bất kỳ chất bảo quan để đảm bảo độ tươi ngon. Bánh được thưởng thức ngon nhất là trong vòng 07 ngày kể từ khi ra lò.
// 🥮Về an toàn vệ sinh: Tất cả các quá trình đều thực hiện trên bàn cách mặt đất ít nhất 70 cm. Tất cả các dụng cụ làm bánh, khuôn đúc được vệ sinh bằng cồn, rửa lại kỹ lưỡng và để khô ráo. Khi tiếp xúc với nguyên liệu trong quá trình làm bánh, người thợ đều sử dụng các dụng cụ được tiệt trùng cẩn thận. Sau khi hoàn thành công đoạn nướng, bánh được làm nguội trước khi đóng gói trong phòng kín để tránh côn trùng và bụi từ không khí.
// 🥮Năng lượng an lành: Điều đặc biệt nhất đó chính là những tâm ý an lành mà người thợ - những người thực hành ăn chay tri giác trên 10 năm, gửi gắm vào trong từng miếng bánh. Giúp người thương muôn nơi như được thưởng thức hương vị ấm áp của tình thân cùng với niềm an yên trong mùa đoàn viên sắp tới.
// 📞Để sở hữu những miếng bánh tròn vị yêu thương và tâm huyết ngay từ hôm nay, bạn hãy Inbox về ngay Fanpage hoặc đặt hàng qua số điện thoại 0903.004.984 (Chị Khanh) hoặc 0918.873.316 (Chị Châu). 
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
		register: 'https://www.facebook.com/share/v/1B6PNKGWdn/',
		image: '/daklak.jpg',
		category: 'Social Service',
		// teacher: 'Minh Tran'
	}
];


// [Hoạt động thiện nguyện]  
// 🌻 Với sự thôi thúc từ trái tim cùng phương châm “lá lành đùm lá rách”, Yoga Hoa Sen đã cùng góp một ít tấm lòng nhỏ bé của mình để san sẻ cùng với các bà con bị ảnh hưởng nặng ở vùng lũ trong việc tái thiết cuộc sống, cùng vực dậy kinh tế gia đình sau mưa to, sóng lớn. 
// Hành động cụ thể:
// 💜 Yoga Hoa Sen đã trao tặng tận tay số tiền tổng cộng 275 triệu đồng cho 550 hộ bà con (500,000 đồng/hộ) ở xã Tuy An Tây và Tuy An Bắc, tỉnh Đắk Lắk (Phú Yên cũ) vào ngày 28/11/25.
// 💜 Tặng 420 bếp ga trị giá 126 triệu đồng cho 420 hộ dân ở xã Tuy An Đông, tỉnh Đắk Lắk (Phú Yên cũ) vào ngày 30/11/25.
// 🇻🇳 Hy vọng với món quà nhỏ bé này, bà con phần nào đó được an ủi và an tâm bắt đầu lại cuộc sống bình yên trên mảnh đất quê hương với nhiều nghị lực và tình yêu thương.