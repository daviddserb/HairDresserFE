export interface Appointment {
    customerId?: number;
    customerName?: string;

    employeeId?: number;
    employeeName?: string;

    hairServicesIds: number[];

    startDate: Date;
    endDate: Date;

    price: number;
    
    isDeleted?: string;
}