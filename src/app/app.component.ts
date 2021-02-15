import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PaymentService } from './service/payment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Payment';
  constructor( public paymentService: PaymentService, private router: Router) { }

  ngOnInit () {

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
}
