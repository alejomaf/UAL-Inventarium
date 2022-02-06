import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  password = new FormControl("");
  password2 = new FormControl("");

  constructor() { }

  ngOnInit(): void {
  }

  recoverPassword() {

  }
}
