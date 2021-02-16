import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PaymentService } from './service/payment.service';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Card } from './models/card.model';
import { AppState } from './app.state';
import * as CardActions from './actions/card.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Payment';
  card: Card[];

  constructor( public paymentService: PaymentService, private router: Router, private store: Store<AppState>) { 
    store.select('card').subscribe(value => {
      console.log(value);
      this.card = value;
      console.log(this.card);
    })
  }

  ngOnInit () {
    console.log(this.card);
  }

  
  ngAfterViewInit() {
    this.routeEvent();
  }

  currentRoute: string = "/";
  routeEvent() {
    this.router.events.subscribe( data => {
      // this.currentRoute = data instanceof NavigationEnd;
      if(data instanceof NavigationEnd) {
        this.currentRoute = data.url;
      }
    })
  }

  reset() {
    this.store.dispatch(new CardActions.ResetCard)
  }
}
