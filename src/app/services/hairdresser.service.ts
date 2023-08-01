import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Appointment } from "../models/Appointment";
import { User } from "../models/User";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Router } from '@angular/router';
import { Hair } from "../models/Hair";
import { WorkingInterval } from "../models/WorkingInterval";
import { Review } from "../models/Review";

@Injectable({
    providedIn: 'root'
})
export class HairDresserService {
    private readonly apiUrl = "https://localhost:7192/api";

    //Behavior subject to keep the state of the logged in user (state true if user is logged in, false otherwise).
    private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
    //Public Observable so we can change it.
    isLoggedIn$ = this._isLoggedIn$.asObservable();
    
    // For Back-end Authorization, to send the token, in the Header of the HTTP Request.
    headers: HttpHeaders;

    constructor
    (
        private httpClient: HttpClient,
        private router: Router
    )
    {
        //Get the value of the token, from the local storage, from the logged in user.
        const token = localStorage.getItem('token');
        
        //If it is a value in the token => state of the isLoggedIn will be true (because user is logged in), false otherwise.
        this._isLoggedIn$.next(!!token);

        this.headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    }

    //APPOINTMENTS:
    postAppointment(appointment: Appointment): Observable<Appointment> {
        return this.httpClient.post<Appointment>(`${this.apiUrl}/appointment`, appointment, { headers: this.headers });
    }

    getAllAppointments(pageNumber: number, pageSize: number): Observable<Appointment[]> {
        return this.httpClient.get<Appointment[]>(`${this.apiUrl}/appointment/all?PageNumber=${pageNumber}&PageSize=${pageSize}`, { headers: this.headers });
    }

    getAppointmentById(appointmentId: number): Observable<Appointment> { 
        return this.httpClient.get<Appointment>(`${this.apiUrl}/appointment/${appointmentId}`);
    }

    getAllAppointmentsByCustomerId(customerId: string): Observable<Appointment[]> {
        return this.httpClient.get<Appointment[]>(`${this.apiUrl}/appointment/all/customer/${customerId}`);
    }

    getFinishedAppointmentsByCustomerId(customerId: string): Observable<Appointment[]> {
        return this.httpClient.get<Appointment[]>(`${this.apiUrl}/appointment/finished/customer/${customerId}`, { headers: this.headers });
    }

    getInWorkAppointmentsByCustomerId(customerId: string): Observable<Appointment[]> {
        return this.httpClient.get<Appointment[]>(`${this.apiUrl}/appointment/in-work/customer/${customerId}`, { headers: this.headers });
    }

    getAllAppointmentsByEmployeeId(employeeId: string): Observable<Appointment[]> {
        return this.httpClient.get<Appointment[]>(`${this.apiUrl}/appointment/all/employee/${employeeId}`);
    }

    getFinishedAppointmentsByEmployeeId(employeeId: string): Observable<Appointment[]> {
        return this.httpClient.get<Appointment[]>(`${this.apiUrl}/appointment/finished/employee/${employeeId}`, { headers: this.headers });
    }

    getInWorkAppointmentsByEmployeeId(employeeId: string): Observable<Appointment[]> {
        return this.httpClient.get<Appointment[]>(`${this.apiUrl}/appointment/in-work/employee/${employeeId}`, { headers: this.headers });
    }
    
    reviewAppointment(appointmentId: number, review: Review): Observable<Appointment> {
        return this.httpClient.post<Appointment>(`${this.apiUrl}/appointment/${appointmentId}/review`, review, { headers: this.headers });
    }

    deleteAppointmentById(appointmentId: number): Observable<{}> {
        const customerId = localStorage.getItem('id'); // logged-in user id
        return this.httpClient.delete(`${this.apiUrl}/appointment/${customerId}/${appointmentId}`, { headers: this.headers });
    }

    //HAIR SERVICES:
    postHairService(hair: object): Observable<Hair> {
        return this.httpClient.post<Hair>(`${this.apiUrl}/hairservice`, hair);
    }

    getAllHairServices(): Observable<Hair[]> {
        return this.httpClient.get<Hair[]>(`${this.apiUrl}/hairservice/all`);
    }

    getHairServiceById(hairServiceId: number): Observable<Hair> {
        return this.httpClient.get<Hair>(`${this.apiUrl}/hairservice/${hairServiceId}`);
    }

    getHairServicesByEmployeeId(employeeId: string): Observable<Hair[]> {
        return this.httpClient.get<Hair[]>(`${this.apiUrl}/hairservice/all/employee/${employeeId}`);
    }

    getMissingHairServicesByEmployeeId(employeeId: string): Observable<Hair[]> {
        return this.httpClient.get<Hair[]>(`${this.apiUrl}/hairservice/missing/employee/${employeeId}`);
    }

    putHairService(hairId: number, hair: object): Observable<Hair> {
        return this.httpClient.put<Hair>(`${this.apiUrl}/hairservice/${hairId}`, hair);
    }

    deleteHairServiceById(hairId: number): Observable<Hair> {
        return this.httpClient.delete<Hair>(`${this.apiUrl}/hairservice/${hairId}`);
    }

    getDurationByHairServicesIds(hairServicesIds: any): Observable<{}> {
        let stringForApi = "hairServicesIds=";

        hairServicesIds.forEach((element : any, index: any, array: any) => {
            stringForApi += element;
            if (index !== array.length - 1) {
                stringForApi += "&hairServicesIds=";
            }
        });

        return this.httpClient.get(`${this.apiUrl}/hairservice/duration/by-ids?${stringForApi}`);
    }

    getPriceByHairServicesIds(hairServicesIds: any): Observable<{}> {
        let stringForApi = "hairServicesIds=";

        hairServicesIds.forEach((element : any, index: any, array: any) => {
            stringForApi += element.toString();
            if (index !== array.length - 1) {
                stringForApi += "&hairServicesIds=";
            }
        });
        
        return this.httpClient.get(`${this.apiUrl}/hairservice/price/by-ids?${stringForApi}`);
    }

    //WORKING INTERVALS:
    postWorkingInterval(workingInterval: object): Observable<WorkingInterval> {
        return this.httpClient.post<WorkingInterval>(`${this.apiUrl}/working-interval`, workingInterval);
    }

    getAllWorkingIntervals(): Observable<WorkingInterval[]> {
        return this.httpClient.get<WorkingInterval[]>(`${this.apiUrl}/working-interval/all`);
    }

    getAllEmployeeWorkingIntervalsByEmployeeId(employeeId: string): Observable<WorkingInterval[]> {
        return this.httpClient.get<WorkingInterval[]>(`${this.apiUrl}/working-interval/all/${employeeId}`);
    }

    deleteWorkingIntervalById(workingIntervalId: number): Observable<{}> { 
        console.log("deleteWorkingIntervalById(): Observable");
        return this.httpClient.delete(`${this.apiUrl}/working-interval/${workingIntervalId}`);
    }

    //USERS:
    getAllUsers(): Observable<User[]> {
        return this.httpClient.get<User[]>(`${this.apiUrl}/user/all`);
    }

    getUserById(userId: any): Observable<User> {
        return this.httpClient.get<User>(`${this.apiUrl}/user/id?userId=${userId}`);
    }

    getUserWithRoleById(userId: any): Observable<User> {
        return this.httpClient.get<User>(`${this.apiUrl}/user/with-role/id?userId=${userId}`);
    }
    
    //CUSTOMER:
    getAllCustomers(): Observable<User[]> {
        return this.httpClient.get<User[]>(`${this.apiUrl}/user/customer/all`);
    }

    //EMPLOYEE:
    getAllEmployees(): Observable<User[]> {
        return this.httpClient.get<User[]>(`${this.apiUrl}/user/employee/all`);
    }

    addHairServicesToEmployee(employeeHairService: any): Observable<{}> {
        return this.httpClient.post(`${this.apiUrl}/user/employee/hair-service`, employeeHairService);
    }

    getEmployeesByHairServicesIds(hairServicesIds: any): Observable<{}> {
        let stringForApi = "hairServicesIds=";

        hairServicesIds.forEach((element : any, index: any, array: any) => {
            stringForApi += element;
            if (index !== array.length - 1) {
                stringForApi += "&hairServicesIds=";
            }
        });

        return this.httpClient.get(`${this.apiUrl}/user/employee/all/by-hair-services?${stringForApi}`);
    }

    getValidIntervals(employeeId: string, selectedDate: any, appointmentDuration: any, customerId: string): Observable<{}> {
        let appointmentDurationSplitted = appointmentDuration.split(':');
        
        //Convert from TimeSpan value to Int value in minutes (don't add the seconds because there will not be seconds in the appointments).
        let appointmentDurationInMinutes = (+appointmentDurationSplitted[0]) * 60 + (+appointmentDurationSplitted[1]);

        return this.httpClient.get(`${this.apiUrl}/user/employee/free-intervals?EmployeeId=${employeeId}&Year=${selectedDate.getFullYear()}&Month=${selectedDate.getMonth() + 1}&Date=${selectedDate.getDate()}&DurationInMinutes=${appointmentDurationInMinutes}&CustomerId=${customerId}`);
    }

    deleteHairServiceFromEmployee(employeeHairServiceId: number): Observable<{}> {
        return this.httpClient.delete(`${this.apiUrl}/user/employee/hair-service/${employeeHairServiceId}`);
    }

    //USER AUTHENTICATION (REGISTER, LOG IN/OUT):
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
                //Save information in Local Storage as key - value (to see it: Inspect page -> Application -> Local Storage).
                localStorage.setItem('token', response.token);
                localStorage.setItem('id', response.id);
                localStorage.setItem('username', response.username);

                //Use next() method to save the value in observables and it means that we know every subscriber of the public observable will be notified.
                this._isLoggedIn$.next(true);

                console.log("token from back-end: ", response.token);
            })
        );
    }

    logOutUser() {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('username');

        this.router.navigate(['']);
    }

    assignRole(user_username: string, user_role: string): Observable<{}> {
        let user: User = {
            username: user_username,
            role: user_role
        };
        return this.httpClient.post<User>(`${this.apiUrl}/user/assign-role`, user);
    }
}