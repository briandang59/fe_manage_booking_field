import { Calendar, Trophy } from "lucide-react";
import { Search } from "lucide-react";

export const featuredFieldsMock = [
    {
        id: 1,
        slug: "urban-soccer-park",
        field_name: "Urban Soccer Park",
        branch_name: "Quận 1",
        field_thumb: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80",
        address: "123 Nguyễn Huệ, Q.1, TP.HCM",
        field_types: ["5v5", "7v7"],
        price_per_hour: 300000,
        grass_type: "Cỏ nhân tạo",
        rating: 4.8,
    },
    {
        id: 2,
        slug: "riverside-stadium",
        field_name: "Riverside Stadium",
        branch_name: "Thủ Đức",
        field_thumb: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&q=80",
        address: "45 Đường Ven Sông, Thủ Đức",
        field_types: ["7v7", "11v11"],
        price_per_hour: 500000,
        grass_type: "Cỏ tự nhiên",
        rating: 4.6,
    },
    {
        id: 3,
        slug: "greenfield-arena",
        field_name: "Greenfield Arena",
        branch_name: "Tân Bình",
        field_thumb: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80",
        address: "30 Phan Thúc Duyện, Tân Bình",
        field_types: ["5v5"],
        price_per_hour: 250000,
        grass_type: "Cỏ nhân tạo",
        rating: 4.5,
    },
    {
        id: 4,
        slug: "city-sports-complex",
        field_name: "City Sports Complex",
        branch_name: "Quận 7",
        field_thumb: "https://images.unsplash.com/photo-1624880357913-a8539238245b?w=800&q=80",
        address: "101 Nguyễn Văn Linh, Q.7",
        field_types: ["5v5", "7v7", "11v11"],
        price_per_hour: 400000,
        grass_type: "Cỏ lai",
        rating: 4.9,
    },
];

export const tournamentsMock = [
    {
        id: 1,
        title: "City Champions Cup",
        type: "5v5",
        date: "Oct 15 - Oct 22, 2023",
        details: ["$5,000 Prize Pool", "Open for Entry"],
        status: "Register Now",
        statusColor: "#39FF14",
    },
    {
        id: 2,
        title: "Amateur League Finals",
        type: "7v7",
        date: "Nov 5, 2023",
        details: ["Trophy + Bragging Rights", "Invite Only"],
        status: "Details",
        statusColor: "#ececec",
    },
    {
        id: 3,
        title: "Youth Kickoff Classic",
        type: "U-18",
        date: "Oct 28 - Oct 29, 2023",
        details: ["Medals for all participants", "12/16 Slots Filled"],
        status: "Join Waiting List",
        statusColor: "#faad14",
    },
];

export const howItWorksSteps = [
    {
        title: "Tìm kiếm",
        description: "Nhập địa điểm, ngày giờ bạn muốn đá. Chúng tôi sẽ hiển thị các sân phù hợp.",
        icon: Search,
    },
    {
        title: "Đặt sân",
        description:
            "Chọn sân yêu thích, xem chi tiết và xác nhận đặt sân với hệ thống thanh toán an toàn.",
        icon: Calendar,
    },
    {
        title: "Thi đấu",
        description: "Đến sân đúng giờ và tận hưởng trận đấu. Chúng tôi lo phần còn lại.",
        icon: Trophy,
    },
];
