import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Card } from '../models/card.model';
@Injectable({
  providedIn: 'root'
})

export class PaymentService {


  baseUrl = "https://reqres.in/api";
  constructor(public http: HttpClient) { }

  pay(body) {
    console.log(body)
    this.http.post<Card>(`${this.baseUrl}/users`, body)
      .subscribe(data => {
        console.log(data);
        this.showToast('Operation successful', true);
      }, error => {
        console.log(error);
        this.showToast("Operation failed", true);
      })
  }

  // toggles display of toast message
  toast: boolean = false;
  toastMsg: string;
  showToast(message: string, status: boolean) {
    this.toastMsg = message;
    this.toast = status;
    setTimeout(()=> {
      this.showToast('', false); //turns off the toast
    }, 5000)
  }
}
