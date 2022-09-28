import { Component } from '@angular/core';
import { HairDresserService } from './services/hairdresser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public hairdresserService: HairDresserService) {}

  ngOnInit(): void {
    // this.hairdresserService.getAllAppointments().subscribe(x => console.log(x));

    // this.hairdresserService.getAppointmentById().subscribe(x => console.log(x));

    // this.hairdresserService.getAllAppointmentsByCustomerId().subscribe(x => console.log(x));

    // this.hairdresserService.getAllInWorkAppointmentsByCustomerId().subscribe(x => console.log(x));

    // this.hairdresserService.getAllAppointmentsByEmployeeId().subscribe(x => console.log(x));

    // //this.hairdresserService.postAppointment().subscribe(x => console.log(x));

    // //this.hairdresserService.putAppointment().subscribe(x => console.log(x));

    // //this.hairdresserService.deleteAppointmentById().subscribe(x => console.log("APPOINTMENT DELETED"));
    
    // this.hairdresserService.getAllCustomers().subscribe(x => console.log(x));

    // this.hairdresserService.getCustomerById().subscribe(x => console.log(x));

    // //this.hairdresserService.postCustomer().subscribe(x => console.log(x));

    // //this.hairdresserService.putCustomer().subscribe(x => console.log(x));

    // //this.hairdresserService.deleteCustomerById().subscribe(x => console.log("CUSTOMER DELETED"));
  }
}
