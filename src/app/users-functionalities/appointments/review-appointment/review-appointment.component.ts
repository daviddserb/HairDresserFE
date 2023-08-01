import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HairDresserService } from 'src/app/services/hairdresser.service';
import { PopUpMessagesService } from 'src/app/pop-up-messages/pop-up-messages.service';
import { Router } from '@angular/router';
import { Review } from 'src/app/models/Review';

@Component({
  selector: 'app-review-appointment',
  templateUrl: './review-appointment.component.html',
  styleUrls: ['./review-appointment.component.css']
})
export class ReviewAppointmentComponent implements OnInit {
  public appointmentId!: number;

  public formAppointmentReview = new FormGroup({
    rating: new FormControl(0, Validators.required),
    comments: new FormControl('', Validators.required),
  });

  //private review: Review;

  public hoveredStars: number = 0;
  public selectedStars: number = 0;

  constructor
  (
    private hairdresserService: HairDresserService,
    private route: ActivatedRoute,
    private popUpMessagesService: PopUpMessagesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Get the id of the appointment from the route
    // Method 1:
    this.route.paramMap.subscribe(params => {
      this.appointmentId = Number(params.get('appointmentId'));
    });
    // Method 2:
    //console.log(Number(this.route.snapshot.paramMap.get('appointmentId')));
  }

  get formAppointmentReviewGetter () { return this.formAppointmentReview.controls; }

  createAppointmentReview() {
    let review: Review = {
      CustomerId: localStorage.getItem('id'),
      Rating: this.formAppointmentReview.value.rating,
      Comments: this.formAppointmentReview.value.comments
    }
    this.hairdresserService.reviewAppointment(this.appointmentId, review)
    .subscribe({
      next: (result) => this.popUpMessagesService.showPopUpMessage("Appointment successfully reviewed!", "OK", "success"),
      error: (e) => this.popUpMessagesService.showPopUpMessage("Failed to review the appointment!", "OK", "error"),
      complete: () => this.router.navigate(['profile/customer/appointment/finished'])
    });
  }

  onStarClicked(star: number) {
    console.log('Clicked star number:', star);
    // Save the value of the star so when the user clicks on a star and takes the mouse off, the gold-stars will remain.
    this.selectedStars = star;
    // Save the value in the form because I couldn't save it dirrectly from HTML.
    this.formAppointmentReview.patchValue({ rating: star });
  }
}
