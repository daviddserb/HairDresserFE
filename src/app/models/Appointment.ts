export interface Appointment {
    customerName?: string; //for get
    employeeName?: string; //for get
    customerId?: number; //for post
    employeeId?: number; //for post, put
    hairServicesIds: number[];
    startDate: Date;
    endDate: Date;
}