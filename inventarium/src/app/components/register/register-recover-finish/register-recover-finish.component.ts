import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-recover-finish',
  templateUrl: './register-recover-finish.component.html',
  styleUrls: ['./register-recover-finish.component.css']
})
export class RegisterRecoverFinishComponent implements OnInit {

  constructor(private router: Router) {
    setTimeout(()=>{this.redirigir();}, 10000);
  }

  redirigir() {
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
  }

}
