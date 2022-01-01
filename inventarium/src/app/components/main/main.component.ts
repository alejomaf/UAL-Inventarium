import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import $ from "jquery";
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private loginS: UserService, private router: Router) {
    loginS.getUser().subscribe(
      (res: any) => {
        console.log(res);
      }
    );
    console.log("entra")
  }

  ngOnInit(): void {
  }

  sidebarCollapse() {
    $('#sidebar, #content').toggleClass('active');
  }
}
