export interface DaySchedule {
    isOpen: boolean;
    timeSlots?: OpenCloseTime[];
}

export interface OpenCloseTime {
    morning?: string;
    afternoon?: string;
    evening?: string;
}