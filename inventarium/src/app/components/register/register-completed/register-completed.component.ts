import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-completed',
  templateUrl: './register-completed.component.html',
  styleUrls: ['./register-completed.component.css']
})
export class RegisterCompletedComponent implements OnInit {

  constructor(private router: Router) {
    setTimeout(()=>{this.redirigir();}, 10000);
  }

  redirigir() {
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
  }

}
