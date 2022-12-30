import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Customer } from "../models/Customer";
import { Appointment } from "../models/Appointment";
import { User } from "../models/User";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class HairDresserService {
    apiUrl = "https://localhost:7192/api";

    // Behavior subject to keep the state of the logged in user (state true if user is logged in, false otherwise).
    private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
    isLoggedIn$ = this._isLoggedIn$.asObservable(); // Public Observable so we can change it.

    loggedInUser_Token = localStorage.getItem('token');

    constructor(
        private httpClient: HttpClient,
        private router: Router) {
        // Get the value of the token, from the local storage, from the logged in user.
        const token = localStorage.getItem('token');
        // If it is a value in the token => state of the isLoggedIn will be true (because user is logged in), false otherwise.
        this._isLoggedIn$.next(!!token);
    }

    // APPOINTMENTS:
    postAppointment(appointment: Appointment): Observable<Appointment> {
        return this.httpClient.post<Appointment>(`${this.apiUrl}/appointment`, appointment);
    }

    getAllAppointments(pageNumber: number, pageSize: number): Observable<any> {
        return this.httpClient.get<any>(`${this.apiUrl}/appointment/all?PageNumber=${pageNumber}&PageSize=${pageSize}`);
    }

    getAppointmentById(appointmentId: number): Observable<Appointment> { 
        return this.httpClient.get<Appointment>(`${this.apiUrl}/appointment/${appointmentId}`);
    }

    getAllAppointmentsByCustomerId(customerId: string): Observable<Appointment[]> {
        return this.httpClient.get<Appointment[]>(`${this.apiUrl}/appointment/all/customer/${customerId}`);
    }

    // ??? asta (cred)ca inca nu o folosesc
    getInWorkAppointmentsByCustomerId(customerId: string): Observable<Appointment> {
        return this.httpClient.get<Appointment>(`${this.apiUrl}/appointment/in-work/customer/${customerId}`);
    }

    getAllAppointmentsByEmployeeId(employeeId: string): Observable<Appointment> {
        return this.httpClient.get<Appointment>(`${this.apiUrl}/appointment/all/employee/${employeeId}`);
    }

    deleteAppointmentById(appointmentId: number): Observable<{}> {
        return this.httpClient.delete(`${this.apiUrl}/appointment/${appointmentId}`);
    }

    // HAIR SERVICES:
    postHairService(hairService: object): Observable<{}> {
        return this.httpClient.post(`${this.apiUrl}/hairservice`, hairService);
    }

    getAllHairServices(): Observable<{}> {
        return this.httpClient.get(`${this.apiUrl}/hairservice/all`);
    }

    getHairServiceById(hairServiceId: number): Observable<{}> {
        return this.httpClient.get(`${this.apiUrl}/hairservice/${hairServiceId}`);
    }

    getHairServicesByEmployeeId(employeeId: string): Observable<{}> {
        return this.httpClient.get(`${this.apiUrl}/hairservice/all/employee/${employeeId}`);
    }

    getMissingHairServicesByEmployeeId(employeeId: string): Observable<{}> {
        return this.httpClient.get(`${this.apiUrl}/hairservice/missing/employee/${employeeId}`);
    }

    putHairService(hairServiceId: number, hairService: object): Observable<{}> {
        return this.httpClient.put(`${this.apiUrl}/hairservice/${hairServiceId}`, hairService);
    }

    deleteHairServiceById(hairServiceId: number): Observable<{}> {
        return this.httpClient.delete(`${this.apiUrl}/hairservice/${hairServiceId}`);
    }

    getDurationByHairServicesIds(hairServicesIds: any): Observable<{}> {
        console.log("getDurationByHairServicesIds(): Observable");
        
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
        console.log("getPriceByHairServicesIds(): Observable");
        
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

    // WORKING INTERVALS:
    getAllWorkingIntervals(): Observable<any> {
        return this.httpClient.get<any>(`${this.apiUrl}/working-interval/all`);
    }

    postWorkingInterval(workingInterval: object): Observable<{}> {
        return this.httpClient.post(`${this.apiUrl}/working-interval`, workingInterval);
    }

    getAllEmployeeWorkingIntervalsByEmployeeId(employeeId: string): Observable<any> {
        return this.httpClient.get(`${this.apiUrl}/working-interval/all/${employeeId}`);
    }

    deleteWorkingIntervalById(workingIntervalId: number): Observable<{}> { 
        console.log("deleteWorkingIntervalById(): Observable");
        return this.httpClient.delete(`${this.apiUrl}/working-interval/${workingIntervalId}`);
    }

    // USERS (ADMIN, CUSTOMER, EMPLOYEE):
    getUserById(userId: any): Observable<User> {
        return this.httpClient.get<User>(`${this.apiUrl}/user/id?id=${userId}`);
    }
    
    // CUSTOMER:
    getAllCustomers(): Observable<Customer> {
        return this.httpClient.get<Customer>(`${this.apiUrl}/user/customer/all`);
    }

    // EMPLOYEE:
    getAllEmployees(): Observable<any> {
        return this.httpClient.get<any>(`${this.apiUrl}/user/employee/all`);
    }

    addHairServicesToEmployee(employeeHairService: any): Observable<{}> {
        return this.httpClient.post(`${this.apiUrl}/user/employee/hair-service`, employeeHairService);
    }

    getEmployeesByHairServicesIds(hairServicesIds: any): Observable<{}> {
        console.log("getEmployeesByHairServicesIds(): Observable");

        console.log("hair services ids= ", hairServicesIds);

        let stringForApi = "hairServicesIds=";

        hairServicesIds.forEach((element : any, index: any, array: any) => {
            stringForApi += element;
            if (index !== array.length - 1) {
                stringForApi += "&hairServicesIds=";
            }
        });

        console.log("string for api= ", stringForApi);

        console.log("api url= ", `${this.apiUrl}/user/employee/all/by-hair-services?${stringForApi}`);

        this.httpClient.get(`${this.apiUrl}/user/employee/all/by-hair-services?${stringForApi}`).subscribe(res => console.log("selected employees= ", res));

        return this.httpClient.get(`${this.apiUrl}/user/employee/all/by-hair-services?${stringForApi}`);
    }

    getValidIntervals(employeeId: string, selectedDate: any, appointmentDuration: any, customerId: string): Observable<{}> {
        console.log("getValidIntervals(): Observable");

        console.log("employee id= ", employeeId);
        console.log("selected date= ", selectedDate);
        console.log("year= ", selectedDate.getFullYear());
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
        console.log(`${this.apiUrl}/user/employee/free-intervals?EmployeeId=${employeeId}&Year=${selectedDate.getFullYear()}&Month=${selectedDate.getMonth() + 1}&Date=${selectedDate.getDate()}&DurationInMinutes=${appointmentDurationInMinutes}&CustomerId=${customerId}`);

        return this.httpClient.get(`${this.apiUrl}/user/employee/free-intervals?EmployeeId=${employeeId}&Year=${selectedDate.getFullYear()}&Month=${selectedDate.getMonth() + 1}&Date=${selectedDate.getDate()}&DurationInMinutes=${appointmentDurationInMinutes}&CustomerId=${customerId}`);
    }

    deleteHairServiceFromEmployee(employeeHairServiceId: number): Observable<{}> {
        return this.httpClient.delete(`${this.apiUrl}/user/employee/hair-service/${employeeHairServiceId}`);
    }

    // USER AUTHENTICATION (REGISTER, LOG IN/OUT):
    registerUser(userInfo: any): Observable<{}> {
        let user: User = {
            username: userInfo.username,
            password: userInfo.password,
            email: userInfo.email,
            phone: userInfo.phone,
            address: userInfo.address,
        };
        return this.httpClient.post<User>(`${this.apiUrl}/user/register`, user);
    }

    logInUser(user_username: string, user_password: string): Observable<{}> {
        let user: User = {
            username: user_username,
            password: user_password
        };
        return this.httpClient.post<User>(`${this.apiUrl}/user/login`, user)
        .pipe(
            tap((response: any) => {
                // Save information in Local Storage (key - value). To see it: Inspect page -> Application -> Local Storage.
                localStorage.setItem('token', response.token);
                localStorage.setItem('id', response.id);
                localStorage.setItem('username', response.username);

                // Use next() method to save the value in observables and it means that we know every subscriber of the public observable will be notified.
                this._isLoggedIn$.next(true);

                console.log("token= ", response.token);
            })
        );
    }

    logOutUser() {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('username');

        this.router.navigate(['']);
    }
}