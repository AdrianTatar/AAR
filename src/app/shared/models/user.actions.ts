export interface UserAction {
    id: number;
    // Format Style: 2018-08-11T14:30:15.31
    timestamp: string;
    userid: string;
    action: string;
}
