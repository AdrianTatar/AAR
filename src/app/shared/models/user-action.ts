export interface UserAction {
    id: number;
    // Format: 2018-08-11T14:30:15.31
    time: string;
    userId: string;
    action: string;
}
