import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Card } from '../models/card.model';
import * as Rx from "rxjs/Rx";
import { of, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class PaymentService {


  baseUrl = "https://reqres.in/api/";
  constructor(public http: HttpClient) { }

  loader: boolean = false;
  pay(body) {
    this.toggleLoader(); //toggles loading animation
    console.log(body);
    const req = this.http.post<Card[]>(`${this.baseUrl}/users`, body);
    req
      .pipe(
        catchError((err, src) => {
            console.log('An error occured', err);
            this.toggleLoader();
            this.showToast("Operation failed", true);
            console.log(src); //you can return this value to restat the observable again
            return [];
        }), 
          finalize(() => console.log("Operation finalized to free resources."))
        )
          .subscribe(data => {
              console.log(data);
              this.toggleLoader();
              this.showToast('Operation successful', true);
            }, error => {
              // this.toggleLoader();
              console.log(error);
              // this.showToast("Operation failed", true);
            })
  }

  // toggles the display of laoding animation
  toggleLoader() {
    this.loader = !this.loader;
  }

  // toggles display of toast message
  toast: boolean = false;
  toastMsg: string;
  showToast(message: string, status: boolean) {
    this.toastMsg = message;
    this.toast = status;
    setTimeout(()=> {
      this.showToast('', false); //turns off the toast
    }, 3000)
  }
}
