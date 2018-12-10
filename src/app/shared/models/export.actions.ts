import { ExportTimeStamp } from './export.timestamp';
export interface ExportAction {
    // Format: 2018-08-11T14:30:15.31
    userId: string;
    time: ExportTimeStamp;
}
