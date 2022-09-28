import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Customer } from "../models/Customer";
import { Appointment } from "../models/Appointment";
import { User } from "../models/User";

@Injectable({
    providedIn: 'root'
})
export class HairDresserService {
    apiUrl = "https://localhost:7192/api";

    // Behavior subject to keep the state of the logged in user (state true if user is logged in, false otherwise).
    private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
    isLoggedIn$ = this._isLoggedIn$.asObservable(); // Public so we can change it.

    user_username = localStorage.getItem('username');

    constructor(
        private httpClient: HttpClient
        ) {
            // Get the value of the token, from the local storage, from the logged in user.
            const token = localStorage.getItem('token');
            // If it is a value in the token => state of the isLoggedIn will be true (because user is logged in), false otherwise.
            this._isLoggedIn$.next(!!token);
        }

    getAllAppointments(): Observable<Appointment> {
        let pageNumberValue = 1;
        let pageSizeValue = 4;
        //return this.httpClient.get("https://localhost:7192/api/appointment/all?PageNumber="+pageNumberValue+"&PageSize="+pageSizeValue+""); //different method to use variables in url
        return this.httpClient.get<Appointment>(`${this.apiUrl}/appointment/all?PageNumber=${pageNumberValue}&PageSize=${pageSizeValue}`);
    }

    getAppointmentById(): Observable<Appointment> { 
        let appointmentId = 1;
        return this.httpClient.get<Appointment>(`${this.apiUrl}/appointment/${appointmentId}`);
    }

    getAllAppointmentsByCustomerId(): Observable<Appointment> {
        let customerId = 1;
        return this.httpClient.get<Appointment>(`${this.apiUrl}/appointment/all/customer/${customerId}`);
    }

    getAllInWorkAppointmentsByCustomerId(): Observable<Appointment> {
        let customerId = 1;
        return this.httpClient.get<Appointment>(`${this.apiUrl}/appointment/in-work/customer/${customerId}`);
    }

    getAllAppointmentsByEmployeeId(): Observable<Appointment> {
        let employeeId = 1;
        return this.httpClient.get<Appointment>(`${this.apiUrl}/appointment/all/employee/${employeeId}`);
    }

    postAppointment(): Observable<Appointment> {
        let appointmentObject: Appointment = {
            customerId: 1,
            employeeId: 2,
            hairServicesIds: [3, 5],
            startDate: new Date(new Date().setHours(new Date().getHours() + 4)),
            endDate: new Date(new Date().setHours(new Date().getHours() + 6))
        }
        return this.httpClient.post<Appointment>(`${this.apiUrl}/appointment`, appointmentObject);
    }

    putAppointment(): Observable<Appointment> {
        let appointmentId = 66;
        let appointmentUpdateObject = {
            hairServicesIds: [2, 5],
            employeeId: 2,
            startDate: new Date(new Date().setHours(new Date().getHours() + 7)),
            endDate: new Date(new Date().setHours(new Date().getHours() + 8))
        }
        return this.httpClient.put<Appointment>(`${this.apiUrl}/appointment/${appointmentId}`, appointmentUpdateObject);
    }

    deleteAppointmentById(): Observable<{}> {
        let appointmentId = 65;
        return this.httpClient.delete(`${this.apiUrl}/appointment/${appointmentId}`);
    }

    getAllCustomers(): Observable<Customer> {
        return this.httpClient.get<Customer>(`${this.apiUrl}/customer/all`);
    }

    getCustomerById(): Observable<Customer> {
        let customerId = 1;
        return this.httpClient.get<Customer>(`${this.apiUrl}/customer/${customerId}`);
    }

    postCustomer(): Observable<Customer> {
        let customerObject: Customer = {
            name: "Anastasia Anghel",
            username: "anastasia_angheL",
            password: "parola@#12FT123#",
            email: "anastasia_ang@gmail.com",
            phone: "+40743567821",
            address: "Suceava"
        }
        return this.httpClient.post<Customer>(`${this.apiUrl}/customer`, customerObject);
    }

    putCustomer(): Observable<Customer> {
        let customerId = 10;
        let customerUpdateObject: Customer = {
            name: "Mircea Anghel",
            username: "mircea_angheL",
            password: "parolaFT123#",
            email: "mircea_ang@gmail.com",
            phone: "+40743567333",
            address: "Suceava"
        }
        return this.httpClient.put<Customer>(`${this.apiUrl}/customer/${customerId}`, customerUpdateObject);
    }

    deleteCustomerById(): Observable<{}> {
        let customerId = 11;
        return this.httpClient.delete(`${this.apiUrl}/customer/${customerId}`);
    }

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
        // ??? Ma redirectioneaza automat pe pagina de home
    }
}