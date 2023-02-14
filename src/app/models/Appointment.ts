export interface Appointment {
    customerId?: string;
    customerName?: string;

    employeeId?: string;
    employeeName?: string;

    startDate: Date;
    endDate: Date;

    hairServicesIds: number[];

    price: number;
    
    isDeleted?: string;
}