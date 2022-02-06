import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  email = new FormControl("");
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  recoverPassword() {
    this.router.navigateByUrl("/register-recover");
  }

}
