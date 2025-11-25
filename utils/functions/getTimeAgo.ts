export function getTimeAgo(utcDate: string | Date) {
    const now = new Date();
    const date = new Date(utcDate);
    const diff = (now.getTime() - date.getTime()) / 1000; // giây

    const seconds = Math.floor(diff);
    const minutes = Math.floor(diff / 60);
    const hours = Math.floor(diff / 3600);
    const days = Math.floor(diff / 86400);
    const weeks = Math.floor(diff / 604800);
    const months = Math.floor(diff / 2592000);
    const years = Math.floor(diff / 31536000);

    if (seconds < 5) return "vừa xong";
    if (seconds < 60) return `${seconds} giây trước`;
    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    if (days < 7) return `${days} ngày trước`;
    if (weeks < 5) return `${weeks} tuần trước`;
    if (months < 12) return `${months} tháng trước`;
    return `${years} năm trước`;
}
