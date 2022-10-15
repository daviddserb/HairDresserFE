import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Customer } from "../models/Customer";
import { Appointment } from "../models/Appointment";
import { User } from "../models/User";
import { BehaviorSubject, Observable, tap, timeout } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class HairDresserService {
    apiUrl = "https://localhost:7192/api";

    // Behavior subject to keep the state of the logged in user (state true if user is logged in, false otherwise).
    private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
    isLoggedIn$ = this._isLoggedIn$.asObservable(); // Public so we can change it.

    loggedInUser_Token = localStorage.getItem('token');
    loggedInUser_Username = localStorage.getItem('username');

    constructor(private httpClient: HttpClient) {
        // Get the value of the token, from the local storage, from the logged in user.
        const token = localStorage.getItem('token');
        // If it is a value in the token => state of the isLoggedIn will be true (because user is logged in), false otherwise.
        this._isLoggedIn$.next(!!token);
    }

    // APPOINTMENT
    postAppointment(appointment: Appointment): Observable<Appointment> {
        console.log("postAppointment(): Observable");
        return this.httpClient.post<Appointment>(`${this.apiUrl}/appointment`, appointment);
    }

    getAllAppointments(pageNumber: number, pageSize: number): Observable<any> {
        return this.httpClient.get<any>(`${this.apiUrl}/appointment/all?PageNumber=${pageNumber}&PageSize=${pageSize}`);
    }

    getAppointmentById(appointmentId: number): Observable<Appointment> { 
        return this.httpClient.get<Appointment>(`${this.apiUrl}/appointment/${appointmentId}`);
    }

    getAllAppointmentsByCustomerId(customerId: number): Observable<Appointment[]> {
        return this.httpClient.get<Appointment[]>(`${this.apiUrl}/appointment/all/customer/${customerId}`);
    }

    getAppointmentsInWorkByCustomerId(customerId: number): Observable<Appointment> {
        return this.httpClient.get<Appointment>(`${this.apiUrl}/appointment/in-work/customer/${customerId}`);
    }

    getAllAppointmentsByEmployeeId(employeeId: number): Observable<Appointment> {
        return this.httpClient.get<Appointment>(`${this.apiUrl}/appointment/all/employee/${employeeId}`);
    }

    deleteAppointmentById(appointmentId: number): Observable<{}> {
        return this.httpClient.delete(`${this.apiUrl}/appointment/${appointmentId}`);
    }

    // CUSTOMER
    postCustomer(customer: any): Observable<Customer> {
        return this.httpClient.post<Customer>(`${this.apiUrl}/customer`, customer);
    }
    
    getAllCustomers(): Observable<Customer> {
        return this.httpClient.get<Customer>(`${this.apiUrl}/customer/all`);
    }

    getCustomerById(): Observable<Customer> {
        let customerId = 1;
        return this.httpClient.get<Customer>(`${this.apiUrl}/customer/${customerId}`);
    }

    putCustomer(customerId: number, customer: any): Observable<Customer> {
        return this.httpClient.put<Customer>(`${this.apiUrl}/customer/${customerId}`, customer);
    }

    deleteCustomerById(customerId: number): Observable<{}> {
        return this.httpClient.delete(`${this.apiUrl}/customer/${customerId}`);
    }

    // HAIR SERVICES
    postHairService(hairService: object): Observable<{}> {
        return this.httpClient.post(`${this.apiUrl}/hairservice`, hairService);
    }

    getAllHairServices(): Observable<{}> {
        return this.httpClient.get(`${this.apiUrl}/hairservice/all`);
    }

    getHairServiceById(hairServiceId: number): Observable<{}> {
        return this.httpClient.get(`${this.apiUrl}/hairservice/${hairServiceId}`);
    }

    getHairServicesByEmployeeId(employeeId: number): Observable<{}> {
        return this.httpClient.get(`${this.apiUrl}/hairservice/all/employee/${employeeId}`);
    }

    getMissingHairServicesByEmployeeId(employeeId: number): Observable<{}> {
        return this.httpClient.get(`${this.apiUrl}/hairservice/missing/employee/${employeeId}`);
    }

    putHairService(hairServiceId: number, hairService: object): Observable<{}> {
        return this.httpClient.put(`${this.apiUrl}/hairservice/${hairServiceId}`, hairService);
    }

    deleteHairServiceById(hairServiceId: number): Observable<{}> {
        return this.httpClient.delete(`${this.apiUrl}/hairservice/${hairServiceId}`);
    }

    getDurationByHairServicesIds(hairServicesIds: any): Observable<{}> {
        console.log("getDurationByHairServicesIds(): Observable")
        
        console.log("hair services ids= ", hairServicesIds);

        let stringForApi = "hairServicesIds=";

        hairServicesIds.forEach((element : any, index: any, array: any) => {
            stringForApi += element;
            if (index !== array.length - 1) {
                stringForApi += "&hairServicesIds=";
            }
        });

        console.log("string for api= ", stringForApi);

        console.log("api url= ", `${this.apiUrl}/hairservice/duration/by-ids?${stringForApi}`);

        this.httpClient.get(`${this.apiUrl}/hairservice/duration/by-ids?${stringForApi}`).subscribe(res => console.log("duration= ", res));
        
        return this.httpClient.get(`${this.apiUrl}/hairservice/duration/by-ids?${stringForApi}`);
    }

    getPriceByHairServicesIds(hairServicesIds: any): Observable<{}> {
        console.log("getPriceByHairServicesIds(): Observable")
        
        console.log("hair services ids= ", hairServicesIds);

        let stringForApi = "hairServicesIds=";

        hairServicesIds.forEach((element : any, index: any, array: any) => {
            stringForApi += element.toString();
            if (index !== array.length - 1) {
                stringForApi += "&hairServicesIds=";
            }
        });

        console.log("string for api= ", stringForApi);

        console.log("api url= ", `${this.apiUrl}/hairservice/price/by-ids?${stringForApi}`);

        this.httpClient.get(`${this.apiUrl}/hairservice/price/by-ids?${stringForApi}`).subscribe(res => console.log("price= ", res));
        
        return this.httpClient.get(`${this.apiUrl}/hairservice/price/by-ids?${stringForApi}`);
    }

    // EMPLOYEE
    getAllEmployees(): Observable<{}> {
        return this.httpClient.get(`${this.apiUrl}/employee/all`);
    }

    getEmployeeById(employeeId: number): Observable<{}> {
        return this.httpClient.get(`${this.apiUrl}/employee/${employeeId}`);
    }

    addHairServicesToEmployee(employeeHairService: any): Observable<{}> {
        return this.httpClient.post(`${this.apiUrl}/employee/hair-service`, employeeHairService);
    }

    getEmployeesByHairServicesIds(hairServicesIds: any): Observable<{}> {
        console.log("getEmployeesByHairServicesIds(): Observable");

        console.log("hair services ids= ", hairServicesIds)

        let stringForApi = "hairServicesIds=";

        hairServicesIds.forEach((element : any, index: any, array: any) => {
            stringForApi += element;
            if (index !== array.length - 1) {
                stringForApi += "&hairServicesIds=";
            }
        });

        console.log("string for api= ", stringForApi);

        console.log("api url= ", `${this.apiUrl}/employee/all/by-services?${stringForApi}`);

        this.httpClient.get(`${this.apiUrl}/employee/all/by-services?${stringForApi}`).subscribe(res => console.log("selected employees= ", res));

        return this.httpClient.get(`${this.apiUrl}/employee/all/by-services?${stringForApi}`);
    }

    getValidIntervals(employeeId: number, selectedDate: any, appointmentDuration: any, customerId: number): Observable<{}> {
        console.log("getValidIntervals(): Observable");

        console.log("employee id= ", employeeId);
        console.log("selected date= ", selectedDate);
        console.log("year= ", selectedDate.getFullYear())
        console.log("month= ", selectedDate.getMonth() + 1);
        console.log("date= ", selectedDate.getDate());
        console.log("appointment duration= ", appointmentDuration);
        console.log("customer id= ", customerId);

        let appointmentDurationSplitted = appointmentDuration.split(':');
        console.log("appointment duration splitted= ", appointmentDurationSplitted);
        // Convert from TimeSpan value to Int value in minutes (don't add the seconds because there will not be seconds in the appointments).
        let appointmentDurationInMinutes = (+appointmentDurationSplitted[0]) * 60 + (+appointmentDurationSplitted[1]);
        console.log("appointment duration in minutes= ", appointmentDurationInMinutes);

        console.log("api url:");
        console.log(`${this.apiUrl}/employee/free-intervals?EmployeeId=${employeeId}&Year=${selectedDate.getFullYear()}&Month=${selectedDate.getMonth() + 1}&Date=${selectedDate.getDate()}&DurationInMinutes=${appointmentDurationInMinutes}&CustomerId=${customerId}`);

        //this.httpClient.get(`${this.apiUrl}/employee/free-intervals?EmployeeId=${employeeId}&Year=${selectedDate.getFullYear()}&Month=${selectedDate.getMonth() + 1}&Date=${selectedDate.getDate()}&DurationInMinutes=${appointmentDurationInMinutes}&CustomerId=${customerId}`).subscribe(response => console.log(response));

        return this.httpClient.get(`${this.apiUrl}/employee/free-intervals?EmployeeId=${employeeId}&Year=${selectedDate.getFullYear()}&Month=${selectedDate.getMonth() + 1}&Date=${selectedDate.getDate()}&DurationInMinutes=${appointmentDurationInMinutes}&CustomerId=${customerId}`);
    }

    deleteHairServiceFromEmployee(employeeHairServiceId: number): Observable<{}> {
        console.log("deleteHairServiceFromEmployee(): Observable");

        return this.httpClient.delete(`${this.apiUrl}/employee/hair-service/${employeeHairServiceId}`);
    }

    // WORKING INTERVALS
    getAllWorkingIntervals(): Observable<{}> {
        return this.httpClient.get(`${this.apiUrl}/workinginterval/all`);
    }

    postWorkingInterval(workingInterval: any): Observable<{}> {
        console.log("postWorkingInterval(): Observable");
        
        return this.httpClient.post(`${this.apiUrl}/workinginterval`, workingInterval);
    }

    getAllEmployeeWorkingIntervalsByEmployeeId(employeeId: number): Observable<{}> {
        return this.httpClient.get(`${this.apiUrl}/workinginterval/all/${employeeId}`);
    }

    deleteWorkingIntervalById(workingIntervalId: number): Observable<{}> { 
        console.log("deleteWorkingIntervalById(): Observable");
        return this.httpClient.delete(`${this.apiUrl}/workinginterval/${workingIntervalId}`);
    }

    // AUTH USER
    registerUser(user_username: string, user_password: string): Observable<{}> {
        console.log("registerUser():");
        let userObject: User = {
            username: user_username,
            password: user_password,
        }
        return this.httpClient.post<User>(`${this.apiUrl}/user/register`, userObject);
    }

    logInUser(user_username: string, user_password: string): Observable<{}> {
        console.log("HairDresserService -> logInUser()");
        let userObject: User = {
            username: user_username,
            password: user_password,
        }

        return this.httpClient.post<User>(`${this.apiUrl}/user/login`, userObject)
        .pipe(
            tap((response: any ) => {
                // Save information in Local Storage (key - value).
                // To see it: Inspect on the web page - Application
                localStorage.setItem('token', response.token);
                localStorage.setItem('username', response.username);

                // Using method next() we know that every subscriber of the public observable will be notified.
                this._isLoggedIn$.next(true);

                console.log("response.token:");
                console.log(response.token);
            })
        );
    }

    logOutUser() {
        console.log("HairDresserService -> logOutUser()");
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    }
}