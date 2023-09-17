export interface WorkingInterval {
    employeeName: string;

    workingDay: string;
    
    // ??? Time-only data type does NOT exist in TypeScript (like TimeSpan in C#) => save it as a Date and can extract the Time.
    startTime: string;
    endTime: string;
}