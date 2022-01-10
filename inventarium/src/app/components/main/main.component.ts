import { Component, OnInit } from '@angular/core';
import $ from "jquery";
import { RouterOutlet } from '@angular/router';
import { fader } from 'src/app/animations/main-animations';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [fader]
})
export class MainComponent implements OnInit {

  hide_navbar = faBars;
  constructor() { }

  ngOnInit(): void {
  }

  sidebarCollapse() {
    $('#sidebar, #content').toggleClass('active');
    $('.sidebar-button').toggleClass('active');
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData;
  }
}
