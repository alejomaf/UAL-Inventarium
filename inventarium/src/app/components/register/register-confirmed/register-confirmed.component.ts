import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-confirmed',
  templateUrl: './register-confirmed.component.html',
  styleUrls: ['./register-confirmed.component.css']
})
export class RegisterConfirmedComponent implements OnInit {

  constructor(private router: Router) {
    setTimeout(()=>{this.redirigir();}, 10000);
  }

  redirigir() {
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
  }

}
