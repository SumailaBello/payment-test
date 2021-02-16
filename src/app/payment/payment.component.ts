import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { PaymentService } from '../service/payment.service';
import { Store } from '@ngrx/store';
import { AppState } from './../app.state';
import { Card } from '../models/card.model';
import * as CardActions from '../actions/card.actions';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(public payService: PaymentService, private fb : FormBuilder, private store: Store<AppState>) { }
  paymentForm: FormGroup;
  ngOnInit(): void {
    this.paymentForm = new FormGroup({
      cardNumber: new FormControl(' ', Validators.required),
      cardHolder: new FormControl(' ', Validators.required),
      expirationDate: new FormControl(null, [Validators.required,]),
      CCV: new FormControl(' ', [Validators.maxLength(3), Validators.minLength(3)]),
      amount: new FormControl(' ',[Validators.required, Validators.min(1)]),
    })
  }

  ngAfterViewInit() {
    // console.log(Card);
  }

  dateValid: boolean = false;
  check() {
    console.log(this.paymentForm);
    console.log(this.paymentForm.value.expirationDate);
    const todayDate = new Date();
    const userDate = new Date (this.paymentForm.value.expirationDate);
    if (todayDate < userDate) {
      this.dateValid = true;
    }
    else {
      this.dateValid = false;
    }
    
  }

  addCard(form: Card) {
    console.log(form)
    this.store.dispatch(new CardActions.AddCard({
      cardNumber: form.cardNumber, 
      cardHolder: form.cardHolder,
      expirationDate: form.expirationDate,
      CCV: form.CCV,
      amount: form.amount
    }) );
  }

}
