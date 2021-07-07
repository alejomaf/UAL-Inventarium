import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-recover',
  templateUrl: './register-recover.component.html',
  styleUrls: ['./register-recover.component.css']
})
export class RegisterRecoverComponent implements OnInit {

  constructor(private router: Router) {
    setTimeout(()=>{this.redirigir();}, 10000);
  }

  redirigir() {
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
  }

}
