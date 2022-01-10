import { Component, OnInit } from '@angular/core';
import $ from "jquery";
import { RouterOutlet } from '@angular/router';
import { fader } from 'src/app/animations/main-animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [fader]
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  sidebarCollapse() {
    $('#sidebar, #content').toggleClass('active');
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData;
  }
}
